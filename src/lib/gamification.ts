/**
 * Gamification System
 * Tracks user engagement, achievements, and progress
 * Makes the app feel rewarding and encourages continued use
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'engagement' | 'insight' | 'growth' | 'consistency';
  unlockedAt?: string;
  progress: number; // 0-100
  target: number;
  current: number;
}

export interface UserProgress {
  totalConversations: number;
  totalJournalEntries: number;
  streakDays: number;
  longestStreak: number;
  lastActiveDate: string;
  achievements: Achievement[];
  level: number;
  experience: number;
  nextLevelXP: number;
}

export interface EngagementMetric {
  date: string;
  conversations: number;
  journalEntries: number;
  timeSpent: number; // minutes
  insightsGenerated: number;
  patternsIdentified: number;
}

class GamificationSystem {
  private progress: UserProgress;
  private engagementHistory: EngagementMetric[];

  constructor() {
    this.progress = this.loadProgress();
    this.engagementHistory = this.loadEngagementHistory();
    this.updateStreak();
  }

  /**
   * Track a conversation
   */
  trackConversation(depth: number = 1): void {
    this.progress.totalConversations++;
    this.addExperience(10 + (depth * 5));
    this.checkAchievements();
    this.saveProgress();
  }

  /**
   * Track a journal entry
   */
  trackJournalEntry(hasFlags: boolean = false): void {
    this.progress.totalJournalEntries++;
    this.addExperience(15);
    if (hasFlags) {
      this.addExperience(10); // Bonus for identifying patterns
    }
    this.checkAchievements();
    this.saveProgress();
  }

  /**
   * Track an insight or pattern identified
   */
  trackInsight(): void {
    this.addExperience(20);
    this.checkAchievements();
    this.saveProgress();
  }

  /**
   * Add experience points
   */
  private addExperience(amount: number): void {
    this.progress.experience += amount;
    
    // Level up if enough XP
    while (this.progress.experience >= this.progress.nextLevelXP) {
      this.progress.level++;
      this.progress.experience -= this.progress.nextLevelXP;
      this.progress.nextLevelXP = Math.floor(this.progress.nextLevelXP * 1.5);
      this.unlockAchievement(`level_${this.progress.level}`);
    }
  }

  /**
   * Check and unlock achievements
   */
  private checkAchievements(): void {
    const achievements = this.getAchievementDefinitions();
    
    achievements.forEach(achievement => {
      if (achievement.unlockedAt) return; // Already unlocked
      
      let current = 0;
      let target = achievement.target;
      
      switch (achievement.id) {
        case 'first_conversation':
          current = this.progress.totalConversations;
          break;
        case 'first_entry':
          current = this.progress.totalJournalEntries;
          break;
        case 'conversation_master':
          current = this.progress.totalConversations;
          target = 50;
          break;
        case 'journal_warrior':
          current = this.progress.totalJournalEntries;
          target = 30;
          break;
        case 'streak_3':
          current = this.progress.streakDays;
          target = 3;
          break;
        case 'streak_7':
          current = this.progress.streakDays;
          target = 7;
          break;
        case 'streak_30':
          current = this.progress.streakDays;
          target = 30;
          break;
        case 'pattern_detector':
          // This would need to be tracked separately
          break;
        case 'insight_seeker':
          // This would need to be tracked separately
          break;
      }
      
      if (current >= target) {
        this.unlockAchievement(achievement.id);
      }
    });
  }

  /**
   * Unlock an achievement
   */
  private unlockAchievement(achievementId: string): void {
    const achievement = this.progress.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date().toISOString();
      achievement.progress = 100;
      achievement.current = achievement.target;
      
      // Show notification (would be handled by UI)
      this.notifyAchievement(achievement);
    }
  }

  /**
   * Update daily streak
   */
  private updateStreak(): void {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.progress.lastActiveDate ? 
      new Date(this.progress.lastActiveDate).toISOString().split('T')[0] : null;
    
    if (lastActive === today) {
      // Already active today
      return;
    }
    
    if (!lastActive) {
      // First time
      this.progress.streakDays = 1;
    } else {
      const lastDate = new Date(lastActive);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        this.progress.streakDays++;
      } else if (diffDays > 1) {
        // Streak broken
        if (this.progress.streakDays > this.progress.longestStreak) {
          this.progress.longestStreak = this.progress.streakDays;
        }
        this.progress.streakDays = 1;
      }
    }
    
    this.progress.lastActiveDate = today;
    this.checkAchievements();
    this.saveProgress();
  }

  /**
   * Get achievement definitions
   */
  private getAchievementDefinitions(): Achievement[] {
    return [
      {
        id: 'first_conversation',
        name: 'First Step',
        description: 'Started your first conversation',
        icon: '🌱',
        category: 'engagement',
        progress: 0,
        target: 1,
        current: this.progress.totalConversations
      },
      {
        id: 'first_entry',
        name: 'Memory Keeper',
        description: 'Logged your first moment',
        icon: '📝',
        category: 'engagement',
        progress: 0,
        target: 1,
        current: this.progress.totalJournalEntries
      },
      {
        id: 'conversation_master',
        name: 'Conversation Master',
        description: 'Completed 50 conversations',
        icon: '💬',
        category: 'engagement',
        progress: 0,
        target: 50,
        current: this.progress.totalConversations
      },
      {
        id: 'journal_warrior',
        name: 'Journal Warrior',
        description: 'Logged 30 moments',
        icon: '📚',
        category: 'consistency',
        progress: 0,
        target: 30,
        current: this.progress.totalJournalEntries
      },
      {
        id: 'streak_3',
        name: 'Getting Started',
        description: '3-day streak',
        icon: '🔥',
        category: 'consistency',
        progress: 0,
        target: 3,
        current: this.progress.streakDays
      },
      {
        id: 'streak_7',
        name: 'Week Warrior',
        description: '7-day streak',
        icon: '🔥🔥',
        category: 'consistency',
        progress: 0,
        target: 7,
        current: this.progress.streakDays
      },
      {
        id: 'streak_30',
        name: 'Dedication Master',
        description: '30-day streak',
        icon: '🔥🔥🔥',
        category: 'consistency',
        progress: 0,
        target: 30,
        current: this.progress.streakDays
      },
      {
        id: 'pattern_detector',
        name: 'Pattern Detector',
        description: 'Identified 10 red flag patterns',
        icon: '🔍',
        category: 'insight',
        progress: 0,
        target: 10,
        current: 0
      },
      {
        id: 'insight_seeker',
        name: 'Insight Seeker',
        description: 'Generated 20 insights',
        icon: '💡',
        category: 'insight',
        progress: 0,
        target: 20,
        current: 0
      }
    ];
  }

  /**
   * Get user progress
   */
  getProgress(): UserProgress {
    // Update achievement progress
    const definitions = this.getAchievementDefinitions();
    this.progress.achievements = definitions.map(def => {
      const existing = this.progress.achievements.find(a => a.id === def.id);
      if (existing) {
        return { ...existing, ...def, current: def.current };
      }
      return def;
    });
    
    return this.progress;
  }

  /**
   * Get engagement metrics
   */
  getEngagementMetrics(): EngagementMetric[] {
    return this.engagementHistory;
  }

  /**
   * Track engagement for today
   */
  trackEngagement(conversations: number, entries: number, timeSpent: number): void {
    const today = new Date().toISOString().split('T')[0];
    const existing = this.engagementHistory.find(e => e.date === today);
    
    if (existing) {
      existing.conversations += conversations;
      existing.journalEntries += entries;
      existing.timeSpent += timeSpent;
    } else {
      this.engagementHistory.push({
        date: today,
        conversations,
        journalEntries: entries,
        timeSpent,
        insightsGenerated: 0,
        patternsIdentified: 0
      });
    }
    
    this.saveEngagementHistory();
  }

  /**
   * Notify about achievement (would trigger UI notification)
   */
  private notifyAchievement(achievement: Achievement): void {
    // This would trigger a toast/notification in the UI
    console.log('Achievement unlocked:', achievement.name);
  }

  /**
   * Load progress from storage
   */
  private loadProgress(): UserProgress {
    try {
      const stored = localStorage.getItem('gamification_progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          achievements: parsed.achievements || []
        };
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
    
    return {
      totalConversations: 0,
      totalJournalEntries: 0,
      streakDays: 0,
      longestStreak: 0,
      lastActiveDate: '',
      achievements: [],
      level: 1,
      experience: 0,
      nextLevelXP: 100
    };
  }

  /**
   * Save progress to storage
   */
  private saveProgress(): void {
    try {
      localStorage.setItem('gamification_progress', JSON.stringify(this.progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  /**
   * Load engagement history
   */
  private loadEngagementHistory(): EngagementMetric[] {
    try {
      const stored = localStorage.getItem('gamification_engagement');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load engagement:', error);
    }
    return [];
  }

  /**
   * Save engagement history
   */
  private saveEngagementHistory(): void {
    try {
      localStorage.setItem('gamification_engagement', JSON.stringify(this.engagementHistory));
    } catch (error) {
      console.error('Failed to save engagement:', error);
    }
  }
}

// Export singleton
export const gamification = new GamificationSystem();
