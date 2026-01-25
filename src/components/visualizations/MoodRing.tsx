import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface MoodRingProps {
  score: number; // 0-100
  size?: number;
}

export function MoodRing({ score, size = 200 }: MoodRingProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Animate score counting up
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(score, current + increment);
      setDisplayScore(Math.round(current));

      if (step >= steps) {
        clearInterval(interval);
        setDisplayScore(score);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score]);

  const getColor = () => {
    if (score >= 75) return { from: '#10b981', to: '#059669', shadow: 'rgba(16, 185, 129, 0.4)' };
    if (score >= 50) return { from: '#f59e0b', to: '#d97706', shadow: 'rgba(245, 158, 11, 0.4)' };
    if (score >= 25) return { from: '#f97316', to: '#ea580c', shadow: 'rgba(249, 115, 22, 0.4)' };
    return { from: '#ef4444', to: '#dc2626', shadow: 'rgba(239, 68, 68, 0.4)' };
  };

  const colors = getColor();
  const radius = (size - 40) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
          />
          
          {/* Animated progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${score})`}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${colors.shadow})`
            }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.from} />
              <stop offset="100%" stopColor={colors.to} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content with pulsing animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-center">
            <motion.div
              key={displayScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl mb-1"
              style={{ color: colors.from }}
            >
              {displayScore}
            </motion.div>
          </div>
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.shadow} 0%, transparent 70%)`,
            opacity: 0.3
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}
