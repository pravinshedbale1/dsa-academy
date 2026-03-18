import { MustSolvePanel } from '../components/UI/MustSolvePanel';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlgorithmControls } from '../components/UI/AlgorithmControls';
import { PseudocodeViewer } from '../components/UI/PseudocodeViewer';
import { CompanyTag } from '../components/UI/CompanyTag';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';
import type { AlgorithmStep } from '../hooks/useAlgorithmPlayer';

interface Props { onComplete: () => void; isCompleted: boolean; interviewMode: boolean; }

// ─── Linked List Node Component ───
interface LLNode { id: number; value: number; next: number | null; }

const LLNodeDisplay: React.FC<{ node: LLNode; highlight?: string; isLast?: boolean }> = ({ node, highlight, isLast }) => {
  const colors: Record<string, string> = {
    active: 'border-primary-500 bg-primary-500/20 text-primary-300',
    comparing: 'border-amber-500 bg-amber-500/20 text-amber-300',
    found: 'border-emerald-500 bg-emerald-500/20 text-emerald-300',
    delete: 'border-rose-500 bg-rose-500/20 text-rose-300',
    default: 'border-gray-600 bg-gray-800/50 text-gray-300',
  };
  const color = colors[highlight || 'default'];
  
  return (
    <motion.div layout className="flex items-center" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
      <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-mono font-bold ${color} transition-all duration-300`}>
        {node.value}
      </div>
      {!isLast && (
        <motion.div className="flex items-center mx-1" layout>
          <div className="w-8 h-0.5 bg-gray-600" />
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-gray-600" />
        </motion.div>
      )}
    </motion.div>
  );
};

// ─── Theory Section ───
function TheorySection() {
  return (
    <section className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="theory-card">
        <h3 className="theory-heading">🔗 What is a Linked List?</h3>
        <p className="theory-text">
          Imagine a <strong>treasure hunt</strong> 🗺️ where each clue tells you two things: the treasure at this spot, and where to find the next clue. You can't jump to clue #5 directly — you must follow the chain from the start. That's a linked list!
        </p>
        <div className="analogy-box">
          🚂 <strong>Real-life analogy:</strong> Think of a train where each carriage only knows about the carriage behind it. The engine (head) knows carriage 1, carriage 1 knows carriage 2, and so on. To find carriage 5, you walk through 1, 2, 3, 4 first. But adding a new carriage in the middle is easy — just re-link two carriages!
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
        <h3 className="theory-heading">🧱 How It Works Inside</h3>
        <p className="theory-text">
          Each element in a linked list is called a <strong>node</strong>. Every node has two parts:
        </p>
        <div className="flex items-center gap-4 mt-4 justify-center">
          <div className="flex border-2 border-primary-500 rounded-xl overflow-hidden">
            <div className="bg-primary-500/20 px-4 py-3 border-r border-primary-500/30">
              <span className="text-xs text-gray-400 block">Data</span>
              <span className="text-primary-300 font-bold font-mono">42</span>
            </div>
            <div className="bg-gray-800/50 px-4 py-3">
              <span className="text-xs text-gray-400 block">Next →</span>
              <span className="text-gray-500 font-mono text-xs">0x3f2a</span>
            </div>
          </div>
          <span className="text-gray-600">→</span>
          <div className="flex border-2 border-gray-600 rounded-xl overflow-hidden">
            <div className="bg-gray-800/50 px-4 py-3 border-r border-gray-700">
              <span className="text-xs text-gray-400 block">Data</span>
              <span className="text-gray-300 font-bold font-mono">17</span>
            </div>
            <div className="bg-gray-800/50 px-4 py-3">
              <span className="text-xs text-gray-400 block">Next →</span>
              <span className="text-gray-500 font-mono text-xs">null</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Unlike arrays, nodes can live anywhere in memory — they don't need to be side-by-side!
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
        <h3 className="theory-heading">📐 Types of Linked Lists</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Singly Linked</h4>
            <p className="text-xs text-gray-400">Each node points to the next. One direction only → → →</p>
            <div className="flex items-center mt-2 text-xs font-mono text-gray-500">
              [A] → [B] → [C] → null
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Doubly Linked</h4>
            <p className="text-xs text-gray-400">Each node points both forward and backward. ← → ← →</p>
            <div className="flex items-center mt-2 text-xs font-mono text-gray-500">
              null ← [A] ⇄ [B] ⇄ [C] → null
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Circular</h4>
            <p className="text-xs text-gray-400">Last node connects back to the first. No null ending!</p>
            <div className="flex items-center mt-2 text-xs font-mono text-gray-500">
              [A] → [B] → [C] → [A] ...
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="theory-card">
        <h3 className="theory-heading">⏱️ Time Complexity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-2 px-3 text-left text-gray-400">Operation</th>
                <th className="py-2 px-3 text-center text-gray-400">Time</th>
                <th className="py-2 px-3 text-left text-gray-400">Why?</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">Access by index</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td>
                <td className="py-2 px-3 text-gray-500">Must walk from head node by node</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">Insert at head</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td>
                <td className="py-2 px-3 text-gray-500">Just change one pointer</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">Insert at tail</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td>
                <td className="py-2 px-3 text-gray-500">Must traverse to end first</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">Delete (known ref)</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td>
                <td className="py-2 px-3 text-gray-500">Re-link previous node's pointer</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Search</td>
                <td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td>
                <td className="py-2 px-3 text-gray-500">Must check each node</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="theory-card">
        <h3 className="theory-heading">💡 Sentinel Nodes Explained</h3>
        <p className="theory-text">
          A <strong>sentinel node</strong> (or dummy head) is a fake node at the beginning of the list. It doesn't hold real data — it just simplifies our code! Without it, we'd need special "if head is null" checks everywhere. With it, we always have a node before the real first element.
        </p>
        <div className="analogy-box">
          🚪 <strong>Analogy:</strong> It's like having a lobby entrance before the actual apartments. The lobby isn't an apartment, but it makes it easier to direct people to apartment #1.
        </div>
      </motion.div>
    </section>
  );
}

// ─── Visualizer 1: Linked List Operations ───
function LinkedListVisualizer() {
  const [nodes, setNodes] = useState<LLNode[]>([
    { id: 1, value: 10, next: 2 },
    { id: 2, value: 20, next: 3 },
    { id: 3, value: 30, next: 4 },
    { id: 4, value: 40, next: null },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [highlights, setHighlights] = useState<Map<number, string>>(new Map());
  const [description, setDescription] = useState('Add or remove nodes to see how pointers change!');
  const [nextId, setNextId] = useState(5);

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      const h = new Map<number, string>();
      step.indices.forEach(idx => h.set(idx, step.type === 'found' ? 'found' : step.type === 'delete' ? 'delete' : step.type === 'visit' ? 'comparing' : 'active'));
      setHighlights(h);
      if (step.description) setDescription(step.description);
    },
  });

  const insertAtHead = useCallback(() => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    const steps: AlgorithmStep[] = [
      { type: 'insert', indices: [], description: `Creating new node with value ${val}` },
      { type: 'highlight', indices: [0], description: `Linking new node's next to current head (${nodes[0]?.value})` },
      { type: 'complete', indices: [], description: `Inserted ${val} at the head! 🎉` },
    ];
    player.generateSteps(steps);
    player.play();
    setTimeout(() => {
      const newNode: LLNode = { id: nextId, value: val, next: nodes[0]?.id ?? null };
      setNodes([newNode, ...nodes]);
      setNextId(nextId + 1);
      setInputValue('');
    }, 1800 / player.speed);
  }, [inputValue, nodes, nextId, player]);

  const insertAtTail = useCallback(() => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    const steps: AlgorithmStep[] = [];
    nodes.forEach((_, i) => {
      steps.push({ type: 'visit', indices: [i], description: `Traversing to node ${i}...` });
    });
    steps.push({ type: 'insert', indices: [nodes.length - 1], description: `Reached the tail! Linking new node with value ${val}` });
    steps.push({ type: 'complete', indices: [], description: `Inserted ${val} at the tail! 🎉` });
    player.generateSteps(steps);
    player.play();
    setTimeout(() => {
      const newNode: LLNode = { id: nextId, value: val, next: null };
      const updated = [...nodes];
      if (updated.length > 0) updated[updated.length - 1].next = nextId;
      updated.push(newNode);
      setNodes(updated);
      setNextId(nextId + 1);
      setInputValue('');
    }, steps.length * 600 / player.speed + 200);
  }, [inputValue, nodes, nextId, player]);

  const deleteHead = useCallback(() => {
    if (nodes.length === 0) return;
    const steps: AlgorithmStep[] = [
      { type: 'delete', indices: [0], description: `Removing head node (${nodes[0].value})` },
      { type: 'highlight', indices: [1], description: `New head is now ${nodes[1]?.value ?? 'null'}` },
      { type: 'complete', indices: [], description: 'Head deleted! ✂️' },
    ];
    player.generateSteps(steps);
    player.play();
    setTimeout(() => setNodes(nodes.slice(1)), 1800 / player.speed);
  }, [nodes, player]);

  const traverse = useCallback(() => {
    const steps: AlgorithmStep[] = nodes.map((node, i) => ({
      type: 'visit' as const,
      indices: [i],
      description: `Visiting node ${i}: value = ${node.value} ${i < nodes.length - 1 ? '→ following next pointer' : '→ reached null (end)'}`,
    }));
    steps.push({ type: 'complete', indices: [], description: 'Traversal complete! 🏁' });
    player.generateSteps(steps);
    player.play();
  }, [nodes, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🔗 Visualizer: Singly Linked List</h3>
      <p className="text-sm text-gray-400">Watch how nodes connect and pointers re-route during operations!</p>

      <div className="bg-gray-900/50 rounded-xl p-6 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-min">
          <div className="text-xs text-gray-500 mr-2 font-mono">HEAD →</div>
          {nodes.map((node, i) => (
            <LLNodeDisplay key={node.id} node={node} highlight={highlights.get(i)} isLast={i === nodes.length - 1} />
          ))}
          <div className="text-xs text-gray-500 ml-2 font-mono">→ NULL</div>
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input type="number" placeholder="Value" value={inputValue} onChange={e => setInputValue(e.target.value)}
          className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none" />
        <button onClick={insertAtHead} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium">Insert Head</button>
        <button onClick={insertAtTail} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium">Insert Tail</button>
        <button onClick={deleteHead} className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium">Delete Head</button>
        <button onClick={traverse} className="px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Traverse</button>
      </div>

      <AlgorithmControls isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed} />
    </div>
  );
}

// ─── Visualizer 2: Reverse Linked List ───
function ReverseVisualizer() {
  const [nodes] = useState([10, 20, 30, 40, 50]);
  const [currentState, setCurrentState] = useState<{prev: number | null; curr: number | null; next: number | null}>({ prev: null, curr: null, next: null });
  const [reversed, setReversed] = useState<number[]>([]);
  const [description, setDescription] = useState('Watch the classic 3-pointer reversal technique!');
  const [pseudoLine, setPseudoLine] = useState(-1);

  const pseudocode = [
    'function reverse(head):',
    '    prev = null',
    '    curr = head',
    '    while curr != null:',
    '        next = curr.next',
    '        curr.next = prev    // flip the arrow!',
    '        prev = curr',
    '        curr = next',
    '    return prev  // new head',
  ];

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      if (step.extra) {
        setCurrentState(step.extra as any);
        if (step.extra.reversed) setReversed(step.extra.reversed as number[]);
      }
      if (step.pseudocodeLine !== undefined) setPseudoLine(step.pseudocodeLine);
      if (step.description) setDescription(step.description);
    },
  });

  const runReverse = useCallback(() => {
    const steps: AlgorithmStep[] = [];
    const arr = [...nodes];
    steps.push({ type: 'highlight', indices: [], description: 'Initialize: prev = null, curr = head (10)', pseudocodeLine: 1, extra: { prev: null, curr: 0, next: null, reversed: [] } });
    
    let prevIdx: number | null = null;
    const revArr: number[] = [];
    
    for (let i = 0; i < arr.length; i++) {
      steps.push({ type: 'compare', indices: [i], description: `Save next: next = ${arr[i+1] ?? 'null'}`, pseudocodeLine: 4, extra: { prev: prevIdx, curr: i, next: i + 1 < arr.length ? i + 1 : null, reversed: [...revArr] } });
      steps.push({ type: 'swap', indices: [i], description: `Flip arrow: ${arr[i]}.next = ${prevIdx !== null ? arr[prevIdx] : 'null'} (was ${arr[i+1] ?? 'null'})`, pseudocodeLine: 5, extra: { prev: prevIdx, curr: i, next: i + 1 < arr.length ? i + 1 : null, reversed: [...revArr] } });
      revArr.unshift(arr[i]);
      steps.push({ type: 'visit', indices: [i], description: `Move forward: prev = ${arr[i]}, curr = ${arr[i+1] ?? 'null'}`, pseudocodeLine: 7, extra: { prev: i, curr: i + 1 < arr.length ? i + 1 : null, next: null, reversed: [...revArr] } });
      prevIdx = i;
    }
    steps.push({ type: 'complete', indices: [], description: 'Reversal complete! prev is the new head 🎉', pseudocodeLine: 8, extra: { prev: arr.length - 1, curr: null, next: null, reversed: [...revArr] } });
    
    player.generateSteps(steps);
    player.play();
  }, [nodes, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🔄 Visualizer: Reverse a Linked List</h3>
      <p className="text-sm text-gray-400">The classic interview question! Watch three pointers (prev, curr, next) work together.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-2">Original:</div>
          <div className="bg-gray-900/50 rounded-xl p-4 overflow-x-auto">
            <div className="flex items-center gap-0">
              {nodes.map((val, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
                    currentState.curr === i ? 'border-amber-500 bg-amber-500/20 text-amber-300' :
                    currentState.prev === i ? 'border-violet-500 bg-violet-500/20 text-violet-300' :
                    currentState.next === i ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' :
                    'border-gray-600 bg-gray-800/50 text-gray-300'
                  }`}>{val}</div>
                  {i < nodes.length - 1 && <span className="text-gray-600 mx-1">→</span>}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-violet-400">■ prev</span>
              <span className="text-amber-400">■ curr</span>
              <span className="text-cyan-400">■ next</span>
            </div>
          </div>
          
          {reversed.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-emerald-400 mb-2">Reversed so far:</div>
              <div className="bg-gray-900/50 rounded-xl p-4 flex items-center gap-1">
                {reversed.map((val, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-10 h-10 rounded-lg border-2 border-emerald-500 bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono font-bold text-xs">{val}</div>
                    {i < reversed.length - 1 && <span className="text-emerald-600 mx-1 text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <PseudocodeViewer lines={pseudocode} currentLine={pseudoLine} title="Reversal Algorithm" />
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex gap-3">
        <button onClick={runReverse} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Run Reversal</button>
      </div>

      <AlgorithmControls isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed} />
    </div>
  );
}

// ─── Visualizer 3: Floyd's Cycle Detection ───
function FloydCycleVisualizer() {
  const nodes = [3, 2, 0, -4];
  const cycleStart = 1; // index 1
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const [meetPoint, setMeetPoint] = useState<number | null>(null);
  const [description, setDescription] = useState('Watch the tortoise 🐢 and hare 🐇 race through the cycle!');

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      if (step.extra) {
        setSlow(step.extra.slow as number);
        setFast(step.extra.fast as number);
        if (step.extra.meetPoint !== undefined) setMeetPoint(step.extra.meetPoint as number);
      }
      if (step.description) setDescription(step.description);
    },
  });

  const runFloyd = useCallback(() => {
    const steps: AlgorithmStep[] = [];
    let s = 0, f = 0;
    const getNext = (i: number) => i === nodes.length - 1 ? cycleStart : i + 1;

    for (let iter = 0; iter < 20; iter++) {
      s = getNext(s);
      f = getNext(getNext(f));
      steps.push({
        type: s === f ? 'found' : 'compare',
        indices: [s, f],
        description: s === f
          ? `🎉 They met at node ${nodes[s]}! Cycle detected at index ${s}!`
          : `🐢 Tortoise at ${nodes[s]} (index ${s}), 🐇 Hare at ${nodes[f]} (index ${f})`,
        extra: { slow: s, fast: f, meetPoint: s === f ? s : undefined },
      });
      if (s === f) break;
    }
    player.generateSteps(steps);
    player.play();
  }, [nodes, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🐢🐇 Visualizer: Floyd's Cycle Detection</h3>
      <p className="text-sm text-gray-400">The slow pointer moves 1 step, fast pointer moves 2. If there's a cycle, they MUST meet!</p>

      <div className="bg-gray-900/50 rounded-xl p-6">
        <div className="flex items-center gap-0 justify-center flex-wrap">
          {nodes.map((val, i) => (
            <div key={i} className="flex items-center">
              <div className={`relative w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all ${
                meetPoint === i ? 'border-emerald-400 bg-emerald-500/30 text-emerald-300 shadow-lg shadow-emerald-500/30' :
                slow === i && fast === i ? 'border-amber-400 bg-amber-500/20 text-amber-300' :
                slow === i ? 'border-blue-400 bg-blue-500/20 text-blue-300' :
                fast === i ? 'border-rose-400 bg-rose-500/20 text-rose-300' :
                'border-gray-600 bg-gray-800/50 text-gray-300'
              }`}>
                {val}
                {slow === i && <span className="absolute -top-5 text-sm">🐢</span>}
                {fast === i && <span className="absolute -bottom-5 text-sm">🐇</span>}
              </div>
              {i < nodes.length - 1 ? (
                <span className="text-gray-600 mx-2">→</span>
              ) : (
                <div className="flex items-center">
                  <span className="text-gray-600 mx-1">→</span>
                  <span className="text-amber-400 text-xs font-mono">↩ back to [{cycleStart}]</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <button onClick={runFloyd} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">
        Run Floyd's Algorithm
      </button>

      <AlgorithmControls isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed} />
    </div>
  );
}

// ─── Main Chapter ───
const Chapter02_LinkedLists: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔗</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 2: Linked Lists</h1>
            <p className="text-gray-400">Navigate nodes and pointers like a pro</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-easy">Easy</span>
          <span className="text-gray-600">→</span>
          <span className="badge badge-medium">Medium</span>
          <span className="text-gray-600 text-sm ml-2">+25 XP</span>
        </div>
      </motion.div>

      <TheorySection />

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizers</h2>
        <LinkedListVisualizer />
        <ReverseVisualizer />
        <FloydCycleVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">🏢 Company Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
            <CompanyTag company="Amazon" size="md" />
            <p className="text-sm text-gray-300"><strong>LRU Cache</strong> — uses a doubly linked list + hash map. One of Amazon's most-asked questions!</p>
            <p className="text-xs text-amber-400/80 italic">💡 Practice implementing LRU from scratch. Amazon loves this.</p>
          </motion.div>
          <motion.div className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
            <CompanyTag company="Microsoft" size="md" />
            <p className="text-sm text-gray-300"><strong>Merge Two Sorted Lists</strong> — classic recursion or iteration. Clean code wins here.</p>
            <p className="text-xs text-amber-400/80 italic">💡 Microsoft values clean, well-tested solutions.</p>
          </motion.div>
        </div>
      </section>

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={2} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/arrays')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/stacks-queues')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter02_LinkedLists;
