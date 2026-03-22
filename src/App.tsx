import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/Layout/Sidebar';
import { Navbar } from './components/Layout/Navbar';
import { useProgress } from './hooks/useProgress';
import { chapters } from './data/chapters';

// Lazy load chapters
const Chapter01 = React.lazy(() => import('./chapters/Chapter01_Arrays'));
const Chapter02 = React.lazy(() => import('./chapters/Chapter02_LinkedLists'));
const Chapter03 = React.lazy(() => import('./chapters/Chapter03_StacksQueues'));
const Chapter04 = React.lazy(() => import('./chapters/Chapter04_HashMaps'));
const Chapter05 = React.lazy(() => import('./chapters/Chapter05_Trees'));
const Chapter06 = React.lazy(() => import('./chapters/Chapter06_Heaps'));
const Chapter07 = React.lazy(() => import('./chapters/Chapter07_Sorting'));
const Chapter08 = React.lazy(() => import('./chapters/Chapter08_Graphs'));
const Chapter09 = React.lazy(() => import('./chapters/Chapter09_DP'));
const Chapter10 = React.lazy(() => import('./chapters/Chapter10_Backtracking'));
const Chapter11 = React.lazy(() => import('./chapters/Chapter11_Tries'));
const Chapter12 = React.lazy(() => import('./chapters/Chapter12_InterviewPrep'));
const Chapter13 = React.lazy(() => import('./chapters/Chapter13_Top150'));
const QuestionDetailPage = React.lazy(() => import('./pages/QuestionDetailPage'));

const chapterComponents: Record<string, React.LazyExoticComponent<React.FC<{ onComplete: () => void; isCompleted: boolean; interviewMode: boolean; }>>> = {
  arrays: Chapter01,
  'linked-lists': Chapter02,
  'stacks-queues': Chapter03,
  'hash-maps': Chapter04,
  trees: Chapter05,
  heaps: Chapter06,
  sorting: Chapter07,
  graphs: Chapter08,
  dp: Chapter09,
  backtracking: Chapter10,
  tries: Chapter11,
  'company-strategy': Chapter12,
  'top-150': Chapter13,
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <motion.div
        className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

// Confetti component for completion celebrations
const ConfettiBurst: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4'];
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: '50%',
          }}
          initial={{ y: 0, x: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            y: -(200 + Math.random() * 400),
            x: (Math.random() - 0.5) * 600,
            opacity: 0,
            rotate: Math.random() * 720,
            scale: 0,
          }}
          transition={{ duration: 1.5 + Math.random(), ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

function ChapterPage({ interviewMode }: { interviewMode: boolean }) {
  const location = useLocation();
  const slug = location.pathname.split('/chapter/')[1];
  const chapter = chapters.find(c => c.slug === slug);
  const { markCompleted, unmarkCompleted, isCompleted, markVisited } = useProgress();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (chapter) markVisited(chapter.id);
  }, [chapter, markVisited]);

  if (!chapter) return <Navigate to="/chapter/arrays" />;

  const ChapterComponent = chapterComponents[slug];
  if (!ChapterComponent) return <Navigate to="/chapter/arrays" />;

  const completed = isCompleted(chapter.id);

  const handleComplete = () => {
    if (completed) {
      unmarkCompleted(chapter.id, chapter.xp);
    } else {
      markCompleted(chapter.id, chapter.xp);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <>
      <ConfettiBurst show={showConfetti} />
      <React.Suspense fallback={<LoadingFallback />}>
        <ChapterComponent onComplete={handleComplete} isCompleted={completed} interviewMode={interviewMode} />
      </React.Suspense>
    </>
  );
}

// Home / Welcome page
const MotionLink = motion.create(Link);

function HomePage() {
  const { totalXP, maxXP, progress } = useProgress();
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-display font-extrabold gradient-text">
          Welcome to DSA Academy
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Master Data Structures & Algorithms through interactive visualizations,
          step-by-step animations, and real-world interview strategies.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass-card p-6 text-center space-y-2">
          <div className="text-3xl">📊</div>
          <h3 className="font-display font-bold text-white">12 Chapters</h3>
          <p className="text-sm text-gray-400">From arrays to interview strategy</p>
        </div>
        <div className="glass-card p-6 text-center space-y-2">
          <div className="text-3xl">🎬</div>
          <h3 className="font-display font-bold text-white">Live Animations</h3>
          <p className="text-sm text-gray-400">See every algorithm step-by-step</p>
        </div>
        <div className="glass-card p-6 text-center space-y-2">
          <div className="text-3xl">🎯</div>
          <h3 className="font-display font-bold text-white">FAANG Ready</h3>
          <p className="text-sm text-gray-400">Company-specific interview tips</p>
        </div>
      </motion.div>

      <motion.div
        className="glass-card p-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-display font-bold text-white text-lg">Your Progress</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-800 rounded-full h-3">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-600 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(totalXP / maxXP) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <span className="font-mono text-sm text-primary-400">{totalXP} XP</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>✅ {progress.completed.length} / {chapters.length} chapters completed</span>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {chapters.map((ch, i) => (
          <MotionLink
            key={ch.id}
            to={`/chapter/${ch.slug}`}
            className="glass-card p-5 hover:border-primary-500/30 transition-all group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{ch.icon}</div>
              <div className="space-y-1 flex-1">
                <h4 className="font-display font-bold text-sm text-white group-hover:text-primary-400 transition-colors">
                  Ch.{ch.id} — {ch.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">{ch.description}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className={`badge ${ch.difficulty.includes('Hard') ? 'badge-hard' : ch.difficulty.includes('Medium') ? 'badge-medium' : 'badge-easy'}`}>
                    {ch.difficulty}
                  </span>
                  <span className="text-[10px] text-gray-600">+{ch.xp} XP</span>
                </div>
              </div>
            </div>
          </MotionLink>
        ))}
      </motion.div>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [interviewMode, setInterviewMode] = useState(false);
  const { progress, totalXP, maxXP, streak } = useProgress();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const currentChapter = chapters.find(c => location.pathname.includes(c.slug));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Sidebar
        completedChapters={progress.completed}
        totalXP={totalXP}
        maxXP={maxXP}
        streak={streak}
      />

      <div className="ml-64">
        <Navbar
          title={currentChapter?.title || 'DSA Academy'}
          timeComplexity={currentChapter?.timeComplexity}
          spaceComplexity={currentChapter?.spaceComplexity}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          interviewMode={interviewMode}
          onToggleInterviewMode={() => setInterviewMode(!interviewMode)}
        />

        <main className="max-w-5xl mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/chapter/:slug" element={<ChapterPage interviewMode={interviewMode} />} />
                <Route path="/question/:questionId" element={
                  <React.Suspense fallback={<LoadingFallback />}>
                    <QuestionDetailPage />
                  </React.Suspense>
                } />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
