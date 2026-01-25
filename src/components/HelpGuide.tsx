import { motion } from 'motion/react';
import { ArrowLeft, HelpCircle, Lock, Shield, Flag, BarChart3, MessageCircle, BookOpen, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface HelpGuideProps {
  onBack: () => void;
}

export function HelpGuide({ onBack }: HelpGuideProps) {
  const features = [
    {
      icon: Flag,
      title: 'Log Moments',
      description: 'When something feels off in a relationship, log it quickly. You don\'t need to write an essay - just capture what happened, who it was with, and how you felt.',
      tips: [
        'Be specific about behaviors, not vague feelings',
        'Include actual quotes when possible',
        'Rate your mood honestly (1-5 scale)',
        'Tag the relationship type (Love, Family, or Friends)'
      ]
    },
    {
      icon: BarChart3,
      title: 'View Insights',
      description: 'See patterns emerge over time. FlagSense analyzes your moments to identify red flags, track mood trends, and highlight concerning patterns across your relationships.',
      tips: [
        'Single incidents can be mistakes; patterns reveal truth',
        'Compare red flags across different relationships',
        'Watch for escalation over time',
        'Use timeline view to see progression'
      ]
    },
    {
      icon: MessageCircle,
      title: 'Chat with AI',
      description: 'Get context-aware support based on your logged moments. The AI counselor can help you understand red flags, process feelings, and explore your options.',
      tips: [
        'Be specific in your questions',
        'Ask about specific red flags you\'re seeing',
        'Use it to understand patterns, not for crisis help',
        'Remember: AI is informational, not therapeutic'
      ]
    },
    {
      icon: BookOpen,
      title: 'Library Resources',
      description: 'Learn about each type of red flag in depth. Understand the difference between healthy and unhealthy behaviors, and access emergency resources when needed.',
      tips: [
        'Read about red flags you\'re experiencing',
        'Save emergency hotlines in your contacts',
        'Review safety planning resources',
        'Share articles with trusted friends if helpful'
      ]
    }
  ];

  const safetyFeatures = [
    {
      icon: Lock,
      title: 'PIN Lock',
      description: 'Set a 4-digit PIN from Settings to prevent unauthorized access. The app locks automatically when you close it.'
    },
    {
      icon: Shield,
      title: 'Disguised Mode',
      description: 'Change the app icon to look like Calculator, Notes, or Calendar. Perfect for discretion.'
    },
    {
      icon: Zap,
      title: 'Quick Exit',
      description: 'Press Shift+Esc anytime to instantly exit to disguised mode. Triple-tap the disguised app title to return.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-4 hover:bg-[#F8F9FA] border-2 border-transparent hover:border-[#1A1A2E] rounded-xl"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#4B2E83] to-[#6C5CE7] rounded-3xl p-8 text-white shadow-lg border-4 border-[#1A1A2E] text-center">
          <div className="inline-flex p-4 bg-white rounded-2xl border-3 border-[#1A1A2E] mb-4">
            <HelpCircle className="w-12 h-12 text-[#4B2E83]" strokeWidth={3} />
          </div>
          <h1 className="mb-3">How to Use FlagSense</h1>
          <p className="text-sm opacity-90">
            Your private companion for identifying toxic relationship patterns
          </p>
        </div>

        {/* Getting Started */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
          <h2 className="text-[#1A1A2E] mb-4">Getting Started</h2>
          <div className="space-y-4 text-sm text-[#495057]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#4B2E83] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <p className="font-bold text-[#1A1A2E] mb-1">Set Up Privacy</p>
                <p>Go to Settings → Set a PIN lock. This protects your data if someone gets your device.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#4B2E83] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <p className="font-bold text-[#1A1A2E] mb-1">Select Your Country</p>
                <p>Choose your country for localized emergency hotlines (Settings → General).</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#4B2E83] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <p className="font-bold text-[#1A1A2E] mb-1">Log Your First Moment</p>
                <p>When something concerning happens, log it immediately. Details fade quickly.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#4B2E83] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                4
              </div>
              <div>
                <p className="font-bold text-[#1A1A2E] mb-1">Review Insights</p>
                <p>After logging 5-10 moments, patterns will start to emerge. The truth is in the data.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-4">
          <h2 className="text-[#1A1A2E]">Key Features</h2>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-[#C7B8FF] rounded-2xl border-3 border-[#1A1A2E]">
                    <Icon className="w-6 h-6 text-[#4B2E83]" strokeWidth={3} />
                  </div>
                  <h3 className="text-[#1A1A2E] font-bold text-lg">{feature.title}</h3>
                </div>
                <p className="text-sm text-[#495057] mb-3 leading-relaxed">
                  {feature.description}
                </p>
                <div className="bg-[#FAFAFA] border-2 border-[#E9ECEF] rounded-xl p-4">
                  <p className="text-xs font-bold text-[#1A1A2E] mb-2">💡 Tips:</p>
                  <ul className="space-y-1 text-xs text-[#495057]">
                    {feature.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#4B2E83]">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Features */}
        <div className="bg-[#FF5A5F] rounded-3xl p-6 text-white shadow-lg border-4 border-[#1A1A2E]">
          <h2 className="mb-4">🛡️ Safety Features</h2>
          <div className="space-y-4">
            {safetyFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white/20 backdrop-blur border-2 border-white/30 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5" strokeWidth={3} />
                    <h3 className="font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
          <h2 className="text-[#1A1A2E] mb-4">📋 Best Practices</h2>
          <div className="space-y-3 text-sm text-[#495057]">
            <div className="flex items-start gap-3">
              <span className="text-[#4B2E83] font-bold">✓</span>
              <p><strong>Log moments immediately</strong> - Details and emotions are clearest right after an incident</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4B2E83] font-bold">✓</span>
              <p><strong>Be honest with mood ratings</strong> - The AI uses this to understand impact</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4B2E83] font-bold">✓</span>
              <p><strong>Track consistently</strong> - Even positive interactions help show patterns</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4B2E83] font-bold">✓</span>
              <p><strong>Export regularly</strong> - Keep backups of your data in a safe place</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4B2E83] font-bold">✓</span>
              <p><strong>Use discretion</strong> - Don't include full names or identifying details if safety is a concern</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4B2E83] font-bold">✓</span>
              <p><strong>Trust the patterns</strong> - Single incidents can be mistakes; repeated patterns reveal truth</p>
            </div>
          </div>
        </div>

        {/* What FlagSense Is NOT */}
        <div className="bg-[#FFD93D] rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
          <h2 className="text-[#1A1A2E] mb-3">⚠️ Important Limitations</h2>
          <div className="space-y-2 text-sm text-[#1A1A2E]">
            <p><strong>FlagSense is NOT:</strong></p>
            <ul className="space-y-1 ml-6 list-disc">
              <li>A substitute for professional therapy or counseling</li>
              <li>Legal advice or evidence for court proceedings</li>
              <li>A diagnostic tool for mental health conditions</li>
              <li>Emergency services (call 911 if in danger)</li>
              <li>100% accurate - AI has limitations</li>
            </ul>
            <p className="mt-3"><strong>FlagSense IS:</strong></p>
            <ul className="space-y-1 ml-6 list-disc">
              <li>A private tool to track and understand patterns</li>
              <li>Educational resources about red flags</li>
              <li>A way to validate your experiences</li>
              <li>Support for processing difficult emotions</li>
              <li>A starting point for seeking professional help</li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
          <h2 className="text-[#1A1A2E] mb-4">❓ Common Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-[#1A1A2E] mb-1">Is my data really private?</p>
              <p className="text-sm text-[#495057]">Yes. Everything stays on your device. We don't have servers, accounts, or any way to access your data. You can verify this by using the app in airplane mode - it works perfectly.</p>
            </div>
            <div>
              <p className="font-bold text-[#1A1A2E] mb-1">What if someone finds this app on my device?</p>
              <p className="text-sm text-[#495057]">Use the PIN lock and disguised mode features. The app can look like a calculator, notes app, or calendar. The Quick Exit feature (Shift+Esc) instantly switches to disguised mode.</p>
            </div>
            <div>
              <p className="font-bold text-[#1A1A2E] mb-1">Can I use this as evidence in court?</p>
              <p className="text-sm text-[#495057]">FlagSense is not designed for legal proceedings. While you can export your data, consult with a lawyer about what documentation you need. This app is for personal awareness, not legal evidence.</p>
            </div>
            <div>
              <p className="font-bold text-[#1A1A2E] mb-1">How accurate is the AI?</p>
              <p className="text-sm text-[#495057]">The AI uses pattern matching and can be very helpful for identifying concerning behaviors. However, it's not perfect and doesn't understand full context like a human would. Use it as one tool among many.</p>
            </div>
            <div>
              <p className="font-bold text-[#1A1A2E] mb-1">What if I lose my device?</p>
              <p className="text-sm text-[#495057]">Your data is only on that device. This is good for privacy, but means you should export backups regularly (Settings → Export All Data). Store backup files securely.</p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-[#4ECDC4] rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E] text-center">
          <h2 className="text-[#1A1A2E] mb-3">Need Help?</h2>
          <p className="text-sm text-[#1A1A2E] mb-4">
            For technical support or questions about FlagSense
          </p>
          <Button className="bg-[#1A1A2E] text-white hover:bg-[#2A2A3E] border-0 font-bold rounded-xl">
            Contact Support
          </Button>
          <p className="text-xs text-[#1A1A2E] mt-4">
            For crisis support, please use the emergency hotlines in the Library section or call 911.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
