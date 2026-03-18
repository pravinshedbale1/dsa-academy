import { MustSolvePanel } from '../components/UI/MustSolvePanel';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CompanyTag } from '../components/UI/CompanyTag';
import { companyData, patternCards, complexityTable } from '../data/companyData';

interface Props { onComplete: () => void; isCompleted: boolean; interviewMode: boolean; }

const Chapter12_InterviewPrep: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 12: Interview Strategies</h1>
            <p className="text-gray-400">Company-specific prep, patterns, and cheat sheets</p>
          </div>
        </div>
        <div className="flex items-center gap-2"><span className="badge badge-hard">Hard</span><span className="text-gray-600 text-sm ml-2">+50 XP</span></div>
      </motion.div>

      {/* UMPIRE Framework */}
      <section className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="theory-card">
          <h3 className="theory-heading">🎯 The UMPIRE Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {[
              { letter: 'U', title: 'Understand', desc: 'Restate the problem. Ask clarifying questions.' },
              { letter: 'M', title: 'Match', desc: 'Match to known patterns (sliding window, DFS, DP).' },
              { letter: 'P', title: 'Plan', desc: 'Write pseudocode. Explain approach before coding.' },
              { letter: 'I', title: 'Implement', desc: 'Write clean, modular code.' },
              { letter: 'R', title: 'Review', desc: 'Walk through with an example. Check edge cases.' },
              { letter: 'E', title: 'Evaluate', desc: 'Analyze time & space complexity.' },
            ].map(step => (
              <div key={step.letter} className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl font-bold text-primary-400 font-display">{step.letter}</span>
                <div>
                  <h4 className="text-primary-400 font-bold text-sm">{step.title}</h4>
                  <p className="text-xs text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pattern Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
          <h3 className="theory-heading">🧠 Pattern Recognition Cheat Sheet</h3>
          <p className="theory-text">When you see these signals, try these patterns:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {patternCards.map((card, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <h4 className="text-primary-400 font-bold text-sm mb-1">{card.name}</h4>
                <p className="text-xs text-gray-400 mb-2">{card.signal}</p>
                <div className="flex flex-wrap gap-1">
                  {card.problems.map((p, j) => (
                    <span key={j} className="px-2 py-0.5 rounded-full bg-gray-700/50 text-[10px] text-gray-400">{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Complexity Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
          <h3 className="theory-heading">📊 Big-O Reference Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-3">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-2 px-2 text-left text-gray-400">Structure</th>
                  <th className="py-2 px-2 text-center text-gray-400">Access</th>
                  <th className="py-2 px-2 text-center text-gray-400">Search</th>
                  <th className="py-2 px-2 text-center text-gray-400">Insert</th>
                  <th className="py-2 px-2 text-center text-gray-400">Delete</th>
                  <th className="py-2 px-2 text-center text-gray-400">Space</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {complexityTable.map((row, i) => (
                  <tr key={i} className="border-b border-gray-800/50">
                    <td className="py-2 px-2 font-medium">{row.structure}</td>
                    {[row.accessAvg, row.searchAvg, row.insertAvg, row.deleteAvg, row.space].map((val, j) => (
                      <td key={j} className="py-2 px-2 text-center">
                        <span className={`badge ${val.includes('1') && !val.includes('n') ? 'bg-emerald-500/20 text-emerald-400' : val.includes('log') ? 'bg-primary-500/20 text-primary-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {val}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Company Profiles */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🏢 Company Deep Dives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyData.map(company => {
            const easy = company.difficultyDistribution.find(d => d.name === 'Easy');
            const medium = company.difficultyDistribution.find(d => d.name === 'Medium');
            const hard = company.difficultyDistribution.find(d => d.name === 'Hard');
            return (
              <motion.div key={company.name} className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -3 }}>
                <CompanyTag company={company.name} size="md" />

                <div>
                  <h4 className="text-sm font-bold text-gray-300 mb-2">📋 Favorite Topics</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {company.favoriteTopics.map(t => (
                      <span key={t.topic} className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 text-[10px]">{t.topic}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-300 mb-2">⚡ Signature Patterns</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {company.signaturePatterns.map(p => (
                      <span key={p} className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px]">{p}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-300 mb-2">📊 Difficulty Distribution</h4>
                  <div className="flex items-center gap-0 h-4 rounded-full overflow-hidden bg-gray-800">
                    {easy && <div className="h-full bg-emerald-500" style={{ width: `${easy.value}%` }} />}
                    {medium && <div className="h-full bg-amber-500" style={{ width: `${medium.value}%` }} />}
                    {hard && <div className="h-full bg-rose-500" style={{ width: `${hard.value}%` }} />}
                  </div>
                  <div className="flex items-center justify-between text-[10px] mt-1">
                    <span className="text-emerald-400">Easy {easy?.value}%</span>
                    <span className="text-amber-400">Medium {medium?.value}%</span>
                    <span className="text-rose-400">Hard {hard?.value}%</span>
                  </div>
                </div>

                {company.redFlags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-rose-400 mb-1">🚩 Red Flags</h4>
                    <ul className="text-xs text-gray-400 space-y-0.5">
                      {company.redFlags.map((f, i) => <li key={i}>• {f}</li>)}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-white">❌ Common Interview Mistakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { mistake: 'Jumping to code immediately', fix: 'Spend 5-10 min understanding and planning' },
            { mistake: 'Ignoring edge cases', fix: 'Ask: empty? null? single element? duplicates?' },
            { mistake: 'Not communicating', fix: 'Think out loud! Explain your reasoning' },
            { mistake: 'Getting stuck silently', fix: 'Tell the interviewer. Ask for a small hint' },
            { mistake: 'Over-optimizing too early', fix: 'Start brute force, then optimize' },
            { mistake: 'Not testing your code', fix: 'Dry-run with a small example' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 flex gap-3">
              <span className="text-rose-400 text-lg mt-0.5">✗</span>
              <div>
                <p className="text-sm text-rose-300 font-medium">{item.mistake}</p>
                <p className="text-xs text-emerald-400 mt-0.5">✓ {item.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={12} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/tries')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">🏠 Home</button>
      </div>
    </div>
  );
};

export default Chapter12_InterviewPrep;
