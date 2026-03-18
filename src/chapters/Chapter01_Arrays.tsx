import { MustSolvePanel } from '../components/UI/MustSolvePanel';
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrayDisplay } from '../components/Visualizers/ArrayDisplay';
import { AlgorithmControls } from '../components/UI/AlgorithmControls';
import { PseudocodeViewer } from '../components/UI/PseudocodeViewer';
import { CompanyTag } from '../components/UI/CompanyTag';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';
import type { AlgorithmStep } from '../hooks/useAlgorithmPlayer';

interface Props { onComplete: () => void; isCompleted: boolean; interviewMode: boolean; }

// ─── Theory Section ───
function TheorySection() {
  return (
    <section className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="theory-card">
        <h3 className="theory-heading">📦 What is an Array?</h3>
        <p className="theory-text">
          Imagine you have a <strong>row of numbered lockers</strong> in school — Locker 0, Locker 1, Locker 2, and so on. 
          Each locker can hold one thing (a number, a word, etc.), and you can instantly open any locker if you know its number. 
          That's exactly what an array is!
        </p>
        <div className="analogy-box">
          🏫 <strong>Real-life analogy:</strong> Think of an egg carton — it has 12 slots in a row. 
          Each slot holds one egg, and you can pick any egg by counting from the left. 
          You can't magically add a slot in the middle without shifting all the eggs over.
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
        <h3 className="theory-heading">🧠 Why Arrays Matter</h3>
        <p className="theory-text">
          Arrays are the <strong>most fundamental</strong> data structure in computer science. 
          Almost every other data structure (stacks, queues, heaps, hash tables) is built on top of arrays. 
          When you master arrays, you're building the foundation for everything else.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <h4 className="text-emerald-400 font-bold text-sm mb-2">✅ Arrays are great when:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• You need <strong>fast access</strong> by position (O(1))</li>
              <li>• Data size is known or doesn't change much</li>
              <li>• You need to iterate through all elements</li>
              <li>• Memory efficiency matters (no pointer overhead)</li>
            </ul>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
            <h4 className="text-rose-400 font-bold text-sm mb-2">❌ Arrays struggle when:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• You frequently <strong>insert/delete</strong> in the middle</li>
              <li>• You don't know the size in advance</li>
              <li>• You need to search unsorted data often</li>
              <li>• Data is constantly growing/shrinking</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
        <h3 className="theory-heading">🗺️ How Arrays Live in Memory</h3>
        <p className="theory-text">
          Arrays store elements in <strong>contiguous</strong> (side-by-side) memory blocks. 
          Think of it like houses on a street — House 100, House 101, House 102... 
          Because they're next to each other, the computer can jump to any house instantly by calculating: 
          <code className="bg-gray-800 px-2 py-0.5 rounded text-primary-400 mx-1">address = start + index × size</code>
        </p>
        <div className="flex items-center gap-1 mt-4 overflow-x-auto pb-2">
          {[100, 104, 108, 112, 116, 120, 124].map((addr, i) => (
            <div key={addr} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="node-cell node-default">{[42, 17, 89, 3, 56, 71, 28][i]}</div>
              <span className="text-[9px] text-gray-600 font-mono">0x{addr.toString(16)}</span>
              <span className="text-[9px] text-gray-500 font-mono">[{i}]</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ↑ Each integer takes 4 bytes, so addresses are 4 apart. This is why access is O(1) — just math!
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="theory-card">
        <h3 className="theory-heading">⏱️ Time Complexity Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-2 px-3 text-left text-gray-400 font-semibold">Operation</th>
                <th className="py-2 px-3 text-center text-gray-400 font-semibold">Time</th>
                <th className="py-2 px-3 text-left text-gray-400 font-semibold">Why?</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3 font-medium">Access by index</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td>
                <td className="py-2 px-3 text-gray-500">Direct jump via address calculation</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3 font-medium">Search (unsorted)</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td>
                <td className="py-2 px-3 text-gray-500">Must check each element one by one</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3 font-medium">Insert at end</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)*</span></td>
                <td className="py-2 px-3 text-gray-500">Just add to the end (amortized)</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3 font-medium">Insert at index</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td>
                <td className="py-2 px-3 text-gray-500">Must shift all elements to the right</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Delete at index</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td>
                <td className="py-2 px-3 text-gray-500">Must shift all elements to the left</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="theory-card">
        <h3 className="theory-heading">🆚 Arrays vs Linked Lists — Quick Comparison</h3>
        <p className="theory-text">
          Think of <strong>arrays</strong> like a train 🚂 — all compartments are connected in a fixed line, and you can count to any seat easily.
          <strong> Linked lists</strong> are more like a treasure hunt 🗺️ — each clue tells you where the next clue is, but you can't jump ahead.
        </p>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-2 px-3 text-left text-gray-400">Feature</th>
                <th className="py-2 px-3 text-center text-gray-400">Array</th>
                <th className="py-2 px-3 text-center text-gray-400">Linked List</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">Access by index</td>
                <td className="py-2 px-3 text-center text-emerald-400">O(1) ⚡</td>
                <td className="py-2 px-3 text-center text-amber-400">O(n) 🐢</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">Insert at beginning</td>
                <td className="py-2 px-3 text-center text-amber-400">O(n) 🐢</td>
                <td className="py-2 px-3 text-center text-emerald-400">O(1) ⚡</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">Memory usage</td>
                <td className="py-2 px-3 text-center text-emerald-400">Less</td>
                <td className="py-2 px-3 text-center text-amber-400">More (pointers)</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Memory layout</td>
                <td className="py-2 px-3 text-center">Contiguous</td>
                <td className="py-2 px-3 text-center">Scattered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="theory-card">
        <h3 className="theory-heading">🔑 Key Patterns for Interviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Two Pointers</h4>
            <p className="text-xs text-gray-400">
              Use two index variables moving toward each other or in the same direction. 
              Perfect for sorted arrays, palindromes, and pair-finding.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Sliding Window</h4>
            <p className="text-xs text-gray-400">
              Maintain a "window" of elements and slide it across the array. 
              Great for subarray problems (max sum, longest substring).
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Prefix Sums</h4>
            <p className="text-xs text-gray-400">
              Pre-compute cumulative sums to answer range-sum queries in O(1). 
              Transform repeated subarray sum calculations.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Visualizer 1: Array Operations ───
function ArrayOperationsVisualizer() {
  const [array, setArray] = useState([42, 17, 89, 3, 56, 71, 28]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [highlights, setHighlights] = useState<Map<number, string>>(new Map());
  const [description, setDescription] = useState('Choose an operation to see it in action!');

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      setHighlights(new Map(step.indices.map(idx => [idx, step.type === 'compare' ? 'comparing' : step.type === 'found' ? 'found' : step.type === 'insert' ? 'insert' : step.type === 'delete' ? 'delete' : 'active'])));
      if (step.description) setDescription(step.description);
    },
    onComplete: () => {
      setTimeout(() => setHighlights(new Map()), 800);
    },
  });

  const handleInsert = useCallback(() => {
    const val = parseInt(inputValue);
    const idx = parseInt(inputIndex) || array.length;
    if (isNaN(val)) return;
    const steps: AlgorithmStep[] = [];
    for (let i = array.length; i > idx; i--) {
      steps.push({ type: 'compare', indices: [i - 1], description: `Shifting element at index ${i-1} to the right` });
    }
    steps.push({ type: 'insert', indices: [idx], values: [val], description: `Inserting ${val} at index ${idx}` });
    steps.push({ type: 'complete', indices: [], description: 'Insertion complete!' });
    player.generateSteps(steps);
    setTimeout(() => {
      const newArr = [...array];
      newArr.splice(idx, 0, val);
      setArray(newArr);
      setInputValue('');
      setInputIndex('');
    }, steps.length * 600 / player.speed + 200);
    player.play();
  }, [array, inputValue, inputIndex, player]);

  const handleDelete = useCallback(() => {
    const idx = parseInt(inputIndex) || 0;
    if (idx >= array.length) return;
    const steps: AlgorithmStep[] = [];
    steps.push({ type: 'delete', indices: [idx], description: `Deleting element ${array[idx]} at index ${idx}` });
    for (let i = idx + 1; i < array.length; i++) {
      steps.push({ type: 'compare', indices: [i], description: `Shifting element at index ${i} to the left` });
    }
    steps.push({ type: 'complete', indices: [], description: 'Deletion complete!' });
    player.generateSteps(steps);
    setTimeout(() => {
      const newArr = [...array];
      newArr.splice(idx, 1);
      setArray(newArr);
    }, steps.length * 600 / player.speed + 200);
    player.play();
  }, [array, inputIndex, player]);

  const handleSearch = useCallback(() => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    const steps: AlgorithmStep[] = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === val) {
        steps.push({ type: 'found', indices: [i], description: `Found ${val} at index ${i}! 🎉` });
        break;
      }
      steps.push({ type: 'compare', indices: [i], description: `Checking index ${i}: ${array[i]} ≠ ${val}` });
    }
    if (!steps.some(s => s.type === 'found')) {
      steps.push({ type: 'complete', indices: [], description: `${val} not found in the array` });
    }
    player.generateSteps(steps);
    player.play();
  }, [array, inputValue, player]);

  const handleAccess = useCallback(() => {
    const idx = parseInt(inputIndex) || 0;
    if (idx >= array.length) return;
    const steps: AlgorithmStep[] = [
      { type: 'found', indices: [idx], description: `Accessed index ${idx}: value is ${array[idx]} — O(1) instant! ⚡` },
    ];
    player.generateSteps(steps);
    player.play();
  }, [array, inputIndex, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
        🔧 Visualizer: Array Operations
      </h3>
      <p className="text-sm text-gray-400">Insert, delete, search, or access elements and watch the array react!</p>

      <div className="bg-gray-900/50 rounded-xl p-6 flex justify-center">
        <ArrayDisplay array={array} highlightIndices={highlights} />
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">
          {description}
        </motion.p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="number"
          placeholder="Value"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Index"
          value={inputIndex}
          onChange={e => setInputIndex(e.target.value)}
          className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none"
        />
        <button onClick={handleInsert} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors">Insert</button>
        <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium transition-colors">Delete</button>
        <button onClick={handleSearch} className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium transition-colors">Search</button>
        <button onClick={handleAccess} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-colors">Access</button>
      </div>

      <AlgorithmControls
        isPlaying={player.isPlaying}
        speed={player.speed}
        currentStep={player.currentStep}
        totalSteps={player.totalSteps}
        progress={player.progress}
        onPlay={player.play}
        onPause={player.pause}
        onReset={player.reset}
        onStepForward={player.stepForward}
        onStepBack={player.stepBack}
        onSpeedChange={player.setSpeed}
      />
    </div>
  );
}

// ─── Visualizer 2: Two Pointers ───
function TwoPointerVisualizer() {
  const sortedArray = useMemo(() => [1, 3, 5, 7, 9, 11, 15, 18], []);
  const [target, setTarget] = useState(16);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(sortedArray.length - 1);
  const [highlights, setHighlights] = useState<Map<number, string>>(new Map());
  const [description, setDescription] = useState('Set a target sum and watch two pointers find the pair!');

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      const newHighlights = new Map<number, string>();
      if (step.indices.length >= 2) {
        setLeft(step.indices[0]);
        setRight(step.indices[1]);
        newHighlights.set(step.indices[0], step.type === 'found' ? 'found' : 'active');
        newHighlights.set(step.indices[1], step.type === 'found' ? 'found' : 'pivot');
      }
      setHighlights(newHighlights);
      if (step.description) setDescription(step.description);
    },
  });

  const runTwoPointer = useCallback(() => {
    const steps: AlgorithmStep[] = [];
    let l = 0, r = sortedArray.length - 1;
    while (l < r) {
      const sum = sortedArray[l] + sortedArray[r];
      if (sum === target) {
        steps.push({ type: 'found', indices: [l, r], description: `Found it! ${sortedArray[l]} + ${sortedArray[r]} = ${target} 🎉` });
        break;
      } else if (sum < target) {
        steps.push({ type: 'compare', indices: [l, r], description: `${sortedArray[l]} + ${sortedArray[r]} = ${sum} < ${target} → move left pointer right` });
        l++;
      } else {
        steps.push({ type: 'compare', indices: [l, r], description: `${sortedArray[l]} + ${sortedArray[r]} = ${sum} > ${target} → move right pointer left` });
        r--;
      }
    }
    if (!steps.some(s => s.type === 'found')) {
      steps.push({ type: 'complete', indices: [l, r], description: `No pair sums to ${target}` });
    }
    player.generateSteps(steps);
    player.play();
  }, [sortedArray, target, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
        👈👉 Visualizer: Two Pointers — Find Pair Sum
      </h3>
      <p className="text-sm text-gray-400">
        In a sorted array, use two pointers starting from both ends. If sum is too small, move left pointer right. Too big? Move right pointer left.
      </p>

      <div className="bg-gray-900/50 rounded-xl p-6 flex justify-center">
        <ArrayDisplay
          array={sortedArray}
          highlightIndices={highlights}
          pointers={[
            { label: 'L', index: left, color: 'text-primary-400' },
            { label: 'R', index: right, color: 'text-rose-400' },
          ]}
        />
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">
          {description}
        </motion.p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-400">Target sum:</label>
        <input
          type="number"
          value={target}
          onChange={e => setTarget(parseInt(e.target.value) || 0)}
          className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none"
        />
        <button onClick={runTwoPointer} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-colors">
          Run Two Pointers
        </button>
      </div>

      <AlgorithmControls
        isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed}
      />
    </div>
  );
}

// ─── Visualizer 3: Sliding Window ───
function SlidingWindowVisualizer() {
  const array = useMemo(() => [2, 1, 5, 1, 3, 2, 8, 1, 3], []);
  const [k, setK] = useState(3);
  const [windowStart, setWindowStart] = useState(0);
  const [windowEnd, setWindowEnd] = useState(0);
  const [windowSum, setWindowSum] = useState(0);
  const [maxSum, setMaxSum] = useState(0);
  const [highlights, setHighlights] = useState<Map<number, string>>(new Map());
  const [description, setDescription] = useState(`Set K and find the maximum sum subarray of size K!`);

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      const h = new Map<number, string>();
      if (step.extra) {
        const ws = step.extra.windowStart as number;
        const we = step.extra.windowEnd as number;
        for (let i = ws; i <= we; i++) h.set(i, 'window');
        setWindowStart(ws);
        setWindowEnd(we);
        if (step.extra.windowSum !== undefined) setWindowSum(step.extra.windowSum as number);
        if (step.extra.maxSum !== undefined) setMaxSum(step.extra.maxSum as number);
        if (step.extra.maxIndices) {
          const mi = step.extra.maxIndices as number[];
          for (const idx of mi) h.set(idx, 'found');
        }
      }
      setHighlights(h);
      if (step.description) setDescription(step.description);
    },
  });

  const runSlidingWindow = useCallback(() => {
    const steps: AlgorithmStep[] = [];
    let ws = 0, sum = 0, best = 0, bestStart = 0;
    for (let we = 0; we < array.length; we++) {
      sum += array[we];
      if (we >= k - 1) {
        if (sum > best) {
          best = sum;
          bestStart = ws;
          steps.push({ type: 'found', indices: [], description: `New max sum: ${sum} (window [${ws}..${we}])`, extra: { windowStart: ws, windowEnd: we, windowSum: sum, maxSum: best } });
        } else {
          steps.push({ type: 'compare', indices: [], description: `Window sum: ${sum}, max so far: ${best}`, extra: { windowStart: ws, windowEnd: we, windowSum: sum, maxSum: best } });
        }
        sum -= array[ws];
        ws++;
      } else {
        steps.push({ type: 'highlight', indices: [], description: `Building initial window... adding ${array[we]}`, extra: { windowStart: ws, windowEnd: we, windowSum: sum, maxSum: best } });
      }
    }
    steps.push({ type: 'complete', indices: [], description: `Maximum sum subarray of size ${k} = ${best}`, extra: { windowStart: bestStart, windowEnd: bestStart + k - 1, windowSum: best, maxSum: best, maxIndices: Array.from({ length: k }, (_, i) => bestStart + i) } });
    player.generateSteps(steps);
    player.play();
  }, [array, k, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
        🪟 Visualizer: Sliding Window — Max Sum Subarray
      </h3>
      <p className="text-sm text-gray-400">
        Instead of recalculating the sum for every subarray, we "slide" a window: add the new element entering the window and subtract the one leaving. Efficient!
      </p>

      <div className="bg-gray-900/50 rounded-xl p-6 flex justify-center">
        <ArrayDisplay array={array} highlightIndices={highlights} />
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="text-center">
          <span className="text-xs text-gray-500">Window Sum</span>
          <motion.div key={windowSum} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-xl font-bold text-cyan-400 font-mono">
            {windowSum}
          </motion.div>
        </div>
        <div className="text-center">
          <span className="text-xs text-gray-500">Max Sum</span>
          <motion.div key={maxSum} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-xl font-bold text-emerald-400 font-mono">
            {maxSum}
          </motion.div>
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">
          {description}
        </motion.p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-400">Window size K:</label>
        <input
          type="number"
          value={k}
          min={1}
          max={array.length}
          onChange={e => setK(Math.max(1, Math.min(array.length, parseInt(e.target.value) || 1)))}
          className="w-20 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none"
        />
        <button onClick={runSlidingWindow} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-colors">
          Run Sliding Window
        </button>
      </div>

      <AlgorithmControls
        isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed}
      />
    </div>
  );
}

// ─── Company Spotlight ───
function CompanySpotlight() {
  const companies = [
    { name: 'Google', problems: ['Two Sum variations (hash map trick)', 'Longest substring without repeating chars'], tip: 'Google loves O(n) solutions. Always optimize!' },
    { name: 'Amazon', problems: ['Sliding window on streaming data', 'Subarray sum equals K'], tip: 'Amazon asks arrays in Online Assessment rounds. Speed matters.' },
    { name: 'Meta', problems: ['String manipulation (atoi, palindromes)', 'Move zeroes to end'], tip: 'Meta loves clean, bug-free array code. Edge cases matter!' },
  ];

  return (
    <section className="space-y-4">
      <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
        🏢 Company Spotlight
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {companies.map(c => (
          <motion.div key={c.name} className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
            <CompanyTag company={c.name} size="md" />
            <ul className="text-sm text-gray-300 space-y-1">
              {c.problems.map(p => (
                <li key={p} className="flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-amber-400/80 italic">💡 {c.tip}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Chapter Component ───
const Chapter01_Arrays: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      {/* Chapter header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📊</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 1: Arrays & Strings</h1>
            <p className="text-gray-400">Master the foundation of all data structures</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-easy">Easy</span>
          <span className="text-gray-600">→</span>
          <span className="badge badge-medium">Medium</span>
          <span className="text-gray-600 text-sm ml-2">+25 XP</span>
        </div>
      </motion.div>

      {/* Theory */}
      <TheorySection />

      {/* Visualizers */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizers</h2>
        <ArrayOperationsVisualizer />
        <TwoPointerVisualizer />
        <SlidingWindowVisualizer />
      </section>

      {/* Company spotlight */}
      <CompanySpotlight />

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={1} />}
      </AnimatePresence>

      {/* Navigation footer */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button
          disabled
          className="px-6 py-3 rounded-xl bg-gray-800 text-gray-600 font-medium cursor-not-allowed"
        >
          ← Previous
        </button>
        <button
          onClick={onComplete}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            isCompleted
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'
          }`}
        >
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button
          onClick={() => navigate('/chapter/linked-lists')}
          className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Chapter01_Arrays;
