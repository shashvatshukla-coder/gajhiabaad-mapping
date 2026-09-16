import React, { useState, useMemo } from 'react';
import {
  X,
  ArrowRightLeft,
  Ruler,
  Footprints,
  Compass,
  Building,
  Layers,
  ChevronRight,
  Navigation,
  Eye,
  MapPin,
  Route
} from 'lucide-react';
import { BUILDINGS_DATA } from '../data/campusData';
import { calculateInterBlockDistance, getDistanceMatrixFrom } from '../utils/pathfinding';
import { soundEngine } from '../utils/audioEffects';

export default function BlockDistanceModal({
  isOpen,
  onClose,
  blockAId,
  setBlockAId,
  blockBId,
  setBlockBId,
  onFocusBlocksIn3D,
  onNavigateRoute
}) {
  const [activeTab, setActiveTab] = useState('compare'); // 'compare' | 'matrix'

  // Calculate distance between currently selected Block A and Block B
  const distanceInfo = useMemo(() => {
    if (!blockAId || !blockBId) return null;
    return calculateInterBlockDistance(blockAId, blockBId);
  }, [blockAId, blockBId]);

  // Proximity list from Block A to all other blocks
  const proximityList = useMemo(() => {
    if (!blockAId) return [];
    return getDistanceMatrixFrom(blockAId);
  }, [blockAId]);

  if (!isOpen) return null;

  const handleSwap = () => {
    soundEngine.playClick();
    const temp = blockAId;
    setBlockAId(blockBId);
    setBlockBId(temp);
  };

  const handleSelectFromMatrix = (destBuildingId) => {
    soundEngine.playSelect();
    setBlockBId(destBuildingId);
    setActiveTab('compare');
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-auto animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl p-5 sm:p-6 max-w-2xl w-full border border-sky-500/30 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 text-white font-black flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Route className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Inter-Block Pathway Distance
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30 uppercase tracking-wider">
                  Campus Walkways
                </span>
              </h2>
              <p className="text-xs text-slate-400">Exact distance measured through campus roads, promenades & pedestrian paths</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/60 rounded-2xl border border-white/5">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('compare');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Pathway Route Distance</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('matrix');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Blocks Distance Table</span>
          </button>
        </div>

        {/* Block 1 & Block 2 Selection Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 items-center bg-slate-900/40 p-3 rounded-2xl border border-white/5">
          {/* Origin Block Selector */}
          <div className="sm:col-span-2 space-y-1">
            <label className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
              Block 1 (Start)
            </label>
            <select
              value={blockAId || ''}
              onChange={(e) => {
                soundEngine.playSelect();
                setBlockAId(e.target.value);
              }}
              className="w-full bg-slate-800 text-xs font-semibold text-white px-3 py-2 rounded-xl border border-slate-700 outline-none focus:border-sky-400"
            >
              {BUILDINGS_DATA.map(b => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                  [{b.code}] {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="sm:col-span-1 flex justify-center">
            <button
              onClick={handleSwap}
              title="Swap Blocks"
              className="w-9 h-9 rounded-2xl glass-button flex items-center justify-center text-sky-400 hover:scale-110 shadow-lg"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Target Block Selector */}
          <div className="sm:col-span-2 space-y-1">
            <label className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
              Block 2 (Destination)
            </label>
            <select
              value={blockBId || ''}
              onChange={(e) => {
                soundEngine.playSelect();
                setBlockBId(e.target.value);
              }}
              className="w-full bg-slate-800 text-xs font-semibold text-white px-3 py-2 rounded-xl border border-slate-700 outline-none focus:border-rose-400"
            >
              {BUILDINGS_DATA.map(b => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                  [{b.code}] {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab 1: Direct Block-to-Block Walkway Pathway Distance */}
        {activeTab === 'compare' && distanceInfo && (
          <div className="space-y-4">
            {/* Primary Hero Distance Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-sky-950/80 via-slate-900/90 to-blue-950/60 border border-sky-500/30 space-y-3 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-sky-400" />
                  Distance Through Campus Walkways
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                  Via Pedestrian Paths
                </span>
              </div>

              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {distanceInfo.walkMeters}
                </span>
                <span className="text-lg font-bold text-sky-300">meters</span>
                <span className="text-sm text-slate-400">({distanceInfo.walkFeet} ft)</span>
              </div>

              {/* 3-Column Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-xs">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5 text-center">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Walking Time</span>
                  <span className="font-extrabold text-amber-300 text-sm mt-0.5">~{distanceInfo.walkMinutes} min</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5 text-center">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Approx. Steps</span>
                  <span className="font-extrabold text-emerald-300 text-sm mt-0.5">~{distanceInfo.stepsCount} steps</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5 text-center">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Route Path</span>
                  <span className="font-extrabold text-sky-300 text-sm mt-0.5">
                    {distanceInfo.walkRoute ? `${distanceInfo.walkRoute.points.length} waypoints` : 'Connected'}
                  </span>
                </div>
              </div>
            </div>

            {/* Path Route Segments & Waypoints */}
            {distanceInfo.walkRoute && distanceInfo.walkRoute.steps && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sky-400">
                    <Compass className="w-3.5 h-3.5" />
                    Walkway Route Breakdown ({distanceInfo.walkRoute.steps.length} Path Segments)
                  </span>
                  <span className="text-[10px] text-slate-400">Follows physical campus roads</span>
                </div>
                <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                  {distanceInfo.walkRoute.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-300"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-sky-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step.instruction}</span>
                      </div>
                      {step.distance > 0 && (
                        <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md shrink-0">
                          +{step.distance}m
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  soundEngine.playSelect();
                  onFocusBlocksIn3D(distanceInfo.buildingA, distanceInfo.buildingB);
                  onClose();
                }}
                className="py-3 px-4 rounded-2xl text-xs font-bold glass-button text-sky-300 border-sky-500/40 hover:border-sky-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <Eye className="w-4 h-4 text-sky-400" />
                <span>Show Walkway Path in 3D</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playRouteFound();
                  onNavigateRoute(blockAId, blockBId);
                  onClose();
                }}
                className="py-3 px-4 rounded-2xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 border border-sky-400"
              >
                <Navigation className="w-4 h-4" />
                <span>Start Walk Navigation</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Proximity Matrix (Distances to All Campus Blocks via Walkways) */}
        {activeTab === 'matrix' && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center justify-between pb-1">
              <span>Walkway distances from {distanceInfo?.buildingA?.shortName || 'Selected Block'} to all locations</span>
              <span className="text-[10px] text-slate-400">{proximityList.length} destinations</span>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
              {proximityList.map((item) => (
                <div
                  key={item.building.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-sky-500/40 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: item.building.color }}
                    >
                      {item.building.code}
                    </span>
                    <div>
                      <div className="font-bold text-slate-100">{item.building.name}</div>
                      <div className="text-[10px] text-slate-400">{item.building.tag}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-extrabold text-sky-400">{item.walkMeters} m</div>
                      <div className="text-[10px] text-slate-400">~{item.walkMinutes} min walk</div>
                    </div>
                    <button
                      onClick={() => handleSelectFromMatrix(item.building.id)}
                      className="p-1.5 rounded-lg glass-button text-slate-300 hover:text-white"
                      title="Calculate pathway to this block"
                    >
                      <ChevronRight className="w-4 h-4 text-sky-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
