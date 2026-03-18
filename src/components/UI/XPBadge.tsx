import React from 'react';
import { motion } from 'framer-motion';

interface XPBadgeProps {
  xp: number;
  maxXP: number;
}

export const XPBadge: React.FC<XPBadgeProps> = ({ xp, maxXP }) => {
  const percentage = Math.min((xp / maxXP) * 100, 100);
  const level = Math.floor(xp / 50) + 1;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400">Level {level}</span>
        <span className="text-xs font-mono text-primary-400">{xp} / {maxXP} XP</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-600 via-primary-500 to-emerald-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
