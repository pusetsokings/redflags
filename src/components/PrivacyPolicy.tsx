import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Database, Eye } from 'lucide-react';
import { Button } from './ui/button';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
        className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#1A1A2E] space-y-6"
      >
        <div className="text-center">
          <div className="inline-flex p-4 bg-[#4B2E83] rounded-2xl border-3 border-[#1A1A2E] mb-4">
            <Shield className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-[#1A1A2E] mb-2">Privacy Policy</h1>
          <p className="text-sm text-[#495057]">Last updated: November 15, 2025</p>
        </div>

        <div className="space-y-6 text-[#1A1A2E]">
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-[#4B2E83]" />
              <h2 className="text-xl font-bold">Your Privacy is Our Priority</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#495057]">
              FlagSense is built with privacy at its core. We believe your personal relationship data is yours alone, 
              and should never be shared, sold, or accessible to anyone else.
            </p>
          </section>

          <section className="bg-[#C7B8FF] border-3 border-[#1A1A2E] rounded-2xl p-5">
            <h3 className="font-bold text-[#4B2E83] mb-3">🔒 Privacy-First Design</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#4B2E83] font-bold">✓</span>
                <span><strong>All data stored locally</strong> on your device only</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4B2E83] font-bold">✓</span>
                <span><strong>No cloud sync</strong> or external servers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4B2E83] font-bold">✓</span>
                <span><strong>No account creation</strong> required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4B2E83] font-bold">✓</span>
                <span><strong>No analytics or tracking</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4B2E83] font-bold">✓</span>
                <span><strong>No data collection</strong> of any kind</span>
              </li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-[#4B2E83]" />
              <h3 className="font-bold">What Information We Collect</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#495057] mb-3">
              <strong>None.</strong> FlagSense collects zero personal information. We don't know who you are, 
              what you write, or how you use the app.
            </p>
            <p className="text-sm leading-relaxed text-[#495057]">
              All data you enter (journal entries, assessments, chat history, settings) is stored exclusively 
              on your device using browser local storage. This data never leaves your device unless you explicitly 
              export it.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-[#4B2E83]" />
              <h3 className="font-bold">Who Can See Your Data</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#495057] mb-3">
              <strong>Only you.</strong> Nobody else has access to your FlagSense data. Not us, not anyone.
            </p>
            <div className="bg-[#FAFAFA] border-2 border-[#E9ECEF] rounded-xl p-4 text-sm text-[#495057]">
              <p className="mb-2"><strong>Important Security Notes:</strong></p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Set a PIN lock to prevent unauthorized device access</li>
                <li>Use the disguised mode feature for additional discretion</li>
                <li>If you share a device, use Quick Exit (Shift+Esc) when needed</li>
                <li>Exported data files contain your private information - store them securely</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="font-bold mb-3">AI Analysis</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              The AI analysis and chatbot features run entirely on your device using pattern matching algorithms. 
              No data is sent to external AI services. All AI responses are generated locally based on predefined 
              patterns and your journal context.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-3">Emergency Hotlines</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              FlagSense displays emergency hotline numbers based on your selected country. When you tap a phone 
              number link, your device's standard phone/calling app opens. We don't track or record whether you've 
              called these numbers.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-3">Data Deletion</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              You can delete all your data at any time through Settings → Delete All Data. This action permanently 
              removes all entries, assessments, chat history, and settings from your device. This cannot be undone.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-3">Changes to This Policy</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last updated" 
              date at the top of this page. Since we don't collect user data, we have no way to notify you of changes 
              - please review this policy periodically.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-3">Contact</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              If you have questions about this Privacy Policy, you can contact us at{' '}
              <a href="mailto:privacy@flagsense.app" className="text-[#4B2E83] underline">
                privacy@flagsense.app
              </a>
            </p>
          </section>

          <section className="bg-[#FF5A5F] border-3 border-[#1A1A2E] rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-2">⚠️ Content Warning</h3>
            <p className="text-sm leading-relaxed">
              FlagSense is designed to help identify potentially harmful relationship patterns. It is NOT designed 
              to collect, store, or protect sensitive personal information (PII) such as names, addresses, financial 
              information, or detailed medical records. Please do not include such information in your journal entries.
            </p>
          </section>

          <section className="bg-[#FAFAFA] border-3 border-[#1A1A2E] rounded-2xl p-5 text-center">
            <p className="text-sm text-[#495057] mb-3">
              <strong>Your data. Your device. Your privacy.</strong>
            </p>
            <p className="text-xs text-[#495057]">
              FlagSense was created with survivors in mind. We know that privacy and safety are paramount, 
              which is why we've built this app to be completely private and offline-first.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
