import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Delete, HelpCircle, AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { verifyPin } from '../lib/encryption';
import { initializeSecureStorage, setCurrentPin } from '../lib/secureStorage';

interface PinLockProps {
  correctPin: string; // This can be plain PIN (for migration) or hashed PIN
  onUnlock: () => void;
}

export function PinLock({ correctPin, onUnlock }: PinLockProps) {
  const [enteredPin, setEnteredPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (enteredPin.length === 4) {
      const cleanEnteredPin = enteredPin.trim();
      
      // Check if we have a hashed PIN (new format)
      const hashedPin = localStorage.getItem('userPinHash');
      
      if (hashedPin) {
        // Verify against hashed PIN
        verifyPin(cleanEnteredPin, hashedPin).then((isValid) => {
          if (isValid) {
            // Set PIN in session for encryption/decryption
            setCurrentPin(cleanEnteredPin);
            // Initialize secure storage (migrate if needed)
            initializeSecureStorage(cleanEnteredPin).then(() => {
              onUnlock();
            }).catch((error) => {
              // If migration fails, still unlock (fallback to plain storage)
              console.error('Storage initialization failed:', error);
              onUnlock();
            });
          } else {
            setError(true);
            setShake(true);
            setAttempts(attempts + 1);
            setTimeout(() => {
              setEnteredPin('');
              setError(false);
              setShake(false);
            }, 500);
          }
        }).catch((error) => {
          // If verification fails, treat as invalid
          setError(true);
          setShake(true);
          setAttempts(attempts + 1);
          setTimeout(() => {
            setEnteredPin('');
            setError(false);
            setShake(false);
          }, 500);
        });
      } else {
        // Fallback to plain PIN comparison (for migration from old format)
        const cleanCorrectPin = correctPin.trim();
        if (cleanEnteredPin === cleanCorrectPin) {
          // Migrate to hashed PIN
          import('../lib/encryption').then(({ hashPin }) => {
            hashPin(cleanEnteredPin).then((hashed) => {
              localStorage.setItem('userPinHash', hashed);
              localStorage.removeItem('userPin'); // Remove old plain PIN
              setCurrentPin(cleanEnteredPin);
              initializeSecureStorage(cleanEnteredPin).then(() => {
                onUnlock();
              }).catch(() => {
                onUnlock();
              });
            }).catch(() => {
              // If hashing fails, still unlock with plain PIN
              onUnlock();
            });
          });
        } else {
          setError(true);
          setShake(true);
          setAttempts(attempts + 1);
          setTimeout(() => {
            setEnteredPin('');
            setError(false);
            setShake(false);
          }, 500);
        }
      }
    }
  }, [enteredPin, correctPin, onUnlock, attempts]);

  const handleNumberClick = (num: string) => {
    if (enteredPin.length < 4) {
      setEnteredPin(enteredPin + num);
    }
  };

  const handleDelete = () => {
    setEnteredPin(enteredPin.slice(0, -1));
  };

  const handleResetPin = () => {
    setShowHelp(false);
    const confirmMessage = `⚠️ RESET PIN?\n\n✅ Your logged moments will be SAFE\n✅ Your insights and data stay intact\n✅ Only your PIN will be cleared\n\n❌ You'll need to set a new 4-digit PIN\n\nContinue with reset?`;
    
    if (confirm(confirmMessage)) {
      localStorage.removeItem('userPin');
      localStorage.removeItem('userPinHash');
      localStorage.removeItem('appSetupComplete');
      sessionStorage.removeItem('currentPin');
      window.location.reload();
    }
  };

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  return (
    <div className="min-h-screen bg-[#4ECDC4] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-lock" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="3" fill="#1A1A2E"/>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dots-lock)"/>
        </svg>
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#FFD93D] rounded-full border-4 border-[#1A1A2E] opacity-50" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-[#FF6B6B] rounded-2xl border-4 border-[#1A1A2E] opacity-50 rotate-12" />
      <div className="absolute top-1/3 right-12 w-12 h-12 bg-[#6C5CE7] rounded-full border-4 border-[#1A1A2E] opacity-50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <div className="inline-flex p-6 rounded-3xl bg-[#FFD93D] border-4 border-[#1A1A2E] mb-6 shadow-2xl">
            <Lock className="w-12 h-12 text-[#1A1A2E]" strokeWidth={3} />
          </div>
          <h2 className="text-[#1A1A2E] mb-2 text-3xl font-bold">Enter PIN</h2>
          <p className="text-[#1A1A2E] font-medium">Unlock to continue</p>
        </div>

        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-4 mb-12"
          role="group"
          aria-label={`PIN entry: ${enteredPin.length} of 4 digits entered`}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full border-4 transition-all shadow-lg ${ 
                i < enteredPin.length
                  ? error
                    ? 'bg-[#FF6B6B] border-[#1A1A2E] scale-110'
                    : 'bg-[#1A1A2E] border-[#1A1A2E] scale-110'
                  : 'border-[#1A1A2E] bg-white'
              }`}
              aria-label={i < enteredPin.length ? 'Digit entered' : 'Digit not entered'}
            />
          ))}
        </motion.div>

        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-8">
          {numbers.map((num, i) => (
            <Button
              key={i}
              variant="ghost"
              onClick={() => {
                if (num === 'delete') handleDelete();
                else if (num) handleNumberClick(num);
              }}
              disabled={num === ''}
              aria-label={num === 'delete' ? 'Delete last digit' : num ? `Enter ${num}` : undefined}
              className={`h-16 rounded-2xl text-2xl text-[#1A1A2E] font-bold hover:bg-[#FFD93D] bg-white backdrop-blur border-4 border-[#1A1A2E] transition-all hover:scale-105 active:scale-95 shadow-lg ${ 
                num === '' ? 'invisible' : ''
              }`}
            >
              {num === 'delete' ? <Delete className="w-7 h-7" strokeWidth={3} aria-hidden="true" /> : num}
            </Button>
          ))}
        </div>

        <div className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-4 text-center shadow-lg">
          <p className="text-sm text-[#1A1A2E] font-medium">
            Emergency exit: <span className="font-bold">Shift + Esc</span>
          </p>
        </div>

        {/* Failed attempts warning */}
        {attempts >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-[#FF5A5F] border-4 border-[#1A1A2E] rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-white font-bold text-sm mb-1">
                  {attempts} incorrect attempts
                </p>
                <p className="text-white text-xs leading-relaxed">
                  Can't remember your PIN? Tap "Forgot PIN?" below to reset it safely. Your data will not be deleted.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Help buttons */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setShowHelp(true)}
            className="text-sm text-[#1A1A2E] hover:text-[#4B2E83] font-bold flex items-center gap-1"
          >
            <HelpCircle className="w-4 h-4" />
            Need Help?
          </button>
          <span className="text-[#1A1A2E]">•</span>
          <button
            onClick={handleResetPin}
            className="text-sm text-[#FF5A5F] hover:text-[#FF7B7F] font-bold"
          >
            Forgot PIN?
          </button>
        </div>

        {/* Help Modal */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowHelp(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-[#1A1A2E] shadow-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#C7B8FF] rounded-2xl border-3 border-[#1A1A2E]">
                      <HelpCircle className="w-6 h-6 text-[#1A1A2E]" />
                    </div>
                    <h3 className="font-bold text-xl text-[#1A1A2E]">Can't Unlock?</h3>
                  </div>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="p-2 hover:bg-[#F8F9FA] rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-[#495057]" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#F8F9FA] border-3 border-[#1A1A2E] rounded-2xl p-4">
                    <p className="font-bold text-[#1A1A2E] mb-2">🔐 Forgot your PIN?</p>
                    <p className="text-sm text-[#495057] leading-relaxed mb-3">
                      For your privacy and security, there's no way to recover your PIN. However, you can safely reset it without losing your data.
                    </p>
                    <Button
                      onClick={handleResetPin}
                      className="w-full bg-[#FF5A5F] hover:bg-[#FF7B7F] text-white border-3 border-[#1A1A2E] rounded-xl font-bold"
                    >
                      Reset PIN (Data Safe)
                    </Button>
                  </div>

                  <div className="bg-[#C7B8FF] border-3 border-[#1A1A2E] rounded-2xl p-4">
                    <p className="font-bold text-[#1A1A2E] mb-2">💡 What happens when you reset?</p>
                    <ul className="text-sm text-[#1A1A2E] space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0">✅</span>
                        <span>All your logged moments stay safe</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0">✅</span>
                        <span>Your insights and patterns remain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0">✅</span>
                        <span>Settings and preferences are kept</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0">🔄</span>
                        <span>You'll create a new 4-digit PIN</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#FFD93D] border-3 border-[#1A1A2E] rounded-2xl p-4">
                    <p className="font-bold text-[#1A1A2E] mb-2">⚡ Quick Exit</p>
                    <p className="text-sm text-[#1A1A2E] leading-relaxed">
                      Need to hide the app quickly? Press <span className="font-bold">Shift + Esc</span> to activate disguised mode instantly.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setShowHelp(false)}
                  variant="outline"
                  className="w-full mt-6 border-3 border-[#1A1A2E] rounded-xl font-bold"
                >
                  Got It
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}