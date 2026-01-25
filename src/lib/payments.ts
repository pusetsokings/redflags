/**
 * Payment Integration with Lemon Squeezy
 * 
 * This module handles:
 * - Creating checkout sessions
 * - Verifying subscription status
 * - Storing subscription data securely
 */

import { saveSetting, getSetting } from './storage';
import { logger } from './logger';

export interface Subscription {
  id: string;
  status: 'active' | 'cancelled' | 'expired' | 'past_due';
  plan: 'monthly' | 'annual' | 'reduced' | 'lifetime';
  expiresAt?: string;
  renewsAt?: string;
  cancelledAt?: string;
}

const STORAGE_KEY = 'subscription_data';

/**
 * Initialize Lemon Squeezy checkout
 * @param variantId - Lemon Squeezy product variant ID
 * @param email - User email (optional)
 */
export async function createCheckout(variantId: string, email?: string): Promise<string | null> {
  try {
    const storeId = import.meta.env.VITE_LEMONSQUEEZY_STORE_ID;
    
    if (!storeId) {
      logger.logWarn('Lemon Squeezy store ID not configured', { context: 'payments' });
      return null;
    }

    // Create checkout URL
    const checkoutUrl = `https://${storeId}.lemonsqueezy.com/checkout/buy/${variantId}`;
    
    // Add email if provided
    const url = new URL(checkoutUrl);
    if (email) {
      url.searchParams.set('email', email);
    }
    
    // Add success/cancel URLs
    url.searchParams.set('embed', '1');
    url.searchParams.set('media', '0');
    
    logger.logInfo('Checkout URL created', { context: 'payments', variantId });
    
    return url.toString();
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Failed to create checkout'), {
      context: 'payments',
      action: 'createCheckout'
    });
    return null;
  }
}

/**
 * Get current subscription status
 */
export async function getSubscription(): Promise<Subscription | null> {
  try {
    const subscription = await getSetting(STORAGE_KEY, null);
    if (!subscription) return null;

    // Check if subscription is expired
    if (subscription.expiresAt) {
      const expiresAt = new Date(subscription.expiresAt);
      if (expiresAt < new Date() && subscription.status === 'active') {
        // Mark as expired
        subscription.status = 'expired';
        await saveSubscription(subscription);
      }
    }

    return subscription;
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Failed to get subscription'), {
      context: 'payments'
    });
    return null;
  }
}

/**
 * Save subscription data
 */
export async function saveSubscription(subscription: Subscription): Promise<void> {
  try {
    await saveSetting(STORAGE_KEY, subscription);
    logger.logInfo('Subscription saved', { context: 'payments', status: subscription.status });
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Failed to save subscription'), {
      context: 'payments'
    });
  }
}

/**
 * Check if user has active premium subscription
 */
export async function isPremium(): Promise<boolean> {
  const subscription = await getSubscription();
  return subscription?.status === 'active';
}

/**
 * Check if user has specific premium feature access
 */
export async function hasPremiumFeature(feature: string): Promise<boolean> {
  const isPremiumUser = await isPremium();
  
  // Core safety features are always free
  const freeFeatures = [
    'basic_red_flags',
    'moment_logging',
    'pin_lock',
    'export_json',
    'emergency_resources',
    'basic_ai_chat'
  ];
  
  if (freeFeatures.includes(feature)) {
    return true;
  }
  
  return isPremiumUser;
}

/**
 * Handle webhook verification (for server-side implementation)
 * This would be called from a serverless function
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // Webhook verification would be implemented server-side
  // This is a placeholder for client-side reference
  logger.logInfo('Webhook verification would be handled server-side', {
    context: 'payments'
  });
  return false;
}

/**
 * Process subscription update from webhook
 */
export async function processSubscriptionUpdate(data: any): Promise<void> {
  try {
    const subscription: Subscription = {
      id: data.id || data.subscription_id,
      status: data.attributes?.status || 'expired',
      plan: data.attributes?.variant_name?.toLowerCase() || 'monthly',
      expiresAt: data.attributes?.ends_at || undefined,
      renewsAt: data.attributes?.renews_at || undefined,
      cancelledAt: data.attributes?.cancelled_at || undefined
    };

    await saveSubscription(subscription);
    logger.logInfo('Subscription updated from webhook', {
      context: 'payments',
      status: subscription.status
    });
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Failed to process subscription update'), {
      context: 'payments'
    });
  }
}

/**
 * Get product variant IDs (to be configured)
 * These should match your Lemon Squeezy product variants
 */
export const PRODUCT_VARIANTS = {
  monthly: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_MONTHLY || '',
  annual: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_ANNUAL || '',
  reduced: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_REDUCED || '',
};

/**
 * Cancel subscription
 */
export async function cancelSubscription(): Promise<boolean> {
  try {
    const subscription = await getSubscription();
    if (!subscription) return false;

    // Update subscription status
    subscription.status = 'cancelled';
    subscription.cancelledAt = new Date().toISOString();
    await saveSubscription(subscription);

    logger.logInfo('Subscription cancelled', { context: 'payments' });
    return true;
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Failed to cancel subscription'), {
      context: 'payments'
    });
    return false;
  }
}

