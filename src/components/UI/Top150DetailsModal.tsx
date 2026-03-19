import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ApproachType = 'Naive' | 'Better' | 'Optimal';

export interface SolutionApproach {
  type: ApproachType;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  codeExplanation?: string;
}

export interface Top150Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
  leetcodeUrl: string;
  analysis: string;
  hints: string[];
  approaches: SolutionApproach[];
}

interface Top150DetailsModalProps {
  question: Top150Question;
  onClose: () => void;
}

export const Top150DetailsModal: React.FC<Top150DetailsModalProps> = ({ question, onClose }) => {
  const [activeTab, setActiveTab] = useState<ApproachType>(
    question.approaches.length > 0 ? question.approaches[question.approaches.length - 1].type : 'Optimal'
  );

  const activeApproach = question.approaches.find(a => a.type === activeTab);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-gray-900 border border-gray-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800 bg-gray-900/50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-display font-bold text-white leading-tight">
                {question.title}
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                question.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                question.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                'bg-rose-500/20 text-rose-400 border-rose-500/30'
              }`}>
                {question.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400 text-[10px] border border-primary-500/30">
                {question.pattern}
              </span>
            </div>
            <a href={question.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-primary-400 transition-colors inline-block">
              Solve on LeetCode ↗
            </a>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {/* Analysis & Hints */}
          <div className="mb-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">🎯 Problem Analysis</h3>
              <p className="text-sm text-gray-400 leading-relaxed bg-gray-800/30 p-4 rounded-xl border border-gray-800/50">
                {question.analysis}
              </p>
            </div>
            {question.hints.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">💡 Key Hints</h3>
                <ul className="space-y-1.5 list-disc list-inside text-sm text-amber-300/80 bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                  {question.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Solution Approaches */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">💻 Solutions (Java)</h3>
            
            {/* Tabs */}
            <div className="flex items-center gap-2 p-1 bg-gray-800/50 rounded-lg w-fit">
              {question.approaches.map(approach => (
                <button
                  key={approach.type}
                  onClick={() => setActiveTab(approach.type)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === approach.type 
                      ? 'bg-primary-600 text-white shadow-sm' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  {approach.type}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <AnimatePresence mode="wait">
              {activeApproach && (
                <motion.div
                  key={activeApproach.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4 bg-gray-800/20 p-5 rounded-xl border border-gray-800"
                >
                  {/* Explanation */}
                  <div>
                    <h4 className="font-semibold text-white mb-2">{activeApproach.type} Approach</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {activeApproach.explanation}
                    </p>
                  </div>

                  {/* Complexity */}
                  <div className="flex items-center gap-4 py-3 border-y border-gray-800/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Time</span>
                      <span className="text-sm font-mono text-primary-400">{activeApproach.timeComplexity}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-800"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Space</span>
                      <span className="text-sm font-mono text-cyan-400">{activeApproach.spaceComplexity}</span>
                    </div>
                  </div>

                  {/* Code Block */}
                  <div>
                    <div className="flex items-center justify-between bg-gray-950 px-4 py-2 rounded-t-lg border border-gray-800 border-b-0">
                      <span className="text-xs font-mono text-gray-500">Java</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(activeApproach.code)}
                        className="text-xs text-gray-500 hover:text-primary-400 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="p-4 bg-gray-950 border border-gray-800 rounded-b-lg overflow-x-auto custom-scrollbar">
                      <code className="text-sm font-mono text-gray-300 leading-snug">
                        {activeApproach.code}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
