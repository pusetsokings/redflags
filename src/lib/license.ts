/**
 * License and checkout via Supabase Edge Functions. Polar is primary; Lemon Squeezy is backup.
 * When Supabase is not configured, premium falls back to localStorage (existing behavior).
 */
import { getSupabase, isSupabaseConfigured } from './supabase';
import { logger } from './logger';

/** Cache for non-React code (e.g. hybridAICounselor). Updated by verifyLicense and LicenseProvider. */
let cachedLicense: { hasLicense: boolean } = { hasLicense: false };
let lastSessionError: string | null = null;

export function getCachedLicense(): boolean {
  return cachedLicense.hasLicense;
}

export function getLastSessionError(): string | null {
  return lastSessionError;
}

const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_URL
  ? `${(import.meta.env.VITE_SUPABASE_URL as string).replace(/\/$/, '')}/functions/v1`
  : '';

export interface LicenseState {
  hasLicense: boolean;
  userType: 'free' | 'premium';
  loading: boolean;
  error: string | null;
}

/**
 * Ensure we have a session (anonymous sign-in if needed). Returns access token or null.
 */
export async function ensureSession(): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) return session.access_token;

  const { data: { session: newSession }, error } = await supabase.auth.signInAnonymously();
  if (error) {
    lastSessionError = error.message || "Auth error";
    logger.logError(error as Error, { context: 'license', action: 'ensureSession' });
    return null;
  }
  lastSessionError = null;
  return newSession?.access_token ?? null;
}

/**
 * Call verify-license Edge Function. Returns hasLicense and userType.
 */
export async function verifyLicense(): Promise<{ hasLicense: boolean; userType: 'free' | 'premium' }> {
  if (!isSupabaseConfigured() || !FUNCTIONS_URL) {
    return { hasLicense: false, userType: 'free' };
  }

  const token = await ensureSession();
  if (!token) return { hasLicense: false, userType: 'free' };

  const res = await fetch(`${FUNCTIONS_URL}/verify-license`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    logger.logWarn('verify-license failed', { context: 'license', status: res.status, data });
    cachedLicense.hasLicense = false;
    return { hasLicense: false, userType: 'free' };
  }

  const result = {
    hasLicense: !!data.hasLicense,
    userType: data.userType === 'premium' ? 'premium' : 'free' as const,
  };
  cachedLicense.hasLicense = result.hasLicense;
  return result;
}

/**
 * Call create-checkout Edge Function. Returns checkout URL to redirect to (Polar or Lemon Squeezy).
 */
export async function startCheckout(
  productType: 'monthly' | 'annual' | 'reduced',
  options?: { successUrl?: string; cancelUrl?: string; userEmail?: string }
): Promise<{ checkoutUrl: string | null; error: string | null }> {
  if (!isSupabaseConfigured() || !FUNCTIONS_URL) {
    return { checkoutUrl: null, error: 'Payment not configured' };
  }

  const token = await ensureSession();
  if (!token) {
    const hint = getLastSessionError();
    return { checkoutUrl: null, error: hint || 'Not signed in' };
  }

  const successUrl = options?.successUrl ?? (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?payment=success` : '');
  const cancelUrl = options?.cancelUrl ?? (typeof window !== 'undefined' ? window.location.href : '');

  const res = await fetch(`${FUNCTIONS_URL}/create-checkout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productType,
      successUrl,
      cancelUrl,
      userEmail: options?.userEmail,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = data.error || data.detail || 'Checkout failed';
    logger.logWarn('create-checkout failed', { context: 'license', status: res.status, data });
    return { checkoutUrl: null, error: err };
  }

  const checkoutUrl = data.checkoutUrl ?? null;
  return { checkoutUrl, error: checkoutUrl ? null : 'No checkout URL returned' };
}
