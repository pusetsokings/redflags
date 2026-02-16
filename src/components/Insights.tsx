import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, AlertCircle, Calendar, BarChart3, Timeline, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MoodTrendChart } from './visualizations/MoodTrendChart';
import { RadarChart } from './visualizations/RadarChart';
import { HeatMapCalendar } from './visualizations/HeatMapCalendar';
import { RedFlagBarChart } from './visualizations/RedFlagBarChart';
import { TimelineView } from './TimelineView';
import { ConversationInsights } from './ConversationInsights';
import { getJournalEntries } from '../lib/storage';
import type { JournalEntry } from '../lib/types';

export function Insights() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month');
  const [contextFilter, setContextFilter] = useState<string>('all');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoading(true);
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise<JournalEntry[]>((_, reject) => {
          setTimeout(() => reject(new Error('Load timeout')), 5000);
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
        
        // Increment insight views for achievement tracking (non-blocking)
        try {
          const { incrementInsightViews } = await import('../lib/achievements');
          incrementInsightViews().catch(() => {
            // Silently fail - not critical
          });
        } catch {
          // Silently fail - not critical
        }
      } catch (error) {
        console.error('Failed to load entries:', error);
        // Fallback to sync version
        try {
          const { getJournalEntriesSync } = await import('../lib/storage');
          const syncEntries = getJournalEntriesSync();
          setEntries(Array.isArray(syncEntries) ? syncEntries : []);
        } catch {
          setEntries([]);
        }
      } finally {
        setLoading(false);
      }
    };
    loadEntries();
  }, []);

  const getFilteredEntries = () => {
    const now = new Date();
    const cutoff = new Date();
    
    if (timeRange === 'week') {
      cutoff.setDate(now.getDate() - 7);
    } else if (timeRange === 'month') {
      cutoff.setDate(now.getDate() - 30);
    } else {
      cutoff.setFullYear(2000); // all
    }
    
    let filtered = entries.filter(e => new Date(e.date) >= cutoff);
    
    // Filter by context
    if (contextFilter !== 'all') {
      filtered = filtered.filter(e => e.context === contextFilter);
    }
    
    return filtered;
  };

  const filteredEntries = getFilteredEntries();

  // Calculate stats
  const totalFlags = filteredEntries.reduce((sum, e) => 
    sum + (e.analysis?.flags?.length || 0), 0
  );
  
  const avgMood = filteredEntries.length > 0
    ? filteredEntries.reduce((sum, e) => sum + e.mood, 0) / filteredEntries.length
    : 3;

  const flagsByType = filteredEntries.reduce((acc, entry) => {
    entry.analysis?.flags?.forEach(flag => {
      const type = flag.type;
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topFlags = Object.entries(flagsByType)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const getMoodEmoji = () => {
    if (avgMood >= 4) return '😊';
    if (avgMood >= 3.5) return '🙂';
    if (avgMood >= 2.5) return '😐';
    if (avgMood >= 2) return '😟';
    return '😢';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-1 text-[#1A1A2E] dark:text-[#f8f9fa] font-bold text-2xl">Insights & Patterns</h2>
          <p className="text-[#495057] dark:text-[#adb5bd]">AI-powered analysis of your moments</p>
        </div>
      </div>

      {/* Context Filter - Primary Feature */}
      <div className="bg-gradient-to-br from-[#4B2E83] to-[#6A4BA3] rounded-3xl p-6 shadow-xl border-4 border-[#1A1A2E]">
        <h3 className="text-white font-bold text-lg mb-3">📊 Filter by Relationship Context</h3>
        <p className="text-white text-sm mb-4 opacity-90">
          View patterns specific to love, family, or friendships
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'all', label: 'All Contexts', icon: '🌟', color: '#C7B8FF' },
            { value: 'romantic', label: 'Love / Romantic', icon: '❤️', color: '#FF5A5F' },
            { value: 'family', label: 'Family', icon: '👨‍👩‍👧', color: '#4B2E83' },
            { value: 'friendship', label: 'Friends', icon: '🤝', color: '#C7B8FF' }
          ].map(ctx => (
            <button
              key={ctx.value}
              onClick={() => setContextFilter(ctx.value)}
              className={`p-4 rounded-2xl transition-all font-bold border-4 border-white flex items-center gap-3 ${
                contextFilter === ctx.value
                  ? 'scale-105 shadow-xl'
                  : 'bg-white/20 backdrop-blur hover:bg-white/30'
              }`}
              style={{
                backgroundColor: contextFilter === ctx.value ? ctx.color : undefined,
                color: contextFilter === ctx.value ? 'white' : 'white'
              }}
            >
              <span className="text-2xl">{ctx.icon}</span>
              <span className="text-sm">{ctx.label}</span>
            </button>
          ))}
        </div>
        {contextFilter !== 'all' && (
          <div className="mt-4 bg-white/20 backdrop-blur rounded-xl p-3 border-2 border-white/30">
            <p className="text-white text-xs">
              ✓ Showing insights for <strong className="capitalize">{contextFilter}</strong> relationships only
            </p>
          </div>
        )}
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-[#1A1A2E]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm text-[#495057] font-bold">Time Range:</span>
          <div className="flex gap-2">
            {(['week', 'month', 'all'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl transition-all font-bold border-3 border-[#1A1A2E] ${
                  timeRange === range
                    ? 'bg-[#6C5CE7] text-white'
                    : 'bg-white text-[#1A1A2E] hover:bg-[#F8F9FA]'
                }`}
              >
                {range === 'week' ? 'Last 7 Days' : range === 'month' ? 'Last 30 Days' : 'All Time'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#4ECDC4] rounded-3xl p-6 text-[#1A1A2E] shadow-lg border-4 border-[#1A1A2E]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white rounded-xl border-3 border-[#1A1A2E] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
            </div>
            <span className="text-sm font-bold">Average Mood</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-5xl">{getMoodEmoji()}</span>
            <span className="text-4xl font-bold">{avgMood.toFixed(1)}/5</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#FF6B6B] rounded-3xl p-6 text-white shadow-lg border-4 border-[#1A1A2E]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white rounded-xl border-3 border-[#1A1A2E] flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
            </div>
            <span className="text-sm font-bold">Total Flags</span>
          </div>
          <div className="text-5xl font-bold">{totalFlags}</div>
          <p className="text-sm mt-1">
            {filteredEntries.length} entries analyzed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#2A9D8F] rounded-3xl p-6 text-white shadow-lg border-4 border-[#1A1A2E]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white rounded-xl border-3 border-[#1A1A2E] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
            </div>
            <span className="text-sm font-bold">Active Days</span>
          </div>
          <div className="text-5xl font-bold">{filteredEntries.length}</div>
          <p className="text-sm mt-1">
            Entries in this period
          </p>
        </motion.div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center border-4 border-[#1A1A2E]">
          <div className="inline-flex p-6 rounded-2xl bg-[#FFD93D] border-3 border-[#1A1A2E] mb-4">
            <BarChart3 className="w-16 h-16 text-[#1A1A2E] animate-pulse" />
          </div>
          <h3 className="mb-2 text-[#1A1A2E] font-bold text-xl">Loading Insights...</h3>
          <p className="text-[#495057]">
            Analyzing your data
          </p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center border-4 border-[#1A1A2E]">
          <div className="inline-flex p-6 rounded-2xl bg-[#FFD93D] border-3 border-[#1A1A2E] mb-4">
            <BarChart3 className="w-16 h-16 text-[#1A1A2E]" />
          </div>
          <h3 className="mb-2 text-[#1A1A2E] font-bold text-xl">No Data Available</h3>
          <p className="text-[#495057]">
            Start journaling to see insights and patterns
          </p>
        </div>
      ) : (
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border-4 border-[#1A1A2E] rounded-2xl p-1">
            <TabsTrigger 
              value="trends" 
              className="rounded-xl data-[state=active]:bg-[#6C5CE7] data-[state=active]:text-white data-[state=active]:font-bold font-bold"
            >
              Trends
            </TabsTrigger>
            <TabsTrigger 
              value="flags" 
              className="rounded-xl data-[state=active]:bg-[#FF6B6B] data-[state=active]:text-white data-[state=active]:font-bold font-bold"
            >
              Red Flags
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="rounded-xl data-[state=active]:bg-[#FFD93D] data-[state=active]:text-[#1A1A2E] data-[state=active]:font-bold font-bold"
            >
              Calendar
            </TabsTrigger>
            <TabsTrigger 
              value="dimensions" 
              className="rounded-xl data-[state=active]:bg-[#4ECDC4] data-[state=active]:text-[#1A1A2E] data-[state=active]:font-bold font-bold"
            >
              Dimensions
            </TabsTrigger>
            <TabsTrigger 
              value="conversations" 
              className="rounded-xl data-[state=active]:bg-[#6C5CE7] data-[state=active]:text-white data-[state=active]:font-bold font-bold"
            >
              Conversations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
              <h3 className="mb-4 text-[#1A1A2E] font-bold text-xl">Mood Over Time</h3>
              <MoodTrendChart entries={filteredEntries} />
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
              <h3 className="mb-4 text-[#1A1A2E] font-bold text-xl">Pattern Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl border-3 border-[#1A1A2E]">
                  <span className="text-[#1A1A2E]">Total Journal Entries</span>
                  <span className="text-2xl font-bold text-[#1A1A2E]">{filteredEntries.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl border-3 border-[#1A1A2E]">
                  <span className="text-[#1A1A2E]">Entries with Warnings</span>
                  <span className="text-2xl font-bold text-[#1A1A2E]">
                    {filteredEntries.filter(e => (e.analysis?.flags?.length || 0) > 0).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl border-3 border-[#1A1A2E]">
                  <span className="text-[#1A1A2E]">Average Mood Trend</span>
                  <span className="text-xl font-bold flex items-center gap-2 text-[#1A1A2E]">
                    {avgMood >= 3.5 ? (
                      <>
                        <TrendingUp className="w-5 h-5 text-[#2A9D8F]" strokeWidth={3} />
                        Positive
                      </>
                    ) : avgMood >= 2.5 ? (
                      'Neutral'
                    ) : (
                      <>
                        <TrendingUp className="w-5 h-5 text-[#FF6B6B] rotate-180" strokeWidth={3} />
                        Concerning
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flags" className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
              <h3 className="mb-4 text-[#1A1A2E] font-bold text-xl">Red Flag Frequency</h3>
              <RedFlagBarChart flagData={flagsByType} />
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
              <h3 className="mb-4 text-[#1A1A2E] font-bold text-xl">Top Concerns</h3>
              {topFlags.length > 0 ? (
                <div className="space-y-3">
                  {topFlags.map(([type, count], index) => (
                    <div
                      key={type}
                      className="flex items-center justify-between p-4 bg-[#FF6B6B] border-4 border-[#1A1A2E] rounded-2xl"
                    >
                      <div>
                        <h4 className="text-white capitalize font-bold">
                          {type.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-white">
                          Detected in {count} {count === 1 ? 'entry' : 'entries'}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-xl border-3 border-[#1A1A2E] flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#1A1A2E]">#{index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#495057] text-center py-8">
                  No red flags detected in this period 🎉
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]">
              <h3 className="mb-4 text-[#1A1A2E] font-bold text-xl">Activity Heat Map</h3>
              <p className="text-sm text-[#495057] mb-4">
                Darker colors indicate more entries or higher emotional intensity
              </p>
              <HeatMapCalendar entries={entries} />
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <TimelineView 
              entries={filteredEntries} 
              onEntryClick={(entry) => setSelectedEntry(entry)}
            />
          </TabsContent>

          <TabsContent value="dimensions" className="space-y-4">
            <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E] dark:border-[#3A3A5E]">
              <h3 className="mb-4 text-[#1A1A2E] dark:text-[#f8f9fa] font-bold text-xl">Relationship Health Dimensions</h3>
              <p className="text-sm text-[#495057] dark:text-[#adb5bd] mb-6">
                Based on detected patterns and your journal entries
              </p>
              <RadarChart entries={filteredEntries} />
            </div>

            <div className="bg-[#4ECDC4] dark:bg-[#6B4BA3] border-4 border-[#1A1A2E] dark:border-[#9D8AFF] rounded-2xl p-4">
              <h4 className="text-[#1A1A2E] dark:text-[#f8f9fa] mb-2 font-bold">💡 Understanding the Chart</h4>
              <p className="text-sm text-[#1A1A2E] dark:text-[#f8f9fa]">
                The radar chart shows different aspects of your relationship or wellbeing. 
                Larger areas indicate healthier patterns. Smaller areas suggest areas needing attention.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-4">
            <ConversationInsights />
          </TabsContent>
        </Tabs>
      )}

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEntry(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-xl border-4 border-[#1A1A2E] dark:border-[#9D8AFF] max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[#1A1A2E] dark:text-[#f8f9fa] font-bold text-xl mb-2">
                  {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#4ECDC4] dark:bg-[#6B4BA3] text-[#1A1A2E] dark:text-[#f8f9fa] rounded-xl text-sm font-bold border-2 border-[#1A1A2E] dark:border-[#9D8AFF]">
                    {selectedEntry.context}
                  </span>
                  {selectedEntry.analysis && selectedEntry.analysis.flags.length > 0 && (
                    <span className="px-3 py-1 bg-[#FF5A5F] dark:bg-[#FF7B7F] text-white rounded-xl text-sm font-bold border-2 border-[#1A1A2E] dark:border-[#9D8AFF]">
                      {selectedEntry.analysis.flags.length} flag{selectedEntry.analysis.flags.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedEntry(null)}
                className="h-8 w-8 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="bg-[#F8F9FA] dark:bg-[#2A2A4E] rounded-2xl p-4 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] mb-4">
              <p className="text-[#1A1A2E] dark:text-[#f8f9fa] whitespace-pre-wrap">{selectedEntry.content}</p>
            </div>
            {selectedEntry.analysis && selectedEntry.analysis.flags.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Red Flags Detected:</h4>
                {selectedEntry.analysis.flags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FF5A5F] dark:bg-[#FF7B7F] rounded-xl border-3 border-[#1A1A2E] dark:border-[#9D8AFF]"
                  >
                    <div className="font-bold text-white mb-1">{flag.type}</div>
                    <div className="text-sm text-white">{flag.description}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}