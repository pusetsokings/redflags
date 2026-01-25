import { getJournalEntries } from './storage';
import { getSetting, saveSetting } from './storage';
import type { JournalEntry } from './types';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'entries' | 'insights' | 'flags' | 'milestone';
  requirement: number;
  unlocked: boolean;
  unlockedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const ACHIEVEMENTS: Achievement[] = [
  // Streak Achievements
  {
    id: 'first-entry',
    name: 'First Steps',
    description: 'Log your first moment',
    icon: '🌱',
    category: 'milestone',
    requirement: 1,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    category: 'streak',
    requirement: 7,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '💪',
    category: 'streak',
    requirement: 30,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'streak-100',
    name: 'Century Champion',
    description: 'Maintain a 100-day streak',
    icon: '👑',
    category: 'streak',
    requirement: 100,
    unlocked: false,
    rarity: 'legendary'
  },
  
  // Entry Achievements
  {
    id: 'entries-10',
    name: 'Getting Started',
    description: 'Log 10 moments',
    icon: '📝',
    category: 'entries',
    requirement: 10,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'entries-50',
    name: 'Dedicated Tracker',
    description: 'Log 50 moments',
    icon: '📊',
    category: 'entries',
    requirement: 50,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'entries-100',
    name: 'Century Club',
    description: 'Log 100 moments',
    icon: '🏆',
    category: 'entries',
    requirement: 100,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'entries-500',
    name: 'Master Archivist',
    description: 'Log 500 moments',
    icon: '📚',
    category: 'entries',
    requirement: 500,
    unlocked: false,
    rarity: 'legendary'
  },
  
  // Flag Detection Achievements
  {
    id: 'flags-10',
    name: 'Pattern Detective',
    description: 'Detect 10 red flags',
    icon: '🔍',
    category: 'flags',
    requirement: 10,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'flags-50',
    name: 'Red Flag Radar',
    description: 'Detect 50 red flags',
    icon: '🚩',
    category: 'flags',
    requirement: 50,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'flags-100',
    name: 'Protection Pro',
    description: 'Detect 100 red flags',
    icon: '🛡️',
    category: 'flags',
    requirement: 100,
    unlocked: false,
    rarity: 'epic'
  },
  
  // Insight Achievements
  {
    id: 'insights-10',
    name: 'Insight Seeker',
    description: 'View insights 10 times',
    icon: '💡',
    category: 'insights',
    requirement: 10,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'insights-50',
    name: 'Pattern Analyst',
    description: 'View insights 50 times',
    icon: '📈',
    category: 'insights',
    requirement: 50,
    unlocked: false,
    rarity: 'rare'
  },
  
  // Special Achievements
  {
    id: 'all-contexts',
    name: 'Relationship Explorer',
    description: 'Log entries in all relationship contexts',
    icon: '🌍',
    category: 'milestone',
    requirement: 5, // romantic, family, friendship, workplace, general
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'positive-week',
    name: 'Positive Week',
    description: 'Have 7 consecutive days with mood ≥ 4',
    icon: '✨',
    category: 'milestone',
    requirement: 7,
    unlocked: false,
    rarity: 'epic'
  }
];

export async function getUnlockedAchievements(): Promise<string[]> {
  try {
    const unlocked = await getSetting('unlockedAchievements', []);
    return Array.isArray(unlocked) ? unlocked : [];
  } catch {
    return [];
  }
}

export async function unlockAchievement(achievementId: string): Promise<void> {
  const unlocked = await getUnlockedAchievements();
  if (!unlocked.includes(achievementId)) {
    unlocked.push(achievementId);
    await saveSetting('unlockedAchievements', unlocked);
    
    // Save unlock date
    const unlockDates = await getSetting('achievementUnlockDates', {});
    unlockDates[achievementId] = new Date().toISOString();
    await saveSetting('achievementUnlockDates', unlockDates);
  }
}

export async function checkAchievements(entries: JournalEntry[]): Promise<Achievement[]> {
  const unlockedIds = await getUnlockedAchievements();
  const newlyUnlocked: Achievement[] = [];

  // Calculate stats
  const totalEntries = entries.length;
  const totalFlags = entries.reduce((sum, e) => sum + (e.analysis?.flags?.length || 0), 0);
  
  // Calculate streak
  const today = new Date();
  let currentStreak = 0;
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const hasEntry = entries.some(e => e.date.startsWith(dateStr));
    if (hasEntry) currentStreak++;
    else break;
  }

  // Check unique contexts
  const uniqueContexts = new Set(entries.map(e => e.context));
  
  // Check positive streak
  let positiveStreak = 0;
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayEntries = entries.filter(e => e.date.startsWith(dateStr));
    if (dayEntries.length > 0) {
      const avgMood = dayEntries.reduce((sum, e) => sum + e.mood, 0) / dayEntries.length;
      if (avgMood >= 4) positiveStreak++;
      else break;
    } else {
      break;
    }
  }

  // Get insight views count
  const insightViews = await getSetting('insightViews', 0);

  // Check each achievement
  for (const achievement of ACHIEVEMENTS) {
    if (unlockedIds.includes(achievement.id)) {
      continue; // Already unlocked
    }

    let shouldUnlock = false;

    switch (achievement.id) {
      case 'first-entry':
        shouldUnlock = totalEntries >= 1;
        break;
      case 'streak-7':
        shouldUnlock = currentStreak >= 7;
        break;
      case 'streak-30':
        shouldUnlock = currentStreak >= 30;
        break;
      case 'streak-100':
        shouldUnlock = currentStreak >= 100;
        break;
      case 'entries-10':
        shouldUnlock = totalEntries >= 10;
        break;
      case 'entries-50':
        shouldUnlock = totalEntries >= 50;
        break;
      case 'entries-100':
        shouldUnlock = totalEntries >= 100;
        break;
      case 'entries-500':
        shouldUnlock = totalEntries >= 500;
        break;
      case 'flags-10':
        shouldUnlock = totalFlags >= 10;
        break;
      case 'flags-50':
        shouldUnlock = totalFlags >= 50;
        break;
      case 'flags-100':
        shouldUnlock = totalFlags >= 100;
        break;
      case 'insights-10':
        shouldUnlock = insightViews >= 10;
        break;
      case 'insights-50':
        shouldUnlock = insightViews >= 50;
        break;
      case 'all-contexts':
        shouldUnlock = uniqueContexts.size >= 5;
        break;
      case 'positive-week':
        shouldUnlock = positiveStreak >= 7;
        break;
    }

    if (shouldUnlock) {
      await unlockAchievement(achievement.id);
      achievement.unlocked = true;
      achievement.unlockedDate = new Date().toISOString();
      newlyUnlocked.push(achievement);
    }
  }

  return newlyUnlocked;
}

export function getAchievementsByCategory(): Record<string, Achievement[]> {
  const unlockedIds = new Set(ACHIEVEMENTS.filter(a => a.unlocked).map(a => a.id));
  
  const categories: Record<string, Achievement[]> = {
    streak: [],
    entries: [],
    insights: [],
    flags: [],
    milestone: []
  };

  ACHIEVEMENTS.forEach(achievement => {
    achievement.unlocked = unlockedIds.has(achievement.id);
    categories[achievement.category].push(achievement);
  });

  return categories;
}

export async function incrementInsightViews(): Promise<void> {
  const current = await getSetting('insightViews', 0);
  await saveSetting('insightViews', current + 1);
}

