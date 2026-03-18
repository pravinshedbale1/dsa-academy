import { useState, useEffect, useCallback } from 'react';

interface ProgressData {
  visited: number[];
  completed: number[];
  xp: number;
  streak: number;
  lastVisit: string;
  completedDays: number[];
}

const STORAGE_KEY = 'dsa-academy-progress';

function getDefaultProgress(): ProgressData {
  return {
    visited: [],
    completed: [],
    xp: 0,
    streak: 0,
    lastVisit: new Date().toISOString().split('T')[0],
    completedDays: [],
  };
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      // Check streak
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (data.lastVisit !== today && data.lastVisit !== yesterday) {
        data.streak = 0;
      }
      if (data.lastVisit !== today) {
        data.streak += 1;
        data.lastVisit = today;
      }
      return data;
    }
  } catch { /* ignore */ }
  return getDefaultProgress();
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markVisited = useCallback((chapterId: number) => {
    setProgress(prev => {
      if (prev.visited.includes(chapterId)) return prev;
      return { ...prev, visited: [...prev.visited, chapterId] };
    });
  }, []);

  const markCompleted = useCallback((chapterId: number, xpReward: number) => {
    setProgress(prev => {
      if (prev.completed.includes(chapterId)) return prev;
      return {
        ...prev,
        completed: [...prev.completed, chapterId],
        xp: prev.xp + xpReward,
      };
    });
  }, []);

  const unmarkCompleted = useCallback((chapterId: number, xpReward: number) => {
    setProgress(prev => {
      if (!prev.completed.includes(chapterId)) return prev;
      return {
        ...prev,
        completed: prev.completed.filter(id => id !== chapterId),
        xp: Math.max(0, prev.xp - xpReward),
      };
    });
  }, []);

  const toggleStudyDay = useCallback((day: number) => {
    setProgress(prev => {
      const has = prev.completedDays.includes(day);
      return {
        ...prev,
        completedDays: has
          ? prev.completedDays.filter(d => d !== day)
          : [...prev.completedDays, day],
      };
    });
  }, []);

  const isCompleted = useCallback((chapterId: number) => {
    return progress.completed.includes(chapterId);
  }, [progress.completed]);

  const isVisited = useCallback((chapterId: number) => {
    return progress.visited.includes(chapterId);
  }, [progress.visited]);

  const totalXP = progress.xp;
  const maxXP = 435; // sum of all chapter XPs

  return {
    progress,
    markVisited,
    markCompleted,
    unmarkCompleted,
    toggleStudyDay,
    isCompleted,
    isVisited,
    totalXP,
    maxXP,
    streak: progress.streak,
  };
}
