import { motion } from 'motion/react';
import { ArrowLeft, FileText, AlertTriangle, Scale, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface TermsOfUseProps {
  onBack: () => void;
}

export function TermsOfUse({ onBack }: TermsOfUseProps) {
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
            <FileText className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-[#1A1A2E] mb-2">Terms of Use</h1>
          <p className="text-sm text-[#495057]">Last updated: November 15, 2025</p>
        </div>

        <div className="space-y-6 text-[#1A1A2E]">
          <section>
            <h2 className="text-xl font-bold mb-3">Agreement to Terms</h2>
            <p className="text-sm leading-relaxed text-[#495057]">
              By accessing and using FlagSense, you agree to be bound by these Terms of Use. If you do not agree 
              with any part of these terms, please do not use the app.
            </p>
          </section>

          <section className="bg-[#FF5A5F] border-3 border-[#1A1A2E] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-6 h-6" strokeWidth={3} />
              <h3 className="font-bold">Important Disclaimers</h3>
            </div>
            <div className="space-y-3 text-sm">
              <p>
                <strong>NOT PROFESSIONAL ADVICE:</strong> FlagSense provides educational information and 
                pattern recognition tools. It is NOT a substitute for professional mental health counseling, 
                therapy, legal advice, or medical treatment.
              </p>
              <p>
                <strong>NOT EMERGENCY SERVICES:</strong> If you are in immediate danger, call 911 or your 
                local emergency services. Do not rely on this app for emergency assistance.
              </p>
              <p>
                <strong>AI LIMITATIONS:</strong> The AI counselor uses pattern matching and predefined 
                responses. It cannot provide personalized professional advice and may not understand context 
                as a human therapist would.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-[#4B2E83]" />
              <h3 className="font-bold">Intended Use</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#495057] mb-3">
              FlagSense is designed to help users:
            </p>
            <ul className="space-y-2 text-sm text-[#495057] ml-6 list-disc">
              <li>Track and document relationship experiences</li>
              <li>Identify potentially concerning behavioral patterns</li>
              <li>Learn about red flags and healthy relationship dynamics</li>
              <li>Access educational resources and emergency hotlines</li>
              <li>Process emotions in a private, judgment-free space</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold mb-3">Age Restrictions</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              FlagSense is intended for users aged 18 and older. The app deals with mature themes including 
              emotional abuse, domestic violence, and toxic relationships. Users under 18 should seek guidance 
              from a trusted adult, school counselor, or call the resources provided in the Library section.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-3">User Responsibilities</h3>
            <div className="space-y-3 text-sm text-[#495057]">
              <p><strong>You agree to:</strong></p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Use the app in good faith for its intended purpose</li>
                <li>Keep your PIN secure if you enable app locking</li>
                <li>Not share exported data files containing sensitive information</li>
                <li>Seek professional help for serious concerns</li>
                <li>Use discretion when documenting sensitive information</li>
              </ul>
              <p className="mt-3"><strong>You agree NOT to:</strong></p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Use the app to harass, stalk, or harm others</li>
                <li>Attempt to reverse engineer or modify the app</li>
                <li>Use the app for any illegal purpose</li>
                <li>Store highly sensitive PII (full names, addresses, SSN, financial data)</li>
              </ul>
            </div>
          </section>

          <section className="bg-[#C7B8FF] border-3 border-[#1A1A2E] rounded-2xl p-5">
            <h3 className="font-bold mb-3">🏥 When to Seek Professional Help</h3>
            <p className="text-sm mb-3">
              FlagSense is a tool, not a therapist. Please seek professional help if you are experiencing:
            </p>
            <ul className="space-y-1 text-sm ml-6 list-disc">
              <li>Physical violence or threats of violence</li>
              <li>Sexual assault or coercion</li>
              <li>Financial abuse or exploitation</li>
              <li>Suicidal thoughts or self-harm urges</li>
              <li>Severe anxiety, depression, or PTSD symptoms</li>
              <li>Stalking or harassment</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold mb-3">Limitation of Liability</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              FlagSense is provided "as is" without warranties of any kind. We are not liable for any decisions 
              you make based on app insights, AI responses, or educational content. You acknowledge that:
            </p>
            <ul className="space-y-2 text-sm text-[#495057] ml-6 list-disc mt-2">
              <li>The app may not detect all red flags or concerning patterns</li>
              <li>AI analysis is not infallible and should not replace human judgment</li>
              <li>You are responsible for your own safety and wellbeing</li>
              <li>We are not responsible for actions taken by other parties</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold mb-3">Data Security</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              While we've designed FlagSense with privacy in mind, please understand that:
            </p>
            <ul className="space-y-1 text-sm text-[#495057] ml-6 list-disc mt-2">
              <li>Local storage can be accessed by anyone with physical access to your device</li>
              <li>You should use device-level security (password, biometrics) in addition to app PIN</li>
              <li>Exported data files are not encrypted and should be stored securely</li>
              <li>The disguised mode feature is for discretion, not security</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold mb-3">Educational Content Accuracy</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              While we strive for accuracy, the educational content, red flag definitions, and AI responses 
              are for informational purposes only. Relationship dynamics are complex and context-dependent. 
              What constitutes a "red flag" can vary based on cultural context, individual circumstances, 
              and relationship type.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-3">Emergency Resources</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              The emergency hotline numbers provided are third-party services. We are not affiliated with 
              these organizations and cannot guarantee their availability or service quality. These numbers 
              are provided as a convenience and public service.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-3">Changes to Terms</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              We may modify these Terms of Use at any time. Continued use of the app after changes constitutes 
              acceptance of the modified terms. Check this page periodically for updates.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-3">Governing Law</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              These Terms are governed by the laws of the United States. Any disputes will be resolved in 
              accordance with applicable law.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-3">Contact</h3>
            <p className="text-sm leading-relaxed text-[#495057]">
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:legal@flagsense.app" className="text-[#4B2E83] underline">
                legal@flagsense.app
              </a>
            </p>
          </section>

          <section className="bg-[#FAFAFA] border-3 border-[#1A1A2E] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-6 h-6 text-[#FF5A5F]" />
              <h3 className="font-bold">Our Commitment</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#495057]">
              FlagSense was created to empower people in difficult relationship situations. While we provide 
              tools and information, your safety and wellbeing are ultimately in your hands. Trust your 
              instincts, reach out for professional support, and remember: you deserve healthy, respectful 
              relationships.
            </p>
          </section>

          <div className="border-t-3 border-[#E9ECEF] pt-6">
            <p className="text-xs text-center text-[#495057]">
              By using FlagSense, you acknowledge that you have read, understood, and agree to these Terms of Use.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
