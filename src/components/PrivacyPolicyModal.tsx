import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Eye, Database, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border-4 border-[#1A1A2E] overflow-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#4B2E83] border-b-4 border-[#1A1A2E] p-6 z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-xl border-3 border-[#1A1A2E]">
                  <Shield className="w-6 h-6 text-[#4B2E83]" strokeWidth={3} />
                </div>
                <div>
                  <h2 className="text-white font-bold text-2xl">Privacy Policy</h2>
                  <p className="text-[#C7B8FF] text-sm">Your privacy is our priority</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-xl"
              >
                <X className="w-5 h-5" strokeWidth={3} />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-6 space-y-6">
            {/* Last Updated */}
            <div className="bg-[#C7B8FF] border-3 border-[#1A1A2E] rounded-xl p-4">
              <p className="text-[#1A1A2E] text-sm">
                <strong>Last Updated:</strong> December 2, 2025
              </p>
            </div>

            {/* Introduction */}
            <section>
              <h3 className="text-[#1A1A2E] font-bold text-xl mb-3">Our Commitment to Your Privacy</h3>
              <p className="text-[#495057] leading-relaxed mb-3">
                FlagSense is designed with your privacy and safety as the absolute top priority. We understand that the information you track in this app is deeply personal and sensitive. That's why we've built FlagSense to be <strong>100% private by default</strong>.
              </p>
              <p className="text-[#495057] leading-relaxed">
                <strong className="text-[#4B2E83]">FlagSense is NOT designed to collect, store, or secure Personally Identifiable Information (PII) or sensitive personal data beyond your local device.</strong> This app is a personal wellness tool, not a secure database for sensitive information.
              </p>
            </section>

            {/* Local Storage */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-[#FFD93D] rounded-lg border-3 border-[#1A1A2E]">
                  <Database className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-[#1A1A2E] font-bold text-lg">Local-Only Data Storage</h3>
                  <p className="text-[#495057] text-sm">Your data never leaves your device</p>
                </div>
              </div>
              
              <div className="space-y-3 text-[#495057] text-sm">
                <p><strong>What we store locally on your device:</strong></p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Your moment entries (journal content, dates, moods, contexts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>AI analysis results of your entries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Chat conversation history with AI counselor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Your app settings and preferences (PIN, country, theme)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Insight visualizations and statistics</span>
                  </li>
                </ul>

                <p className="pt-3"><strong className="text-[#FF5A5F]">What we DO NOT store anywhere:</strong></p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>We do not upload your data to any cloud server</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>We do not store your data on our servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>We do not have access to your entries or analyses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>We cannot recover your data if you lose your device or clear browser data</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* No Personal Information Collected */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-[#4ECDC4] rounded-lg border-3 border-[#1A1A2E]">
                  <Eye className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-[#1A1A2E] font-bold text-lg">No Personal Information Collected</h3>
                  <p className="text-[#495057] text-sm">We don't know who you are</p>
                </div>
              </div>
              
              <div className="space-y-3 text-[#495057] text-sm">
                <p><strong>We do NOT collect:</strong></p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>Your name, email, phone number, or any identifying information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>Your location or IP address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>Device identifiers or tracking cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>Behavioral analytics or usage patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>Any metadata that could identify you</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Enhanced AI Mode */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-[#FFE66D] rounded-lg border-3 border-[#1A1A2E]">
                  <Lock className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-[#1A1A2E] font-bold text-lg">Enhanced AI Mode (Optional)</h3>
                  <p className="text-[#495057] text-sm">Third-party AI processing</p>
                </div>
              </div>
              
              <div className="space-y-3 text-[#495057] text-sm">
                <p>
                  FlagSense includes an <strong>optional</strong> Enhanced AI Mode that uses Cohere's AI API to provide more sophisticated responses in the AI Counselor chat.
                </p>

                <p><strong>When you enable Enhanced AI Mode:</strong></p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Your chat messages are sent to Cohere's API for processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Cohere processes your message and returns a response</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>We use Cohere's API in a way that does NOT train their models on your data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Responses are returned to your device and stored locally only</span>
                  </li>
                </ul>

                <div className="bg-[#FFD93D] border-3 border-[#1A1A2E] rounded-xl p-3 mt-3">
                  <p className="text-[#1A1A2E]">
                    <strong>⚠️ Important:</strong> By default, Enhanced AI Mode is <strong>OFF</strong>. The app works fully offline using rule-based AI responses. You must explicitly enable Enhanced AI Mode if you want to use it.
                  </p>
                </div>

                <p className="pt-2">
                  <strong>Cohere's privacy:</strong> Cohere is subject to their own privacy policy. We recommend reviewing it at <a href="https://cohere.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#4B2E83] underline">cohere.com/privacy</a>
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h3 className="text-[#1A1A2E] font-bold text-xl mb-3">Data Security</h3>
              <div className="space-y-3 text-[#495057]">
                <p>
                  <strong>PIN Lock Protection:</strong> You can enable a 4-digit PIN to protect access to the app. This PIN is stored locally on your device and is never transmitted anywhere.
                </p>
                <p>
                  <strong>Disguised Mode:</strong> FlagSense includes a disguised mode that changes the app icon and name for discretion. This is a safety feature for users in potentially dangerous situations.
                </p>
                <p>
                  <strong>Device Security:</strong> Your data security depends on your device's security. We recommend using device-level encryption, strong passwords, and keeping your device secure.
                </p>
              </div>
            </section>

            {/* Data Export & Deletion */}
            <section>
              <h3 className="text-[#1A1A2E] font-bold text-xl mb-3">Your Data Control</h3>
              <div className="space-y-3 text-[#495057]">
                <p>
                  <strong>Export Your Data:</strong> You can export all your data at any time from the Settings panel. This creates a JSON file you can save securely.
                </p>
                <p>
                  <strong>Delete Your Data:</strong> You can clear all app data at any time from Settings. This action is permanent and cannot be undone. We have no backup of your data.
                </p>
                <p>
                  <strong>Uninstalling:</strong> Uninstalling the app or clearing your browser data will permanently delete all local data. We cannot recover it.
                </p>
              </div>
            </section>

            {/* Important Disclaimers */}
            <section className="bg-[#FF6B6B] border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-white font-bold text-lg mb-3">⚠️ Important Disclaimers</h3>
              <div className="space-y-3 text-white text-sm">
                <p>
                  <strong>Not for PII or Highly Sensitive Data:</strong> FlagSense is designed for personal relationship wellness tracking, not for storing Personally Identifiable Information (PII), financial data, medical records, or other highly sensitive information that requires enterprise-level security.
                </p>
                <p>
                  <strong>Browser/Device Limitations:</strong> Your data is stored using your browser's local storage. This means:
                </p>
                <ul className="ml-5 space-y-1">
                  <li>• Clearing browser data will delete your app data</li>
                  <li>• Incognito/private browsing mode may not persist data</li>
                  <li>• Different browsers on the same device = different data</li>
                </ul>
                <p>
                  <strong>No Cloud Backup:</strong> Because we don't have servers or cloud storage, we cannot provide backup or recovery services. Please export your data regularly if it's important to you.
                </p>
                <p>
                  <strong>Safety Planning:</strong> If you are in an abusive relationship, please work with domestic violence professionals for comprehensive safety planning. This app is a tool, not a replacement for professional support.
                </p>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <h3 className="text-[#1A1A2E] font-bold text-xl mb-3">Third-Party Services</h3>
              <p className="text-[#495057] mb-3">
                FlagSense uses the following third-party services:
              </p>
              <ul className="space-y-2 text-[#495057]">
                <li className="flex items-start gap-2">
                  <span className="text-[#6C5CE7] mt-1">•</span>
                  <span><strong>Cohere AI</strong> (optional, when Enhanced AI Mode is enabled) - for AI-powered chat responses</span>
                </li>
              </ul>
              <p className="text-[#495057] mt-3">
                We do not use analytics services, advertising networks, or tracking pixels.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h3 className="text-[#1A1A2E] font-bold text-xl mb-3">Children's Privacy</h3>
              <p className="text-[#495057]">
                FlagSense is not intended for use by anyone under the age of 13. We do not knowingly collect information from children under 13. If you are under 13, please do not use this app.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h3 className="text-[#1A1A2E] font-bold text-xl mb-3">Changes to This Privacy Policy</h3>
              <p className="text-[#495057]">
                We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this policy. Continued use of the app after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-[#C7B8FF] border-3 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">Questions?</h3>
              <p className="text-[#1A1A2E] text-sm">
                If you have questions about this Privacy Policy or how FlagSense handles your data, please contact us at <a href="mailto:privacy@flagsense.app" className="underline font-bold">privacy@flagsense.app</a>
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t-4 border-[#1A1A2E] p-4">
            <Button
              onClick={onClose}
              className="w-full bg-[#4B2E83] hover:bg-[#3A2365] text-white border-3 border-[#1A1A2E] rounded-xl h-12 font-bold"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
