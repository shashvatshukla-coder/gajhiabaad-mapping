import React from 'react';
import {
  X,
  Navigation,
  ArrowUpDown,
  Footprints,
  Clock,
  Compass,
  Check,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { BUILDINGS_DATA } from '../data/campusData';
import { soundEngine } from '../utils/audioEffects';

export default function NavigationHUD({
  startBuildingId,
  setStartBuildingId,
  endBuildingId,
  setEndBuildingId,
  activeRoute,
  onClose,
  onStartWalkingMode
}) {
  const handleSwap = () => {
    soundEngine.playClick();
    const temp = startBuildingId;
    setStartBuildingId(endBuildingId);
    setEndBuildingId(temp);
  };

  return (
    <div className="absolute top-20 left-4 w-80 sm:w-96 glass-panel rounded-3xl p-5 shadow-2xl z-40 border border-sky-500/20 flex flex-col pointer-events-auto animate-in fade-in slide-in-from-left-5 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Campus Wayfinding</h3>
            <p className="text-[10px] text-slate-400">Dijkstra Shortest Walkway Route</p>
          </div>
        </div>
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800/50"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Start / Destination Selector Form */}
      <div className="my-3 space-y-2 relative">
        {/* Start Point */}
        <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-2xl border border-white/5 focus-within:border-sky-500/50">
          <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0 ml-1" />
          <div className="flex-1">
            <label className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">Start Point</label>
            <select
              value={startBuildingId || ''}
              onChange={(e) => {
                soundEngine.playSelect();
                setStartBuildingId(e.target.value);
              }}
              className="w-full bg-transparent text-xs font-semibold text-white border-none outline-none cursor-pointer"
            >
              <option value="" disabled className="bg-slate-900 text-slate-400">Select start location...</option>
              {BUILDINGS_DATA.map(b => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          title="Swap Start and Destination"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-button flex items-center justify-center text-sky-400 shadow-lg z-10 hover:scale-110"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
        </button>

        {/* Destination Point */}
        <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-2xl border border-white/5 focus-within:border-sky-500/50">
          <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/20 shrink-0 ml-1" />
          <div className="flex-1">
            <label className="text-[10px] text-rose-400 font-bold block uppercase tracking-wider">Destination</label>
            <select
              value={endBuildingId || ''}
              onChange={(e) => {
                soundEngine.playSelect();
                setEndBuildingId(e.target.value);
              }}
              className="w-full bg-transparent text-xs font-semibold text-white border-none outline-none cursor-pointer"
            >
              <option value="" disabled className="bg-slate-900 text-slate-400">Select destination...</option>
              {BUILDINGS_DATA.map(b => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Route Metrics Summary */}
      {activeRoute ? (
        <div className="space-y-3 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 bg-sky-950/40 p-3 rounded-2xl border border-sky-500/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Footprints className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Distance</div>
                <div className="text-sm font-extrabold text-sky-300">{activeRoute.distanceMeters} m</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Est. Walk</div>
                <div className="text-sm font-extrabold text-amber-300">~{activeRoute.durationMinutes} min</div>
              </div>
            </div>
          </div>

          {/* Turn by turn directions */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              Turn-by-Turn Navigation ({activeRoute.steps.length} Steps)
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {activeRoute.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/40 border border-white/5 text-xs text-slate-300"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-sky-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <div>{step.instruction}</div>
                    {step.distance > 0 && (
                      <span className="text-[10px] text-slate-500 font-semibold">{step.distance}m</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Walk Route in 3D Button */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onStartWalkingMode();
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
          >
            <Footprints className="w-4 h-4" />
            <span>Walk this Route in First Person</span>
          </button>
        </div>
      ) : (
        <div className="text-center py-8 text-xs text-slate-400">
          <MapPin className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
          Select a start location and destination to calculate the fastest campus walkway route.
        </div>
      )}
    </div>
  );
}
