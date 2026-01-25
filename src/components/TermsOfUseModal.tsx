import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, AlertTriangle, Scale, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface TermsOfUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfUseModal({ isOpen, onClose }: TermsOfUseModalProps) {
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
                  <FileText className="w-6 h-6 text-[#4B2E83]" strokeWidth={3} />
                </div>
                <div>
                  <h2 className="text-white font-bold text-2xl">Terms of Use</h2>
                  <p className="text-[#C7B8FF] text-sm">Agreement for using FlagSense</p>
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
              <h3 className="text-[#1A1A2E] font-bold text-xl mb-3">Welcome to FlagSense</h3>
              <p className="text-[#495057] leading-relaxed">
                These Terms of Use ("Terms") govern your access to and use of FlagSense, a relationship wellness tracking application. By using FlagSense, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the app.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">1. Acceptance of Terms</h3>
              <div className="space-y-3 text-[#495057] text-sm">
                <p>
                  By accessing or using FlagSense, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p>
                  We reserve the right to modify these Terms at any time. Continued use of FlagSense after changes constitutes acceptance of the modified Terms.
                </p>
              </div>
            </section>

            {/* Eligibility */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">2. Eligibility</h3>
              <div className="space-y-3 text-[#495057] text-sm">
                <p>
                  You must be at least 13 years old to use FlagSense. If you are under 18, you should use FlagSense with parental guidance.
                </p>
                <p>
                  By using FlagSense, you represent and warrant that you meet these eligibility requirements.
                </p>
              </div>
            </section>

            {/* Purpose & Intended Use */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-[#4ECDC4] rounded-lg border-3 border-[#1A1A2E]">
                  <Heart className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-[#1A1A2E] font-bold text-lg">3. Purpose & Intended Use</h3>
                  <p className="text-[#495057] text-sm">What FlagSense is designed for</p>
                </div>
              </div>
              
              <div className="space-y-3 text-[#495057] text-sm">
                <p><strong>FlagSense is designed to:</strong></p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Help you track moments and patterns in relationships (romantic, family, workplace, friendships)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Provide educational information about red flags and toxic behaviors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Offer AI-powered insights and supportive guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Connect you with emergency resources when needed</span>
                  </li>
                </ul>

                <p className="pt-2"><strong className="text-[#FF5A5F]">FlagSense is NOT:</strong></p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>A replacement for professional therapy, counseling, or medical advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>A legal tool or evidence collection system for court proceedings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>A secure vault for highly sensitive or legally protected information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">✗</span>
                    <span>Emergency services (call 911 or your local emergency number if in immediate danger)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Medical Disclaimer */}
            <section className="bg-[#FFD93D] border-4 border-[#1A1A2E] rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border-3 border-[#1A1A2E] flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                </div>
                <div className="space-y-3 text-[#1A1A2E] text-sm">
                  <h3 className="font-bold text-lg">4. Medical & Professional Disclaimer</h3>
                  <p>
                    <strong>FlagSense is NOT medical advice, therapy, or professional counseling.</strong>
                  </p>
                  <p>
                    The information provided by FlagSense, including AI-generated responses, red flag analyses, and educational content, is for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, treatment, or professional counseling.
                  </p>
                  <p>
                    <strong>Always seek the advice of qualified professionals</strong> with any questions you may have regarding mental health, relationship issues, or personal safety. Never disregard professional medical or psychological advice or delay seeking it because of something you read in FlagSense.
                  </p>
                  <p>
                    <strong>If you are in immediate danger, call emergency services (911 in the US) or your local emergency number immediately.</strong> FlagSense cannot provide emergency assistance.
                  </p>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">5. Your Responsibilities</h3>
              <div className="space-y-3 text-[#495057] text-sm">
                <p><strong>You agree to:</strong></p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Use FlagSense for lawful purposes only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Keep your PIN and device secure if you enable PIN protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Take responsibility for backing up your data (we do not provide cloud backup)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Use discretion when storing sensitive information in the app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Understand that your data is stored locally and subject to browser/device limitations</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* AI-Generated Content */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">6. AI-Generated Content</h3>
              <div className="space-y-3 text-[#495057] text-sm">
                <p>
                  FlagSense uses artificial intelligence to analyze your entries and provide supportive responses in the AI Counselor chat feature.
                </p>
                <p><strong>You acknowledge and agree that:</strong></p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>AI-generated responses are not professional advice and may contain errors or inaccuracies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>AI analyses are based on pattern recognition and should not be treated as definitive diagnoses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>You use AI-generated insights at your own discretion and risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>The AI cannot provide crisis intervention or emergency assistance</span>
                  </li>
                </ul>
                <p className="pt-2">
                  When Enhanced AI Mode is enabled, your messages may be processed by third-party AI services (currently Cohere). See our Privacy Policy for details.
                </p>
              </div>
            </section>

            {/* Data & Privacy */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">7. Data & Privacy</h3>
              <div className="space-y-3 text-[#495057] text-sm">
                <p>
                  Your use of FlagSense is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p><strong>Key points:</strong></p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Your data is stored locally on your device only (unless you enable Enhanced AI Mode)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>We cannot access, recover, or backup your data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>You are responsible for exporting and backing up your data if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7] mt-1">•</span>
                    <span>Clearing browser data or uninstalling the app will permanently delete your data</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-[#FFD93D] rounded-lg border-3 border-[#1A1A2E]">
                  <Scale className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-[#1A1A2E] font-bold text-lg">8. Limitation of Liability</h3>
                </div>
              </div>
              
              <div className="space-y-3 text-[#495057] text-sm">
                <p className="uppercase font-bold text-[#1A1A2E]">
                  FLAGSENSE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                </p>
                <p>
                  To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not limited to:
                </p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">•</span>
                    <span>Warranties of merchantability, fitness for a particular purpose, or non-infringement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">•</span>
                    <span>Warranties that the app will be error-free, uninterrupted, or secure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">•</span>
                    <span>Warranties regarding the accuracy, reliability, or completeness of content</span>
                  </li>
                </ul>

                <p className="pt-3">
                  <strong>IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:</strong>
                </p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">•</span>
                    <span>Loss of data or information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">•</span>
                    <span>Personal injury or emotional distress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">•</span>
                    <span>Reliance on AI-generated content or analyses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5A5F] mt-1">•</span>
                    <span>Actions or decisions made based on app content</span>
                  </li>
                </ul>

                <p className="pt-3">
                  Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so some of the above limitations may not apply to you.
                </p>
              </div>
            </section>

            {/* Safety & Crisis Resources */}
            <section className="bg-[#FF6B6B] border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-white font-bold text-lg mb-3">9. Safety & Crisis Resources</h3>
              <div className="space-y-3 text-white text-sm">
                <p>
                  <strong>IF YOU ARE IN IMMEDIATE DANGER:</strong>
                </p>
                <ul className="space-y-2 ml-5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">🚨</span>
                    <span>Call emergency services: 911 (US), 999 (UK), or your local emergency number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">📞</span>
                    <span>National Domestic Violence Hotline (US): 1-800-799-7233</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">💬</span>
                    <span>Crisis Text Line (US): Text START to 741741</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">🆘</span>
                    <span>National Suicide Prevention Lifeline (US): 988</span>
                  </li>
                </ul>
                <p className="pt-3">
                  FlagSense provides emergency hotline information based on your selected country, but <strong>the app itself cannot provide emergency assistance</strong>. Always call appropriate emergency services directly if you are in danger.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">10. Intellectual Property</h3>
              <div className="space-y-3 text-[#495057] text-sm">
                <p>
                  FlagSense, including its design, code, content, branding, and features, is protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may use FlagSense for personal, non-commercial purposes only. You may not copy, modify, distribute, sell, or reverse engineer any part of the app without our express written permission.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">11. Termination</h3>
              <div className="space-y-3 text-[#495057] text-sm">
                <p>
                  You may stop using FlagSense at any time by deleting the app or clearing your browser data.
                </p>
                <p>
                  We reserve the right to terminate or restrict your access to FlagSense at any time, for any reason, without notice.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">12. Governing Law</h3>
              <div className="space-y-3 text-[#495057] text-sm">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these Terms or your use of FlagSense shall be resolved in the courts of the United States.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">13. Changes to Terms</h3>
              <div className="space-y-3 text-[#495057] text-sm">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by updating the "Last Updated" date at the top of these Terms.
                </p>
                <p>
                  Your continued use of FlagSense after changes to the Terms constitutes your acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using FlagSense.
                </p>
              </div>
            </section>

            {/* Severability */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">14. Severability</h3>
              <p className="text-[#495057] text-sm">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">15. Entire Agreement</h3>
              <p className="text-[#495057] text-sm">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and FlagSense regarding your use of the app and supersede all prior agreements and understandings.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-[#C7B8FF] border-3 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">Questions About These Terms?</h3>
              <p className="text-[#1A1A2E] text-sm">
                If you have questions about these Terms of Use, please contact us at <a href="mailto:legal@flagsense.app" className="underline font-bold">legal@flagsense.app</a>
              </p>
            </section>

            {/* Acknowledgment */}
            <section className="bg-[#4ECDC4] border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] font-bold text-lg mb-3">By Using FlagSense, You Acknowledge:</h3>
              <ul className="space-y-2 text-[#1A1A2E] text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 font-bold">✓</span>
                  <span>You have read and understood these Terms of Use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 font-bold">✓</span>
                  <span>You agree to be bound by these Terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 font-bold">✓</span>
                  <span>You understand FlagSense is not professional advice or therapy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 font-bold">✓</span>
                  <span>You will seek professional help for serious issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 font-bold">✓</span>
                  <span>You take responsibility for your data and decisions</span>
                </li>
              </ul>
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
