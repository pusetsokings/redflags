import { useState } from 'react';
import type { JournalEntry } from '../../lib/types';

interface HeatMapCalendarProps {
  entries: JournalEntry[];
}

export function HeatMapCalendar({ entries }: HeatMapCalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  // Get intensity for a specific day
  const getDayIntensity = (day: number | null): number => {
    if (!day) return 0;
    
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    
    const dayEntries = entries.filter(e => e.date.startsWith(dateStr));
    if (dayEntries.length === 0) return 0;
    
    // Calculate intensity based on entries and flags
    let intensity = dayEntries.length * 20; // Base intensity from having entries
    
    dayEntries.forEach(entry => {
      const flagCount = entry.analysis?.flags?.length || 0;
      intensity += flagCount * 15; // Add intensity for flags
      
      // Adjust for mood
      if (entry.mood <= 2) intensity += 10;
      else if (entry.mood >= 4) intensity -= 5;
    });
    
    return Math.min(100, intensity);
  };

  const getColorClass = (intensity: number): string => {
    if (intensity === 0) return 'bg-gray-100';
    if (intensity < 25) return 'bg-green-200';
    if (intensity < 50) return 'bg-yellow-300';
    if (intensity < 75) return 'bg-orange-400';
    return 'bg-red-500';
  };

  const days = getDaysInMonth(selectedMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedMonth(newDate);
  };

  return (
    <div>
      {/* Month Navigator */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          ← Previous
        </button>
        <h4>
          {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <button
          onClick={() => changeMonth(1)}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          Next →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Week day headers */}
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm text-gray-600 py-1">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, index) => {
          const intensity = getDayIntensity(day);
          const colorClass = getColorClass(intensity);
          
          return (
            <div
              key={index}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all hover:scale-105 ${
                day ? `${colorClass} cursor-pointer` : 'bg-transparent'
              }`}
              title={day ? `${day}: ${intensity > 0 ? 'Active day' : 'No entries'}` : ''}
            >
              {day && (
                <span className={intensity > 50 ? 'text-white' : 'text-gray-700'}>
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="text-sm text-gray-600">Less</span>
        <div className="flex gap-1">
          <div className="w-6 h-6 rounded bg-gray-100"></div>
          <div className="w-6 h-6 rounded bg-green-200"></div>
          <div className="w-6 h-6 rounded bg-yellow-300"></div>
          <div className="w-6 h-6 rounded bg-orange-400"></div>
          <div className="w-6 h-6 rounded bg-red-500"></div>
        </div>
        <span className="text-sm text-gray-600">More</span>
      </div>
    </div>
  );
}
