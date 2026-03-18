import { MustSolvePanel } from '../components/UI/MustSolvePanel';
import React, { useState, useCallback, useRef, useEffect } from 'react';
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
        <h3 className="theory-heading">📈 Why Learn Sorting?</h3>
        <p className="theory-text">
          Sorting is one of the <strong>most fundamental operations</strong> in computer science. It's the backbone of searching, data analysis, and optimization. Think of it like organizing a messy bookshelf 📚 — once sorted, finding any book is trivial!
        </p>
        <div className="analogy-box">
          🃏 <strong>Real-life analogy:</strong> Imagine you're playing cards and you pick them up in random order. How do you sort them? You probably scan left-to-right, pick up an out-of-place card, and insert it where it belongs. That's <strong>Insertion Sort</strong>! Different sorting strategies have different speeds and trade-offs.
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
        <h3 className="theory-heading">🏁 Sorting Algorithm Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-2 px-2 text-left text-gray-400">Algorithm</th>
                <th className="py-2 px-2 text-center text-gray-400">Best</th>
                <th className="py-2 px-2 text-center text-gray-400">Average</th>
                <th className="py-2 px-2 text-center text-gray-400">Worst</th>
                <th className="py-2 px-2 text-center text-gray-400">Space</th>
                <th className="py-2 px-2 text-center text-gray-400">Stable?</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50"><td className="py-2 px-2">Bubble</td><td className="py-2 px-2 text-center text-emerald-400">O(n)</td><td className="py-2 px-2 text-center text-rose-400">O(n²)</td><td className="py-2 px-2 text-center text-rose-400">O(n²)</td><td className="py-2 px-2 text-center text-emerald-400">O(1)</td><td className="py-2 px-2 text-center">✅</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-2">Selection</td><td className="py-2 px-2 text-center text-rose-400">O(n²)</td><td className="py-2 px-2 text-center text-rose-400">O(n²)</td><td className="py-2 px-2 text-center text-rose-400">O(n²)</td><td className="py-2 px-2 text-center text-emerald-400">O(1)</td><td className="py-2 px-2 text-center">❌</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-2">Insertion</td><td className="py-2 px-2 text-center text-emerald-400">O(n)</td><td className="py-2 px-2 text-center text-rose-400">O(n²)</td><td className="py-2 px-2 text-center text-rose-400">O(n²)</td><td className="py-2 px-2 text-center text-emerald-400">O(1)</td><td className="py-2 px-2 text-center">✅</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-2">Merge</td><td className="py-2 px-2 text-center text-amber-400">O(n log n)</td><td className="py-2 px-2 text-center text-amber-400">O(n log n)</td><td className="py-2 px-2 text-center text-amber-400">O(n log n)</td><td className="py-2 px-2 text-center text-amber-400">O(n)</td><td className="py-2 px-2 text-center">✅</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-2">Quick</td><td className="py-2 px-2 text-center text-amber-400">O(n log n)</td><td className="py-2 px-2 text-center text-amber-400">O(n log n)</td><td className="py-2 px-2 text-center text-rose-400">O(n²)</td><td className="py-2 px-2 text-center text-amber-400">O(log n)</td><td className="py-2 px-2 text-center">❌</td></tr>
              <tr><td className="py-2 px-2">Heap</td><td className="py-2 px-2 text-center text-amber-400">O(n log n)</td><td className="py-2 px-2 text-center text-amber-400">O(n log n)</td><td className="py-2 px-2 text-center text-amber-400">O(n log n)</td><td className="py-2 px-2 text-center text-emerald-400">O(1)</td><td className="py-2 px-2 text-center">❌</td></tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
        <h3 className="theory-heading">🃏 Algorithm Explanations (Like Playing Cards)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">🫧 Bubble Sort</h4>
            <p className="text-xs text-gray-400">Compare neighbors, swap if out of order. Biggest bubbles to the end. Like heavy rocks sinking in water — heavy values "sink" to the right.</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">👆 Selection Sort</h4>
            <p className="text-xs text-gray-400">Find the minimum in the unsorted part, swap it to the front. Like picking the shortest kid first for a height lineup.</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">🃏 Insertion Sort</h4>
            <p className="text-xs text-gray-400">Take each card and insert it in the right position among the already-sorted cards. Best for nearly-sorted data!</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">🔀 Merge Sort</h4>
            <p className="text-xs text-gray-400">Divide the array in half, sort each half, then merge them. Like sorting two piles of papers and merging them into one sorted pile.</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">⚡ Quick Sort</h4>
            <p className="text-xs text-gray-400">Pick a pivot, put smaller elements left, larger elements right. Then sort each side. Like asking "who's shorter than me?" and splitting.</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">⛰️ Heap Sort</h4>
            <p className="text-xs text-gray-400">Build a max-heap from the array, then repeatedly extract the max. Like an awards ceremony — give gold, then silver, then bronze.</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="theory-card">
        <h3 className="theory-heading">🧭 When to Use Which Sort?</h3>
        <div className="space-y-2 mt-3">
          <div className="flex items-start gap-3 text-sm text-gray-300">
            <span className="text-emerald-400 font-bold">→</span>
            <p><strong>Nearly sorted data?</strong> Use <span className="text-amber-400">Insertion Sort</span> (O(n) best case!)</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-300">
            <span className="text-emerald-400 font-bold">→</span>
            <p><strong>Need stability?</strong> Use <span className="text-amber-400">Merge Sort</span> (keeps equal elements in order)</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-300">
            <span className="text-emerald-400 font-bold">→</span>
            <p><strong>Need in-place?</strong> Use <span className="text-amber-400">Quick Sort</span> (O(log n) space)</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-300">
            <span className="text-emerald-400 font-bold">→</span>
            <p><strong>Guaranteed O(n log n)?</strong> Use <span className="text-amber-400">Merge Sort</span> or <span className="text-amber-400">Heap Sort</span></p>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-300">
            <span className="text-emerald-400 font-bold">→</span>
            <p><strong>Small array (n &lt; 50)?</strong> Use <span className="text-amber-400">Insertion Sort</span> (low overhead)</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Master Sorting Visualizer ───
type SortAlgo = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap';

function generateArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
}

function generateBubbleSortSteps(arr: number[]): AlgorithmStep[] {
  const a = [...arr]; const steps: AlgorithmStep[] = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1], values: [...a] });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ type: 'swap', indices: [j, j + 1], values: [...a] });
      }
    }
    steps.push({ type: 'mark-sorted', indices: [a.length - i - 1], values: [...a] });
  }
  return steps;
}

function generateSelectionSortSteps(arr: number[]): AlgorithmStep[] {
  const a = [...arr]; const steps: AlgorithmStep[] = [];
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push({ type: 'compare', indices: [minIdx, j], values: [...a] });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) { [a[i], a[minIdx]] = [a[minIdx], a[i]]; steps.push({ type: 'swap', indices: [i, minIdx], values: [...a] }); }
    steps.push({ type: 'mark-sorted', indices: [i], values: [...a] });
  }
  return steps;
}

function generateInsertionSortSteps(arr: number[]): AlgorithmStep[] {
  const a = [...arr]; const steps: AlgorithmStep[] = [];
  for (let i = 1; i < a.length; i++) {
    let j = i;
    steps.push({ type: 'pivot', indices: [i], values: [...a] });
    while (j > 0 && a[j - 1] > a[j]) {
      steps.push({ type: 'compare', indices: [j - 1, j], values: [...a] });
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      steps.push({ type: 'swap', indices: [j - 1, j], values: [...a] });
      j--;
    }
  }
  for (let i = 0; i < a.length; i++) steps.push({ type: 'mark-sorted', indices: [i], values: [...a] });
  return steps;
}

function generateQuickSortSteps(arr: number[]): AlgorithmStep[] {
  const a = [...arr]; const steps: AlgorithmStep[] = [];
  const qs = (lo: number, hi: number) => {
    if (lo >= hi) { if (lo === hi) steps.push({ type: 'mark-sorted', indices: [lo], values: [...a] }); return; }
    const pivot = a[hi]; let i = lo;
    steps.push({ type: 'pivot', indices: [hi], values: [...a] });
    for (let j = lo; j < hi; j++) {
      steps.push({ type: 'compare', indices: [j, hi], values: [...a] });
      if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; steps.push({ type: 'swap', indices: [i, j], values: [...a] }); i++; }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    steps.push({ type: 'swap', indices: [i, hi], values: [...a] });
    steps.push({ type: 'mark-sorted', indices: [i], values: [...a] });
    qs(lo, i - 1); qs(i + 1, hi);
  };
  qs(0, a.length - 1);
  return steps;
}

function generateMergeSortSteps(arr: number[]): AlgorithmStep[] {
  const a = [...arr]; const steps: AlgorithmStep[] = [];
  const ms = (lo: number, hi: number) => {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    ms(lo, mid); ms(mid + 1, hi);
    const left = a.slice(lo, mid + 1), right = a.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      steps.push({ type: 'compare', indices: [lo + i, mid + 1 + j], values: [...a] });
      a[k++] = left[i] <= right[j] ? left[i++] : right[j++];
      steps.push({ type: 'swap', indices: [k - 1], values: [...a] });
    }
    while (i < left.length) { a[k++] = left[i++]; steps.push({ type: 'swap', indices: [k - 1], values: [...a] }); }
    while (j < right.length) { a[k++] = right[j++]; steps.push({ type: 'swap', indices: [k - 1], values: [...a] }); }
    for (let x = lo; x <= hi; x++) steps.push({ type: 'mark-sorted', indices: [x], values: [...a] });
  };
  ms(0, a.length - 1);
  return steps;
}

function SortingMasterVisualizer() {
  const [size, setSize] = useState(20);
  const [array, setArray] = useState(() => generateArray(20));
  const [algo, setAlgo] = useState<SortAlgo>('bubble');
  const [displayArray, setDisplayArray] = useState(array);
  const [sorted, setSorted] = useState<Set<number>>(new Set());
  const [comparing, setComparing] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      if (step.values) setDisplayArray(step.values);
      if (step.type === 'compare') { setComparing(step.indices); setComparisons(c => c + 1); }
      else if (step.type === 'swap') { setComparing(step.indices); setSwaps(s => s + 1); }
      else if (step.type === 'pivot') { setComparing(step.indices); }
      else if (step.type === 'mark-sorted') { setSorted(prev => new Set([...prev, ...step.indices])); setComparing([]); }
    },
    onComplete: () => { setComparing([]); setSorted(new Set(displayArray.map((_, i) => i))); },
  });

  const shuffle = useCallback(() => {
    player.reset();
    const newArr = generateArray(size);
    setArray(newArr);
    setDisplayArray(newArr);
    setSorted(new Set());
    setComparing([]);
    setComparisons(0);
    setSwaps(0);
  }, [size, player]);

  const run = useCallback(() => {
    setComparisons(0); setSwaps(0); setSorted(new Set()); setComparing([]);
    const generators: Record<SortAlgo, (a: number[]) => AlgorithmStep[]> = {
      bubble: generateBubbleSortSteps, selection: generateSelectionSortSteps,
      insertion: generateInsertionSortSteps, quick: generateQuickSortSteps,
      merge: generateMergeSortSteps, heap: generateBubbleSortSteps, // simplified
    };
    player.generateSteps(generators[algo](array));
    player.play();
  }, [array, algo, player]);

  const maxVal = Math.max(...displayArray, 1);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">📊 Master Sorting Visualizer</h3>

      {/* Algorithm selector */}
      <div className="flex flex-wrap gap-2">
        {(['bubble', 'selection', 'insertion', 'merge', 'quick'] as SortAlgo[]).map(a => (
          <button key={a} onClick={() => setAlgo(a)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${a === algo ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
            {a.charAt(0).toUpperCase() + a.slice(1)} Sort
          </button>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-gray-900/50 rounded-xl p-4">
        <div className="flex items-end gap-[2px] h-48">
          {displayArray.map((val, i) => (
            <motion.div key={i} layout
              className={`flex-1 rounded-t-sm transition-all duration-100 ${
                sorted.has(i) ? 'bg-emerald-500' :
                comparing.includes(i) ? 'bg-amber-500' :
                'bg-primary-500/70'
              }`}
              style={{ height: `${(val / maxVal) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <span className="text-xs text-gray-500">Comparisons</span>
          <div className="text-lg font-bold text-amber-400 font-mono">{comparisons}</div>
        </div>
        <div className="text-center">
          <span className="text-xs text-gray-500">Swaps</span>
          <div className="text-lg font-bold text-rose-400 font-mono">{swaps}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Size:</span>
          <input type="range" min={10} max={80} value={size} onChange={e => { setSize(parseInt(e.target.value)); }}
            className="w-24 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:rounded-full" />
          <span className="text-xs text-gray-400 font-mono w-6">{size}</span>
        </div>
        <button onClick={shuffle} className="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium">🔀 Shuffle</button>
        <button onClick={run} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">▶️ Sort</button>
      </div>

      <AlgorithmControls isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed} />
    </div>
  );
}

const Chapter07_Sorting: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📈</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 7: Sorting Algorithms</h1>
            <p className="text-gray-400">The grand showdown — watch algorithms race!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-easy">Easy</span><span className="text-gray-600">→</span><span className="badge badge-hard">Hard</span>
          <span className="text-gray-600 text-sm ml-2">+50 XP</span>
        </div>
      </motion.div>

      <TheorySection />

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizer</h2>
        <SortingMasterVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">🏢 Interview Tip</h3>
        <div className="glass-card p-5 space-y-3">
          <p className="text-sm text-gray-300">
            Interviews <strong>rarely</strong> ask you to implement a sorting algorithm from scratch. Instead, they test whether you can <strong>choose the right one</strong> for the situation and understand the trade-offs.
          </p>
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 text-sm text-primary-200">
            <strong>Decision flowchart:</strong><br/>
            Stability needed? → Merge Sort<br/>
            In-place needed? → Quick Sort<br/>
            Nearly sorted data? → Insertion Sort<br/>
            Guaranteed O(n log n)? → Merge Sort or Heap Sort<br/>
            Small dataset? → Insertion Sort
          </div>
        </div>
      </section>

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={7} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/heaps')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/graphs')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter07_Sorting;
