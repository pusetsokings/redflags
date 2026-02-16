import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Eye, TrendingUp, Heart, ChevronRight, ChevronLeft, ArrowRight, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Logo } from './Logo';
import { CoupleIllustration, ShieldIllustration, ThinkingPersonIllustration, TrendUpIllustration } from './illustrations/BoldIllustrations';
import { COUNTRIES, detectCountryFromBrowser, getCountryByCode } from '../lib/emergencyHotlines';
import { saveSetting } from '../lib/storage';
import { hashPin } from '../lib/encryption';

interface OnboardingFlowProps {
  onComplete: (pin: string) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [primaryFocus, setPrimaryFocus] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const detected = detectCountryFromBrowser();
    return detected && getCountryByCode(detected) ? detected : COUNTRIES[0].code;
  });
  const [pinError, setPinError] = useState('');
  const [detectingCountry, setDetectingCountry] = useState(false);

  const slides = [
    {
      icon: Heart,
      title: 'Welcome to FlagSense',
      description: 'Red flag radar for love, family & friends. When something feels off with someone close to you, FlagSense helps you track it, see patterns, and protect your peace.',
      background: '#C7B8FF',
      illustration: <CoupleIllustration />
    },
    {
      icon: TrendingUp,
      title: 'Not a diary. An early-warning system.',
      description: 'Log key moments with partners, family and friends. FlagSense looks for repeating red flags like control, guilt-tripping, money games and emotional distance. You get clear insights, not just memories.',
      background: '#FF5A5F',
      illustration: <TrendUpIllustration />
    },
    {
      icon: Shield,
      title: 'Your space. Your data. Your pace.',
      description: 'Everything you log stays on your device by default. You can lock FlagSense with a PIN or biometrics. You control what to share, and if you ever want to delete it all.',
      background: '#C7B8FF',
      illustration: <ShieldIllustration />
    },
    {
      icon: Eye,
      title: 'You\'re ready to start sensing flags',
      description: 'When something feels off, don\'t ignore it. Log the moment and let FlagSense help you see the pattern.',
      background: '#4B2E83',
      illustration: <ThinkingPersonIllustration />
    }
  ];

  const focusOptions = [
    { value: 'romantic', label: '❤️ Love / Romantic', icon: '❤️', color: '#FF5A5F' },
    { value: 'family', label: '👨‍👩‍👧 Family', icon: '👨‍👩‍👧', color: '#4B2E83' },
    { value: 'friendship', label: '🤝 Friends', icon: '🤝', color: '#C7B8FF' },
    { value: 'other', label: '➕ Other', icon: '➕', color: '#FAFAFA' }
  ];

  const handleNext = () => {
    if (step < slides.length) {
      setStep(step + 1);
    } else if (step === slides.length) {
      if (!primaryFocus) return;
      setStep(step + 1);
    } else if (step === slides.length + 1) {
      // Country selection - just continue
      setStep(step + 1);
    } else if (step === slides.length + 2) {
      if (pin.length !== 4) {
        setPinError('PIN must be exactly 4 digits');
        return;
      }
      if (!/^\d+$/.test(pin)) {
        setPinError('PIN must contain only numbers');
        return;
      }
      if (pin !== confirmPin) {
        setPinError('PINs do not match');
        return;
      }
      
      // Hash and store PIN securely
      hashPin(pin).then((hashedPin) => {
        localStorage.setItem('userPinHash', hashedPin);
        // Store plain PIN temporarily in session for encryption setup
        sessionStorage.setItem('currentPin', pin);
        localStorage.setItem('primaryFocus', primaryFocus);
        saveSetting('userCountry', selectedCountry);
        onComplete(pin);
      }).catch((error) => {
        setPinError('Failed to set up security. Please try again.');
        console.error('PIN hashing error:', error);
      });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setPinError('');
    }
  };

  const handleSkip = () => {
    setStep(slides.length);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="3" fill="#1A1A2E"/>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait">
          {step < slides.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ backgroundColor: slides[step].background }}
              className="rounded-3xl shadow-2xl p-8 overflow-hidden relative border-4 border-[#1A1A2E]"
            >
              {/* Logo at top */}
              <div className="flex justify-center mb-6 relative z-10">
                <Logo size="md" />
              </div>

              <div className="text-center relative z-10">
                {/* Illustration */}
                <div className="mb-6 -mx-4">
                  {slides[step].illustration}
                </div>

                <h2 className="mb-4 text-[#1A1A2E] font-bold text-2xl">{slides[step].title}</h2>
                <p className="text-[#1A1A2E] mb-8 leading-relaxed px-2 font-medium">{slides[step].description}</p>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-8">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`h-3 rounded-full transition-all border-2 border-[#1A1A2E] ${
                        index === step ? 'w-10 bg-[#1A1A2E]' : 'w-3 bg-white'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="text-[#1A1A2E] hover:text-[#1A1A2E] hover:bg-white/30 font-bold border-2 border-transparent hover:border-[#1A1A2E] rounded-xl"
                  >
                    Skip
                  </Button>

                  <button
                    onClick={handleNext}
                    className="w-16 h-16 rounded-full bg-[#1A1A2E] text-white shadow-xl hover:scale-110 transition-all flex items-center justify-center border-3 border-[#1A1A2E]"
                  >
                    <ArrowRight className="w-7 h-7" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : step === slides.length ? (
            <motion.div
              key="focus"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-[#1A1A2E]"
            >
              <div className="flex justify-center mb-6">
                <Logo size="md" />
              </div>

              <h2 className="text-center mb-2 text-[#1A1A2E] font-bold">Which relationships do you want to scan first?</h2>
              <p className="text-center text-[#495057] mb-6 font-medium">You can add more later. Start where it hurts or confuses you the most.</p>

              <div className="space-y-3 mb-8">
                {focusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPrimaryFocus(option.value)}
                    className={`w-full p-4 rounded-2xl border-4 transition-all text-left flex items-center gap-3 ${
                      primaryFocus === option.value
                        ? 'border-[#1A1A2E] shadow-lg scale-105'
                        : 'border-[#DEE2E6] hover:border-[#1A1A2E] bg-white'
                    }`}
                    style={{
                      backgroundColor: primaryFocus === option.value ? option.color : 'white'
                    }}
                  >
                    <div className="w-12 h-12 bg-white rounded-xl border-3 border-[#1A1A2E] flex items-center justify-center text-2xl">
                      {option.icon}
                    </div>
                    <span className={`font-bold ${primaryFocus === option.value ? 'text-[#1A1A2E]' : 'text-[#495057]'}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleBack} 
                  className="flex-1 border-4 border-[#1A1A2E] rounded-2xl font-bold hover:bg-[#F8F9FA]"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!primaryFocus}
                  className="flex-1 bg-[#6C5CE7] hover:bg-[#5B4BC6] rounded-2xl shadow-lg font-bold border-4 border-[#1A1A2E]"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ) : step === slides.length + 1 ? (
            <motion.div
              key="country"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-[#1A1A2E]"
            >
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-[#C7B8FF] rounded-2xl border-4 border-[#1A1A2E]">
                  <Globe className="w-10 h-10 text-[#1A1A2E]" strokeWidth={3} />
                </div>
              </div>

              <h2 className="text-center mb-2 text-[#1A1A2E] font-bold text-2xl">Select your country</h2>
              <p className="text-center text-[#495057] mb-6 font-medium">Choose your country so emergency hotlines and SOS resources match your location.</p>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="country" className="text-[#1A1A2E] font-bold">Country</Label>
                  <div className="flex gap-2 mt-1.5">
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="flex-1 bg-[#F8F9FA] border-3 border-[#1A1A2E] rounded-xl h-12 font-medium px-3"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setDetectingCountry(true);
                        const detected = detectCountryFromBrowser();
                        if (detected && getCountryByCode(detected)) {
                          setSelectedCountry(detected);
                        }
                        setDetectingCountry(false);
                      }}
                      disabled={detectingCountry}
                      className="border-3 border-[#1A1A2E] rounded-xl font-bold whitespace-nowrap"
                    >
                      {detectingCountry ? '…' : 'Detect'}
                    </Button>
                  </div>
                  <p className="text-xs text-[#495057] mt-1.5">Detect uses your browser timezone only — no location tracking.</p>
                </div>
              </div>

              <div className="bg-[#C7B8FF] border-3 border-[#1A1A2E] rounded-2xl p-4 mb-6">
                <p className="text-sm text-[#1A1A2E] leading-relaxed font-medium">
                  🔒 <strong>Privacy Note:</strong> Your location is never tracked. This information stays on your device to show you relevant emergency resources.
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleBack} 
                  className="flex-1 border-4 border-[#1A1A2E] rounded-2xl font-bold hover:bg-[#F8F9FA]"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-[#6C5CE7] hover:bg-[#5B4BC6] rounded-2xl shadow-lg font-bold border-4 border-[#1A1A2E]"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-[#1A1A2E]"
            >
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-[#C7B8FF] rounded-2xl border-4 border-[#1A1A2E]">
                  <Lock className="w-10 h-10 text-[#1A1A2E]" strokeWidth={3} />
                </div>
              </div>

              <h2 className="text-center mb-2 text-[#1A1A2E] font-bold text-2xl">Add a lock for extra safety</h2>
              <p className="text-center text-[#495057] mb-6 font-medium">Protect your moments from curious eyes. Use a PIN and, if available, Face ID or fingerprint.</p>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="pin" className="text-[#1A1A2E] font-bold">Enter 4-Digit PIN</Label>
                  <Input
                    id="pin"
                    type="password"
                    value={pin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setPin(value);
                      setPinError('');
                    }}
                    placeholder="Enter 4 digits"
                    className="mt-1.5 bg-[#F8F9FA] border-3 border-[#1A1A2E] rounded-xl h-12 font-medium text-center text-2xl tracking-widest"
                    inputMode="numeric"
                    maxLength={4}
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPin" className="text-[#1A1A2E] font-bold">Confirm 4-Digit PIN</Label>
                  <Input
                    id="confirmPin"
                    type="password"
                    value={confirmPin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setConfirmPin(value);
                      setPinError('');
                    }}
                    placeholder="Confirm 4 digits"
                    className="mt-1.5 bg-[#F8F9FA] border-3 border-[#1A1A2E] rounded-xl h-12 font-medium text-center text-2xl tracking-widest"
                    inputMode="numeric"
                    maxLength={4}
                  />
                </div>

                {pinError && (
                  <div className="bg-[#FF6B6B] border-3 border-[#1A1A2E] rounded-xl p-3">
                    <p className="text-sm text-white font-bold">{pinError}</p>
                  </div>
                )}
              </div>

              <div className="bg-[#FFD93D] border-3 border-[#1A1A2E] rounded-2xl p-4 mb-6">
                <p className="text-sm text-[#1A1A2E] leading-relaxed font-medium">
                  💡 <strong>Important:</strong> Keep your PIN safe. There's no recovery option to maintain complete privacy.
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleBack} 
                  className="flex-1 border-4 border-[#1A1A2E] rounded-2xl font-bold hover:bg-[#F8F9FA]"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!pin || !confirmPin}
                  className="flex-1 bg-[#6C5CE7] hover:bg-[#5B4BC6] rounded-2xl shadow-lg font-bold border-4 border-[#1A1A2E]"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}