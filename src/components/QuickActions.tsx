import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Mic, MicOff, X } from 'lucide-react';
import { Button } from './ui/button';

interface QuickActionsProps {
  onQuickLog: () => void;
  onNewEntry: () => void;
}

export function QuickActions({ onQuickLog, onNewEntry }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition if available
    if (!recognitionRef.current && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        // You can pass this to a callback or store it
        console.log('Voice input:', transcript);
        setIsListening(false);
        setIsOpen(false);
        // Trigger quick log with voice input
        onQuickLog();
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognitionInstance;
    }

    // Keyboard shortcut: Cmd+K or Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      recognitionRef.current?.stop();
    };
  }, [isOpen, onQuickLog]);

  const handleVoiceInput = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-24 right-4 z-50"
        initial={false}
        animate={{ scale: isOpen ? 0.9 : 1 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="mb-3 space-y-2"
            >
              <Button
                onClick={() => {
                  onQuickLog();
                  setIsOpen(false);
                }}
                className="w-14 h-14 rounded-full bg-[#FF5A5F] dark:bg-[#FF7B7F] hover:bg-[#FF4A4F] dark:hover:bg-[#FF6B6F] border-4 border-[#1A1A2E] dark:border-[#9D8AFF] shadow-xl text-white font-bold flex items-center justify-center"
                aria-label="Quick log entry"
              >
                <Plus className="w-6 h-6" />
              </Button>
              <div className="text-xs text-center text-[#1A1A2E] dark:text-[#f8f9fa] font-bold bg-white dark:bg-[#1a1a2e] px-2 py-1 rounded border-2 border-[#1A1A2E] dark:border-[#9D8AFF]">
                Quick Log
              </div>

              <Button
                onClick={() => {
                  onNewEntry();
                  setIsOpen(false);
                }}
                className="w-14 h-14 rounded-full bg-[#4B2E83] dark:bg-[#6B4BA3] hover:bg-[#3A2363] dark:hover:bg-[#5A4A93] border-4 border-[#1A1A2E] dark:border-[#9D8AFF] shadow-xl text-white font-bold flex items-center justify-center"
                aria-label="New entry"
              >
                <Plus className="w-6 h-6" />
              </Button>
              <div className="text-xs text-center text-[#1A1A2E] dark:text-[#f8f9fa] font-bold bg-white dark:bg-[#1a1a2e] px-2 py-1 rounded border-2 border-[#1A1A2E] dark:border-[#9D8AFF]">
                New Entry
              </div>

              {recognitionRef.current && (
                <>
                  <Button
                    onClick={handleVoiceInput}
                    className={`w-14 h-14 rounded-full border-4 border-[#1A1A2E] dark:border-[#9D8AFF] shadow-xl font-bold flex items-center justify-center ${
                      isListening
                        ? 'bg-[#FF5A5F] dark:bg-[#FF7B7F] text-white animate-pulse'
                        : 'bg-[#4ECDC4] dark:bg-[#6B4BA3] hover:bg-[#2A9D8F] dark:hover:bg-[#5A4A93] text-[#1A1A2E] dark:text-[#f8f9fa]'
                    }`}
                    aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                  >
                    {isListening ? (
                      <MicOff className="w-6 h-6" />
                    ) : (
                      <Mic className="w-6 h-6" />
                    )}
                  </Button>
                  <div className="text-xs text-center text-[#1A1A2E] dark:text-[#f8f9fa] font-bold bg-white dark:bg-[#1a1a2e] px-2 py-1 rounded border-2 border-[#1A1A2E] dark:border-[#9D8AFF]">
                    {isListening ? 'Listening...' : 'Voice Input'}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl border-4 border-[#1A1A2E] dark:border-[#9D8AFF] font-bold flex items-center justify-center transition-all ${
            isOpen
              ? 'bg-[#FF5A5F] dark:bg-[#FF7B7F] text-white rotate-45'
              : 'bg-[#4B2E83] dark:bg-[#6B4BA3] hover:bg-[#3A2363] dark:hover:bg-[#5A4A93] text-white'
          }`}
          aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Plus className="w-7 h-7" />
          )}
        </Button>
      </motion.div>

      {/* Keyboard shortcut hint */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-24 right-4 z-40 pointer-events-none"
        >
          <div className="bg-[#1A1A2E] dark:bg-[#2A2A4E] text-white text-xs px-3 py-1.5 rounded-lg border-2 border-[#4B2E83] dark:border-[#9D8AFF] font-bold">
            Press <kbd className="px-1.5 py-0.5 bg-[#4B2E83] dark:bg-[#6B4BA3] rounded">⌘K</kbd> for quick actions
          </div>
        </motion.div>
      )}
    </>
  );
}

// TypeScript declaration for Speech Recognition API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
  }
}

