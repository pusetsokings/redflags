import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, AlertCircle, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './ui/button';
import type { JournalEntry } from '../lib/types';

interface TimelineViewProps {
  entries: JournalEntry[];
  onEntryClick: (entry: JournalEntry) => void;
}

type TimeRange = 'week' | 'month' | '3months' | 'year' | 'all';

export function TimelineView({ entries, onEntryClick }: TimelineViewProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [zoom, setZoom] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    if (entries.length === 0) return [];

    const now = new Date();
    const cutoff = new Date();

    switch (timeRange) {
      case 'week':
        cutoff.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoff.setDate(now.getDate() - 30);
        break;
      case '3months':
        cutoff.setDate(now.getDate() - 90);
        break;
      case 'year':
        cutoff.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
        cutoff.setFullYear(2000);
        break;
    }

    return entries
      .filter(e => new Date(e.date) >= cutoff)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [entries, timeRange]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#FF5A5F';
      case 'high':
        return '#FF7B7F';
      case 'moderate':
        return '#FFD93D';
      case 'low':
        return '#4ECDC4';
      default:
        return '#C7B8FF';
    }
  };

  const getSeveritySize = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 16;
      case 'high':
        return 14;
      case 'moderate':
        return 12;
      case 'low':
        return 10;
      default:
        return 8;
    }
  };

  // Group entries by date
  const entriesByDate = useMemo(() => {
    const grouped: Record<string, JournalEntry[]> = {};
    filteredEntries.forEach(entry => {
      const dateKey = new Date(entry.date).toISOString().split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(entry);
    });
    return grouped;
  }, [filteredEntries]);

  // Calculate timeline bounds
  const timelineBounds = useMemo(() => {
    if (filteredEntries.length === 0) return null;

    const dates = filteredEntries.map(e => new Date(e.date).getTime());
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    
    // Add padding
    minDate.setDate(minDate.getDate() - 1);
    maxDate.setDate(maxDate.getDate() + 1);

    return { min: minDate, max: maxDate };
  }, [filteredEntries]);

  const getDatePosition = (date: Date): number => {
    if (!timelineBounds) return 0;
    
    const totalDays = (timelineBounds.max.getTime() - timelineBounds.min.getTime()) / (1000 * 60 * 60 * 24);
    const daysFromStart = (date.getTime() - timelineBounds.min.getTime()) / (1000 * 60 * 60 * 24);
    
    return (daysFromStart / totalDays) * 100;
  };

  if (filteredEntries.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-12 shadow-lg border-4 border-[#1A1A2E] dark:border-[#3A3A5E] text-center">
        <Calendar className="w-16 h-16 text-[#4B2E83] dark:text-[#9D8AFF] mx-auto mb-4" />
        <h3 className="text-[#1A1A2E] dark:text-[#f8f9fa] font-bold text-xl mb-2">No Timeline Data</h3>
        <p className="text-[#495057] dark:text-[#adb5bd]">
          Start logging moments to see your relationship timeline
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-4 shadow-lg border-4 border-[#1A1A2E] dark:border-[#3A3A5E]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Time Range:</span>
            <div className="flex gap-2">
              {(['week', 'month', '3months', 'year', 'all'] as TimeRange[]).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-bold border-3 transition-all ${
                    timeRange === range
                      ? 'bg-[#4B2E83] dark:bg-[#6B4BA3] text-white border-[#1A1A2E] dark:border-[#9D8AFF]'
                      : 'bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa] border-[#1A1A2E] dark:border-[#3A3A5E] hover:bg-[#C7B8FF] dark:hover:bg-[#6B4BA3]'
                  }`}
                >
                  {range === 'week' ? 'Week' : range === 'month' ? 'Month' : range === '3months' ? '3 Months' : range === 'year' ? 'Year' : 'All'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              className="border-3 border-[#1A1A2E] dark:border-[#9D8AFF] rounded-xl"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa] min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.min(2, zoom + 0.25))}
              className="border-3 border-[#1A1A2E] dark:border-[#9D8AFF] rounded-xl"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E] dark:border-[#3A3A5E]">
        <h3 className="text-[#1A1A2E] dark:text-[#f8f9fa] font-bold text-xl mb-6">Relationship Timeline</h3>
        
        {timelineBounds && (
          <div className="relative" style={{ minHeight: '400px', transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-20 h-2 bg-[#4B2E83] dark:bg-[#6B4BA3] rounded-full" />

            {/* Date markers */}
            <div className="absolute left-0 right-0 top-0 h-20 flex justify-between items-start">
              {Object.keys(entriesByDate).slice(0, 10).map(dateKey => {
                const date = new Date(dateKey);
                const position = getDatePosition(date);
                return (
                  <div
                    key={dateKey}
                    className="absolute"
                    style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="text-xs font-bold text-[#495057] dark:text-[#adb5bd] whitespace-nowrap">
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Entry markers */}
            <div className="relative mt-24">
              {Object.entries(entriesByDate).map(([dateKey, dayEntries]) => {
                const date = new Date(dateKey);
                const position = getDatePosition(date);
                const maxSeverity = dayEntries.reduce((max, entry) => {
                  const severity = entry.analysis?.severity || 'low';
                  const severityOrder = { critical: 4, high: 3, moderate: 2, low: 1 };
                  return severityOrder[severity as keyof typeof severityOrder] > 
                         severityOrder[max as keyof typeof severityOrder] ? severity : max;
                }, 'low' as string);

                return (
                  <motion.div
                    key={dateKey}
                    className="absolute cursor-pointer group"
                    style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => {
                      if (dayEntries.length === 1) {
                        onEntryClick(dayEntries[0]);
                      } else {
                        setSelectedDate(selectedDate === dateKey ? null : dateKey);
                      }
                    }}
                  >
                    <div
                      className="relative"
                      style={{
                        width: getSeveritySize(maxSeverity),
                        height: getSeveritySize(maxSeverity),
                      }}
                    >
                      <div
                        className="rounded-full border-3 border-[#1A1A2E] dark:border-[#9D8AFF] shadow-lg group-hover:scale-125 transition-transform"
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: getSeverityColor(maxSeverity),
                        }}
                      />
                      {dayEntries.length > 1 && (
                        <div className="absolute -top-2 -right-2 bg-[#4B2E83] dark:bg-[#6B4BA3] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-[#1a1a2e]">
                          {dayEntries.length}
                        </div>
                      )}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <div className="bg-[#1A1A2E] dark:bg-[#2A2A4E] text-white text-xs px-3 py-2 rounded-lg border-2 border-[#4B2E83] dark:border-[#9D8AFF] whitespace-nowrap">
                        <div className="font-bold">{date.toLocaleDateString()}</div>
                        <div>{dayEntries.length} entr{dayEntries.length > 1 ? 'ies' : 'y'}</div>
                        {maxSeverity !== 'low' && (
                          <div className="text-[#FF5A5F] mt-1">Severity: {maxSeverity}</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Selected date details */}
            {selectedDate && entriesByDate[selectedDate] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-32 bg-[#F8F9FA] dark:bg-[#2A2A4E] rounded-2xl p-4 border-3 border-[#1A1A2E] dark:border-[#9D8AFF]"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDate(null)}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {entriesByDate[selectedDate].map(entry => (
                    <div
                      key={entry.id}
                      onClick={() => {
                        onEntryClick(entry);
                        setSelectedDate(null);
                      }}
                      className="p-3 bg-white dark:bg-[#1a1a2e] rounded-xl border-2 border-[#1A1A2E] dark:border-[#3A3A5E] cursor-pointer hover:bg-[#C7B8FF] dark:hover:bg-[#6B4BA3] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">
                          {entry.context}
                        </span>
                        {entry.analysis && entry.analysis.flags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-4 h-4 text-[#FF5A5F]" />
                            <span className="text-xs font-bold text-[#FF5A5F]">
                              {entry.analysis.flags.length}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[#495057] dark:text-[#adb5bd] line-clamp-2">
                        {entry.content}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 pt-6 border-t-3 border-[#E9ECEF] dark:border-[#3A3A5E]">
          <h4 className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa] mb-3">Legend</h4>
          <div className="flex flex-wrap gap-4">
            {(['critical', 'high', 'moderate', 'low'] as const).map(severity => (
              <div key={severity} className="flex items-center gap-2">
                <div
                  className="rounded-full border-2 border-[#1A1A2E] dark:border-[#9D8AFF]"
                  style={{
                    width: getSeveritySize(severity),
                    height: getSeveritySize(severity),
                    backgroundColor: getSeverityColor(severity),
                  }}
                />
                <span className="text-xs font-bold text-[#1A1A2E] dark:text-[#f8f9fa] capitalize">
                  {severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

