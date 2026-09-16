import React from 'react';
import { Ruler, X, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';

export default function MeasureToolHUD({
  measurePoints,
  onReset,
  onClose
}) {
  // Calculate Euclidean distance in meters (1 unit ~ 2.5m)
  let distanceMeters = 0;
  if (measurePoints.length === 2) {
    const dx = measurePoints[0][0] - measurePoints[1][0];
    const dz = measurePoints[0][2] - measurePoints[1][2];
    const units = Math.sqrt(dx * dx + dz * dz);
    distanceMeters = Math.round(units * 2.5);
  }

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 glass-panel rounded-2xl px-5 py-3 shadow-2xl z-40 border border-amber-500/30 flex items-center gap-4 pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
          <Ruler className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-amber-400">3D Distance Ruler</div>
          {measurePoints.length === 0 && (
            <div className="text-xs text-slate-300">Click anywhere on the map to place Point 1</div>
          )}
          {measurePoints.length === 1 && (
            <div className="text-xs text-sky-300 animate-pulse">Click a second point to measure distance</div>
          )}
          {measurePoints.length === 2 && (
            <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
              <span>Distance:</span>
              <span className="text-amber-300 text-base">{distanceMeters} meters</span>
              <span className="text-[11px] text-slate-400">({(distanceMeters * 3.28084).toFixed(0)} ft)</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-l border-slate-700 pl-3">
        <button
          onClick={() => {
            soundEngine.playClick();
            onReset();
          }}
          title="Reset points"
          className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          title="Exit measurement tool"
          className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
