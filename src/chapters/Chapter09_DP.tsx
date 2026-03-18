import { MustSolvePanel } from '../components/UI/MustSolvePanel';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlgorithmControls } from '../components/UI/AlgorithmControls';
import { CompanyTag } from '../components/UI/CompanyTag';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';
import type { AlgorithmStep } from '../hooks/useAlgorithmPlayer';

interface Props { onComplete: () => void; isCompleted: boolean; interviewMode: boolean; }

function TheorySection() {
  return (
    <section className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="theory-card">
        <h3 className="theory-heading">🧩 What is Dynamic Programming?</h3>
        <p className="theory-text">
          Imagine you're climbing stairs 🪜 and someone asks: "How many ways can you reach step 10?" You realize: to reach step 10, you can come from step 9 (1 step) or step 8 (2 steps). So ways(10) = ways(9) + ways(8). And ways(9) = ways(8) + ways(7). See the pattern? <strong>You're solving the same smaller problems over and over!</strong>
        </p>
        <div className="analogy-box">
          📚 <strong>Real-life analogy:</strong> Imagine calculating your monthly expenses. Instead of re-adding January's expenses every time you need the Jan-March total, you save January's total and just add February and March. That's <strong>memoization</strong> — remembering past answers to avoid re-doing work!
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
        <h3 className="theory-heading">🧠 Two Key Ingredients for DP</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
            <h4 className="text-primary-400 font-bold text-sm mb-2">1. Overlapping Subproblems</h4>
            <p className="text-xs text-gray-400">The same subproblem is solved multiple times. Without DP, you'd waste time recalculating. With DP, you compute each once and cache it.</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <h4 className="text-amber-400 font-bold text-sm mb-2">2. Optimal Substructure</h4>
            <p className="text-xs text-gray-400">The optimal solution to the problem can be built from optimal solutions of its subproblems. Like: shortest path A→C through B = shortest A→B + shortest B→C.</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
        <h3 className="theory-heading">🔝 Top-Down vs Bottom-Up</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <h4 className="text-emerald-400 font-bold text-sm mb-2">Top-Down (Memoization)</h4>
            <p className="text-xs text-gray-400">Start with the big problem, recursively break it down, cache results. Think: "I need fib(10), which needs fib(9) and fib(8)..."</p>
            <p className="text-xs text-emerald-400 mt-1">✅ More intuitive, same as recursion + cache</p>
          </div>
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Bottom-Up (Tabulation)</h4>
            <p className="text-xs text-gray-400">Start with the smallest subproblems, build up to the answer. Think: "I know fib(0)=0, fib(1)=1, now compute fib(2), fib(3)..."</p>
            <p className="text-xs text-primary-400 mt-1">✅ No recursion overhead, often faster</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="theory-card">
        <h3 className="theory-heading">🎯 6 Common DP Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {[
            { name: 'Fibonacci', desc: 'Current = sum of previous 1-2', examples: 'Climbing Stairs, House Robber', color: 'emerald' },
            { name: 'Grid DP', desc: 'Navigate a 2D grid optimally', examples: 'Unique Paths, Min Path Sum', color: 'primary' },
            { name: 'Subset DP', desc: 'Choose items with constraints', examples: 'Knapsack, Partition Equal', color: 'amber' },
            { name: 'Interval DP', desc: 'Optimal over ranges/intervals', examples: 'Burst Balloons, Matrix Chain', color: 'rose' },
            { name: 'String DP', desc: 'Compare/transform two strings', examples: 'LCS, Edit Distance', color: 'violet' },
            { name: 'State Machine', desc: 'Track states with transitions', examples: 'Stock Buy/Sell, Paint House', color: 'cyan' },
          ].map(p => (
            <div key={p.name} className={`bg-${p.color}-500/10 border border-${p.color}-500/20 rounded-xl p-3`}>
              <h4 className={`text-${p.color}-400 font-bold text-sm mb-1`}>{p.name}</h4>
              <p className="text-xs text-gray-400">{p.desc}</p>
              <p className="text-[10px] text-gray-500 mt-1">{p.examples}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Fibonacci Comparison Visualizer ───
function FibonacciVisualizer() {
  const [n, setN] = useState(8);
  const [dpTable, setDpTable] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [recursiveCalls, setRecursiveCalls] = useState(0);
  const [dpCalls, setDpCalls] = useState(0);
  const [description, setDescription] = useState('Compare recursive (exponential) vs DP (linear)!');

  const runComparison = useCallback(() => {
    // Count recursive calls
    let recCount = 0;
    const fibRec = (x: number): number => { recCount++; if (x <= 1) return x; return fibRec(x - 1) + fibRec(x - 2); };
    fibRec(n);
    setRecursiveCalls(recCount);

    // Animate DP table
    const table: number[] = [0, 1];
    setDpTable([0, 1]);
    setDpCalls(0);
    let dpCount = 2;
    let idx = 2;

    const interval = setInterval(() => {
      if (idx > n) {
        clearInterval(interval);
        setCurrentIdx(-1);
        setDpCalls(dpCount);
        setDescription(`Done! Recursive: ${recCount} calls 💥 vs DP: ${dpCount} calls ⚡`);
        return;
      }
      table[idx] = table[idx - 1] + table[idx - 2];
      setDpTable([...table]);
      setCurrentIdx(idx);
      dpCount++;
      setDescription(`dp[${idx}] = dp[${idx-1}] + dp[${idx-2}] = ${table[idx-1]} + ${table[idx-2]} = ${table[idx]}`);
      idx++;
    }, 500);
  }, [n]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">📊 Visualizer: Fibonacci — Recursion vs DP</h3>
      <p className="text-sm text-gray-400">See why naive recursion is terrible and DP saves the day!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-center">
          <h4 className="text-rose-400 font-bold text-sm mb-2">Naive Recursion</h4>
          <div className="text-3xl font-bold font-mono text-rose-400">{recursiveCalls}</div>
          <span className="text-xs text-gray-500">function calls (O(2ⁿ) 💥)</span>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <h4 className="text-emerald-400 font-bold text-sm mb-2">DP (Bottom-Up)</h4>
          <div className="text-3xl font-bold font-mono text-emerald-400">{dpCalls}</div>
          <span className="text-xs text-gray-500">computations (O(n) ⚡)</span>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-4">
        <div className="text-xs text-gray-500 mb-2">DP Table:</div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {dpTable.map((val, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
              className={`flex flex-col items-center gap-0.5`}>
              <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm ${
                i === currentIdx ? 'border-amber-500 bg-amber-500/20 text-amber-300' :
                'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
              }`}>
                {val}
              </div>
              <span className="text-[9px] text-gray-600 font-mono">f({i})</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-400">n =</label>
        <input type="number" value={n} min={2} max={20} onChange={e => setN(Math.min(20, Math.max(2, parseInt(e.target.value) || 2)))}
          className="w-20 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none" />
        <button onClick={runComparison} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Compare!</button>
      </div>
    </div>
  );
}

// ─── Coin Change Visualizer ───
function CoinChangeVisualizer() {
  const coins = [1, 3, 4];
  const [target, setTarget] = useState(6);
  const [dpRow, setDpRow] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [description, setDescription] = useState('Find minimum coins to make the target amount!');

  const runCoinChange = useCallback(() => {
    const dp = Array(target + 1).fill(Infinity);
    dp[0] = 0;
    setDpRow([...dp]);
    let amt = 1;

    const interval = setInterval(() => {
      if (amt > target) {
        clearInterval(interval);
        setCurrentIdx(-1);
        setDescription(dp[target] === Infinity ? `Cannot make ${target} with given coins` : `Minimum coins for ${target}: ${dp[target]} 🎉`);
        return;
      }
      for (const coin of coins) {
        if (coin <= amt && dp[amt - coin] + 1 < dp[amt]) {
          dp[amt] = dp[amt - coin] + 1;
        }
      }
      setDpRow([...dp]);
      setCurrentIdx(amt);
      setDescription(`dp[${amt}] = ${dp[amt] === Infinity ? '∞' : dp[amt]} (trying coins: ${coins.filter(c => c <= amt).join(', ')})`);
      amt++;
    }, 600);
  }, [target, coins]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">💰 Visualizer: Coin Change</h3>
      <p className="text-sm text-gray-400">Given coins [{coins.join(', ')}], find the minimum number to make the target.</p>

      <div className="bg-gray-900/50 rounded-xl p-4">
        <div className="flex items-center gap-1 flex-wrap">
          {dpRow.map((val, i) => (
            <motion.div key={i} layout
              className={`flex flex-col items-center gap-0.5`}>
              <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-xs ${
                i === currentIdx ? 'border-amber-500 bg-amber-500/20 text-amber-300' :
                val === Infinity ? 'border-gray-700 bg-gray-800/50 text-gray-600' :
                val === 0 ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' :
                'border-primary-500/50 bg-primary-500/10 text-primary-300'
              }`}>
                {val === Infinity ? '∞' : val}
              </div>
              <span className="text-[8px] text-gray-600 font-mono">${i}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-400">Target:</label>
        <input type="number" value={target} min={1} max={20} onChange={e => setTarget(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none" />
        <button onClick={runCoinChange} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Solve</button>
      </div>
    </div>
  );
}

const Chapter09_DP: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧩</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 9: Dynamic Programming</h1>
            <p className="text-gray-400">Break big problems into small, remembered pieces</p>
          </div>
        </div>
        <div className="flex items-center gap-2"><span className="badge badge-hard">Hard</span><span className="text-gray-600 text-sm ml-2">+50 XP</span></div>
      </motion.div>

      <TheorySection />

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizers</h2>
        <FibonacciVisualizer />
        <CoinChangeVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">🏢 Company Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { company: 'Google', problem: 'Word Break — can string be segmented into dictionary words?', tip: 'Use dp[i] = can we form substring[0..i]?' },
            { company: 'Amazon', problem: 'Edit Distance — min operations to convert string A to B', tip: 'Amazon uses this for search typo correction!' },
            { company: 'Meta', problem: 'Coin Change variations — minimum coins, number of ways', tip: 'Think about which coins you CAN use at each amount' },
          ].map(c => (
            <motion.div key={c.company} className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
              <CompanyTag company={c.company} size="md" />
              <p className="text-sm text-gray-300">{c.problem}</p>
              <p className="text-xs text-amber-400/80 italic">💡 {c.tip}</p>
            </motion.div>
          ))}
        </div>
      </section>

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={9} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/graphs')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/backtracking')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter09_DP;
