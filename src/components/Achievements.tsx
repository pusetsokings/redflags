import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Lock, Sparkles, Star } from 'lucide-react';
import { ACHIEVEMENTS, getAchievementsByCategory, type Achievement } from '../lib/achievements';
import { getUnlockedAchievements } from '../lib/achievements';

const RARITY_COLORS = {
  common: '#C7B8FF',
  rare: '#4B2E83',
  epic: '#FF5A5F',
  legendary: '#FFD93D'
};

const RARITY_BORDERS = {
  common: '#1A1A2E',
  rare: '#4B2E83',
  epic: '#FF5A5F',
  legendary: '#FFD93D'
};

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const unlockedIds = await getUnlockedAchievements();
    setAchievements(prev => prev.map(a => ({
      ...a,
      unlocked: unlockedIds.includes(a.id)
    })));
  };

  const categories = getAchievementsByCategory();
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progress = (unlockedCount / totalCount) * 100;

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
    return rarityOrder[b.rarity] - rarityOrder[a.rarity];
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FFD93D] to-[#FFE66D] dark:from-[#6B4BA3] dark:to-[#9D8AFF] rounded-3xl p-6 border-4 border-[#1A1A2E] dark:border-[#5A5A7E] shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white dark:bg-[#1a1a2e] rounded-2xl border-4 border-[#1A1A2E] dark:border-[#5A5A7E] flex items-center justify-center">
            <Trophy className="w-8 h-8 text-[#FFD93D] dark:text-[#9D8AFF]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[#1A1A2E] dark:text-foreground font-bold text-2xl mb-1">Achievements</h2>
            <p className="text-[#1A1A2E] dark:text-foreground/95">
              Celebrate your progress and milestones
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-[#1A1A2E] dark:text-foreground">
              {unlockedCount}/{totalCount}
            </div>
            <div className="text-sm text-[#1A1A2E] dark:text-foreground font-bold">Unlocked</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-white dark:bg-[#1a1a2e] rounded-full h-4 border-3 border-[#1A1A2E] dark:border-[#9D8AFF] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#4B2E83] to-[#6B4BA3] dark:from-[#9D8AFF] dark:to-[#C7B8FF]"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-4 shadow-lg border-4 border-[#1A1A2E] dark:border-[#5A5A7E]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-[#1A1A2E] dark:text-foreground">Filter:</span>
          {['all', 'streak', 'entries', 'flags', 'insights', 'milestone'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border-3 transition-all ${
                selectedCategory === category
                  ? 'bg-[#4B2E83] dark:bg-[#6B4BA3] text-white border-[#1A1A2E] dark:border-[#5A5A7E]'
                  : 'bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-foreground border-[#1A1A2E] dark:border-[#5A5A7E] hover:bg-[#C7B8FF] dark:hover:bg-[#6B4BA3]'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {sortedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative rounded-3xl p-6 shadow-lg border-4 transition-all ${
                achievement.unlocked
                  ? 'bg-white dark:bg-[#1a1a2e] border-[#1A1A2E] dark:border-[#5A5A7E]'
                  : 'bg-[#F8F9FA] dark:bg-[#2A2A4E] border-[#ADB5BD] dark:border-[#6A6A8A] opacity-60'
              }`}
            >
              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-5 h-5 text-[#FFD93D]" />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl border-4 flex items-center justify-center text-3xl flex-shrink-0 ${
                    achievement.unlocked
                      ? `border-[${RARITY_BORDERS[achievement.rarity]}]`
                      : 'border-[#ADB5BD] dark:border-[#6A6A8A] grayscale'
                  }`}
                  style={{
                    backgroundColor: achievement.unlocked 
                      ? RARITY_COLORS[achievement.rarity] 
                      : '#E9ECEF',
                    borderColor: achievement.unlocked 
                      ? RARITY_BORDERS[achievement.rarity] 
                      : undefined
                  }}
                >
                  {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8 text-[#ADB5BD]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-lg ${
                      achievement.unlocked 
                        ? 'text-[#1A1A2E] dark:text-[#f8f9fa]' 
                        : 'text-[#ADB5BD] dark:text-[#6A6A8A]'
                    }`}>
                      {achievement.name}
                    </h3>
                    {achievement.rarity === 'legendary' && achievement.unlocked && (
                      <Star className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${
                    achievement.unlocked 
                      ? 'text-[#495057] dark:text-[#adb5bd]' 
                      : 'text-[#ADB5BD] dark:text-[#6A6A8A]'
                  }`}>
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold border-2 ${
                      achievement.unlocked
                        ? `bg-[${RARITY_COLORS[achievement.rarity]}] border-[${RARITY_BORDERS[achievement.rarity]}] text-[#1A1A2E]`
                        : 'bg-[#E9ECEF] border-[#ADB5BD] text-[#ADB5BD]'
                    }`}
                    style={{
                      backgroundColor: achievement.unlocked ? RARITY_COLORS[achievement.rarity] : undefined,
                      borderColor: achievement.unlocked ? RARITY_BORDERS[achievement.rarity] : undefined
                    }}>
                      {achievement.rarity.toUpperCase()}
                    </span>
                    {achievement.unlocked && achievement.unlockedDate && (
                      <span className="text-xs text-[#495057] dark:text-[#adb5bd]">
                        {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {!achievement.unlocked && (
                <div className="mt-4 pt-4 border-t-2 border-[#E9ECEF] dark:border-[#3A3A5E]">
                  <p className="text-xs text-[#ADB5BD] dark:text-[#6A6A8A] font-bold">
                    Progress: {achievement.requirement} required
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {sortedAchievements.length === 0 && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-12 text-center border-4 border-[#1A1A2E] dark:border-[#5A5A7E]">
          <Trophy className="w-16 h-16 text-[#4B2E83] dark:text-[#9D8AFF] mx-auto mb-4" />
          <h3 className="text-[#1A1A2E] dark:text-foreground font-bold text-xl mb-2">No Achievements</h3>
          <p className="text-[#495057] dark:text-[#adb5bd]">
            No achievements found in this category
          </p>
        </div>
      )}
    </div>
  );
}

