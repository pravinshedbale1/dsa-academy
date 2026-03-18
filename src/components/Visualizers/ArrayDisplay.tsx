import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArrayDisplayProps {
  array: number[];
  highlightIndices?: Map<number, string>; // index -> color class
  pointers?: { label: string; index: number; color: string }[];
  size?: 'sm' | 'md' | 'lg';
  showIndices?: boolean;
}

const sizeClasses = {
  sm: 'w-10 h-10 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-14 h-14 text-base',
};

const colorMap: Record<string, string> = {
  comparing: 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-amber-500/20',
  sorted: 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-emerald-500/20',
  pivot: 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-rose-500/20',
  active: 'bg-violet-500/20 border-violet-500 text-violet-300 shadow-violet-500/20',
  found: 'bg-emerald-500/30 border-emerald-400 text-emerald-200 shadow-emerald-500/30',
  default: 'bg-primary-500/20 border-primary-500/60 text-primary-300',
  window: 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-cyan-500/20',
  insert: 'bg-emerald-500/30 border-emerald-400 text-emerald-200',
  delete: 'bg-rose-500/30 border-rose-500 text-rose-200',
};

export const ArrayDisplay: React.FC<ArrayDisplayProps> = ({
  array,
  highlightIndices = new Map(),
  pointers = [],
  size = 'md',
  showIndices = true,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Array cells */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        <AnimatePresence mode="popLayout">
          {array.map((val, idx) => {
            const highlightColor = highlightIndices.get(idx) || 'default';
            return (
              <motion.div
                key={`${idx}-${val}`}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`
                    ${sizeClasses[size]} rounded-lg border-2 font-mono font-bold
                    flex items-center justify-center transition-all duration-300 shadow-lg
                    ${colorMap[highlightColor]}
                  `}
                >
                  {val}
                </div>
                {showIndices && (
                  <span className="text-[10px] text-gray-500 font-mono">{idx}</span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pointers */}
      {pointers.length > 0 && (
        <div className="relative flex items-center gap-1.5" style={{ width: array.length * (size === 'sm' ? 46 : size === 'md' ? 54 : 62) }}>
          {pointers.map((ptr, i) => {
            const cellWidth = size === 'sm' ? 46 : size === 'md' ? 54 : 62;
            const left = ptr.index * cellWidth + cellWidth / 2;
            return (
              <motion.div
                key={ptr.label}
                className="absolute flex flex-col items-center"
                animate={{ left: left - 12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                initial={false}
              >
                <span className={`text-lg ${ptr.color}`}>▲</span>
                <span className={`text-[10px] font-bold ${ptr.color}`}>{ptr.label}</span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
