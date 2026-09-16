import React, { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Compass
} from 'lucide-react';
import { TOUR_STEPS } from '../data/tourSteps';
import { soundEngine } from '../utils/audioEffects';

export default function TourController({
  currentStepIndex,
  setCurrentStepIndex,
  isPlaying,
  setIsPlaying,
  onExitTour
}) {
  const currentStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];
  const [progress, setProgress] = useState(0);

  // Auto advance timer
  useEffect(() => {
    let timer;
    let interval;
    if (isPlaying) {
      const stepDuration = currentStep.duration || 7000;
      const startTime = Date.now();

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, (elapsed / stepDuration) * 100);
        setProgress(p);
      }, 50);

      timer = setTimeout(() => {
        if (currentStepIndex < TOUR_STEPS.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
          setProgress(0);
        } else {
          setIsPlaying(false);
          setProgress(100);
        }
      }, stepDuration);
    } else {
      setProgress(0);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isPlaying, currentStepIndex]);

  const handleNext = () => {
    soundEngine.playSelect();
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setCurrentStepIndex(0);
    }
  };

  const handlePrev = () => {
    soundEngine.playSelect();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleTogglePlay = () => {
    soundEngine.playClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-2xl glass-panel rounded-3xl p-5 shadow-2xl z-40 border border-sky-500/30 flex flex-col gap-3 pointer-events-auto animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header and Step Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Milestone {currentStep.step} of {TOUR_STEPS.length}
          </span>
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
            {currentStep.subtitle}
          </span>
        </div>

        <button
          onClick={() => {
            soundEngine.playClick();
            onExitTour();
          }}
          className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800/50 flex items-center gap-1 text-xs"
        >
          <span>Exit Tour</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Narration Card */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-white mb-1">{currentStep.title}</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-2xl border border-white/5">
          {currentStep.narration}
        </p>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between pt-1">
        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {TOUR_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                soundEngine.playSelect();
                setCurrentStepIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentStepIndex === idx
                  ? 'w-6 bg-sky-400'
                  : idx < currentStepIndex
                  ? 'bg-sky-600/70'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Media Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="glass-button p-2.5 rounded-2xl text-slate-300 disabled:opacity-30 hover:text-white"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="w-11 h-11 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold flex items-center justify-center shadow-lg shadow-sky-500/25 border border-sky-400 hover:scale-105 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className="glass-button p-2.5 rounded-2xl text-slate-300 hover:text-white"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
