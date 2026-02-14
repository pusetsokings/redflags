import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Shield, MessageCircle, BarChart3, Lock, Zap, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { logger } from '../lib/logger';
import { useLicense } from '../contexts/LicenseContext';
import { startCheckout } from '../lib/license';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

export function UpgradeModal({ isOpen, onClose, feature }: UpgradeModalProps) {
  const { useBackend, refreshLicense } = useLicense();
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const [restoreLoading, setRestoreLoading] = useState(false);

  const premiumFeatures = [
    {
      icon: Sparkles,
      title: 'Advanced Red Flag Detection',
      description: '15+ patterns including love bombing, financial control, and workplace-specific flags'
    },
    {
      icon: MessageCircle,
      title: 'Unlimited AI Counselor',
      description: 'Context-aware support based on your moments with no daily limits'
    },
    {
      icon: BarChart3,
      title: 'Advanced Insights',
      description: 'Multi-relationship comparisons, heatmaps, escalation detection, and pattern analysis'
    },
    {
      icon: Lock,
      title: 'Enhanced Security',
      description: 'Disguised mode, biometric unlock, auto-lock timer, and decoy PIN feature'
    },
    {
      icon: Zap,
      title: 'Professional Export',
      description: 'PDF timeline with visualizations, useful for therapy or legal documentation'
    },
    {
      icon: Shield,
      title: 'Full Assessment Suite',
      description: 'Comprehensive relationship health assessments across all dimensions'
    }
  ];

  const pricingTiers = [
    {
      name: 'Monthly',
      price: '$4.99',
      period: '/month',
      savings: '',
      mostPopular: false,
      id: 'monthly'
    },
    {
      name: 'Annual',
      price: '$29.99',
      period: '/year',
      savings: 'Save 50%',
      mostPopular: true,
      id: 'annual'
    },
    {
      name: 'Financial Hardship',
      price: '$1.99',
      period: '/month',
      savings: 'Honor system',
      mostPopular: false,
      id: 'reduced'
    }
  ];

  const handlePurchase = async (tier: string) => {
    const tierKey = tier as 'monthly' | 'annual' | 'reduced';
    if (!['monthly', 'annual', 'reduced'].includes(tierKey)) {
      logger.logWarn('Invalid tier selected', { context: 'UpgradeModal', tier });
      return;
    }

    if (useBackend) {
      setPurchaseLoading(tier);
      try {
        const { checkoutUrl, error } = await startCheckout(tierKey);
        if (error || !checkoutUrl) {
          alert(error || 'Unable to open checkout. Please try again or contact support.');
          return;
        }
        window.location.href = checkoutUrl;
        logger.logInfo('Checkout redirect', { context: 'UpgradeModal', tier });
      } catch (error) {
        logger.logError(error instanceof Error ? error : new Error('Purchase failed'), {
          context: 'UpgradeModal',
          action: 'handlePurchase'
        });
        alert('An error occurred. Please try again.');
      } finally {
        setPurchaseLoading(null);
      }
      return;
    }

    try {
      const { createCheckout, PRODUCT_VARIANTS } = await import('../lib/payments');
      const variantMap: Record<string, keyof typeof PRODUCT_VARIANTS> = {
        'monthly': 'monthly',
        'annual': 'annual',
        'reduced': 'reduced'
      };
      const variantKey = variantMap[tier];
      const variantId = variantKey ? PRODUCT_VARIANTS[variantKey] : '';
      if (!variantId) {
        logger.logWarn('Product variant not configured', { context: 'UpgradeModal', variantKey });
        alert('Payment integration not yet configured. Please set up Lemon Squeezy product variants in environment variables.');
        return;
      }
      const checkoutUrl = await createCheckout(variantId);
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank', 'width=600,height=700');
        logger.logInfo('Checkout opened', { context: 'UpgradeModal', tier });
      } else {
        alert('Unable to open checkout. Please try again or contact support.');
      }
    } catch (error) {
      logger.logError(error instanceof Error ? error : new Error('Purchase failed'), {
        context: 'UpgradeModal',
        action: 'handlePurchase'
      });
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-br from-[#4B2E83] to-[#6C5CE7] rounded-3xl border-4 border-[#1A1A2E] shadow-2xl h-full overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-br from-[#4B2E83] to-[#6C5CE7] border-b-3 border-white/20 p-6 pb-4">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" strokeWidth={3} />
                </button>
                
                <div className="text-center">
                  <div className="inline-flex p-3 bg-white/20 backdrop-blur rounded-2xl border-2 border-white/30 mb-3">
                    <Sparkles className="w-8 h-8 text-white" strokeWidth={3} />
                  </div>
                  <h2 className="text-white mb-2">Upgrade to Premium</h2>
                  <p className="text-sm text-white/90">
                    Unlock advanced features while supporting free access for others
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Trial Banner */}
                <div className="bg-[#FFD93D] border-3 border-[#1A1A2E] rounded-2xl p-4 text-center">
                  <p className="text-[#1A1A2E] font-bold">
                    🎉 Try Premium FREE for 14 Days
                  </p>
                  <p className="text-xs text-[#1A1A2E] mt-1">
                    No credit card required • Cancel anytime
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {premiumFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.title}
                        className="bg-white/10 backdrop-blur border-2 border-white/20 rounded-2xl p-4 flex items-start gap-3"
                      >
                        <div className="p-2 bg-white/20 rounded-xl border-2 border-white/30 flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" strokeWidth={3} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm mb-1">{feature.title}</h3>
                          <p className="text-xs text-white/80">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing Tiers */}
                <div className="space-y-3">
                  {pricingTiers.map((tier) => {
                    const isLoading = purchaseLoading === tier.id;
                    return (
                    <button
                      key={tier.id}
                      onClick={() => handlePurchase(tier.id)}
                      disabled={!!purchaseLoading}
                      className={`w-full bg-white rounded-2xl border-4 border-[#1A1A2E] p-4 text-left hover:shadow-xl transition-all relative overflow-hidden group disabled:opacity-70 ${
                        tier.mostPopular ? 'ring-4 ring-[#FFD93D]' : ''
                      }`}
                    >
                      {tier.mostPopular && (
                        <div className="absolute top-0 right-0 bg-[#FFD93D] text-[#1A1A2E] text-xs font-bold px-3 py-1 rounded-bl-xl border-l-3 border-b-3 border-[#1A1A2E]">
                          MOST POPULAR
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-2xl font-bold text-[#1A1A2E]">{tier.price}</span>
                            <span className="text-sm text-[#495057]">{tier.period}</span>
                          </div>
                          <p className="text-sm text-[#495057] font-bold">{tier.name}</p>
                          {tier.savings && (
                            <p className="text-xs text-[#FF5A5F] font-bold mt-1">
                              {tier.savings}
                            </p>
                          )}
                        </div>
                        
                        <div className="w-12 h-12 bg-[#4B2E83] group-hover:bg-[#6C5CE7] rounded-full flex items-center justify-center transition-colors border-3 border-[#1A1A2E]">
                          {isLoading ? <Loader2 className="w-6 h-6 text-white animate-spin" strokeWidth={3} /> : <Check className="w-6 h-6 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                    </button>
                  ); })}
                </div>

                {/* Value Props */}
                <div className="bg-white/10 backdrop-blur border-2 border-white/20 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Check className="w-4 h-4 text-[#4ECDC4]" strokeWidth={3} />
                    <span>14-day free trial, cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Check className="w-4 h-4 text-[#4ECDC4]" strokeWidth={3} />
                    <span>Support ongoing development</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Check className="w-4 h-4 text-[#4ECDC4]" strokeWidth={3} />
                    <span>Keep core features free for everyone</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Check className="w-4 h-4 text-[#4ECDC4]" strokeWidth={3} />
                    <span>All data stays private on your device</span>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center text-xs text-white/80 pt-2">
                  <p>Your safety shouldn't have a price tag.</p>
                  <p>Core features are free forever.</p>
                </div>

                {/* Restore Purchases */}
                <button
                  onClick={async () => {
                    if (useBackend) {
                      setRestoreLoading(true);
                      try {
                        const { hasLicense } = await refreshLicense();
                        alert(hasLicense ? 'Your premium subscription is active!' : 'No active subscription found. If you recently purchased, please wait a moment and try again, or contact support.');
                      } catch (error) {
                        alert('Unable to restore purchases. Please contact support.');
                      } finally {
                        setRestoreLoading(false);
                      }
                      return;
                    }
                    try {
                      const { getSubscription } = await import('../lib/payments');
                      const subscription = await getSubscription();
                      if (subscription && subscription.status === 'active') {
                        alert(`Your ${subscription.plan} subscription is active!`);
                      } else {
                        alert('No active subscription found. If you recently purchased, please wait a moment and try again, or contact support.');
                      }
                    } catch (error) {
                      alert('Unable to restore purchases. Please contact support.');
                    }
                  }}
                  disabled={restoreLoading}
                  className="w-full text-center text-sm text-white/60 hover:text-white transition-colors underline disabled:opacity-70"
                >
                  {restoreLoading ? 'Checking...' : 'Restore Previous Purchase'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
