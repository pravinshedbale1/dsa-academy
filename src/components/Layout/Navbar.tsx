import React from 'react';
import { motion } from 'framer-motion';
import { ComplexityBadge } from '../UI/ComplexityBadge';

interface NavbarProps {
  title: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  interviewMode: boolean;
  onToggleInterviewMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  timeComplexity,
  spaceComplexity,
  darkMode,
  onToggleDarkMode,
  interviewMode,
  onToggleInterviewMode,
}) => {
  return (
    <motion.header
      className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/50"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-4">
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
          {timeComplexity && spaceComplexity && (
            <ComplexityBadge time={timeComplexity} space={spaceComplexity} />
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Interview Mode Toggle */}
          <button
            onClick={onToggleInterviewMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              interviewMode
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-gray-500 hover:text-gray-300 bg-gray-800/50 border border-gray-700/50'
            }`}
          >
            🎯 Interview Mode
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </motion.header>
  );
};
