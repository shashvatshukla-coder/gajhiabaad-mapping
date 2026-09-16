import React, { useState, useMemo } from 'react';
import {
  X,
  PieChart,
  Layers,
  ArrowUpDown,
  Building,
  GraduationCap,
  Home,
  Trophy,
  Trees,
  CheckCircle2,
  ChevronRight,
  Eye,
  Maximize2,
  BarChart3,
  Percent,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import {
  CAMPUS_STATS,
  CAMPUS_ZONES,
  BUILDINGS_DATA,
  getSortedBuildingsByArea
} from '../data/campusData';
import { soundEngine } from '../utils/audioEffects';

export default function AreaMappingModal({
  isOpen,
  onClose,
  onHighlightBuildingIn3D,
  isHeatmapActive,
  setIsHeatmapActive,
  onSelectZone
}) {
  const [activeTab, setActiveTab] = useState('ranking'); // 'ranking' | 'zones' | 'summary'
  const [sortBy, setSortBy] = useState('footprint'); // 'footprint' | 'grossFloor' | 'volume' | 'percent' | 'floors'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  // Compute sorted buildings list
  const sortedBuildings = useMemo(() => {
    return getSortedBuildingsByArea(sortBy, categoryFilter, sortOrder);
  }, [sortBy, categoryFilter, sortOrder]);

  if (!isOpen) return null;

  const toggleSortOrder = () => {
    soundEngine.playClick();
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const handleHighlight = (buildingId) => {
    soundEngine.playSelect();
    const b = BUILDINGS_DATA.find(x => x.id === buildingId);
    if (b) {
      onHighlightBuildingIn3D(b);
      onClose();
    }
  };

  const toggleHeatmap = () => {
    soundEngine.playExplode();
    setIsHeatmapActive(!isHeatmapActive);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-auto animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl p-5 sm:p-6 max-w-4xl w-full border border-sky-500/30 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-sky-600 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/30">
              <PieChart className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Campus Area Mapping & Spatial Analytics
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30 uppercase tracking-wider">
                  21.56 Acres Total
                </span>
              </h2>
              <p className="text-xs text-slate-400">Total area occupied, sorted built-up rankings, and 3D land-use zoning</p>
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

        {/* Global Campus Area Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 text-center space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-emerald-400">Total Campus Land</div>
            <div className="text-lg font-black text-white">21.56 <span className="text-xs text-emerald-300">Acres</span></div>
            <div className="text-[10px] text-slate-400">87,250 m² • 939k sq ft</div>
          </div>

          <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-950/60 to-slate-900 border border-sky-500/30 text-center space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-sky-400">Gross Built-up Floor Area</div>
            <div className="text-lg font-black text-white">~174,000 <span className="text-xs text-sky-300">m²</span></div>
            <div className="text-[10px] text-slate-400">Multi-storey floor space</div>
          </div>

          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/30 text-center space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-purple-400">Ground Built Footprint</div>
            <div className="text-lg font-black text-white">33,450 <span className="text-xs text-purple-300">m²</span></div>
            <div className="text-[10px] text-slate-400">38.3% Building Coverage</div>
          </div>

          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-950/60 to-slate-900 border border-amber-500/30 text-center space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-amber-400">Sports & Green Cover</div>
            <div className="text-lg font-black text-white">34,950 <span className="text-xs text-amber-300">m²</span></div>
            <div className="text-[10px] text-slate-400">40.1% Open Fields & Lawns</div>
          </div>
        </div>

        {/* Action Controls & Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-2xl border border-white/5">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('ranking');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'ranking'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Sorted Area Ranking ({sortedBuildings.length})</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('zones');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'zones'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Land-Use Zones ({CAMPUS_ZONES.length})</span>
            </button>
          </div>

          {/* 3D Heatmap Toggle Button */}
          <button
            onClick={toggleHeatmap}
            className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-all ${
              isHeatmapActive
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border border-amber-400 shadow-amber-500/25 ring-2 ring-amber-400/40'
                : 'glass-button text-amber-300 border-amber-500/40 hover:border-amber-400'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{isHeatmapActive ? 'Disable 3D Area Heatmap' : 'Enable 3D Area Heatmap'}</span>
          </button>
        </div>

        {/* Tab 1: Sorted Area Ranking Table */}
        {activeTab === 'ranking' && (
          <div className="space-y-3">
            {/* Sorting & Category Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/60 rounded-2xl border border-white/5 text-xs">
              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Filter:</span>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'academic', label: 'Academic' },
                  { id: 'hostel', label: 'Hostels' },
                  { id: 'sports', label: 'Sports' },
                  { id: 'auditorium', label: 'Auditoriums' },
                  { id: 'food', label: 'Food' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setCategoryFilter(cat.id);
                    }}
                    className={`px-2.5 py-1 rounded-xl font-bold text-[11px] transition-all ${
                      categoryFilter === cat.id
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort Key Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    soundEngine.playSelect();
                    setSortBy(e.target.value);
                  }}
                  className="bg-slate-800 text-white text-xs font-semibold px-2.5 py-1 rounded-xl border border-slate-700 outline-none"
                >
                  <option value="footprint">Ground Footprint Area (m²)</option>
                  <option value="grossFloor">Gross Floor Space (m²)</option>
                  <option value="volume">Building Volume (m³)</option>
                  <option value="percent">% of Campus Land</option>
                  <option value="floors">Floor Levels Count</option>
                </select>

                <button
                  onClick={toggleSortOrder}
                  title={`Toggle order: ${sortOrder === 'desc' ? 'Highest first' : 'Lowest first'}`}
                  className="p-1.5 rounded-xl glass-button text-sky-400"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Ranked Buildings List */}
            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              {sortedBuildings.map((b) => (
                <div
                  key={b.buildingId}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-sky-500/40 transition-all flex items-center justify-between gap-3 group"
                >
                  {/* Left: Rank, Code & Building Name */}
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-sky-400 font-extrabold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                      #{b.rank}
                    </span>
                    <span
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0 shadow-md"
                      style={{ backgroundColor: b.color }}
                    >
                      {b.code}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                        {b.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {b.widthMeters}m × {b.depthMeters}m • {b.floorsCount} {b.floorsCount > 1 ? 'Storeys' : 'Floor'}
                      </div>
                    </div>
                  </div>

                  {/* Center: Area Bar & Metrics */}
                  <div className="hidden sm:flex flex-col items-end w-44">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white">{b.footprintM2.toLocaleString()} m²</span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {b.percentOfCampus}%
                      </span>
                    </div>
                    {/* Visual proportion bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (b.footprintM2 / 3000) * 100)}%`,
                          backgroundColor: b.color
                        }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Gross Built: <span className="text-sky-300 font-semibold">{b.grossFloorM2.toLocaleString()} m²</span>
                    </div>
                  </div>

                  {/* Right: 3D View Button */}
                  <button
                    onClick={() => handleHighlight(b.buildingId)}
                    className="px-3 py-1.5 rounded-xl glass-button text-sky-300 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-sky-500/30 hover:border-sky-400 shrink-0 shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span className="hidden md:inline">Locate in 3D</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Land-Use Zones Breakdown */}
        {activeTab === 'zones' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
            {CAMPUS_ZONES.map((zone) => (
              <div
                key={zone.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-sky-500/40 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full ring-4 ring-white/10 shrink-0"
                      style={{ backgroundColor: zone.color }}
                    />
                    <h3 className="text-xs font-bold text-white">{zone.name}</h3>
                  </div>
                  <span className="text-xs font-extrabold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {zone.percentOfCampus}%
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {zone.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Footprint Area</span>
                    <span className="font-bold text-white">{zone.footprintM2.toLocaleString()} m²</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Gross Floor Space</span>
                    <span className="font-bold text-sky-300">{zone.grossFloorM2.toLocaleString()} m²</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {zone.buildingIds.length} Buildings & Facilities
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playSelect();
                      if (onSelectZone) onSelectZone(zone);
                      setIsHeatmapActive(true);
                      onClose();
                    }}
                    className="text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1"
                  >
                    <span>Highlight Zone</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
