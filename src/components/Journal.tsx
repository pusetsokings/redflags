import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Calendar, AlertCircle, ChevronRight, Trash2, Search, Sparkles, Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { getJournalEntries, saveJournalEntry, deleteJournalEntry } from '../lib/storage';
import { analyzeJournalEntry } from '../lib/aiAnalysis';
import { toast } from 'sonner';
import type { JournalEntry } from '../lib/types';

interface JournalTemplate {
  id: string;
  name: string;
  icon: string;
  context: string;
  prompt: string;
  suggestedEmotions: string[];
  suggestedMood: number;
}

const JOURNAL_TEMPLATES: JournalTemplate[] = [
  {
    id: 'argument',
    name: 'Argument/Conflict',
    icon: '💬',
    context: 'romantic',
    prompt: 'What was the argument about? What did they say or do? How did it make you feel?',
    suggestedEmotions: ['hurt', 'frustrated', 'angry'],
    suggestedMood: 2
  },
  {
    id: 'boundary',
    name: 'Boundary Issue',
    icon: '🚧',
    context: 'general',
    prompt: 'What boundary was crossed? How did they respond when you set it? How do you feel about it?',
    suggestedEmotions: ['hurt', 'frustrated', 'confused'],
    suggestedMood: 2
  },
  {
    id: 'control',
    name: 'Controlling Behavior',
    icon: '🎮',
    context: 'romantic',
    prompt: 'What controlling behavior did you notice? What did they say or do? How did it make you feel?',
    suggestedEmotions: ['anxious', 'frustrated', 'hurt'],
    suggestedMood: 2
  },
  {
    id: 'family-tension',
    name: 'Family Tension',
    icon: '👨‍👩‍👧',
    context: 'family',
    prompt: 'What happened with your family member? What was said or done? How are you feeling?',
    suggestedEmotions: ['hurt', 'sad', 'frustrated'],
    suggestedMood: 2
  },
  {
    id: 'friend-issue',
    name: 'Friend Issue',
    icon: '🤝',
    context: 'friendship',
    prompt: 'What happened with your friend? What did they do or say? How did it affect you?',
    suggestedEmotions: ['hurt', 'confused', 'sad'],
    suggestedMood: 2
  },
  {
    id: 'workplace',
    name: 'Workplace Issue',
    icon: '💼',
    context: 'workplace',
    prompt: 'What happened at work? Who was involved? How did it make you feel?',
    suggestedEmotions: ['frustrated', 'anxious', 'hurt'],
    suggestedMood: 2
  },
  {
    id: 'positive',
    name: 'Positive Moment',
    icon: '✨',
    context: 'general',
    prompt: 'What positive moment happened? What made it special? How did it make you feel?',
    suggestedEmotions: ['happy', 'hopeful'],
    suggestedMood: 4
  },
  {
    id: 'freeform',
    name: 'Free Writing',
    icon: '📝',
    context: 'general',
    prompt: 'Write freely about your experiences and feelings...',
    suggestedEmotions: [],
    suggestedMood: 3
  }
];

interface JournalProps {
  onQuickLog?: () => void;
}

export function Journal({ onQuickLog }: JournalProps = {}) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [isQuickLog, setIsQuickLog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<JournalTemplate | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterContext, setFilterContext] = useState<string>('all');
  const [filterMood, setFilterMood] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterDateFrom, setFilterDateFrom] = useState<string>('');
  const [filterDateTo, setFilterDateTo] = useState<string>('');
  
  // New entry form state
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(3);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [context, setContext] = useState('romantic');

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setIsLoading(true);
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<JournalEntry[]>((_, reject) => {
        setTimeout(() => reject(new Error('Load timeout')), 3000);
      });
      
      const allEntries = await Promise.race([
        getJournalEntries(),
        timeoutPromise
      ]);
      
      if (!Array.isArray(allEntries)) {
        setEntries([]);
      } else {
        setEntries(allEntries);
      }
    } catch (error) {
      console.error('Failed to load entries:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      // Fallback to sync version
      try {
        const { getJournalEntriesSync } = await import('../lib/storage');
        const syncEntries = getJournalEntriesSync();
        setEntries(Array.isArray(syncEntries) ? syncEntries : []);
      } catch {
        setEntries([]);
      }
      // Don't show error toast for timeout - just use fallback
      if (!errorMessage.includes('timeout')) {
        toast.error('Failed to load entries. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEntry = async () => {
    if (!content.trim()) {
      toast.error('Please write something before saving');
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
      mood,
      emotions,
      context
    };

    // Analyze with AI
    const analysis = analyzeJournalEntry(entry);
    entry.analysis = analysis;

    try {
      await saveJournalEntry(entry);
      await loadEntries();

      // Show feedback
      if (analysis.flags.length > 0) {
        toast.warning(`Detected ${analysis.flags.length} warning sign${analysis.flags.length > 1 ? 's' : ''}`, {
          description: 'Tap the entry to see detailed analysis'
        });
      } else {
        toast.success('Entry saved successfully');
      }

      // Reset form
      setContent('');
      setMood(3);
      setEmotions([]);
      setIsWriting(false);
      setIsQuickLog(false);
      setSelectedTemplate(null);
    } catch (error) {
      console.error('Failed to save entry:', error);
      toast.error('Failed to save entry. Please try again.');
    }
  };

  const handleTemplateSelect = (template: JournalTemplate) => {
    setSelectedTemplate(template);
    setContext(template.context);
    setContent(template.prompt + '\n\n');
    setEmotions(template.suggestedEmotions);
    setMood(template.suggestedMood);
    setIsWriting(true);
  };

  const handleQuickLog = () => {
    setIsQuickLog(true);
    setIsWriting(true);
    setContent('');
    setMood(3);
    setEmotions([]);
    if (onQuickLog) {
      onQuickLog();
    }
  };

  useEffect(() => {
    // If quick log was triggered externally, open it
    if (onQuickLog) {
      // This will be handled by the parent component
    }
  }, [onQuickLog]);

  const handleDeleteEntry = async (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteJournalEntry(id);
        await loadEntries();
        setSelectedEntry(null);
        toast.success('Entry deleted');
      } catch (error) {
        console.error('Failed to delete entry:', error);
        toast.error('Failed to delete entry. Please try again.');
      }
    }
  };

  const toggleEmotion = (emotion: string) => {
    if (emotions.includes(emotion)) {
      setEmotions(emotions.filter(e => e !== emotion));
    } else {
      setEmotions([...emotions, emotion]);
    }
  };

  const emotionOptions = [
    { value: 'happy', emoji: '😊', label: 'Happy', color: '#FFD93D' },
    { value: 'sad', emoji: '😢', label: 'Sad', color: '#4ECDC4' },
    { value: 'angry', emoji: '😠', label: 'Angry', color: '#FF6B6B' },
    { value: 'anxious', emoji: '😰', label: 'Anxious', color: '#6C5CE7' },
    { value: 'confused', emoji: '😕', label: 'Confused', color: '#FFD93D' },
    { value: 'hurt', emoji: '💔', label: 'Hurt', color: '#FF6B6B' },
    { value: 'hopeful', emoji: '🌟', label: 'Hopeful', color: '#4ECDC4' },
    { value: 'frustrated', emoji: '😤', label: 'Frustrated', color: '#6C5CE7' }
  ];

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊'];

  const filteredEntries = entries.filter(entry => {
    // Text search
    const matchesSearch = entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // Context filter
    if (filterContext !== 'all' && entry.context !== filterContext) return false;

    // Mood filter
    if (filterMood !== 'all') {
      const moodNum = parseInt(filterMood);
      if (entry.mood !== moodNum) return false;
    }

    // Severity filter
    if (filterSeverity !== 'all' && entry.analysis) {
      if (entry.analysis.severity !== filterSeverity) return false;
    }

    // Date range filter
    if (filterDateFrom || filterDateTo) {
      const entryDate = new Date(entry.date);
      if (filterDateFrom) {
        const fromDate = new Date(filterDateFrom);
        if (entryDate < fromDate) return false;
      }
      if (filterDateTo) {
        const toDate = new Date(filterDateTo);
        toDate.setHours(23, 59, 59, 999); // End of day
        if (entryDate > toDate) return false;
      }
    }

    return true;
  });

  const hasActiveFilters = filterContext !== 'all' || filterMood !== 'all' || filterSeverity !== 'all' || filterDateFrom || filterDateTo;

  const clearFilters = () => {
    setFilterContext('all');
    setFilterMood('all');
    setFilterSeverity('all');
    setFilterDateFrom('');
    setFilterDateTo('');
  };

  if (selectedEntry) {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedEntry(null)} 
          className="mb-4 hover:bg-[#F8F9FA] border-2 border-transparent hover:border-[#1A1A2E] rounded-xl"
        >
          ← Back to Moments
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-[#495057] mb-2">
                {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FFD93D] border-3 border-[#1A1A2E] flex items-center justify-center">
                  <span className="text-3xl">{moodEmojis[selectedEntry.mood - 1]}</span>
                </div>
                <Badge variant="outline" className="capitalize bg-[#4ECDC4] border-3 border-[#1A1A2E] text-[#1A1A2E] font-bold">
                  {selectedEntry.context}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteEntry(selectedEntry.id)}
              className="hover:bg-[#FF6B6B] text-[#FF6B6B] hover:text-white border-2 border-[#FF6B6B] rounded-xl"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="bg-[#F8F9FA] rounded-2xl p-6 mb-6 border-3 border-[#1A1A2E]">
            <p className="whitespace-pre-wrap text-[#1A1A2E] leading-relaxed">{selectedEntry.content}</p>
          </div>

          {selectedEntry.emotions.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-[#495057] mb-3 font-bold">Emotions:</p>
              <div className="flex flex-wrap gap-2">
                {selectedEntry.emotions.map(emotion => {
                  const emotionData = emotionOptions.find(e => e.value === emotion);
                  return (
                    <Badge 
                      key={emotion} 
                      className="px-3 py-1.5 border-3 border-[#1A1A2E] font-bold text-[#1A1A2E]"
                      style={{ backgroundColor: emotionData?.color }}
                    >
                      {emotionData?.emoji} {emotionData?.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {selectedEntry.analysis && (
            <div className="space-y-4">
              {selectedEntry.analysis.flags.length > 0 && (
                <div className="border-t-4 border-[#1A1A2E] pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-3 rounded-xl border-3 border-[#1A1A2E] ${ 
                      selectedEntry.analysis.severity === 'critical' ? 'bg-[#FF6B6B]' :
                      selectedEntry.analysis.severity === 'high' ? 'bg-[#FFE66D]' :
                      selectedEntry.analysis.severity === 'moderate' ? 'bg-[#FFD93D]' :
                      'bg-[#4ECDC4]'
                    }`}>
                      <AlertCircle className="w-6 h-6 text-[#1A1A2E]" strokeWidth={3} />
                    </div>
                    <h4 className="text-[#1A1A2E] font-bold text-lg">Warning Signs Detected</h4>
                  </div>

                  <div className="space-y-3">
                    {selectedEntry.analysis.flags.map((flag, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-2xl border-4 border-[#1A1A2E] ${ 
                          flag.severity === 'severe' ? 'bg-[#FF6B6B]' :
                          flag.severity === 'moderate' ? 'bg-[#FFE66D]' :
                          'bg-[#FFD93D]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="capitalize font-bold text-[#1A1A2E]">{flag.type.replace(/([A-Z])/g, ' $1').trim()}</h5>
                          <Badge 
                            className="font-bold border-3 border-[#1A1A2E] bg-white text-[#1A1A2E]"
                          >
                            {flag.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#1A1A2E] mb-3 leading-relaxed">{flag.description}</p>
                        {flag.evidence.length > 0 && (
                          <div className="text-xs text-[#1A1A2E] bg-white rounded-xl p-3 border-2 border-[#1A1A2E]">
                            <span className="font-bold">Detected phrases:</span>{' '}
                            {flag.evidence.map((e, i) => `"${e}"`).join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEntry.analysis.suggestions.length > 0 && (
                <div className="bg-[#4ECDC4] border-4 border-[#1A1A2E] rounded-2xl p-4">
                  <h5 className="text-[#1A1A2E] mb-2 font-bold">💡 Suggestions</h5>
                  <ul className="text-sm text-[#1A1A2E] space-y-1">
                    {selectedEntry.analysis.suggestions.map((suggestion, index) => (
                      <li key={index}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  if (isQuickLog) {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <Button 
          variant="ghost" 
          onClick={() => {
            setIsQuickLog(false);
            setIsWriting(false);
          }} 
          className="mb-4 hover:bg-[#F8F9FA] dark:hover:bg-[#2A2A4E] border-2 border-transparent hover:border-[#1A1A2E] dark:hover:border-[#9D8AFF] rounded-xl"
        >
          ← Cancel
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E] dark:border-[#3A3A5E] space-y-6"
        >
          <div className="bg-[#FF5A5F] dark:bg-[#FF7B7F] rounded-2xl p-5 border-3 border-[#1A1A2E] dark:border-[#9D8AFF]">
            <h3 className="mb-2 text-white font-bold text-xl">⚡ Quick Log</h3>
            <p className="text-sm text-white">
              Fast entry - just the essentials. You can add details later.
            </p>
          </div>

          <div>
            <Label htmlFor="quick-context" className="font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Context</Label>
            <Select value={context} onValueChange={setContext}>
              <SelectTrigger className="mt-1.5 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-12 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="romantic">💕 Romantic</SelectItem>
                <SelectItem value="workplace">💼 Workplace</SelectItem>
                <SelectItem value="family">👨‍👩‍👧 Family</SelectItem>
                <SelectItem value="friendship">🤝 Friendship</SelectItem>
                <SelectItem value="general">🌟 General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quick-content" className="font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">What happened? (Brief)</Label>
            <Textarea
              id="quick-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Quick note about what happened..."
              className="min-h-[120px] resize-none bg-[#F8F9FA] dark:bg-[#2A2A4E] border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl mt-1.5 text-[#1A1A2E] dark:text-[#f8f9fa] placeholder:text-[#495057] dark:placeholder:text-[#6A6A8A]"
            />
          </div>

          <div>
            <Label className="font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">How are you feeling? (1-5)</Label>
            <div className="flex gap-4 mt-3 justify-center bg-[#FFD93D] dark:bg-[#6B4BA3] rounded-2xl p-4 border-3 border-[#1A1A2E] dark:border-[#9D8AFF]">
              {moodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMood(index + 1)}
                  className={`text-4xl transition-all ${ 
                    mood === index + 1 ? 'scale-125 drop-shadow-lg' : 'scale-100 opacity-40 grayscale'
                  } hover:scale-110 hover:opacity-100`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSaveEntry} 
            className="w-full bg-[#FF5A5F] dark:bg-[#FF7B7F] hover:bg-[#FF4A4F] dark:hover:bg-[#FF6B6F] shadow-lg border-4 border-[#1A1A2E] dark:border-[#9D8AFF] font-bold rounded-2xl text-white" 
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Save Quick Entry
          </Button>
        </motion.div>
      </div>
    );
  }

  if (isWriting && !isQuickLog) {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <Button 
          variant="ghost" 
          onClick={() => {
            setIsWriting(false);
            setSelectedTemplate(null);
          }} 
          className="mb-4 hover:bg-[#F8F9FA] dark:hover:bg-[#2A2A4E] border-2 border-transparent hover:border-[#1A1A2E] dark:hover:border-[#9D8AFF] rounded-xl"
        >
          ← Cancel
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E] dark:border-[#3A3A5E] space-y-6"
        >
          <div className="bg-[#6C5CE7] dark:bg-[#6B4BA3] rounded-2xl p-5 border-3 border-[#1A1A2E] dark:border-[#9D8AFF]">
            <h3 className="mb-2 text-white font-bold text-xl">
              {selectedTemplate ? `${selectedTemplate.icon} ${selectedTemplate.name}` : 'New Journal Entry'}
            </h3>
            <p className="text-sm text-white">
              {selectedTemplate ? selectedTemplate.prompt : 'Write freely about your experiences and feelings. AI will help identify patterns.'}
            </p>
          </div>

          <div>
            <Label htmlFor="context" className="font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Context</Label>
            <Select value={context} onValueChange={setContext}>
              <SelectTrigger className="mt-1.5 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-12 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="romantic">💕 Romantic Relationship</SelectItem>
                <SelectItem value="workplace">💼 Workplace</SelectItem>
                <SelectItem value="family">👨‍👩‍👧 Family</SelectItem>
                <SelectItem value="friendship">🤝 Friendship</SelectItem>
                <SelectItem value="general">🌟 General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content" className="font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">What happened? How do you feel?</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the situation and your feelings..."
              className="min-h-[200px] resize-none bg-[#F8F9FA] dark:bg-[#2A2A4E] border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl mt-1.5 text-[#1A1A2E] dark:text-[#f8f9fa] placeholder:text-[#495057] dark:placeholder:text-[#6A6A8A]"
            />
          </div>

          <div>
            <Label className="font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">How are you feeling? (1-5)</Label>
            <div className="flex gap-4 mt-3 justify-center bg-[#FFD93D] dark:bg-[#6B4BA3] rounded-2xl p-4 border-3 border-[#1A1A2E] dark:border-[#9D8AFF]">
              {moodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMood(index + 1)}
                  className={`text-4xl transition-all ${ 
                    mood === index + 1 ? 'scale-125 drop-shadow-lg' : 'scale-100 opacity-40 grayscale'
                  } hover:scale-110 hover:opacity-100`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Emotions (select all that apply)</Label>
            <div className="flex flex-wrap gap-2 mt-3">
              {emotionOptions.map(emotion => (
                <button
                  key={emotion.value}
                  onClick={() => toggleEmotion(emotion.value)}
                  className={`px-4 py-2 rounded-xl border-3 border-[#1A1A2E] dark:border-[#9D8AFF] transition-all font-bold ${ 
                    emotions.includes(emotion.value)
                      ? 'shadow-lg scale-105'
                      : 'bg-white dark:bg-[#2A2A4E] hover:shadow'
                  }`}
                  style={{
                    backgroundColor: emotions.includes(emotion.value) ? emotion.color : undefined,
                    color: '#1A1A2E'
                  }}
                >
                  <span className="mr-1">{emotion.emoji}</span>
                  <span>{emotion.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSaveEntry} 
            className="w-full bg-[#6C5CE7] dark:bg-[#6B4BA3] hover:bg-[#5B4BC6] dark:hover:bg-[#5A4A93] shadow-lg border-4 border-[#1A1A2E] dark:border-[#9D8AFF] font-bold rounded-2xl text-white" 
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Save & Analyze Entry
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Section with Subtitle and Body */}
      <div className="bg-[#C7B8FF] dark:bg-[#6B4BA3] rounded-3xl p-6 border-4 border-[#1A1A2E] dark:border-[#9D8AFF] shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h2 className="mb-1 text-[#1A1A2E] dark:text-[#f8f9fa] font-bold text-2xl">Moments</h2>
            <p className="text-[#1A1A2E] dark:text-[#f8f9fa] opacity-90 font-medium font-bold">Not a diary. An early-warning system.</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleQuickLog} 
              className="gap-2 bg-[#FF5A5F] dark:bg-[#FF7B7F] hover:bg-[#FF4A4F] dark:hover:bg-[#FF6B6F] shadow-lg border-4 border-[#1A1A2E] dark:border-[#9D8AFF] font-bold rounded-2xl text-white"
            >
              <Plus className="w-4 h-4" />
              Quick Log
            </Button>
          <Button 
            onClick={() => setIsWriting(true)} 
              className="gap-2 bg-[#4B2E83] dark:bg-[#6B4BA3] hover:bg-[#3A2363] dark:hover:bg-[#5A4A93] shadow-lg border-4 border-[#1A1A2E] dark:border-[#9D8AFF] font-bold rounded-2xl text-white"
          >
            <Plus className="w-4 h-4" />
            New Entry
          </Button>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-[#1A1A2E] dark:text-[#f8f9fa] leading-relaxed">
          <p className="text-[14px]">Log key moments with partner, family and friends.</p>
          <p className="text-[12px]">FlagSense looks for repeating red flags like control, guilt-tripping, money games and emotional distance.</p>
          <p className="font-medium">You get clear insights, not just memories.</p>
        </div>
      </div>

      {/* Templates Section */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E] dark:border-[#3A3A5E]">
        <h3 className="text-[#1A1A2E] dark:text-[#f8f9fa] font-bold text-lg mb-4">Quick Templates</h3>
        <p className="text-sm text-[#495057] dark:text-[#adb5bd] mb-4">Start with a template to guide your entry</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {JOURNAL_TEMPLATES.map(template => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className="p-4 rounded-2xl border-3 border-[#1A1A2E] dark:border-[#9D8AFF] bg-[#F8F9FA] dark:bg-[#2A2A4E] hover:bg-[#C7B8FF] dark:hover:bg-[#6B4BA3] transition-all text-left group"
            >
              <div className="text-3xl mb-2">{template.icon}</div>
              <div className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa] group-hover:text-[#4B2E83] dark:group-hover:text-[#9D8AFF]">
                {template.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
      <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#495057] dark:text-[#6A6A8A]" />
        <Input
          type="text"
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white dark:bg-[#1a1a2e] border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-2xl h-12 text-[#1A1A2E] dark:text-[#f8f9fa] placeholder:text-[#495057] dark:placeholder:text-[#6A6A8A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex-1 border-3 border-[#1A1A2E] dark:border-[#9D8AFF] rounded-xl h-10 font-bold ${
              hasActiveFilters 
                ? 'bg-[#C7B8FF] dark:bg-[#6B4BA3] text-[#1A1A2E] dark:text-[#f8f9fa]' 
                : 'bg-white dark:bg-[#1a1a2e] text-[#1A1A2E] dark:text-[#f8f9fa]'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters {hasActiveFilters && `(${[filterContext !== 'all', filterMood !== 'all', filterSeverity !== 'all', filterDateFrom || filterDateTo].filter(Boolean).length})`}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="border-2 border-[#1A1A2E] dark:border-[#9D8AFF] rounded-xl h-10 px-3"
              aria-label="Clear all filters"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-4 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Context</Label>
                <Select value={filterContext} onValueChange={setFilterContext}>
                  <SelectTrigger className="mt-1.5 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-10 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contexts</SelectItem>
                    <SelectItem value="romantic">💕 Romantic</SelectItem>
                    <SelectItem value="workplace">💼 Workplace</SelectItem>
                    <SelectItem value="family">👨‍👩‍👧 Family</SelectItem>
                    <SelectItem value="friendship">🤝 Friendship</SelectItem>
                    <SelectItem value="general">🌟 General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Mood</Label>
                <Select value={filterMood} onValueChange={setFilterMood}>
                  <SelectTrigger className="mt-1.5 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-10 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Moods</SelectItem>
                    <SelectItem value="1">😢 Very Low (1)</SelectItem>
                    <SelectItem value="2">😟 Low (2)</SelectItem>
                    <SelectItem value="3">😐 Neutral (3)</SelectItem>
                    <SelectItem value="4">🙂 Good (4)</SelectItem>
                    <SelectItem value="5">😊 Very Good (5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Severity</Label>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="mt-1.5 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-10 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Date Range</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    type="date"
                    value={filterDateFrom}
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                    placeholder="From"
                    className="flex-1 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-10 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]"
                  />
                  <Input
                    type="date"
                    value={filterDateTo}
                    onChange={(e) => setFilterDateTo(e.target.value)}
                    placeholder="To"
                    className="flex-1 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-10 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredEntries.map((entry, index) => {
            const hasFlags = (entry.analysis?.flags?.length || 0) > 0;
            const flagCount = entry.analysis?.flags?.length || 0;
            
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedEntry(entry)}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer border-4 border-[#1A1A2E] hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD93D] border-3 border-[#1A1A2E] flex items-center justify-center">
                      <span className="text-2xl">{moodEmojis[entry.mood - 1]}</span>
                    </div>
                    <div>
                      <p className="text-sm text-[#495057] font-bold">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                      <Badge variant="outline" className="mt-1 capitalize bg-[#4ECDC4] border-1 border-[#1A1A2E] text-[#1A1A2E] font-bold">
                        {entry.context}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasFlags && (
                      <Badge className="gap-1 shadow-sm bg-[#FF6B6B] border-3 border-[#1A1A2E] text-white font-bold">
                        <AlertCircle className="w-3 h-3" />
                        {flagCount}
                      </Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-[#495057]" strokeWidth={3} />
                  </div>
                </div>

                <p className="text-[#1A1A2E] line-clamp-2 leading-relaxed">
                  {entry.content}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredEntries.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border-4 border-[#1A1A2E]">
            <div className="inline-flex p-6 rounded-2xl bg-[#4ECDC4] border-3 border-[#1A1A2E] mb-4">
              <Calendar className="w-16 h-16 text-[#1A1A2E]" />
            </div>
            <p className="text-[#495057] mb-4 font-bold text-lg">
              {searchQuery ? 'No entries found' : 'No journal entries yet'}
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => setIsWriting(true)} 
                className="bg-[#6C5CE7] hover:bg-[#5B4BC6] shadow-lg border-4 border-[#1A1A2E] font-bold rounded-2xl"
              >
                Write Your First Entry
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}