import { MustSolvePanel } from '../components/UI/MustSolvePanel';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CompanyTag } from '../components/UI/CompanyTag';

interface Props { onComplete: () => void; isCompleted: boolean; interviewMode: boolean; }

interface TrieNodeData { children: Map<string, TrieNodeData>; isEnd: boolean; char: string; }

function TrieDisplay({ node, depth = 0, highlight }: { node: TrieNodeData; depth?: number; highlight: Set<string> }) {
  const entries = Array.from(node.children.entries());
  if (entries.length === 0) return null;
  return (
    <div className="flex flex-col items-center gap-1">
      {entries.map(([ch, child]) => (
        <div key={ch} className="flex items-start gap-2">
          <div className="flex flex-col items-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm ${
                highlight.has(child.char) ? 'border-amber-500 bg-amber-500/20 text-amber-300' :
                child.isEnd ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' :
                'border-gray-600 bg-gray-800/50 text-gray-300'
              }`}>
              {ch}
              {child.isEnd && <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />}
            </motion.div>
            <TrieDisplay node={child} depth={depth + 1} highlight={highlight} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TrieVisualizer() {
  const [root, setRoot] = useState<TrieNodeData>({ children: new Map(), isEnd: false, char: '' });
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [highlight, setHighlight] = useState<Set<string>>(new Set());
  const [description, setDescription] = useState('Insert words to build the trie!');

  const insertWord = useCallback(() => {
    if (!inputWord) return;
    const newRoot = JSON.parse(JSON.stringify(root, (_, v) => v instanceof Map ? Object.fromEntries(v) : v));
    const restoreMap = (obj: any): TrieNodeData => ({
      ...obj,
      children: new Map(Object.entries(obj.children || {}).map(([k, v]) => [k, restoreMap(v as any)])),
    });

    let node = root;
    for (const ch of inputWord.toLowerCase()) {
      if (!node.children.has(ch)) {
        node.children.set(ch, { children: new Map(), isEnd: false, char: ch });
      }
      node = node.children.get(ch)!;
    }
    node.isEnd = true;

    setRoot({ ...root });
    setWords(prev => [...prev, inputWord.toLowerCase()]);
    setDescription(`Inserted "${inputWord}" into the trie!`);
    setInputWord('');
  }, [inputWord, root]);

  const searchPrefix = useCallback(() => {
    if (!searchWord) return;
    let node: TrieNodeData | undefined = root;
    const highlighted = new Set<string>();
    for (const ch of searchWord.toLowerCase()) {
      if (!node?.children.has(ch)) {
        setDescription(`"${searchWord}" not found in trie ❌`);
        setHighlight(new Set());
        return;
      }
      node = node.children.get(ch)!;
      highlighted.add(ch);
    }
    setHighlight(highlighted);
    setDescription(node?.isEnd ? `"${searchWord}" found! ✅` : `"${searchWord}" is a prefix but not a complete word`);
  }, [searchWord, root]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🔤 Visualizer: Trie (Prefix Tree)</h3>
      <p className="text-sm text-gray-400">Build a trie by inserting words, then search for prefixes!</p>

      <div className="bg-gray-900/50 rounded-xl p-6 min-h-[150px]">
        <div className="text-xs text-gray-500 mb-2">root</div>
        <div className="flex gap-4">
          {Array.from(root.children.entries()).map(([ch, child]) => (
            <div key={ch} className="flex flex-col items-center">
              <motion.div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm ${
                child.isEnd ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' : 'border-primary-500 bg-primary-500/20 text-primary-300'
              }`}>{ch}</motion.div>
              <div className="w-px h-3 bg-gray-700" />
              <TrieDisplay node={child} highlight={highlight} />
            </div>
          ))}
          {root.children.size === 0 && <span className="text-xs text-gray-600 italic">empty — insert some words!</span>}
        </div>
      </div>

      {words.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-gray-500">Words:</span>
          {words.map((w, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono">{w}</span>
          ))}
        </div>
      )}

      <p className="text-sm text-primary-300 text-center">{description}</p>

      <div className="flex items-center gap-2 flex-wrap">
        <input type="text" value={inputWord} onChange={e => setInputWord(e.target.value)} placeholder="Word to insert"
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm font-mono" onKeyDown={e => e.key === 'Enter' && insertWord()} />
        <button onClick={insertWord} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium">Insert</button>
        <input type="text" value={searchWord} onChange={e => setSearchWord(e.target.value)} placeholder="Search prefix"
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm font-mono" onKeyDown={e => e.key === 'Enter' && searchPrefix()} />
        <button onClick={searchPrefix} className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium">Search</button>
      </div>

      <div className="flex gap-2">
        {['apple', 'app', 'ape', 'bat', 'ball'].map(w => (
          <button key={w} onClick={() => { setInputWord(w); }} className="px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs hover:text-white">+ {w}</button>
        ))}
      </div>
    </div>
  );
}

const Chapter11_Tries: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔤</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 11: Tries & Advanced Strings</h1>
            <p className="text-gray-400">Prefix trees — autocomplete in O(L)</p>
          </div>
        </div>
        <div className="flex items-center gap-2"><span className="badge badge-medium">Medium</span><span className="text-gray-600">→</span><span className="badge badge-hard">Hard</span><span className="text-gray-600 text-sm ml-2">+50 XP</span></div>
      </motion.div>

      <section className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="theory-card">
          <h3 className="theory-heading">🔤 What is a Trie?</h3>
          <p className="theory-text">
            A <strong>Trie</strong> (pronounced "try") is a tree where each node represents a single character. Paths from root to nodes form words. It's like a <strong>dictionary organized by prefixes</strong>!
          </p>
          <div className="analogy-box">
            📖 <strong>Analogy — Autocomplete:</strong> When you type "app" on Google, it suggests "apple", "application", "apply". A trie stores all those words sharing the prefix "app" in the same branch. Finding all suggestions = walking down that branch!
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
          <h3 className="theory-heading">⏱️ Complexity (L = word length)</h3>
          <table className="w-full text-sm mt-3">
            <thead><tr className="border-b border-gray-800"><th className="py-2 px-3 text-left text-gray-400">Op</th><th className="py-2 px-3 text-center text-gray-400">Time</th></tr></thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Insert</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(L)</span></td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Search</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(L)</span></td></tr>
              <tr><td className="py-2 px-3">Prefix search</td><td className="py-2 px-3 text-center"><span className="badge bg-emerald-500/20 text-emerald-400">O(L)</span></td></tr>
            </tbody>
          </table>
        </motion.div>
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizer</h2>
        <TrieVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white">🏢 Company Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ company: 'Google', problem: 'Autocomplete / Search suggestions' }, { company: 'Amazon', problem: 'Word Search II (Trie + Backtracking)' }, { company: 'Microsoft', problem: 'Design Add and Search Words DS' }].map(c => (
            <motion.div key={c.company} className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
              <CompanyTag company={c.company} size="md" />
              <p className="text-sm text-gray-300">{c.problem}</p>
            </motion.div>
          ))}
        </div>
      </section>

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={11} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/backtracking')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/company-strategy')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter11_Tries;
