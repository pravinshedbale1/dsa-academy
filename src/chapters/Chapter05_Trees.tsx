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

// ─── Tree Node Display ───
interface TreeNodeData { value: number; left?: TreeNodeData; right?: TreeNodeData; }

function TreeNodeComponent({ node, highlight, depth = 0, x = 0 }: { node: TreeNodeData | undefined; highlight: Map<number, string>; depth?: number; x?: number }) {
  if (!node) return null;
  const color = highlight.get(node.value);
  const colorClass = color === 'found' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-emerald-500/20'
    : color === 'comparing' ? 'border-amber-500 bg-amber-500/20 text-amber-300'
    : color === 'active' ? 'border-primary-500 bg-primary-500/20 text-primary-300'
    : color === 'pivot' ? 'border-rose-500 bg-rose-500/20 text-rose-300'
    : 'border-gray-600 bg-gray-800/50 text-gray-300';

  return (
    <div className="flex flex-col items-center">
      <motion.div
        layout
        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm ${colorClass} shadow-lg transition-all duration-300`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        {node.value}
      </motion.div>
      {(node.left || node.right) && (
        <div className="flex gap-4 mt-2 relative">
          {node.left && (
            <div className="flex flex-col items-center">
              <div className="w-px h-4 bg-gray-700" />
              <TreeNodeComponent node={node.left} highlight={highlight} depth={depth + 1} />
            </div>
          )}
          {node.right && (
            <div className="flex flex-col items-center">
              <div className="w-px h-4 bg-gray-700" />
              <TreeNodeComponent node={node.right} highlight={highlight} depth={depth + 1} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TheorySection() {
  return (
    <section className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="theory-card">
        <h3 className="theory-heading">🌳 What is a Tree?</h3>
        <p className="theory-text">
          Think of a <strong>family tree</strong> 👨‍👩‍👧‍👦! At the top is the great-grandparent (root). Each person can have children, and those children can have more children. The people at the bottom with no children are called "leaves" 🍃.
        </p>
        <div className="analogy-box">
          📁 <strong>Real-life analogy:</strong> Your computer's file system IS a tree! The root folder is the root node, each subfolder is a child, and files are leaves. When you navigate folders, you're doing tree traversal!
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
        <h3 className="theory-heading">🔤 Tree Terminology</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          {[
            { term: 'Root', desc: 'The topmost node (no parent)', icon: '👑' },
            { term: 'Leaf', desc: 'A node with no children', icon: '🍃' },
            { term: 'Height', desc: 'Longest path from root to leaf', icon: '📏' },
            { term: 'Depth', desc: 'Distance from root to this node', icon: '⬇️' },
            { term: 'Subtree', desc: 'A node and all its descendants', icon: '🌿' },
            { term: 'Parent/Child', desc: 'Connected node above/below', icon: '👆👇' },
          ].map(t => (
            <div key={t.term} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-1">
                <span>{t.icon}</span>
                <span className="text-primary-400 font-bold text-sm">{t.term}</span>
              </div>
              <p className="text-xs text-gray-400">{t.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
        <h3 className="theory-heading">🔍 Binary Search Tree (BST) Property</h3>
        <p className="theory-text">
          A BST follows one simple rule: for every node, <strong>all values in the left subtree are smaller</strong>, and <strong>all values in the right subtree are larger</strong>. This makes searching super fast — like binary search but on a tree!
        </p>
        <div className="analogy-box">
          📖 <strong>Analogy:</strong> Imagine organizing books on shelves. Pick a book — all books with earlier titles go LEFT, later titles go RIGHT. Want to find a book? Start at the middle and keep choosing left or right. You eliminate half the books each step!
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="theory-card">
        <h3 className="theory-heading">🚶 Tree Traversals — 3 Ways to Walk a Tree</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Inorder (LNR)</h4>
            <p className="text-xs text-gray-400">Left → Node → Right</p>
            <p className="text-xs text-emerald-400 mt-1">✨ In a BST, this gives sorted order!</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Preorder (NLR)</h4>
            <p className="text-xs text-gray-400">Node → Left → Right</p>
            <p className="text-xs text-amber-400 mt-1">📋 Good for copying/serializing trees</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Postorder (LRN)</h4>
            <p className="text-xs text-gray-400">Left → Right → Node</p>
            <p className="text-xs text-rose-400 mt-1">🗑️ Good for deleting trees (children first)</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="theory-card">
        <h3 className="theory-heading">⏱️ Time Complexity</h3>
        <table className="w-full text-sm mt-3">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-2 px-3 text-left text-gray-400">Operation</th>
              <th className="py-2 px-3 text-center text-gray-400">Balanced BST</th>
              <th className="py-2 px-3 text-center text-gray-400">Unbalanced (worst)</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Search</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(log n)</span></td><td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td></tr>
            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Insert</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(log n)</span></td><td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td></tr>
            <tr><td className="py-2 px-3">Delete</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(log n)</span></td><td className="py-2 px-3 text-center"><span className="badge bg-amber-500/20 text-amber-400">O(n)</span></td></tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-2">⚠️ An unbalanced BST is basically a linked list! That's why AVL/Red-Black trees exist — they self-balance.</p>
      </motion.div>
    </section>
  );
}

// ─── BST Visualizer ───
function BSTVisualizer() {
  const [tree, setTree] = useState<TreeNodeData>({ value: 50, left: { value: 30, left: { value: 20 }, right: { value: 40 } }, right: { value: 70, left: { value: 60 }, right: { value: 80 } } });
  const [inputValue, setInputValue] = useState('');
  const [highlights, setHighlights] = useState<Map<number, string>>(new Map());
  const [description, setDescription] = useState('Insert, search, or traverse the BST!');
  const [traversalResult, setTraversalResult] = useState<number[]>([]);

  const insertBST = (node: TreeNodeData | undefined, val: number): TreeNodeData => {
    if (!node) return { value: val };
    if (val < node.value) return { ...node, left: insertBST(node.left, val) };
    if (val > node.value) return { ...node, right: insertBST(node.right, val) };
    return node;
  };

  const handleInsert = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    setTree(prev => insertBST(prev, val));
    setInputValue('');
    setDescription(`Inserted ${val} into the BST!`);
  };

  const handleSearch = useCallback(() => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    const steps: AlgorithmStep[] = [];
    const search = (node: TreeNodeData | undefined): boolean => {
      if (!node) { steps.push({ type: 'complete', indices: [], description: `${val} not found in the tree ❌` }); return false; }
      if (node.value === val) { steps.push({ type: 'found', indices: [node.value], description: `Found ${val}! 🎉` }); return true; }
      steps.push({ type: 'compare', indices: [node.value], description: `${val} ${val < node.value ? '<' : '>'} ${node.value} → go ${val < node.value ? 'LEFT' : 'RIGHT'}` });
      return val < node.value ? search(node.left) : search(node.right);
    };
    search(tree);
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx >= steps.length) { clearInterval(interval); return; }
      const step = steps[stepIdx];
      const h = new Map<number, string>();
      step.indices.forEach(v => h.set(v, step.type === 'found' ? 'found' : 'comparing'));
      setHighlights(h);
      setDescription(step.description || '');
      stepIdx++;
    }, 800);
  }, [inputValue, tree]);

  const handleTraversal = (type: 'inorder' | 'preorder' | 'postorder') => {
    const result: number[] = [];
    const traverse = (node: TreeNodeData | undefined) => {
      if (!node) return;
      if (type === 'preorder') result.push(node.value);
      traverse(node.left);
      if (type === 'inorder') result.push(node.value);
      traverse(node.right);
      if (type === 'postorder') result.push(node.value);
    };
    traverse(tree);
    setTraversalResult(result);
    setDescription(`${type.charAt(0).toUpperCase() + type.slice(1)} traversal: [${result.join(', ')}]`);
    
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= result.length) { clearInterval(interval); setHighlights(new Map()); return; }
      setHighlights(new Map([[result[idx], 'active']]));
      idx++;
    }, 500);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🌲 Visualizer: Binary Search Tree</h3>
      <p className="text-sm text-gray-400">Insert values and watch them find their correct position! Search to see the path taken.</p>

      <div className="bg-gray-900/50 rounded-xl p-6">
        <div className="flex justify-center overflow-x-auto">
          <TreeNodeComponent node={tree} highlight={highlights} />
        </div>
      </div>

      {traversalResult.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-gray-500">Result:</span>
          {traversalResult.map((val, i) => (
            <motion.span key={`${i}-${val}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}
              className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-xs font-mono text-primary-300">
              {val}
            </motion.span>
          ))}
        </div>
      )}

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input type="number" placeholder="Value" value={inputValue} onChange={e => setInputValue(e.target.value)}
          className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-primary-500 focus:outline-none" />
        <button onClick={handleInsert} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium">Insert</button>
        <button onClick={handleSearch} className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium">Search</button>
        <div className="w-px h-6 bg-gray-700" />
        <button onClick={() => handleTraversal('inorder')} className="px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-xs font-medium">Inorder</button>
        <button onClick={() => handleTraversal('preorder')} className="px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-xs font-medium">Preorder</button>
        <button onClick={() => handleTraversal('postorder')} className="px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-xs font-medium">Postorder</button>
      </div>
    </div>
  );
}

const Chapter05_Trees: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌳</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 5: Trees</h1>
            <p className="text-gray-400">Hierarchical data — BSTs, traversals, and balance</p>
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
        <BSTVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">🏢 Company Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { company: 'Google', problem: 'Serialize/Deserialize Binary Tree', tip: 'Use preorder traversal + null markers' },
            { company: 'Amazon', problem: 'Lowest Common Ancestor', tip: 'Classic BST property: LCA is where paths diverge' },
            { company: 'Meta', problem: 'Diameter of Binary Tree', tip: 'Think about the longest path through any node' },
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
        {interviewMode && <MustSolvePanel chapterId={5} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/hash-maps')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/heaps')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter05_Trees;
