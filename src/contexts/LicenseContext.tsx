import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import { verifyLicense } from '../lib/license';
import { isPremium } from '../lib/payments';

type LicenseContextValue = {
  hasLicense: boolean;
  loading: boolean;
  refreshLicense: () => Promise<{ hasLicense: boolean }>;
  useBackend: boolean;
};

const LicenseContext = createContext<LicenseContextValue>({
  hasLicense: false,
  loading: false,
  refreshLicense: async () => ({ hasLicense: false }),
  useBackend: false,
});

export function LicenseProvider({ children }: { children: React.ReactNode }) {
  const [hasLicense, setHasLicense] = useState(false);
  const [loading, setLoading] = useState(true);
  const useBackend = isSupabaseConfigured();

  const refreshLicense = useCallback(async (): Promise<{ hasLicense: boolean }> => {
    if (useBackend) {
      setLoading(true);
      const result = await verifyLicense();
      setHasLicense(result.hasLicense);
      setLoading(false);
      return { hasLicense: result.hasLicense };
    } else {
      const premium = await isPremium();
      setHasLicense(premium);
      setLoading(false);
      return { hasLicense: premium };
    }
  }, [useBackend]);

  useEffect(() => {
    refreshLicense();
  }, [refreshLicense]);

  useEffect(() => {
    if (!useBackend) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      refreshLicense();
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [useBackend, refreshLicense]);

  return (
    <LicenseContext.Provider value={{ hasLicense, loading, refreshLicense, useBackend }}>
      {children}
    </LicenseContext.Provider>
  );
}

export function useLicense(): LicenseContextValue {
  return useContext(LicenseContext);
}
