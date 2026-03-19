import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { top150Questions } from '../data/top150Questions';
import type { Top150Question } from '../components/UI/Top150DetailsModal';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
  interviewMode: boolean;
}

const Chapter13_Top150: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Top 150 Must-Solve Patterns</h1>
            <p className="text-gray-400">The most important 150 LeetCode & Interview questions with comprehensive Java solutions and analysis.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-hard">Hard</span>
          <span className="text-gray-600 text-sm ml-2">+150 XP</span>
        </div>
      </motion.div>

      <section className="space-y-4">
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
          <p className="text-sm text-amber-300/80 leading-relaxed">
            💡 <strong>Pro Tip:</strong> Click on any question to view a detailed breakdown with all approaches (Naive → Better → Optimal), step-by-step code explanations, and complexity analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {top150Questions.map((q: Top150Question, i: number) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => navigate(`/question/${q.id}`)}
              className="bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/80 hover:border-primary-500/40 rounded-xl p-4 cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-bold group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                    <span className="text-gray-500 font-mono text-xs mr-1.5">#{i + 1}</span>
                    {q.title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                    q.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    q.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {q.analysis.substring(0, 100)}...
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="px-2 py-1 rounded bg-gray-900 border border-gray-700 text-[10px] text-gray-400 font-medium">
                  {q.pattern}
                </span>
                <span className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                  View →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/company-strategy')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">🏠 Home</button>
      </div>
    </div>
  );
};

export default Chapter13_Top150;
