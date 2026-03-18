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
        <h3 className="theory-heading">🕸️ What is a Graph?</h3>
        <p className="theory-text">
          Think of a <strong>map of cities connected by roads</strong> 🗺️. Each city is a <strong>node</strong> (or vertex), and each road is an <strong>edge</strong>. Some roads are one-way (directed), some go both ways (undirected). Some roads have distances (weighted). Graphs are everywhere!
        </p>
        <div className="analogy-box">
          📱 <strong>Real-life examples:</strong> Social media (people = nodes, friendships = edges), Google Maps (intersections = nodes, roads = edges with distances), the internet (computers = nodes, cables = edges). Graphs are the most versatile data structure!
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="theory-card">
        <h3 className="theory-heading">📐 Graph Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Undirected</h4>
            <p className="text-xs text-gray-400">Edges go both ways. A↔B means you can go from A to B AND from B to A. Like a two-way street.</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Directed</h4>
            <p className="text-xs text-gray-400">Edges have direction. A→B means you can go from A to B but NOT necessarily back. Like a one-way street.</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">Weighted</h4>
            <p className="text-xs text-gray-400">Each edge has a cost/distance. Like roads with different lengths. Needed for shortest path algorithms.</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-primary-400 font-bold text-sm mb-2">DAG (Directed Acyclic)</h4>
            <p className="text-xs text-gray-400">Directed graph with no cycles. Like task dependencies — you can't depend on yourself! Used in topological sort.</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="theory-card">
        <h3 className="theory-heading">💾 How to Store Graphs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <h4 className="text-emerald-400 font-bold text-sm mb-2">Adjacency List ✅ (Most common)</h4>
            <p className="text-xs text-gray-400">Each node stores a list of its neighbors. Space: O(V+E). Best for sparse graphs.</p>
            <div className="mt-2 font-mono text-xs text-gray-500">
              A: [B, C]<br/>B: [A, D]<br/>C: [A]<br/>D: [B]
            </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <h4 className="text-amber-400 font-bold text-sm mb-2">Adjacency Matrix</h4>
            <p className="text-xs text-gray-400">2D array where matrix[i][j] = 1 if edge exists. Space: O(V²). Good for dense graphs.</p>
            <div className="mt-2 font-mono text-xs text-gray-500">
              {'  A B C D'}<br/>
              {'A 0 1 1 0'}<br/>
              {'B 1 0 0 1'}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="theory-card">
        <h3 className="theory-heading">🆚 BFS vs DFS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
            <h4 className="text-primary-400 font-bold text-sm mb-2">BFS (Breadth-First)</h4>
            <p className="text-xs text-gray-400">Explore level by level, like ripples in a pond 🌊. Uses a <strong>queue</strong>. Finds shortest path in unweighted graphs!</p>
            <p className="text-xs text-gray-500 mt-1">Perfect for: shortest path, level-order, nearest neighbor</p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
            <h4 className="text-rose-400 font-bold text-sm mb-2">DFS (Depth-First)</h4>
            <p className="text-xs text-gray-400">Explore as deep as possible, then backtrack 🕳️. Uses a <strong>stack</strong> (or recursion). Good for path-finding and cycle detection.</p>
            <p className="text-xs text-gray-500 mt-1">Perfect for: cycle detection, topological sort, connected components</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="theory-card">
        <h3 className="theory-heading">🛤️ Dijkstra's Algorithm</h3>
        <p className="theory-text">
          When roads have different lengths, BFS won't find the shortest path. <strong>Dijkstra's algorithm</strong> uses a priority queue (min-heap) to always process the closest unvisited node first. It's like a GPS always choosing the fastest road!
        </p>
        <div className="analogy-box">
          🚗 <strong>Analogy:</strong> You're driving from Mumbai to Delhi. At each city, you check all road options and always take the one with the shortest total distance so far. Once you reach Delhi, you've guaranteed the shortest route!
        </div>
      </motion.div>
    </section>
  );
}

// ─── Graph Visualizer ───
interface GraphNode { id: string; x: number; y: number; }
interface GraphEdge { from: string; to: string; weight?: number; }

function GraphVisualizer() {
  const [nodes] = useState<GraphNode[]>([
    { id: 'A', x: 100, y: 60 }, { id: 'B', x: 250, y: 40 }, { id: 'C', x: 60, y: 180 },
    { id: 'D', x: 200, y: 180 }, { id: 'E', x: 340, y: 130 }, { id: 'F', x: 280, y: 250 },
  ]);
  const [edges] = useState<GraphEdge[]>([
    { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' },
    { from: 'B', to: 'E' }, { from: 'C', to: 'D' }, { from: 'D', to: 'F' }, { from: 'E', to: 'F' },
  ]);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<string | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [description, setDescription] = useState('Choose BFS or DFS to explore the graph!');

  const getNeighbors = (nodeId: string) => edges.filter(e => e.from === nodeId).map(e => e.to).concat(edges.filter(e => e.to === nodeId).map(e => e.from));

  const runBFS = useCallback(() => {
    setVisited(new Set()); setOrder([]); setCurrent(null);
    const vis = new Set<string>();
    const queue = ['A'];
    vis.add('A');
    const steps: { node: string; desc: string }[] = [];

    while (queue.length > 0) {
      const node = queue.shift()!;
      steps.push({ node, desc: `Visiting ${node} (dequeued). Exploring neighbors...` });
      for (const neighbor of getNeighbors(node)) {
        if (!vis.has(neighbor)) {
          vis.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    let i = 0;
    const ord: string[] = [];
    const interval = setInterval(() => {
      if (i >= steps.length) { clearInterval(interval); setCurrent(null); setDescription('BFS complete! 🎉'); return; }
      const step = steps[i];
      setCurrent(step.node);
      ord.push(step.node);
      setOrder([...ord]);
      setVisited(new Set(ord));
      setDescription(step.desc);
      i++;
    }, 800);
  }, [edges]);

  const runDFS = useCallback(() => {
    setVisited(new Set()); setOrder([]); setCurrent(null);
    const vis = new Set<string>();
    const steps: { node: string; desc: string }[] = [];

    const dfs = (node: string) => {
      vis.add(node);
      steps.push({ node, desc: `DFS visiting ${node}. Going deeper...` });
      for (const neighbor of getNeighbors(node)) {
        if (!vis.has(neighbor)) dfs(neighbor);
      }
    };
    dfs('A');

    let i = 0;
    const ord: string[] = [];
    const interval = setInterval(() => {
      if (i >= steps.length) { clearInterval(interval); setCurrent(null); setDescription('DFS complete! 🎉'); return; }
      const step = steps[i];
      setCurrent(step.node);
      ord.push(step.node);
      setOrder([...ord]);
      setVisited(new Set(ord));
      setDescription(step.desc);
      i++;
    }, 800);
  }, [edges]);

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-display text-lg font-bold text-white">🕸️ Visualizer: Graph BFS & DFS</h3>
      <p className="text-sm text-gray-400">Watch how BFS explores level-by-level vs DFS going deep-first!</p>

      <div className="bg-gray-900/50 rounded-xl overflow-hidden">
        <svg width="100%" viewBox="0 0 400 300" className="h-64">
          {edges.map(e => {
            const from = nodes.find(n => n.id === e.from)!;
            const to = nodes.find(n => n.id === e.to)!;
            const isVisitedEdge = visited.has(e.from) && visited.has(e.to);
            return (
              <line key={`${e.from}-${e.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={isVisitedEdge ? '#6366f1' : '#374151'} strokeWidth={isVisitedEdge ? 3 : 1.5}
                className="transition-all duration-500" />
            );
          })}
          {nodes.map(n => (
            <g key={n.id}>
              <motion.circle cx={n.x} cy={n.y} r={20}
                fill={current === n.id ? '#f59e0b' : visited.has(n.id) ? '#6366f1' : '#1f2937'}
                stroke={current === n.id ? '#f59e0b' : visited.has(n.id) ? '#818cf8' : '#4b5563'}
                strokeWidth={2.5}
                animate={{ scale: current === n.id ? 1.2 : 1 }}
                className="transition-all duration-300" />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="JetBrains Mono">
                {n.id}
              </text>
              {order.includes(n.id) && (
                <text x={n.x + 18} y={n.y - 18} textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                  {order.indexOf(n.id) + 1}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {order.length > 0 && (
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">Visit order:</span>
          {order.map((id, i) => (
            <motion.span key={id} initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-xs font-mono text-primary-300">
              {id}
            </motion.span>
          ))}
        </div>
      )}

      <div className="bg-gray-800/30 rounded-xl p-4 text-center">
        <motion.p key={description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary-300 font-medium">{description}</motion.p>
      </div>

      <div className="flex gap-3">
        <button onClick={runBFS} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium">Run BFS</button>
        <button onClick={runDFS} className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium">Run DFS</button>
      </div>
    </div>
  );
}

const Chapter08_Graphs: React.FC<Props> = ({ onComplete, isCompleted, interviewMode }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🕸️</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">Chapter 8: Graph Algorithms</h1>
            <p className="text-gray-400">Explore networks — BFS, DFS, shortest paths</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-hard">Hard</span>
          <span className="text-gray-600 text-sm ml-2">+50 XP</span>
        </div>
      </motion.div>

      <TheorySection />

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">🎮 Interactive Visualizers</h2>
        <GraphVisualizer />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">🏢 Company Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { company: 'Google', problem: 'Google Maps uses Dijkstra for routing. Social network suggestions use BFS.' },
            { company: 'Meta', problem: 'Friend circles = connected components (Union Find). Friend suggestions = BFS distance.' },
            { company: 'Amazon', problem: 'Recommendation graphs — BFS traversal through product relationships.' },
            { company: 'Microsoft', problem: 'Task Scheduler = Topological Sort. Build systems use DAGs everywhere.' },
          ].map(c => (
            <motion.div key={c.company} className="glass-card p-5 space-y-3" whileHover={{ y: -2 }}>
              <CompanyTag company={c.company} size="md" />
              <p className="text-sm text-gray-300">{c.problem}</p>
            </motion.div>
          ))}
        </div>
      </section>

            {/* Must-Solve Problems (Interview Mode) */}
      <AnimatePresence>
        {interviewMode && <MustSolvePanel chapterId={8} />}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button onClick={() => navigate('/chapter/sorting')} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors">← Previous</button>
        <button onClick={onComplete} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white'}`}>
          {isCompleted ? '✅ Completed!' : 'Mark as Completed'}
        </button>
        <button onClick={() => navigate('/chapter/dp')} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors">Next →</button>
      </div>
    </div>
  );
};

export default Chapter08_Graphs;
