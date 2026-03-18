import { MustSolvePanel } from '../components/UI/MustSolvePanel';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlgorithmControls } from '../components/UI/AlgorithmControls';
import { CompanyTag } from '../components/UI/CompanyTag';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';
import type { AlgorithmStep } from '../hooks/useAlgorithmPlayer';

interface Props { onComplete: () => void; isCompleted: boolean; interviewMode: boolean; }

// ─── Theory ───
function TheorySection() {
  return (
    <section className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="theory-card">
        <h3 className="theory-heading">📚 What are Stacks and Queues?</h3>
        <p className="theory-text">
          A <strong>stack</strong> is like a stack of plates 🍽️ — you always put a new plate on <em>top</em> and take from the <em>top</em>. The last plate you put is the first one you take. This is called <strong>LIFO</strong> (Last In, First Out).
        </p>
        <p className="theory-text mt-3">
          A <strong>queue</strong> is like a line at a movie theater 🎬 — the first person in line gets their ticket first. This is called <strong>FIFO</strong> (First In, First Out).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="analogy-box">
            📚 <strong>Stack analogy — Undo button:</strong> When you type in a document, each letter is "pushed" onto a stack. When you press Ctrl+Z (undo), the last action is "popped" off. That's why undo removes the most recent thing!
          </div>
          <div className="analogy-box">
            🎬 <strong>Queue analogy — Printer queue:</strong> When you send 3 documents to print, document 1 prints first, then 2, then 3. First come, first served!
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
        <h3 className="theory-heading">🔧 Stack Operations</h3>
        <p className="theory-text">Stacks have just two main operations — and they're both O(1)!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <h4 className="text-emerald-400 font-bold text-sm mb-1">Push — Add to top</h4>
            <p className="text-xs text-gray-400">Like placing a new book on top of a pile.</p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
            <h4 className="text-rose-400 font-bold text-sm mb-1">Pop — Remove from top</h4>
            <p className="text-xs text-gray-400">Like taking the top book off the pile.</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">Also: <strong>Peek</strong> (look at top without removing) and <strong>isEmpty</strong> (check if empty) — both O(1).</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
        <h3 className="theory-heading">🔧 Queue Operations</h3>
        <p className="theory-text">Same idea, different ends!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <h4 className="text-emerald-400 font-bold text-sm mb-1">Enqueue — Add to back</h4>
            <p className="text-xs text-gray-400">Like joining the back of a line.</p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
            <h4 className="text-rose-400 font-bold text-sm mb-1">Dequeue — Remove from front</h4>
            <p className="text-xs text-gray-400">Like the next person in line getting served.</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="theory-card">
        <h3 className="theory-heading">💻 Where We Use Stacks (Everywhere!)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 text-sm text-gray-300">
            <strong className="text-primary-400">Function Call Stack:</strong> When function A calls B which calls C, the computer uses a stack to remember where to return.
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 text-sm text-gray-300">
            <strong className="text-primary-400">Browser Back Button:</strong> Each page you visit is pushed. Click back = pop!
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 text-sm text-gray-300">
            <strong className="text-primary-400">Expression Parsing:</strong> Checking if parentheses are balanced: (()), {`{[]}`}
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 text-sm text-gray-300">
            <strong className="text-primary-400">Recursion:</strong> Every recursive call uses the stack under the hood!
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="theory-card">
        <h3 className="theory-heading">⏱️ Time Complexity</h3>
        <table className="w-full text-sm mt-3">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-2 px-3 text-left text-gray-400">Operation</th>
              <th className="py-2 px-3 text-center text-gray-400">Stack</th>
              <th className="py-2 px-3 text-center text-gray-400">Queue</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-800/50">
              <td className="py-2 px-3">Push/Enqueue</td>
              <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td>
              <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="py-2 px-3">Pop/Dequeue</td>
              <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td>
              <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="py-2 px-3">Peek/Front</td>
              <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td>
              <td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(1)</span></td>
            </tr>
            <tr>
              <td className="py-2 px-3">Search</td>
              <td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td>
              <td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}

// ─── Visualizer 1: Stack ───
function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');
  const [description, setDescription] = useState('Push and pop to see LIFO in action!');
  const [highlightTop, setHighlightTop] = useState(false);

  const handlePush = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    setStack([...stack, val]);
    setInputValue('');
    setDescription(`Pushed ${val} onto the stack!`);
    setHighlightTop(true);
    setTimeout(() => setHighlightTop(false), 800);
  };

  const handlePop = () => {
    if (stack.length === 0) return;
    const val = stack[stack.length - 1];
    setDescription(`Popped ${val} from the stack!`);
    setStack(stack.slice(0, -1));
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">📚 Visualizer: Stack (LIFO)</h3>
      <p className="text-sm text-gray-400">Elements enter and leave from the TOP only.</p>

      <div className="bg-gray-900/50 rounded-xl p-6">
        <div className="flex flex-col-reverse items-center gap-1 min-h-[200px]">
          <div className="w-32 h-1 bg-gray-600 rounded" />
          <AnimatePresence>
            {stack.map((val, i) => (
              <motion.div
                key={`${i}-${val}`}
                layout
                initial={{ y: -50, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -50, opacity: 0, scale: 0.5 }}
                className={`w-32 h-12 rounded-xl border-2 flex items-center justify-center font-mono font-bold ${
                  i === stack.length - 1 && highlightTop
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                    : i === stack.length - 1
                    ? 'border-primary-500 bg-primary-500/20 text-primary-300'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300'
                }`}
              >
                {val}
                {i === stack.length - 1 && <span className="ml-2 text-xs text-gray-500">← TOP</span>}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex items-center gap-3">
        <input type="number" placeholder="Value" value={inputValue} onChange={e => setInputValue(e.target.value)}
          className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none"
          onKeyDown={e => e.key === 'Enter' && handlePush()} />
        <button onClick={handlePush} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium">Push</button>
        <button onClick={handlePop} className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium">Pop</button>
      </div>
    </div>
  );
}

// ─── Visualizer 2: Queue ───
function QueueVisualizer() {
  const [queue, setQueue] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');
  const [description, setDescription] = useState('Enqueue and dequeue to see FIFO in action!');

  const handleEnqueue = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    setQueue([...queue, val]);
    setInputValue('');
    setDescription(`Enqueued ${val} at the back!`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) return;
    const val = queue[0];
    setDescription(`Dequeued ${val} from the front!`);
    setQueue(queue.slice(1));
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🚶‍♂️ Visualizer: Queue (FIFO)</h3>
      <p className="text-sm text-gray-400">Elements enter from the BACK and leave from the FRONT.</p>

      <div className="bg-gray-900/50 rounded-xl p-6">
        <div className="flex items-center justify-center gap-2 min-h-[80px]">
          <span className="text-xs text-gray-500 font-mono">FRONT →</span>
          <AnimatePresence>
            {queue.map((val, i) => (
              <motion.div
                key={`${i}-${val}`}
                layout
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-mono font-bold ${
                  i === 0 ? 'border-rose-500 bg-rose-500/20 text-rose-300' :
                  i === queue.length - 1 ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' :
                  'border-gray-600 bg-gray-800/50 text-gray-300'
                }`}
              >
                {val}
              </motion.div>
            ))}
          </AnimatePresence>
          <span className="text-xs text-gray-500 font-mono">← BACK</span>
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex items-center gap-3">
        <input type="number" placeholder="Value" value={inputValue} onChange={e => setInputValue(e.target.value)}
          className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none" />
        <button onClick={handleEnqueue} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium">Enqueue</button>
        <button onClick={handleDequeue} className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium">Dequeue</button>
      </div>
    </div>
  );
}

// ─── Visualizer 3: Valid Parentheses ───
function ValidParenthesesVisualizer() {
  const [input, setInput] = useState('({[]})');
  const [stack, setStack] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [result, setResult] = useState<'valid' | 'invalid' | null>(null);
  const [description, setDescription] = useState('Type parentheses and check if they\'re balanced!');

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      if (step.extra) {
        setStack(step.extra.stack as string[]);
        setCurrentIdx(step.extra.currentIdx as number);
        if (step.extra.result !== undefined) setResult(step.extra.result as 'valid' | 'invalid');
      }
      if (step.description) setDescription(step.description);
    },
  });

  const runCheck = useCallback(() => {
    const steps: AlgorithmStep[] = [];
    const stk: string[] = [];
    const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
    let isValid = true;

    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      if ('([{'.includes(ch)) {
        stk.push(ch);
        steps.push({ type: 'insert', indices: [i], description: `'${ch}' is opening — push onto stack`, extra: { stack: [...stk], currentIdx: i, result: undefined } });
      } else if (')]}'.includes(ch)) {
        if (stk.length === 0 || stk[stk.length - 1] !== pairs[ch]) {
          isValid = false;
          steps.push({ type: 'delete', indices: [i], description: `'${ch}' doesn't match! Expected '${stk[stk.length - 1] || 'nothing'}' — INVALID ❌`, extra: { stack: [...stk], currentIdx: i, result: 'invalid' } });
          break;
        }
        stk.pop();
        steps.push({ type: 'found', indices: [i], description: `'${ch}' matches '${pairs[ch]}' — pop from stack ✅`, extra: { stack: [...stk], currentIdx: i, result: undefined } });
      }
    }

    if (isValid && stk.length > 0) {
      steps.push({ type: 'complete', indices: [], description: `Stack not empty — unmatched brackets remain! INVALID ❌`, extra: { stack: [...stk], currentIdx: input.length, result: 'invalid' } });
    } else if (isValid) {
      steps.push({ type: 'complete', indices: [], description: `All brackets matched! VALID ✅`, extra: { stack: [], currentIdx: input.length, result: 'valid' } });
    }

    player.generateSteps(steps);
    player.play();
  }, [input, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">✅ Visualizer: Valid Parentheses</h3>
      <p className="text-sm text-gray-400">Classic interview problem! Use a stack to match opening and closing brackets.</p>

      <div className="bg-gray-900/50 rounded-xl p-6">
        <div className="flex items-center justify-center gap-1 mb-4">
          {input.split('').map((ch, i) => (
            <motion.span key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-lg border-2 ${
              i === currentIdx ? (result === 'invalid' ? 'border-rose-500 bg-rose-500/20 text-rose-300' : 'border-primary-500 bg-primary-500/20 text-primary-300') :
              i < currentIdx ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
              'border-gray-700 bg-gray-800/50 text-gray-300'
            }`}>
              {ch}
            </motion.span>
          ))}
        </div>

        <div className="flex items-end justify-center gap-1 min-h-[120px]">
          <div className="text-xs text-gray-500 font-mono mr-2">Stack:</div>
          {stack.length === 0 ? (
            <div className="text-xs text-gray-600 italic">empty</div>
          ) : (
            <AnimatePresence>
              {stack.map((ch, i) => (
                <motion.div key={`${i}-${ch}`} layout initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                  className="w-10 h-10 rounded-lg border-2 border-primary-500 bg-primary-500/20 text-primary-300 flex items-center justify-center font-mono font-bold">
                  {ch}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm font-medium ${result === 'valid' ? 'text-emerald-400' : result === 'invalid' ? 'text-rose-400' : 'text-primary-300'}`}>{description}</motion.p>
      </div>

      <div className="flex items-center gap-3">
        <input type="text" value={input} onChange={e => { setInput(e.target.value); setResult(null); setCurrentIdx(-1); setStack([]); }}
          placeholder="Type brackets..."
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white font-mono focus:border-primary-500 focus:outline-none" />
        <button onClick={runCheck} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Check</button>
      </div>

      <AlgorithmControls isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed} />
    </div>
  );
}

// ─── Visualizer 4: Monotonic Stack ───
function MonotonicStackVisualizer() {
  const heights = [2, 1, 5, 6, 2, 3];
  const [stack, setStack] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>(Array(heights.length).fill(-1));
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [description, setDescription] = useState('Find the next greater element for each bar!');

  const player = useAlgorithmPlayer({
    onStepChange: (step) => {
      if (step.extra) {
        setStack(step.extra.stack as number[]);
        setResult(step.extra.result as number[]);
        setCurrentIdx(step.extra.currentIdx as number);
      }
      if (step.description) setDescription(step.description);
    },
  });

  const runMonotonic = useCallback(() => {
    const steps: AlgorithmStep[] = [];
    const stk: number[] = [];
    const res = Array(heights.length).fill(-1);

    for (let i = 0; i < heights.length; i++) {
      while (stk.length > 0 && heights[stk[stk.length - 1]] < heights[i]) {
        const top = stk.pop()!;
        res[top] = heights[i];
        steps.push({ type: 'found', indices: [top, i], description: `${heights[top]} < ${heights[i]} → Next greater of ${heights[top]} is ${heights[i]}!`, extra: { stack: [...stk], result: [...res], currentIdx: i } });
      }
      stk.push(i);
      steps.push({ type: 'insert', indices: [i], description: `Push index ${i} (height ${heights[i]}) onto stack`, extra: { stack: [...stk], result: [...res], currentIdx: i } });
    }
    steps.push({ type: 'complete', indices: [], description: `Done! Remaining stack elements have no next greater (-1)`, extra: { stack: [], result: [...res], currentIdx: heights.length } });
    player.generateSteps(steps);
    player.play();
  }, [heights, player]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">📊 Visualizer: Monotonic Stack</h3>
      <p className="text-sm text-gray-400">Find the next greater element for each element using a stack that maintains decreasing order.</p>

      <div className="bg-gray-900/50 rounded-xl p-6">
        <div className="flex items-end justify-center gap-2 h-40">
          {heights.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs font-mono text-gray-500">{result[i] !== -1 ? result[i] : '?'}</span>
              <motion.div
                className={`w-10 rounded-t-lg transition-all ${
                  i === currentIdx ? 'bg-amber-500' :
                  result[i] !== -1 ? 'bg-emerald-500' :
                  stack.includes(i) ? 'bg-primary-500' :
                  'bg-gray-600'
                }`}
                style={{ height: h * 20 }}
                layout
              />
              <span className="text-xs font-mono text-gray-400">{h}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-4 justify-center">
          <span className="text-xs text-gray-500">Stack: [</span>
          {stack.map((idx, i) => (
            <span key={i} className="text-xs font-mono text-primary-400">{heights[idx]}{i < stack.length - 1 ? ', ' : ''}</span>
          ))}
          <span className="text-xs text-gray-500">]</span>
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <button onClick={runMonotonic} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Run Monotonic Stack</button>

      <AlgorithmControls isPlaying={player.isPlaying} speed={player.speed} currentStep={player.currentStep}
        totalSteps={player.totalSteps} progress={player.progress}
        onPlay={player.play} onPause={player.pause} onReset={player.reset}
        onStepForward={player.stepForward} onStepBack={player.stepBack} onSpeedChange={player.setSpeed} />
    </div>
  );
}

const Chapter03_StacksQueues: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📚</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 3: Stacks & Queues</h1>
            <p className="text-gray-400">LIFO and FIFO — the workhorses of algorithms</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-easy">Easy</span>
          <span className="text-gray-600 text-sm ml-2">+10 XP</span>
        </div>
      </motion.div>

      <TheorySection />

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizers</h2>
        <StackVisualizer />
        <QueueVisualizer />
        <ValidParenthesesVisualizer />
        <MonotonicStackVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">🏢 Company Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
            <CompanyTag company="Google" size="md" />
            <p className="text-sm text-gray-300"><strong>Expression evaluation</strong> — using two stacks (one for operators, one for operands). Classic Google question.</p>
          </motion.div>
          <motion.div className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
            <CompanyTag company="Amazon" size="md" />
            <p className="text-sm text-gray-300"><strong>Stock span problem</strong> — how many consecutive days the stock price was ≤ today. Solved elegantly with a monotonic stack.</p>
          </motion.div>
        </div>
      </section>

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={3} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/linked-lists')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/hash-maps')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter03_StacksQueues;
