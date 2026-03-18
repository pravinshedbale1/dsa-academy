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
        <h3 className="theory-heading">⛰️ What is a Heap?</h3>
        <p className="theory-text">
          Imagine a <strong>VIP line</strong> at a theme park 🎢 where the person with the <em>highest</em> priority always goes first, regardless of when they arrived. A <strong>heap</strong> is a data structure that always keeps the smallest (min-heap) or largest (max-heap) element at the top and can give it to you instantly!
        </p>
        <div className="analogy-box">
          🏥 <strong>Real-life analogy — Emergency Room:</strong> In an ER, patients are NOT served first-come-first-served. The most critical patient gets treated first (highest priority). A heap works the same way — it's a priority queue! You can add patients (insert) and always get the most critical one first (extract-min/max).
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
        <h3 className="theory-heading">🏗️ How Heaps Work</h3>
        <p className="theory-text">
          A heap is a <strong>complete binary tree</strong> stored as an <strong>array</strong>! The magic trick:
        </p>
        <div className="bg-gray-800/50 rounded-xl p-4 font-mono text-sm space-y-1 mt-3">
          <p className="text-gray-400">For node at index <span className="text-primary-400">i</span>:</p>
          <p className="text-emerald-400">  Parent = floor((i - 1) / 2)</p>
          <p className="text-amber-400">  Left child = 2*i + 1</p>
          <p className="text-rose-400">  Right child = 2*i + 2</p>
        </div>
        <p className="text-sm text-gray-400 mt-3">
          <strong>Min-heap property:</strong> Every parent is ≤ its children. So the root (index 0) is always the minimum!
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
        <h3 className="theory-heading">🔄 Two Key Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <h4 className="text-emerald-400 font-bold text-sm mb-2">Bubble Up (after insert)</h4>
            <p className="text-xs text-gray-400">Add element to the end, then swap with parent while it's smaller than parent. It "bubbles up" to its correct position.</p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
            <h4 className="text-rose-400 font-bold text-sm mb-2">Bubble Down (after extract)</h4>
            <p className="text-xs text-gray-400">Remove root, move last element to root, then swap with smaller child while it's larger than a child. It "sinks down".</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="theory-card">
        <h3 className="theory-heading">⏱️ Time Complexity</h3>
        <table className="w-full text-sm mt-3">
          <thead><tr className="border-b border-gray-800"><th className="py-2 px-3 text-left text-gray-400">Operation</th><th className="py-2 px-3 text-center text-gray-400">Time</th><th className="py-2 px-3 text-left text-gray-400">Why?</th></tr></thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Get min/max</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td><td className="py-2 px-3 text-gray-500">Always at root (index 0)</td></tr>
            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Insert</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(log n)</span></td><td className="py-2 px-3 text-gray-500">Bubble up through tree height</td></tr>
            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Extract min/max</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(log n)</span></td><td className="py-2 px-3 text-gray-500">Bubble down through tree height</td></tr>
            <tr><td className="py-2 px-3">Build heap (heapify)</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(n)</span></td><td className="py-2 px-3 text-gray-500">Bottom-up is more efficient than n inserts</td></tr>
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}

function MinHeapVisualizer() {
  const [heap, setHeap] = useState([3, 10, 15, 30, 20, 25]);
  const [inputValue, setInputValue] = useState('');
  const [highlights, setHighlights] = useState<Set<number>>(new Set());
  const [description, setDescription] = useState('Insert or extract to see the heap maintain its property!');

  const swap = (arr: number[], i: number, j: number) => { [arr[i], arr[j]] = [arr[j], arr[i]]; };

  const handleInsert = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    const newHeap = [...heap, val];
    let i = newHeap.length - 1;
    const steps: number[][] = [[i]];
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (newHeap[parent] > newHeap[i]) {
        swap(newHeap, parent, i);
        steps.push([parent, i]);
        i = parent;
      } else break;
    }
    setHeap(newHeap);
    setInputValue('');
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx >= steps.length) { clearInterval(interval); setHighlights(new Set()); setDescription(`Inserted ${val}! Heap property maintained.`); return; }
      setHighlights(new Set(steps[stepIdx]));
      setDescription(`Bubbling up... swapping with parent`);
      stepIdx++;
    }, 600);
  };

  const handleExtract = () => {
    if (heap.length === 0) return;
    const min = heap[0];
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    let i = 0;
    while (true) {
      const left = 2 * i + 1, right = 2 * i + 2;
      let smallest = i;
      if (left < newHeap.length && newHeap[left] < newHeap[smallest]) smallest = left;
      if (right < newHeap.length && newHeap[right] < newHeap[smallest]) smallest = right;
      if (smallest === i) break;
      swap(newHeap, i, smallest);
      i = smallest;
    }
    setHeap(newHeap);
    setDescription(`Extracted minimum: ${min}! New root: ${newHeap[0] ?? 'empty'}`);
  };

  const getLevel = (idx: number) => Math.floor(Math.log2(idx + 1));
  const maxLevel = heap.length > 0 ? Math.floor(Math.log2(heap.length)) : 0;

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">⛰️ Visualizer: Min Heap</h3>
      <p className="text-sm text-gray-400">Both tree view and array view — watch them update simultaneously!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tree view */}
        <div className="bg-gray-900/50 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-3">Tree View:</div>
          <div className="space-y-3">
            {Array.from({ length: maxLevel + 1 }).map((_, level) => {
              const start = Math.pow(2, level) - 1;
              const count = Math.min(Math.pow(2, level), heap.length - start);
              return (
                <div key={level} className="flex justify-center gap-2">
                  {Array.from({ length: count }).map((_, j) => {
                    const idx = start + j;
                    if (idx >= heap.length) return null;
                    return (
                      <motion.div key={idx} layout
                        className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${
                          highlights.has(idx) ? 'border-amber-500 bg-amber-500/20 text-amber-300' :
                          idx === 0 ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' :
                          'border-gray-600 bg-gray-800/50 text-gray-300'
                        }`}>
                        {heap[idx]}
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Array view */}
        <div className="bg-gray-900/50 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-3">Array View:</div>
          <div className="flex items-center gap-1 flex-wrap">
            {heap.map((val, i) => (
              <motion.div key={`${i}-${val}`} layout
                className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-xs ${
                  highlights.has(i) ? 'border-amber-500 bg-amber-500/20 text-amber-300' :
                  i === 0 ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' :
                  'border-gray-600 bg-gray-800/50 text-gray-300'
                }`}>
                {val}
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {heap.map((_, i) => (
              <span key={i} className="w-10 text-center text-[9px] text-gray-600 font-mono">{i}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex items-center gap-3">
        <input type="number" placeholder="Value" value={inputValue} onChange={e => setInputValue(e.target.value)}
          className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none" />
        <button onClick={handleInsert} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium">Insert</button>
        <button onClick={handleExtract} className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium">Extract Min</button>
      </div>
    </div>
  );
}

const Chapter06_Heaps: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⛰️</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 6: Heaps & Priority Queues</h1>
            <p className="text-gray-400">Always know the min/max — in O(1)!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-medium">Medium</span>
          <span className="text-gray-600 text-sm ml-2">+25 XP</span>
        </div>
      </motion.div>

      <TheorySection />

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizers</h2>
        <MinHeapVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">🏢 Company Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { company: 'Amazon', problem: 'K Closest Points to Origin', tip: 'Use a max-heap of size K — evict the farthest when heap exceeds K' },
            { company: 'Google', problem: 'Merge K Sorted Lists', tip: 'Min-heap of K pointers — always extract the smallest' },
            { company: 'Microsoft', problem: 'Find Median from Data Stream', tip: 'Two heaps: max-heap for lower half, min-heap for upper half' },
          ].map(c => (
            <motion.div key={c.company} className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
              <CompanyTag company={c.company} size="md" />
              <p className="text-sm text-gray-300"><strong>{c.problem}</strong></p>
              <p className="text-xs text-amber-400/80 italic">💡 {c.tip}</p>
            </motion.div>
          ))}
        </div>
      </section>

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={6} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/trees')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/sorting')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter06_Heaps;
