import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, AlertTriangle, TrendingUp, Heart, Plus, Shield, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { getJournalEntries, getJournalEntriesSync } from '../lib/storage';
import { CharacterWatermark, PatternDots } from './illustrations/BoldIllustrations';
import { checkPatternAlerts } from '../lib/notifications';
import { checkAchievements } from '../lib/achievements';
import { toast } from 'sonner';
import type { JournalEntry } from '../lib/types';

interface DashboardProps {
  onNewEntry: () => void;
  onPanic: () => void;
}

function analyzeOverallHealth(entries: JournalEntry[]) {
  if (entries.length === 0) return { score: 100 };
  
  const recentEntries = entries.slice(-10);
  const totalFlags = recentEntries.reduce((sum, e) => sum + (e.analysis?.flags?.length || 0), 0);
  const severityScore = recentEntries.reduce((sum, e) => {
    const severity = e.analysis?.severity || 'low';
    return sum + (severity === 'critical' ? 30 : severity === 'high' ? 20 : severity === 'moderate' ? 10 : 5);
  }, 0);

  const score = Math.max(0, 100 - totalFlags * 5 - severityScore);
  return { score };
}

function MoodRing({ score, size }: { score: number; size: number }) {
  const getColor = () => {
    if (score >= 75) return '#C7B8FF';
    if (score >= 50) return '#4B2E83';
    if (score >= 25) return '#FF5A5F';
    return '#FF5A5F';
  };

  const circumference = 2 * Math.PI * (size / 2 - 20);
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 20}
          stroke="#E9ECEF"
          strokeWidth="16"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 20}
          stroke={getColor()}
          strokeWidth="16"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#1A1A2E]">{score}</div>
          <div className="text-xs text-[#495057]">SCORE</div>
        </div>
      </div>
    </div>
  );
}

export function Dashboard({ onNewEntry, onPanic }: DashboardProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [healthScore, setHealthScore] = useState(75);
  const [streak, setStreak] = useState(0);
  const [weeklyFlags, setWeeklyFlags] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      let allEntries: JournalEntry[] = [];
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<JournalEntry[]>((_, reject) => {
        setTimeout(() => reject(new Error('Load timeout')), 3000);
      });
      
      // Try async first (encrypted), fallback to sync
      try {
        allEntries = await Promise.race([
          getJournalEntries(),
          timeoutPromise
        ]);
        if (!Array.isArray(allEntries)) allEntries = [];
        setEntries(allEntries);
      } catch (error) {
        console.error('Failed to load entries async:', error);
        try {
          allEntries = getJournalEntriesSync();
          if (!Array.isArray(allEntries)) allEntries = [];
          setEntries(allEntries);
        } catch (syncError) {
          console.error('Failed to load entries sync:', syncError);
          allEntries = [];
          setEntries([]);
        }
      } finally {
        setIsLoading(false);
      }

      // Calculate health score
      const health = analyzeOverallHealth(allEntries);
      setHealthScore(health.score);
      
      // Calculate streak
      const today = new Date();
      let currentStreak = 0;
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const hasEntry = allEntries.some(e => e.date.startsWith(dateStr));
        if (hasEntry) currentStreak++;
        else break;
      }
      setStreak(currentStreak);

      // Count weekly flags
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const recentEntries = allEntries.filter(e => new Date(e.date) >= oneWeekAgo);
      const flagCount = recentEntries.reduce((sum, e) => sum + (e.analysis?.flags?.length || 0), 0);
      setWeeklyFlags(flagCount);

      // Check for pattern alerts
      checkPatternAlerts(allEntries).catch(err => {
        console.error('Pattern alert check failed:', err);
      });

      // Check for new achievements
      try {
        const newlyUnlocked = await checkAchievements(allEntries);
        if (newlyUnlocked.length > 0) {
          newlyUnlocked.forEach(achievement => {
            toast.success(`Achievement Unlocked!`, {
              description: `${achievement.icon} ${achievement.name}`,
              duration: 5000
            });
          });
        }
      } catch (err) {
        console.error('Achievement check failed:', err);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getMoodLabel = () => {
    if (healthScore >= 75) return 'Healthy';
    if (healthScore >= 50) return 'Caution';
    if (healthScore >= 25) return 'Concerning';
    return 'Critical';
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Your feelings are valid. Trust your instincts.",
      "Healthy relationships empower, they don't diminish.",
      "You deserve respect, kindness, and genuine care.",
      "Boundaries are a sign of self-respect.",
      "It's okay to prioritize your emotional wellbeing.",
      "Your peace matters more than their approval."
    ];
    return quotes[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#4B2E83] dark:text-[#9D8AFF] animate-spin mx-auto mb-2" />
          <p className="text-sm text-[#495057] dark:text-[#adb5bd]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-24 relative">
      {/* Welcome Card with Character Watermark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#C7B8FF] dark:bg-[#6B4BA3] rounded-3xl p-6 text-[#1A1A2E] dark:text-[#f8f9fa] shadow-lg relative overflow-hidden border-4 border-[#1A1A2E] dark:border-[#9D8AFF]"
      >
        <CharacterWatermark />
        <PatternDots />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white rounded-full border-3 border-[#1A1A2E] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#4B2E83]" />
            </div>
            <p className="font-bold text-[20px]">Welcome to FlagSense</p>
          </div>
          <p className="text-base opacity-90 mb-3 font-bold">Red flag radar for partners, family & friends.</p>
          <p className="leading-relaxed text-[12px]">
            When something feels off with someone close to you, FlagSense helps you track it, see patterns, and protect your peace.
          </p>
        </div>
      </motion.div>

      {/* Red Flag Tracker - Primary Feature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#FF5A5F] to-[#FF7B7F] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border-4 border-[#1A1A2E]"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl border-3 border-[#1A1A2E] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#FF5A5F]" strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">Your Relationship Radar</h3>
                <p className="text-sm opacity-90 text-white">Sensing red flags this week</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-white">{weeklyFlags}</p>
              <p className="text-xs opacity-90 text-white">Flags Detected</p>
            </div>
          </div>
          
          {weeklyFlags > 0 ? (
            <div className="bg-white/20 backdrop-blur rounded-2xl p-4 border-2 border-white/30">
              <p className="text-sm font-medium mb-2 text-white">⚠️ Red Flags Detected</p>
              <p className="text-xs leading-relaxed text-white/90">
                {weeklyFlags > 5 ? 'Multiple concerning patterns in your relationships.' : 'Some warning signs detected in your moments.'} 
                {' '}Check Insights to see which relationships need attention.
              </p>
            </div>
          ) : (
            <div className="bg-white/20 backdrop-blur rounded-2xl p-4 border-2 border-white/30">
              <p className="text-sm font-medium text-white">✓ No Major Red Flags This Week</p>
              <p className="text-xs opacity-90 mt-1 text-white/90">Keep logging moments to track patterns over time</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mood Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E] dark:border-[#3A3A5E]"
      >
        <h3 className="mb-6 text-center text-[#1A1A2E] dark:text-[#f8f9fa] font-bold">How Your Relationships Are Affecting You</h3>
        <MoodRing score={healthScore} size={180} />
        <div className="text-center mt-6">
          <p className="text-xl text-[#495057] font-medium">{getMoodLabel()}</p>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4"
      >
        {/* Streak */}
        <div className="bg-[#C7B8FF] dark:bg-[#6B4BA3] rounded-3xl p-5 shadow-lg border-2 border-[#1A1A2E] dark:border-[#9D8AFF] relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white dark:bg-[#1a1a2e] rounded-2xl border-3 border-[#1A1A2E] dark:border-[#9D8AFF] flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-[#4B2E83] dark:text-[#9D8AFF]" />
            </div>
            <p className="text-4xl font-bold text-[#4B2E83] dark:text-[#9D8AFF] mb-1">{streak}</p>
            <p className="text-sm text-[#4B2E83] dark:text-[#9D8AFF] font-medium">Day Streak 🔥</p>
          </div>
        </div>

        {/* Total Entries */}
        <div className="bg-[#4B2E83] dark:bg-[#6B4BA3] rounded-3xl p-5 shadow-lg border-4 border-[#1A1A2E] dark:border-[#9D8AFF] relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white dark:bg-[#1a1a2e] rounded-2xl border-3 border-[#1A1A2E] dark:border-[#9D8AFF] flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-[#1A1A2E] dark:text-[#9D8AFF]" />
            </div>
            <p className="text-4xl font-bold text-white mb-1">{entries.length}</p>
            <p className="text-sm text-white font-medium">Moments Logged</p>
          </div>
        </div>

        {/* Wellness Score */}
        <div className="bg-[#4B2E83] dark:bg-[#6B4BA3] rounded-3xl p-5 shadow-lg border-2 border-[#1A1A2E] dark:border-[#9D8AFF] relative overflow-hidden col-span-2">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="w-12 h-12 bg-white dark:bg-[#1a1a2e] rounded-2xl border-3 border-[#1A1A2E] dark:border-[#9D8AFF] flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-[#FF5A5F] dark:text-[#FF7B7F]" />
              </div>
              <p className="text-sm text-white font-medium">Relationship Health Score</p>
            </div>
            <p className="text-5xl font-bold text-white">{Math.max(0, 100 - weeklyFlags * 5)}</p>
          </div>
        </div>
      </motion.div>

      {/* Alert */}
      {weeklyFlags > 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#C7B8FF] border-4 border-[#1A1A2E] rounded-3xl p-5 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FF5A5F] rounded-2xl flex-shrink-0 border-3 border-[#1A1A2E]">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-[#1A1A2E] mb-2 font-bold">Recurring Red Flags Detected ⚠️</h4>
              <p className="text-sm text-[#1A1A2E] mb-3 leading-relaxed font-medium">
                FlagSense detected {weeklyFlags} red flags this week across your relationships. This pattern suggests some relationships may need boundaries or attention.
              </p>
              <Button 
                size="sm" 
                className="bg-[#4B2E83] text-white hover:bg-[#3A2363] shadow border-0 font-bold"
              >
                View Detailed Insights →
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <Button
          onClick={onNewEntry}
          className="w-full bg-[#4ECDC4] hover:bg-[#2A9D8F] h-16 text-lg shadow-xl rounded-3xl border-4 border-[#1A1A2E] font-bold text-[#1A1A2E]"
          aria-label="Log a new moment"
        >
          <Plus className="w-6 h-6 mr-2" aria-hidden="true" />
          Log a Moment
        </Button>

        <Button
          onClick={onPanic}
          variant="outline"
          className="w-full border-4 border-[#1A1A2E] bg-white h-14 hover:bg-[#F8F9FA] rounded-3xl text-[#1A1A2E] font-bold shadow-lg"
          aria-label="Quick exit to disguised mode"
        >
          <Shield className="w-5 h-5 mr-2" aria-hidden="true" />
          Quick Exit (Shift+Esc)
        </Button>
      </motion.div>

      {/* Daily Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-[#1a1a2e] border-4 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-3xl p-5 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl">💡</span>
          <div>
            <h4 className="text-[#1A1A2E] dark:text-[#f8f9fa] mb-2 font-bold">Tip for Sensing Flags</h4>
            <p className="text-sm text-[#495057] dark:text-[#adb5bd] leading-relaxed">
              When something feels off with a partner, family member or friend, log that moment right away. FlagSense analyzes patterns across love, family and friendships to help you see what's really happening.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}