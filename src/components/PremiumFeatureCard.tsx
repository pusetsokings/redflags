import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface PremiumFeatureCardProps {
  feature: string;
  description: string;
  onUpgrade: () => void;
  onDismiss?: () => void;
}

export function PremiumFeatureCard({ feature, description, onUpgrade, onDismiss }: PremiumFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-gradient-to-br from-[#4B2E83] to-[#6C5CE7] rounded-2xl p-5 border-3 border-[#1A1A2E] shadow-lg relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
      
      <div className="relative">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 bg-white/20 backdrop-blur rounded-xl border-2 border-white/30">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold mb-1">{feature}</h3>
            <p className="text-sm text-white/90">{description}</p>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-white/60 hover:text-white text-xl leading-none"
              aria-label="Dismiss"
            >
              ×
            </button>
          )}
        </div>
        
        <Button
          onClick={onUpgrade}
          className="w-full bg-[#FFD93D] hover:bg-[#FFE66D] text-[#1A1A2E] font-bold border-3 border-[#1A1A2E] rounded-xl h-10"
        >
          <span>Try Premium Free</span>
          <ArrowRight className="w-4 h-4 ml-2" strokeWidth={3} />
        </Button>
        
        <p className="text-xs text-center text-white/70 mt-2">
          14-day free trial • No credit card required
        </p>
      </div>
    </motion.div>
  );
}

// Inline subtle upgrade nudge for chat
export function ChatUpgradeNudge({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#C7B8FF] border-3 border-[#1A1A2E] rounded-2xl p-4 text-center"
    >
      <div className="inline-flex p-2 bg-[#4B2E83] rounded-xl mb-2 border-2 border-[#1A1A2E]">
        <Sparkles className="w-4 h-4 text-white" strokeWidth={3} />
      </div>
      <p className="text-sm text-[#1A1A2E] mb-2">
        <strong>Daily chat limit reached</strong>
      </p>
      <p className="text-xs text-[#1A1A2E] mb-3">
        Premium gives you unlimited AI counselor access with full context from your moments
      </p>
      <Button
        onClick={onUpgrade}
        className="bg-[#4B2E83] hover:bg-[#6C5CE7] text-white font-bold border-3 border-[#1A1A2E] rounded-xl text-sm h-9"
      >
        Try Premium Free for 14 Days
      </Button>
    </motion.div>
  );
}

// Insights upgrade nudge
export function InsightsUpgradeNudge({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#4B2E83] to-[#6C5CE7] rounded-3xl p-6 border-4 border-[#1A1A2E] shadow-lg text-white text-center"
    >
      <div className="inline-flex p-3 bg-white/20 backdrop-blur rounded-2xl border-2 border-white/30 mb-3">
        <Sparkles className="w-8 h-8 text-white" strokeWidth={3} />
      </div>
      <h3 className="font-bold mb-2">Unlock Advanced Insights</h3>
      <p className="text-sm opacity-90 mb-4">
        Compare patterns across relationships, see escalation trends, and get detailed red flag analysis
      </p>
      <Button
        onClick={onUpgrade}
        className="bg-[#FFD93D] hover:bg-[#FFE66D] text-[#1A1A2E] font-bold border-3 border-[#1A1A2E] rounded-xl w-full"
      >
        Try Premium Free for 14 Days
      </Button>
      <p className="text-xs opacity-70 mt-2">
        No credit card • Cancel anytime
      </p>
    </motion.div>
  );
}
