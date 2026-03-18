import React from 'react';

interface AlgorithmControlsProps {
  isPlaying: boolean;
  speed: number;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onSpeedChange: (speed: number) => void;
}

export const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({
  isPlaying,
  speed,
  currentStep,
  totalSteps,
  progress,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBack,
  onSpeedChange,
}) => {
  return (
    <div className="glass-card p-4 space-y-3">
      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        {/* Transport controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
            title="Reset"
          >
            ⏮
          </button>
          <button
            onClick={onStepBack}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
            title="Step Back"
            disabled={currentStep <= -1}
          >
            ⏪
          </button>
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white transition-all shadow-lg shadow-primary-500/20"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶️'}
          </button>
          <button
            onClick={onStepForward}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
            title="Step Forward"
            disabled={currentStep >= totalSteps - 1}
          >
            ⏩
          </button>
        </div>

        {/* Step counter */}
        <div className="text-sm text-gray-400 font-mono">
          Step {Math.max(0, currentStep + 1)} / {totalSteps}
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Speed:</span>
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.1}
            value={speed}
            onChange={e => onSpeedChange(parseFloat(e.target.value))}
            className="w-20 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary-500
              [&::-webkit-slider-thumb]:rounded-full"
          />
          <span className="text-xs text-gray-400 font-mono w-8">{speed.toFixed(1)}×</span>
        </div>
      </div>
    </div>
  );
};
