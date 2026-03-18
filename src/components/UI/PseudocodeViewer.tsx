import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface PseudocodeViewerProps {
  lines: string[];
  currentLine: number;
  title?: string;
}

export const PseudocodeViewer: React.FC<PseudocodeViewerProps> = ({ lines, currentLine, title }) => {
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentLine]);

  return (
    <div className="glass-card overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-gray-800 bg-gray-900/50">
          <span className="text-sm font-semibold text-gray-400">{title}</span>
        </div>
      )}
      <div className="p-4 max-h-64 overflow-y-auto font-mono text-sm space-y-0.5">
        {lines.map((line, i) => (
          <div
            key={i}
            ref={i === currentLine ? activeRef : null}
            className="relative"
          >
            <motion.div
              className={`flex items-start gap-3 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                i === currentLine
                  ? 'bg-primary-500/20 border-l-4 border-primary-500'
                  : 'border-l-4 border-transparent'
              }`}
              animate={i === currentLine ? { backgroundColor: 'rgba(99, 102, 241, 0.2)' } : {}}
            >
              <span className="text-gray-600 select-none w-6 text-right flex-shrink-0">
                {i + 1}
              </span>
              <span className={i === currentLine ? 'text-primary-300 font-semibold' : 'text-gray-400'}>
                {line}
              </span>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
