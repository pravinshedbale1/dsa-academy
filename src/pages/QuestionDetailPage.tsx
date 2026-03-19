import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { top150Questions } from '../data/top150Questions';
import type { SolutionApproach } from '../components/UI/Top150DetailsModal';

const APPROACH_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  Naive: {
    bg: 'bg-rose-500/5',
    border: 'border-rose-500/20',
    text: 'text-rose-400',
    badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  },
  Better: {
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  Optimal: {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
};

function getColors(type: string) {
  return APPROACH_COLORS[type] || APPROACH_COLORS.Optimal;
}

function ApproachSection({ approach, index }: { approach: SolutionApproach; index: number }) {
  const colors = getColors(approach.type);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(approach.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className={`rounded-2xl border ${colors.border} ${colors.bg} overflow-hidden`}
    >
      {/* Approach Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-800/30">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors.badge}`}>
            {approach.type}
          </span>
          <span className="text-xs text-gray-500 font-medium">Approach {index + 1}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 font-bold uppercase">Time</span>
            <span className="text-xs font-mono text-primary-400 bg-gray-800/50 px-2 py-0.5 rounded">{approach.timeComplexity}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 font-bold uppercase">Space</span>
            <span className="text-xs font-mono text-cyan-400 bg-gray-800/50 px-2 py-0.5 rounded">{approach.spaceComplexity}</span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="p-5 border-b border-gray-800/20">
        <h4 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">📖 Explanation</h4>
        <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
          {approach.explanation}
        </p>
      </div>

      {/* Code Block */}
      <div className="p-5 border-b border-gray-800/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">💻 Java Code</h4>
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>
        <pre className="p-4 bg-gray-950 border border-gray-800 rounded-xl overflow-x-auto custom-scrollbar">
          <code className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
            {approach.code}
          </code>
        </pre>
      </div>

      {/* Step-by-Step Code Explanation */}
      {approach.codeExplanation && (
        <div className="p-5">
          <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">🔍 Step-by-Step Code Walkthrough</h4>
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
              {approach.codeExplanation}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

const QuestionDetailPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();

  const question = top150Questions.find(q => q.id === questionId);

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-gray-400 text-lg">Question not found.</p>
        <button onClick={() => navigate('/chapter/top-150')} className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-500 transition-colors">
          ← Back to Questions
        </button>
      </div>
    );
  }

  const questionIndex = top150Questions.findIndex(q => q.id === questionId);
  const prevQuestion = questionIndex > 0 ? top150Questions[questionIndex - 1] : null;
  const nextQuestion = questionIndex < top150Questions.length - 1 ? top150Questions[questionIndex + 1] : null;

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/chapter/top-150')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to All Questions
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight">
                {question.title}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                question.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                question.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                'bg-rose-500/20 text-rose-400 border-rose-500/30'
              }`}>
                {question.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 text-xs border border-primary-500/20 font-medium">
                {question.pattern}
              </span>
              <a
                href={question.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1"
              >
                Solve on LeetCode ↗
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Problem Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h2 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">🎯 Problem Analysis</h2>
        <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-800/50">
          <p className="text-sm text-gray-400 leading-relaxed">{question.analysis}</p>
        </div>
      </motion.div>

      {/* Hints */}
      {question.hints.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">💡 Key Hints</h2>
          <ul className="space-y-2 list-disc list-inside text-sm text-amber-300/80 bg-amber-500/5 p-5 rounded-xl border border-amber-500/10">
            {question.hints.map((hint, i) => (
              <li key={i} className="leading-relaxed">{hint}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* All Approaches */}
      <div>
        <h2 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">
          💻 Solutions ({question.approaches.length} {question.approaches.length === 1 ? 'Approach' : 'Approaches'})
        </h2>
        <div className="space-y-6">
          {question.approaches.map((approach, i) => (
            <ApproachSection key={approach.type} approach={approach} index={i} />
          ))}
        </div>
      </div>

      {/* Navigation between questions */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        {prevQuestion ? (
          <button
            onClick={() => navigate(`/question/${prevQuestion.id}`)}
            className="px-5 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors text-sm"
          >
            ← {prevQuestion.title.length > 30 ? prevQuestion.title.substring(0, 30) + '…' : prevQuestion.title}
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={() => navigate('/chapter/top-150')}
          className="px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors text-sm"
        >
          📋 All Questions
        </button>
        {nextQuestion ? (
          <button
            onClick={() => navigate(`/question/${nextQuestion.id}`)}
            className="px-5 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors text-sm"
          >
            {nextQuestion.title.length > 30 ? nextQuestion.title.substring(0, 30) + '…' : nextQuestion.title} →
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default QuestionDetailPage;
