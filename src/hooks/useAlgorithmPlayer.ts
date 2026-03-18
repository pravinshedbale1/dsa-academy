import { useState, useCallback, useRef, useEffect } from 'react';

export interface AlgorithmStep {
  type: 'compare' | 'swap' | 'mark-sorted' | 'pivot' | 'visit' | 'highlight' | 'set' | 'insert' | 'delete' | 'found' | 'not-found' | 'complete' | 'pointer-move';
  indices: number[];
  values?: number[];
  description?: string;
  pseudocodeLine?: number;
  extra?: Record<string, unknown>;
}

export interface UseAlgorithmPlayerOptions {
  initialSpeed?: number;
  onStepChange?: (step: AlgorithmStep, index: number) => void;
  onComplete?: () => void;
}

export function useAlgorithmPlayer(options: UseAlgorithmPlayerOptions = {}) {
  const { initialSpeed = 1, onStepChange, onComplete } = options;
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepsRef = useRef<AlgorithmStep[]>([]);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const generateSteps = useCallback((newSteps: AlgorithmStep[]) => {
    cleanup();
    setSteps(newSteps);
    stepsRef.current = newSteps;
    setCurrentStep(-1);
    setIsPlaying(false);
  }, [cleanup]);

  const goToStep = useCallback((index: number) => {
    if (index >= -1 && index < stepsRef.current.length) {
      setCurrentStep(index);
      if (index >= 0 && onStepChange) {
        onStepChange(stepsRef.current[index], index);
      }
    }
  }, [onStepChange]);

  const stepForward = useCallback(() => {
    setCurrentStep(prev => {
      const next = prev + 1;
      if (next >= stepsRef.current.length) {
        cleanup();
        setIsPlaying(false);
        onComplete?.();
        return prev;
      }
      if (onStepChange && next < stepsRef.current.length) {
        onStepChange(stepsRef.current[next], next);
      }
      return next;
    });
  }, [cleanup, onStepChange, onComplete]);

  const stepBack = useCallback(() => {
    setCurrentStep(prev => {
      const next = Math.max(-1, prev - 1);
      if (next >= 0 && onStepChange) {
        onStepChange(stepsRef.current[next], next);
      }
      return next;
    });
  }, [onStepChange]);

  const play = useCallback(() => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(-1);
    }
    setIsPlaying(true);
    cleanup();
    const baseInterval = 600;
    intervalRef.current = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next >= stepsRef.current.length) {
          cleanup();
          setIsPlaying(false);
          onComplete?.();
          return prev;
        }
        if (onStepChange && next < stepsRef.current.length) {
          onStepChange(stepsRef.current[next], next);
        }
        return next;
      });
    }, baseInterval / speed);
  }, [currentStep, steps.length, speed, cleanup, onStepChange, onComplete]);

  const pause = useCallback(() => {
    cleanup();
    setIsPlaying(false);
  }, [cleanup]);

  const reset = useCallback(() => {
    cleanup();
    setCurrentStep(-1);
    setIsPlaying(false);
  }, [cleanup]);

  useEffect(() => {
    if (isPlaying && intervalRef.current) {
      cleanup();
      const baseInterval = 600;
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next >= stepsRef.current.length) {
            cleanup();
            setIsPlaying(false);
            onComplete?.();
            return prev;
          }
          if (onStepChange) {
            onStepChange(stepsRef.current[next], next);
          }
          return next;
        });
      }, baseInterval / speed);
    }
  }, [speed]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const currentStepData = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return {
    steps,
    currentStep,
    currentStepData,
    isPlaying,
    speed,
    progress,
    totalSteps: steps.length,
    generateSteps,
    play,
    pause,
    reset,
    stepForward,
    stepBack,
    goToStep,
    setSpeed,
  };
}
