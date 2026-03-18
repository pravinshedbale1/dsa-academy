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
        <h3 className="theory-heading">🗂️ What is a Hash Map?</h3>
        <p className="theory-text">
          Imagine you're at a huge library 📚 with millions of books. Without a catalog system, finding a specific book means checking every shelf. But with a catalog that tells you <strong>exactly which shelf and slot</strong> a book is on — you go straight there! A hash map is that catalog.
        </p>
        <div className="analogy-box">
          🏨 <strong>Real-life analogy:</strong> Think of a hotel. Your name (key) goes through the front desk (hash function) which assigns you Room 307 (index). When someone asks for you, the desk says "Room 307" instantly — no searching! But what if two guests get assigned the same room? That's a "collision" and we need a strategy.
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
        <h3 className="theory-heading">🔢 How Hash Functions Work</h3>
        <p className="theory-text">
          A hash function takes your key (like "apple") and converts it to a number. The simplest approach: <strong>add up all the character codes and take modulo (%) of the table size</strong>.
        </p>
        <div className="bg-gray-800/50 rounded-xl p-4 font-mono text-sm space-y-1 mt-3">
          <p className="text-gray-400">hash("cat") = (99 + 97 + 116) % 10 = 312 % 10 = <span className="text-emerald-400">2</span></p>
          <p className="text-gray-400">hash("dog") = (100 + 111 + 103) % 10 = 314 % 10 = <span className="text-emerald-400">4</span></p>
          <p className="text-gray-400">hash("tac") = (116 + 97 + 99) % 10 = 312 % 10 = <span className="text-rose-400">2</span> ← collision with "cat"!</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
        <h3 className="theory-heading">💥 Collision Handling</h3>
        <p className="theory-text">When two keys hash to the same index, we need a plan!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Chaining</h4>
            <p className="text-xs text-gray-400">Each bucket has a linked list. Colliders just get added to the same list. Simple but uses extra memory.</p>
            <div className="mt-2 font-mono text-xs text-gray-500">
              [0] → null<br/>
              [1] → null<br/>
              [2] → "cat" → "tac" → null<br/>
              [3] → null<br/>
              [4] → "dog" → null
            </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <h4 className="text-amber-400 font-bold text-sm mb-2">Open Addressing (Linear Probing)</h4>
            <p className="text-xs text-gray-400">If your bucket is taken, check the next one. Keep probing until you find an empty slot.</p>
            <div className="mt-2 font-mono text-xs text-gray-500">
              [0] = empty<br/>
              [1] = empty<br/>
              [2] = "cat" ← home<br/>
              [3] = "tac" ← probed here<br/>
              [4] = "dog"
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="theory-card">
        <h3 className="theory-heading">⏱️ Time Complexity</h3>
        <table className="w-full text-sm mt-3">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-2 px-3 text-left text-gray-400">Operation</th>
              <th className="py-2 px-3 text-center text-gray-400">Average</th>
              <th className="py-2 px-3 text-center text-gray-400">Worst</th>
              <th className="py-2 px-3 text-left text-gray-400">When worst happens</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Insert</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td><td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td><td className="py-2 px-3 text-gray-500">All keys hash to same bucket</td></tr>
            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Search</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td><td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td><td className="py-2 px-3 text-gray-500">Every key collides</td></tr>
            <tr><td className="py-2 px-3">Delete</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td><td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td><td className="py-2 px-3 text-gray-500">Worst case is very rare</td></tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="theory-card">
        <h3 className="theory-heading">🆚 Hash Map vs Hash Set</h3>
        <p className="theory-text">
          A <strong>Hash Map</strong> stores key-value pairs (like a dictionary: word → definition). A <strong>Hash Set</strong> stores only keys (like a bag of unique items — just checking "is this item in the bag?"). Sets are perfect for duplicate detection!
        </p>
      </motion.div>
    </section>
  );
}

// ─── Visualizer 1: Hash Function ───
function HashFunctionVisualizer() {
  const [key, setKey] = useState('cat');
  const bucketCount = 10;
  const [targetBucket, setTargetBucket] = useState(-1);
  const [charCodes, setCharCodes] = useState<{char: string; code: number}[]>([]);

  const computeHash = useCallback(() => {
    const codes = key.split('').map(c => ({ char: c, code: c.charCodeAt(0) }));
    setCharCodes(codes);
    const sum = codes.reduce((s, c) => s + c.code, 0);
    setTargetBucket(sum % bucketCount);
  }, [key]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🔢 Visualizer: Hash Function in Action</h3>
      <p className="text-sm text-gray-400">Type a key and watch it get hashed into a bucket!</p>

      <div className="flex items-center gap-3">
        <input type="text" value={key} onChange={e => { setKey(e.target.value); setTargetBucket(-1); }}
          placeholder="Enter a key..."
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white font-mono focus:border-primary-500 focus:outline-none" />
        <button onClick={computeHash} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Hash It!</button>
      </div>

      {charCodes.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            {charCodes.map((c, i) => (
              <motion.div key={i} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-1">
                <span className="text-lg font-mono text-primary-400">'{c.char}'</span>
                <span className="text-xs text-gray-500">↓</span>
                <span className="text-sm font-mono text-amber-400">{c.code}</span>
              </motion.div>
            ))}
            <span className="text-gray-500 mx-2">=</span>
            <span className="font-mono text-white font-bold">{charCodes.reduce((s, c) => s + c.code, 0)}</span>
            <span className="text-gray-500 mx-1">%</span>
            <span className="font-mono text-white">{bucketCount}</span>
            <span className="text-gray-500 mx-1">=</span>
            <motion.span initial={{ scale: 2 }} animate={{ scale: 1 }} className="font-mono text-emerald-400 font-bold text-lg">
              {targetBucket}
            </motion.span>
          </div>
        </motion.div>
      )}

      <div className="bg-gray-900/50 rounded-xl p-4">
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: bucketCount }).map((_, i) => (
            <motion.div key={i}
              className={`h-16 rounded-lg border-2 flex flex-col items-center justify-center text-xs font-mono ${
                i === targetBucket ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/20' :
                'border-gray-700 bg-gray-800/50 text-gray-500'
              }`}
              animate={i === targetBucket ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[10px]">[{i}]</span>
              {i === targetBucket && <span className="text-emerald-400 text-xs mt-1">{key}</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Visualizer 2: Two Sum ───
function TwoSumVisualizer() {
  const array = [2, 7, 11, 15, 1, 8];
  const [target, setTarget] = useState(9);
  const [hashMap, setHashMap] = useState<Map<number, number>>(new Map());
  const [highlights, setHighlights] = useState<Map<number, string>>(new Map());
  const [description, setDescription] = useState('Find two numbers that add up to the target!');

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      if (step.extra) {
        setHashMap(new Map(Object.entries(step.extra.map as Record<string, number>).map(([k, v]) => [parseInt(k), v])));
        const h = new Map<number, string>();
        step.indices.forEach(idx => h.set(idx, step.type === 'found' ? 'found' : 'comparing'));
        setHighlights(h);
      }
      if (step.description) setDescription(step.description);
    },
  });

  const runTwoSum = useCallback(() => {
    const steps: AlgorithmStep[] = [];
    const map: Record<number, number> = {};

    for (let i = 0; i < array.length; i++) {
      const complement = target - array[i];
      if (map[complement] !== undefined) {
        steps.push({ type: 'found', indices: [map[complement], i], description: `Found! ${array[map[complement]]} + ${array[i]} = ${target} 🎉`, extra: { map: { ...map } } });
        break;
      }
      map[array[i]] = i;
      steps.push({ type: 'compare', indices: [i], description: `Check: need ${complement} in map? No. Add ${array[i]}→index ${i} to map.`, extra: { map: { ...map } } });
    }
    player.generateSteps(steps);
    player.play();
  }, [array, target, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🎯 Visualizer: Two Sum with Hash Map</h3>
      <p className="text-sm text-gray-400">For each element, check if (target - element) exists in the map. If yes — we found our pair!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-2">Input Array:</div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex items-center gap-1.5 flex-wrap">
            {array.map((val, i) => (
              <div key={i} className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold ${
                highlights.get(i) === 'found' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' :
                highlights.get(i) === 'comparing' ? 'border-amber-500 bg-amber-500/20 text-amber-300' :
                'border-gray-600 bg-gray-800/50 text-gray-300'
              }`}>{val}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-2">Hash Map (value → index):</div>
          <div className="bg-gray-900/50 rounded-xl p-4 space-y-1 min-h-[80px]">
            {Array.from(hashMap.entries()).map(([val, idx]) => (
              <motion.div key={val} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-2 text-sm font-mono">
                <span className="text-primary-400">{val}</span>
                <span className="text-gray-600">→</span>
                <span className="text-gray-300">idx {idx}</span>
              </motion.div>
            ))}
            {hashMap.size === 0 && <span className="text-xs text-gray-600 italic">empty</span>}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-400">Target:</label>
        <input type="number" value={target} onChange={e => setTarget(parseInt(e.target.value) || 0)}
          className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none" />
        <button onClick={runTwoSum} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Run Two Sum</button>
      </div>

      <AlgorithmControls isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed} />
    </div>
  );
}

// ─── Visualizer 3: Duplicate Detection ───
function DuplicateVisualizer() {
  const [array] = useState([1, 3, 5, 3, 7, 9, 5]);
  const [hashSet, setHashSet] = useState<Set<number>>(new Set());
  const [highlights, setHighlights] = useState<Map<number, string>>(new Map());
  const [description, setDescription] = useState('Check for duplicates using a hash set!');

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      if (step.extra) {
        setHashSet(new Set(step.extra.set as number[]));
      }
      const h = new Map<number, string>();
      step.indices.forEach(idx => h.set(idx, step.type === 'found' ? 'delete' : 'sorted'));
      setHighlights(h);
      if (step.description) setDescription(step.description);
    },
  });

  const runCheck = useCallback(() => {
    const steps: AlgorithmStep[] = [];
    const set: number[] = [];

    for (let i = 0; i < array.length; i++) {
      if (set.includes(array[i])) {
        steps.push({ type: 'found', indices: [i], description: `DUPLICATE FOUND! ${array[i]} is already in the set! 🔴`, extra: { set: [...set] } });
      } else {
        set.push(array[i]);
        steps.push({ type: 'insert', indices: [i], description: `${array[i]} not seen before — add to set ✅`, extra: { set: [...set] } });
      }
    }
    steps.push({ type: 'complete', indices: [], description: 'Scan complete!', extra: { set: [...set] } });
    player.generateSteps(steps);
    player.play();
  }, [array, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🔍 Visualizer: Duplicate Detection with Hash Set</h3>
      <p className="text-sm text-gray-400">If an element is already in the set → it's a duplicate!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-2">Input Array:</div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex items-center gap-1.5 flex-wrap">
            {array.map((val, i) => (
              <div key={i} className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all ${
                highlights.get(i) === 'delete' ? 'border-rose-500 bg-rose-500/30 text-rose-300 shadow-lg shadow-rose-500/20' :
                highlights.get(i) === 'sorted' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' :
                'border-gray-600 bg-gray-800/50 text-gray-300'
              }`}>{val}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-2">Hash Set:</div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex items-center gap-1.5 flex-wrap min-h-[80px]">
            <AnimatePresence>
              {Array.from(hashSet).map(val => (
                <motion.div key={val} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="w-10 h-10 rounded-lg border-2 border-primary-500 bg-primary-500/20 text-primary-300 flex items-center justify-center font-mono font-bold text-sm">
                  {val}
                </motion.div>
              ))}
            </AnimatePresence>
            {hashSet.size === 0 && <span className="text-xs text-gray-600 italic">empty</span>}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <button onClick={runCheck} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Find Duplicates</button>

      <AlgorithmControls isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed} />
    </div>
  );
}

const Chapter04_HashMaps: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🗂️</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 4: Hash Maps & Sets</h1>
            <p className="text-gray-400">O(1) lookups — the secret weapon of efficient code</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-easy">Easy</span><span className="text-gray-600">→</span><span className="badge badge-medium">Medium</span>
          <span className="text-gray-600 text-sm ml-2">+25 XP</span>
        </div>
      </motion.div>

      <TheorySection />

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizers</h2>
        <HashFunctionVisualizer />
        <TwoSumVisualizer />
        <DuplicateVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">🏢 Company Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { company: 'Google', problem: 'Group Anagrams — use sorted string as key', tip: 'Think about WHAT to use as the hash key!' },
            { company: 'Meta', problem: 'Longest Substring Without Repeating Characters', tip: 'Hash set + sliding window = powerful combo' },
            { company: 'Amazon', problem: 'Top K Frequent Elements', tip: 'Hash map for counting + heap for top K' },
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
        {interviewMode && <MustSolvePanel chapterId={4} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/stacks-queues')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/trees')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter04_HashMaps;
