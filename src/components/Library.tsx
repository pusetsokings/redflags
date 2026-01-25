import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, AlertTriangle, ChevronRight, ArrowLeft, Shield, Heart, Briefcase, Users, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { RED_FLAG_LIBRARY, getAllCategories, searchRedFlags } from '../lib/redFlagLibrary';
import { getCountryByCode, getDefaultCountry } from '../lib/emergencyHotlines';
import { getSetting } from '../lib/storage';
import type { RedFlagDefinition } from '../lib/types';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsOfUseModal } from './TermsOfUseModal';

export function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFlag, setSelectedFlag] = useState<RedFlagDefinition | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const categories = getAllCategories();
  
  // Get user's country hotlines
  const userCountryCode = getSetting('userCountry', 'US');
  const userCountry = getCountryByCode(userCountryCode) || getDefaultCountry();

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const resetExpandedSections = () => {
    setExpandedSections(new Set());
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Emotional') || category.includes('Manipulation')) return Heart;
    if (category.includes('Control')) return Shield;
    if (category.includes('Workplace')) return Briefcase;
    if (category.includes('Family')) return Users;
    if (category.includes('Safety')) return AlertTriangle;
    return BookOpen;
  };

  const getFilteredFlags = (): RedFlagDefinition[] => {
    if (searchQuery) {
      return searchRedFlags(searchQuery);
    }
    if (selectedCategory) {
      return RED_FLAG_LIBRARY.filter(flag => flag.category === selectedCategory);
    }
    return RED_FLAG_LIBRARY;
  };

  const filteredFlags = getFilteredFlags();

  if (selectedFlag) {
    return (
      <div className="max-w-3xl mx-auto pb-20">
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedFlag(null);
            resetExpandedSections();
          }}
          className="mb-4 hover:bg-[#F8F9FA] border-2 border-transparent hover:border-[#1A1A2E] rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-[#1A1A2E]"
        >
          {/* Header */}
          <div className={`p-6 border-b-4 border-[#1A1A2E] ${
            selectedFlag.severity === 'severe' ? 'bg-[#FF6B6B]' :
            selectedFlag.severity === 'moderate' ? 'bg-[#FFE66D]' :
            'bg-[#FFD93D]'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-2 bg-white border-3 border-[#1A1A2E] text-[#1A1A2E] font-bold">
                  {selectedFlag.category}
                </Badge>
                <h2 className="mb-2 text-[#1A1A2E] font-bold text-2xl">{selectedFlag.name}</h2>
                <p className="text-[#1A1A2E]">{selectedFlag.description}</p>
              </div>
              <Badge 
                className="bg-[#1A1A2E] text-white border-0 font-bold"
              >
                {selectedFlag.severity}
              </Badge>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Examples */}
            <div>
              <h4 className="mb-3 text-[#1A1A2E] font-bold text-lg">Common Examples</h4>
              <ul className="space-y-2">
                {selectedFlag.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#1A1A2E]">
                    <span className="text-[#6C5CE7] mt-1 font-bold">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HOW TO COUNTER THIS - Main section (always visible) */}
            <div className="bg-[#FFD93D] border-4 border-[#1A1A2E] rounded-2xl p-5">
              <h3 className="text-[#1A1A2E] mb-4 font-bold text-xl flex items-center gap-2">
                <Shield className="w-6 h-6" strokeWidth={3} />
                How to Counter This
              </h3>

              {/* Recognize It */}
              <div className="mb-5">
                <h4 className="text-[#1A1A2E] mb-2 font-bold">🔍 How to Recognize It</h4>
                <ul className="space-y-1.5">
                  {selectedFlag.howToCounter.recognizeIt.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2 text-[#1A1A2E] text-sm">
                      <span className="mt-0.5 flex-shrink-0">▸</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Strategies */}
              <div className="mb-5">
                <h4 className="text-[#1A1A2E] mb-2 font-bold">💪 Response Strategies</h4>
                <ul className="space-y-2">
                  {selectedFlag.howToCounter.responseStrategies.map((strategy, index) => (
                    <li key={index} className="flex items-start gap-2 text-[#1A1A2E] text-sm">
                      <span className="mt-0.5 flex-shrink-0 font-bold">✓</span>
                      <span dangerouslySetInnerHTML={{ __html: strategy.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Boundaries to Set */}
              <div className="mb-0">
                <h4 className="text-[#1A1A2E] mb-2 font-bold">🚧 Boundaries to Set</h4>
                <ul className="space-y-2">
                  {selectedFlag.howToCounter.boundariesToSet.map((boundary, index) => (
                    <li key={index} className="text-[#1A1A2E] text-sm bg-white border-2 border-[#1A1A2E] rounded-lg p-2">
                      <span className="font-bold">→</span> {boundary}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLLAPSIBLE: Script Examples */}
            {selectedFlag.howToCounter.scriptExamples && selectedFlag.howToCounter.scriptExamples.length > 0 && (
              <div className="bg-white border-3 border-[#1A1A2E] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('scripts')}
                  className="w-full p-4 flex items-center justify-between hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <h4 className="text-[#1A1A2E] font-bold">💬 What to Say (Scripts)</h4>
                    <Badge className="bg-[#6C5CE7] text-white border-0 text-xs">
                      {selectedFlag.howToCounter.scriptExamples.length} examples
                    </Badge>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSections.has('scripts') ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedSections.has('scripts') && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t-2 border-[#1A1A2E]">
                        <ul className="space-y-2 mt-4">
                          {selectedFlag.howToCounter.scriptExamples.map((script, index) => (
                            <li key={index} className="text-[#1A1A2E] text-sm pl-3 py-2 border-l-4 border-[#6C5CE7] bg-[#F8F9FA]">
                              {script}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* COLLAPSIBLE: When to Leave */}
            <div className="bg-[#FF6B6B] border-3 border-[#1A1A2E] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('whenToLeave')}
                className="w-full p-4 flex items-center justify-between hover:bg-[#FF5555] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-bold">🚨 When to Leave</h4>
                  <Badge className="bg-white text-[#1A1A2E] border-0 text-xs font-bold">
                    {selectedFlag.howToCounter.whenToLeave.length} signs
                  </Badge>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.has('whenToLeave') ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-white" strokeWidth={3} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedSections.has('whenToLeave') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t-2 border-[#1A1A2E]">
                      <ul className="space-y-1.5 mt-4">
                        {selectedFlag.howToCounter.whenToLeave.map((indicator, index) => (
                          <li key={index} className="flex items-start gap-2 text-white text-sm">
                            <span className="mt-0.5 flex-shrink-0">⚠</span>
                            <span>{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* COLLAPSIBLE: What To Do */}
            <div className="bg-[#4ECDC4] border-4 border-[#1A1A2E] rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('whatToDo')}
                className="w-full p-4 flex items-center justify-between hover:bg-[#3FBCB2] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <h4 className="text-[#1A1A2E] font-bold">✓ What You Can Do</h4>
                  <Badge className="bg-[#1A1A2E] text-white border-0 text-xs">
                    {selectedFlag.whatToDo.length} actions
                  </Badge>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.has('whatToDo') ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedSections.has('whatToDo') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t-4 border-[#1A1A2E]">
                      <ul className="space-y-2 mt-4">
                        {selectedFlag.whatToDo.map((action, index) => (
                          <li key={index} className="flex items-start gap-3 text-[#1A1A2E] text-sm">
                            <span className="mt-0.5 font-bold">✓</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* COLLAPSIBLE: Resources */}
            {selectedFlag.resources.length > 0 && (
              <div className="bg-[#6C5CE7] border-4 border-[#1A1A2E] rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleSection('resources')}
                  className="w-full p-4 flex items-center justify-between hover:bg-[#5B4BD6] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold">📚 Helpful Resources</h4>
                    <Badge className="bg-white text-[#1A1A2E] border-0 text-xs font-bold">
                      {selectedFlag.resources.length} resources
                    </Badge>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSections.has('resources') ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-white" strokeWidth={3} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedSections.has('resources') && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t-4 border-[#1A1A2E]">
                        <ul className="space-y-2 mt-4">
                          {selectedFlag.resources.map((resource, index) => (
                            <li key={index} className="text-white text-sm">
                              • {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Safety Notice */}
            {selectedFlag.severity === 'severe' && (
              <div className="bg-[#FF6B6B] border-4 border-[#1A1A2E] rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl border-3 border-[#1A1A2E] flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                  </div>
                  <div>
                    <h5 className="text-white mb-1 font-bold">Safety Notice</h5>
                    <p className="text-sm text-white">
                      This is a serious warning sign. If you're experiencing this behavior, please consider reaching out to a professional or trusted friend. Your safety and wellbeing matter.
                    </p>
                    <p className="text-sm text-white mt-2">
                      <strong>24/7 Hotline:</strong> {userCountry.hotlines.domesticViolence}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div>
        <h2 className="mb-2 text-[#1A1A2E] font-bold text-2xl">Red Flag Library</h2>
        <p className="text-[#495057]">
          Learn about warning signs in relationships, workplace, and family dynamics
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#495057]" />
        <Input
          type="text"
          placeholder="Search red flags..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedCategory(null);
          }}
          className="pl-12 bg-white border-3 border-[#1A1A2E] rounded-2xl h-12"
        />
      </div>

      {/* Categories */}
      {!searchQuery && !selectedCategory && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category, index) => {
            const Icon = getCategoryIcon(category);
            const count = RED_FLAG_LIBRARY.filter(f => f.category === category).length;
            const backgrounds = [
              '#4ECDC4',
              '#FF6B6B',
              '#FFD93D',
              '#6C5CE7',
              '#FFE66D',
              '#2A9D8F'
            ];
            
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category)}
                className="rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all text-left border-4 border-[#1A1A2E]"
                style={{ backgroundColor: backgrounds[index % backgrounds.length] }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-xl border-3 border-[#1A1A2E]">
                    <Icon className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                  </div>
                  <Badge className="bg-white border-3 border-[#1A1A2E] text-[#1A1A2E] font-bold">{count}</Badge>
                </div>
                <h4 className="text-sm text-[#1A1A2E] font-bold">{category}</h4>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Back button when category selected */}
      {selectedCategory && !searchQuery && (
        <Button
          variant="ghost"
          onClick={() => setSelectedCategory(null)}
          className="mb-4 hover:bg-[#F8F9FA] border-2 border-transparent hover:border-[#1A1A2E] rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          All Categories
        </Button>
      )}

      {/* Results */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredFlags.map((flag, index) => (
            <motion.div
              key={flag.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedFlag(flag)}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer border-4 border-[#1A1A2E] hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-[#1A1A2E] font-bold">{flag.name}</h4>
                    <Badge 
                      className={`text-xs font-bold border-3 border-[#1A1A2E] ${
                        flag.severity === 'severe' ? 'bg-[#FF6B6B] text-white' : 
                        'bg-[#FFD93D] text-[#1A1A2E]'
                      }`}
                    >
                      {flag.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#495057] mb-2 line-clamp-2">
                    {flag.description}
                  </p>
                  <Badge className="border-3 border-[#1A1A2E] text-[#1A1A2E] bg-[#4ECDC4] font-bold">{flag.category}</Badge>
                </div>
                <ChevronRight className="w-5 h-5 text-[#495057] flex-shrink-0 ml-3" strokeWidth={3} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredFlags.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border-4 border-[#1A1A2E]">
            <div className="inline-flex p-6 rounded-2xl bg-[#FFD93D] border-3 border-[#1A1A2E] mb-4">
              <BookOpen className="w-16 h-16 text-[#1A1A2E]" />
            </div>
            <p className="text-[#495057] font-bold">No red flags found</p>
          </div>
        )}
      </div>

      {/* Emergency Resources */}
      <div className="bg-[#6C5CE7] rounded-3xl p-6 text-white shadow-xl border-4 border-[#1A1A2E]">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-2xl flex-shrink-0 border-3 border-[#1A1A2E]">
            <Shield className="w-6 h-6 text-[#1A1A2E]" strokeWidth={3} />
          </div>
          <div className="w-full">
            <h3 className="text-white mb-2 font-bold text-xl">Need Immediate Help? {userCountry.flag}</h3>
            <p className="text-sm mb-3">
              If you're in danger or need support, these {userCountry.name} resources are available 24/7:
            </p>
            <ul className="space-y-1 text-sm mb-4">
              <li>• <strong>Emergency:</strong> {userCountry.hotlines.emergency}</li>
              {userCountry.hotlines.domesticViolence && (
                <li>• <strong>Domestic Violence:</strong> {userCountry.hotlines.domesticViolence}</li>
              )}
              {userCountry.hotlines.suicidePrevention && (
                <li>• <strong>Suicide Prevention:</strong> {userCountry.hotlines.suicidePrevention}</li>
              )}
              {userCountry.hotlines.sexualAssault && (
                <li>• <strong>Sexual Assault:</strong> {userCountry.hotlines.sexualAssault}</li>
              )}
              {userCountry.hotlines.mentalHealth && (
                <li>• <strong>Mental Health:</strong> {userCountry.hotlines.mentalHealth}</li>
              )}
            </ul>
            <p className="text-xs opacity-80 italic">
              Country-specific hotlines. Change your country in Settings if needed.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy & Terms */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
        <div className="space-y-4">
          <div className="bg-[#C7B8FF] border-3 border-[#1A1A2E] rounded-2xl p-4">
            <h4 className="text-[#1A1A2E] mb-2 font-bold flex items-center gap-2">
              <Shield className="w-5 h-5" strokeWidth={3} />
              Your Privacy is Protected
            </h4>
            <p className="text-sm text-[#1A1A2E] leading-relaxed">
              <strong>FlagSense is 100% private.</strong> All your moments, analyses, and personal data are stored locally on your device only. We do not track your location, collect personal information, or share any data with third parties. Your information never leaves your device unless you explicitly choose to export it.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center text-sm">
            <button
              className="text-[#4B2E83] hover:underline font-bold"
              onClick={() => setShowPrivacyModal(true)}
            >
              Privacy Policy
            </button>
            <span className="text-[#ADB5BD]">|</span>
            <button
              className="text-[#4B2E83] hover:underline font-bold"
              onClick={() => setShowTermsModal(true)}
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />

      {/* Terms of Use Modal */}
      <TermsOfUseModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </div>
  );
}