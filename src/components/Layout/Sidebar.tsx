import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { chapters } from '../../data/chapters';
import { XPBadge } from '../UI/XPBadge';

interface SidebarProps {
  completedChapters: number[];
  totalXP: number;
  maxXP: number;
  streak: number;
}

type DifficultyFilter = 'All' | 'Easy' | 'Medium' | 'Hard';

export const Sidebar: React.FC<SidebarProps> = ({ completedChapters, totalXP, maxXP, streak }) => {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('All');
  const [collapsed, setCollapsed] = useState(false);

  const filteredChapters = chapters.filter(ch => {
    if (difficultyFilter === 'All') return true;
    return ch.difficulty.includes(difficultyFilter);
  });

  return (
    <motion.aside
      className={`fixed left-0 top-0 h-screen bg-gray-950 border-r border-gray-800/50 z-50 flex flex-col overflow-hidden ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20">
              D
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <h1 className="font-display font-bold text-white text-sm">DSA Academy</h1>
                  <p className="text-[10px] text-gray-500">Interactive Learning</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Streak */}
          <div className="px-4 py-3 border-b border-gray-800/50">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <div>
                <span className="text-sm font-bold text-orange-400">{streak}</span>
                <span className="text-xs text-gray-500 ml-1">day streak</span>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="px-4 py-3 border-b border-gray-800/50">
            <XPBadge xp={totalXP} maxXP={maxXP} />
          </div>

          {/* Difficulty filter */}
          <div className="px-4 py-3 border-b border-gray-800/50">
            <div className="flex gap-1">
              {(['All', 'Easy', 'Medium', 'Hard'] as DifficultyFilter[]).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficultyFilter(d)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    difficultyFilter === d
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Chapter list */}
          <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
            {filteredChapters.map(ch => {
              const isCompleted = completedChapters.includes(ch.id);
              return (
                <NavLink
                  key={ch.id}
                  to={`/chapter/${ch.slug}`}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                  }
                >
                  <span className="text-base flex-shrink-0">{ch.icon}</span>
                  <span className="flex-1 truncate text-xs">{ch.title}</span>
                  {isCompleted ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full border border-gray-600 flex-shrink-0" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800/50">
            <div className="text-center">
              <p className="text-[10px] text-gray-600">
                {completedChapters.length} / {chapters.length} chapters done
              </p>
            </div>
          </div>
        </>
      )}
    </motion.aside>
  );
};
