import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompanyTag } from './CompanyTag';
import { mustSolveProblems } from '../../data/mustSolveProblems';
import type { MustSolveProblem } from '../../data/mustSolveProblems';

interface MustSolvePanelProps {
  chapterId: number;
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const cls = difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    : difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    : 'bg-rose-500/20 text-rose-400 border-rose-500/30';
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${cls}`}>{difficulty}</span>;
}

function ProblemCard({ problem, index }: { problem: MustSolveProblem; index: number }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-gray-900/60 border border-gray-800/60 rounded-xl p-4 hover:border-primary-500/30 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs text-gray-600 font-mono w-5">#{index + 1}</span>
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white hover:text-primary-400 transition-colors truncate"
            >
              {problem.name} ↗
            </a>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] text-gray-500">
              ⏱ <span className="text-primary-400 font-mono">{problem.timeComplexity}</span>
            </span>
            <span className="text-[10px] text-gray-500">
              💾 <span className="text-cyan-400 font-mono">{problem.spaceComplexity}</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-gray-800/80 text-[10px] text-amber-400 font-medium">
              {problem.pattern}
            </span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            {problem.companies.slice(0, 4).map(c => (
              <span key={c} className="px-1.5 py-0.5 rounded bg-gray-800/50 text-[9px] text-gray-400">{c}</span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="px-2 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs text-gray-400 hover:text-amber-400 transition-colors shrink-0"
          title="Show hint"
        >
          💡
        </button>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-gray-800/50">
              <p className="text-xs text-amber-300/80 leading-relaxed">
                💡 <strong>Hint:</strong> {problem.hint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export const MustSolvePanel: React.FC<MustSolvePanelProps> = ({ chapterId }) => {
  const problems = mustSolveProblems[chapterId] || [];

  if (problems.length === 0) return null;

  const easyCount = problems.filter(p => p.difficulty === 'Easy').length;
  const medCount = problems.filter(p => p.difficulty === 'Medium').length;
  const hardCount = problems.filter(p => p.difficulty === 'Hard').length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
          🎯 Must-Solve Problems
        </h2>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">{easyCount} Easy</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">{medCount} Med</span>
          <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400">{hardCount} Hard</span>
        </div>
      </div>

      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
        <p className="text-xs text-amber-300/70">
          🎯 <strong>Interview Mode active.</strong> These are curated, standard problems from Striver's SDE Sheet, Blind 75, and NeetCode 150.
          Click 💡 to reveal hints. Links open on LeetCode.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {problems.map((problem, i) => (
          <ProblemCard key={problem.name} problem={problem} index={i} />
        ))}
      </div>
    </motion.section>
  );
};
