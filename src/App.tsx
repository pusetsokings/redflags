import { useState, useEffect, lazy, Suspense } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { PinLock } from './components/PinLock';
import { DisguisedMode } from './components/DisguisedMode';
import { Toaster } from './components/ui/sonner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LicenseProvider } from './contexts/LicenseContext';
import { Loader2 } from 'lucide-react';
import { createSkipLink } from './lib/accessibility';
import { monitor } from './lib/monitoring';
import { initializeNotifications } from './lib/notifications';

// Lazy load main app components for code splitting
const MainApp = lazy(() => import('./components/MainApp').then(module => ({ default: module.MainApp })));

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground font-medium">Loading FlagSense...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [isFirstTime, setIsFirstTime] = useState(() => {
    return !localStorage.getItem('appSetupComplete');
  });
  const [isLocked, setIsLocked] = useState(() => {
    return localStorage.getItem('appSetupComplete') === 'true';
  });
  const [isDisguised, setIsDisguised] = useState(false);
  const [pin, setPin] = useState(() => {
    // Check for hashed PIN first (new format)
    const hashedPin = localStorage.getItem('userPinHash');
    if (hashedPin) {
      return hashedPin; // Return hash for verification
    }
    // Fallback to plain PIN (old format, for migration)
    return localStorage.getItem('userPin') || '';
  });

  useEffect(() => {
    // Create skip link for accessibility
    createSkipLink();
    
    // Initialize notifications
    initializeNotifications();
    
    // Handle app backgrounding/foregrounding for auto-lock
    const handleVisibilityChange = () => {
      if (document.hidden && localStorage.getItem('appSetupComplete')) {
        setIsLocked(true);
      }
    };

    // Check for panic gesture (triple tap on title)
    let tapCount = 0;
    let tapTimer: NodeJS.Timeout;
    
    const handlePanicGesture = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && e.shiftKey) {
        setIsDisguised(true);
      }
    };

    // Global error handler
    const handleError = (event: ErrorEvent) => {
      monitor.reportError(
        new Error(event.message),
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        }
      );
    };

    // Unhandled promise rejection handler
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      monitor.reportError(
        new Error(event.reason?.message || 'Unhandled promise rejection'),
        { reason: event.reason }
      );
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handlePanicGesture);
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handlePanicGesture);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const handleOnboardingComplete = async (userPin: string) => {
    // PIN is already hashed in OnboardingFlow
    const hashedPin = localStorage.getItem('userPinHash');
    if (hashedPin) {
      setPin(hashedPin);
    } else {
      // Fallback (shouldn't happen, but just in case)
      setPin(userPin);
    }
    localStorage.setItem('appSetupComplete', 'true');
    localStorage.setItem('setupDate', new Date().toISOString());
    
    // Initialize secure storage
    const { initializeSecureStorage, setCurrentPin } = await import('./lib/secureStorage');
    setCurrentPin(userPin);
    try {
      await initializeSecureStorage(userPin);
    } catch (error) {
      console.error('Storage initialization failed:', error);
    }
    
    setIsFirstTime(false);
    setIsLocked(false);
  };

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleLock = () => {
    setIsLocked(true);
  };

  const handleExitDisguised = () => {
    setIsDisguised(false);
  };

  return (
    <ErrorBoundary>
      <LicenseProvider>
        {isDisguised ? (
          <DisguisedMode onExit={handleExitDisguised} />
        ) : isFirstTime ? (
          <>
            <OnboardingFlow onComplete={handleOnboardingComplete} />
            <Toaster />
          </>
        ) : isLocked ? (
          <>
            <PinLock correctPin={pin} onUnlock={handleUnlock} />
            <Toaster />
          </>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <MainApp onLock={handleLock} onPanic={() => setIsDisguised(true)} />
            <Toaster />
          </Suspense>
        )}
      </LicenseProvider>
    </ErrorBoundary>
  );
}
