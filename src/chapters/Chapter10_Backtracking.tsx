import { MustSolvePanel } from '../components/UI/MustSolvePanel';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CompanyTag } from '../components/UI/CompanyTag';

interface Props { onComplete: () => void; isCompleted: boolean; interviewMode: boolean; }

function NQueensVisualizer() {
  const [n, setN] = useState(4);
  const [board, setBoard] = useState<number[][]>([]);
  const [solutions, setSolutions] = useState<number[][][]>([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const [description, setDescription] = useState('Set board size and solve!');

  const solve = useCallback(() => {
    const allSolutions: number[][][] = [];
    const createBoard = () => Array.from({ length: n }, () => Array(n).fill(0));
    const isSafe = (b: number[][], row: number, col: number) => {
      for (let i = 0; i < row; i++) if (b[i][col] === 1) return false;
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (b[i][j] === 1) return false;
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) if (b[i][j] === 1) return false;
      return true;
    };
    const bt = (b: number[][], row: number) => {
      if (row === n) { allSolutions.push(b.map(r => [...r])); return; }
      for (let col = 0; col < n; col++) { if (isSafe(b, row, col)) { b[row][col] = 1; bt(b, row + 1); b[row][col] = 0; } }
    };
    bt(createBoard(), 0);
    setSolutions(allSolutions);
    setBoard(allSolutions[0] || createBoard());
    setCurrentSolution(0);
    setDescription(`Found ${allSolutions.length} solution(s) for ${n}-Queens! 🎉`);
  }, [n]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">♛ N-Queens Visualizer</h3>
      <div className="bg-gray-900/50 rounded-xl p-6 flex justify-center">
        <div className="inline-grid gap-0" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {board.map((row, r) => row.map((cell, c) => (
            <div key={`${r}-${c}`} className={`w-12 h-12 flex items-center justify-center text-lg border border-gray-700/30 ${(r + c) % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
              {cell === 1 && '♛'}
            </div>
          )))}
        </div>
      </div>
      {solutions.length > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => { const i = currentSolution - 1; if (i >= 0) { setCurrentSolution(i); setBoard(solutions[i]); } }} className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 text-sm">← Prev</button>
          <span className="text-sm text-gray-400">{currentSolution + 1} / {solutions.length}</span>
          <button onClick={() => { const i = currentSolution + 1; if (i < solutions.length) { setCurrentSolution(i); setBoard(solutions[i]); } }} className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 text-sm">Next →</button>
        </div>
      )}
      <p className="text-sm text-primary-300 text-center">{description}</p>
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-400">Size:</label>
        <input type="number" value={n} min={4} max={8} onChange={e => setN(Math.max(4, Math.min(8, parseInt(e.target.value) || 4)))} className="w-20 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm" />
        <button onClick={solve} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Solve</button>
      </div>
    </div>
  );
}

const Chapter10_Backtracking: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔙</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 10: Backtracking</h1>
            <p className="text-gray-400">Try everything, undo what doesn't work</p>
          </div>
        </div>
        <div className="flex items-center gap-2"><span className="badge badge-hard">Hard</span><span className="text-gray-600 text-sm ml-2">+50 XP</span></div>
      </motion.div>

      <section className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="theory-card">
          <h3 className="theory-heading">🔙 What is Backtracking?</h3>
          <p className="theory-text">Imagine you're in a maze 🏰. You walk forward, hit a dead end, walk back to the last fork, and try a different path. That's backtracking!</p>
          <div className="analogy-box">🔑 <strong>Analogy:</strong> Lost your keys? Check each room systematically, backtrack when not found.</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
          <h3 className="theory-heading">📋 Template</h3>
          <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-sm">
            <p className="text-gray-400">{'backtrack(choices, state):'}</p>
            <p className="text-emerald-400 ml-4">{'if is_solution: save & return'}</p>
            <p className="text-amber-400 ml-4">{'for choice in choices:'}</p>
            <p className="text-rose-400 ml-8">{'make → explore → undo'}</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
          <h3 className="theory-heading">⚡ Pruning</h3>
          <p className="theory-text">Unlike brute force, backtracking <strong>prunes</strong> branches early when they can't lead to a valid solution. This is what makes it practical despite exponential worst-case complexity.</p>
        </motion.div>
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizers</h2>
        <NQueensVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white">🏢 Company Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ company: 'Google', problem: 'Word Search in grid' }, { company: 'Amazon', problem: 'Generate All Subsets' }, { company: 'Meta', problem: 'Letter Combos of Phone Number' }].map(c => (
            <motion.div key={c.company} className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
              <CompanyTag company={c.company} size="md" />
              <p className="text-sm text-gray-300">{c.problem}</p>
            </motion.div>
          ))}
        </div>
      </section>

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={10} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/dp')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/tries')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter10_Backtracking;
