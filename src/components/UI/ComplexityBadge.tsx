import React from 'react';
import { motion } from 'framer-motion';

interface ComplexityBadgeProps {
  time: string;
  space: string;
}

function getColor(complexity: string): string {
  if (complexity.includes('1)')) return 'emerald';
  if (complexity.includes('log n)')) return 'teal';
  if (complexity.includes('n log n)')) return 'orange';
  if (complexity.includes('n²') || complexity.includes('n^2') || complexity.includes('2^n')) return 'rose';
  if (complexity.includes('n)')) return 'amber';
  return 'gray';
}

const colorClasses: Record<string, string> = {
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ time, space }) => {
  const timeColor = getColor(time);
  const spaceColor = getColor(space);

  return (
    <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <span className={`badge border ${colorClasses[timeColor]}`}>
        ⏱ {time}
      </span>
      <span className={`badge border ${colorClasses[spaceColor]}`}>
        💾 {space}
      </span>
    </motion.div>
  );
};
