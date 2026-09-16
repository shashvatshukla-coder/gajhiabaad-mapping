import React, { useState } from 'react';
import {
  X,
  Layers,
  Navigation,
  CheckCircle2,
  Building,
  GraduationCap,
  Sparkles,
  ChevronRight,
  SplitSquareVertical,
  ArrowRightLeft
} from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';

export default function BuildingModal({
  building,
  onClose,
  isExploded,
  setIsExploded,
  onNavigateTo,
  onOpenBlockDistance
}) {
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);

  if (!building) return null;

  const handleToggleExplode = () => {
    soundEngine.playExplode();
    setIsExploded(!isExploded);
  };

  const handleNavigate = () => {
    soundEngine.playRouteFound();
    onNavigateTo(building.id);
  };

  return (
    <div className="absolute top-20 right-4 bottom-20 w-80 sm:w-96 glass-panel rounded-3xl p-5 shadow-2xl z-40 border border-sky-500/20 flex flex-col pointer-events-auto animate-in fade-in slide-in-from-right-5 duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shrink-0 ring-2 ring-white/20"
            style={{ backgroundColor: building.color }}
          >
            {building.code}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {building.tag}
            </span>
            <h2 className="text-base font-bold text-white mt-1 leading-tight">{building.name}</h2>
          </div>
        </div>
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Action Buttons: 3D Explode Floors, Directions & Block Distance */}
      <div className="grid grid-cols-3 gap-1.5 my-3">
        <button
          onClick={handleToggleExplode}
          className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-[11px] font-bold transition-all shadow-md ${
            isExploded
              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-amber-500/20 border border-amber-400'
              : 'glass-button text-amber-300 border-amber-500/30 hover:border-amber-400'
          }`}
        >
          <SplitSquareVertical className="w-3.5 h-3.5" />
          <span>{isExploded ? 'Collapse' : 'Explode'}</span>
        </button>

        <button
          onClick={handleNavigate}
          className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-[11px] font-bold bg-sky-500 hover:bg-sky-400 text-white transition-all shadow-md shadow-sky-500/25 border border-sky-400"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Directions</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            if (onOpenBlockDistance) {
              onOpenBlockDistance(building.id);
            }
          }}
          className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-[11px] font-bold glass-button text-amber-300 border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/20"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Distance</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
        {/* Description */}
        <p className="text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-2xl border border-white/5">
          {building.description}
        </p>

        {/* Floor-by-Floor Directory */}
        {building.floors && building.floors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                Floor Breakdown ({building.floors.length} Levels)
              </span>
              <span className="text-[10px] text-slate-400">Select level</span>
            </div>

            {/* Floor Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {building.floors.map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedFloorIndex(idx);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
                    selectedFloorIndex === idx
                      ? 'bg-sky-500 text-white shadow-md'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  {f.floor}
                </button>
              ))}
            </div>

            {/* Selected Floor Rooms */}
            <div className="bg-slate-900/60 rounded-2xl p-3 border border-white/5 space-y-1.5">
              <div className="text-[11px] font-bold text-sky-400 pb-1 border-b border-slate-800">
                {building.floors[selectedFloorIndex]?.floor} Labs & Facilities
              </div>
              <ul className="space-y-1 mt-1.5">
                {building.floors[selectedFloorIndex]?.rooms.map((room, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    <span>{room}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Key Highlights */}
        {building.highlights && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Key Highlights & Labs
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {building.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/40 border border-white/5 text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Departments */}
        {building.departments && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              Departments & Divisions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {building.departments.map((dept, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-slate-800/80 text-slate-300 text-[11px] border border-white/5"
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
