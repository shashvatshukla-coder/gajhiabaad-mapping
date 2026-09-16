import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  Navigation,
  Compass,
  Sun,
  Sunset,
  Moon,
  CloudRain,
  Volume2,
  VolumeX,
  Sparkles,
  Calendar,
  Info,
  Ruler,
  Layers,
  X,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { CAMPUS_CATEGORIES, BUILDINGS_DATA, CAMPUS_STATS } from '../data/campusData';
import { soundEngine } from '../utils/audioEffects';

export default function Header({
  activeCategory,
  setActiveCategory,
  onSelectBuilding,
  timeOfDay,
  setTimeOfDay,
  isAudioOn,
  setIsAudioOn,
  onStartTour,
  onToggleNavigation,
  onToggleMeasure,
  isMeasureActive,
  onOpenEvents,
  onOpenAbout,
  onScreenLabels,
  setOnScreenLabels
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  // Filter buildings for search autocomplete
  const searchResults = searchQuery.trim() === '' ? [] : BUILDINGS_DATA.filter(b => {
    const q = searchQuery.toLowerCase();
    const matchName = b.name.toLowerCase().includes(q) || b.shortName.toLowerCase().includes(q);
    const matchTag = b.tag.toLowerCase().includes(q);
    const matchCode = b.code.toLowerCase().includes(q);
    const matchDepts = b.departments?.some(d => d.toLowerCase().includes(q));
    const matchHighlights = b.highlights?.some(h => h.toLowerCase().includes(q));
    const matchRooms = b.floors?.some(f => f.rooms?.some(r => r.toLowerCase().includes(q)));
    return matchName || matchTag || matchCode || matchDepts || matchHighlights || matchRooms;
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target) &&
        !searchInputRef.current?.contains(e.target)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSearchResult = (building) => {
    soundEngine.playSelect();
    onSelectBuilding(building);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const cycleTimeOfDay = () => {
    soundEngine.playClick();
    const modes = ['day', 'sunset', 'night', 'rain'];
    const nextIdx = (modes.indexOf(timeOfDay) + 1) % modes.length;
    setTimeOfDay(modes[nextIdx]);
  };

  const toggleSound = () => {
    const state = soundEngine.toggleSound();
    setIsAudioOn(state);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-40 p-3 md:p-4 pointer-events-none flex flex-col gap-2.5">
      {/* Top Navbar */}
      <div className="flex items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3 glass-panel px-3.5 py-2 rounded-2xl shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-sky-400/30">
            K
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1">
                KIET <span className="text-sky-400 font-extrabold text-sm">3D CAMPUS</span>
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                NAAC A+
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Deemed to be University • Delhi-NCR
            </p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="glass-panel rounded-2xl flex items-center px-3.5 py-2 shadow-xl border border-white/10 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/30 transition-all">
            <Search className="w-4 h-4 text-sky-400 shrink-0 mr-2" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search CSE, Library, Hostels, Labs, ATMs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="bg-transparent border-none outline-none text-xs md:text-sm text-white placeholder-slate-400 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div
              ref={searchDropdownRef}
              className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-2xl max-h-72 overflow-y-auto z-50 p-2 shadow-2xl border border-sky-500/30 divide-y divide-slate-800/60"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                Campus Locations ({searchResults.length})
              </div>
              {searchResults.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleSelectSearchResult(b)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-500/20 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: b.color }}
                    >
                      {b.code}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">
                        {b.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{b.tag}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Navigation Route Trigger */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleNavigation();
            }}
            title="Campus Wayfinding & Directions"
            className="glass-button px-3 py-2 rounded-2xl text-xs font-bold text-sky-400 flex items-center gap-1.5 shadow-lg border border-sky-500/30 hover:border-sky-400"
          >
            <Navigation className="w-4 h-4 text-sky-400" />
            <span className="hidden md:inline">Directions</span>
          </button>

          {/* Guided Tour Trigger */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onStartTour();
            }}
            title="Cinematic Drone Tour"
            className="glass-button px-3 py-2 rounded-2xl text-xs font-bold bg-gradient-to-r from-sky-500/20 to-blue-600/20 text-sky-300 flex items-center gap-1.5 shadow-lg border border-sky-400/40 hover:border-sky-300"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="hidden md:inline">Drone Tour</span>
          </button>

          {/* Time of Day / Lighting Switcher */}
          <button
            onClick={cycleTimeOfDay}
            title={`Current Lighting: ${timeOfDay.toUpperCase()} (Click to toggle)`}
            className="glass-button p-2.5 rounded-2xl text-slate-300 hover:text-white shadow-lg"
          >
            {timeOfDay === 'day' && <Sun className="w-4 h-4 text-amber-400" />}
            {timeOfDay === 'sunset' && <Sunset className="w-4 h-4 text-orange-400" />}
            {timeOfDay === 'night' && <Moon className="w-4 h-4 text-sky-400" />}
            {timeOfDay === 'rain' && <CloudRain className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Measure Tool Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleMeasure();
            }}
            title="Measure 3D Distance"
            className={`glass-button p-2.5 rounded-2xl transition-colors shadow-lg ${
              isMeasureActive ? 'bg-amber-500/30 text-amber-300 border-amber-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Ruler className="w-4 h-4" />
          </button>

          {/* Toggle 3D Labels */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setOnScreenLabels(!onScreenLabels);
            }}
            title="Toggle Campus 3D Labels"
            className={`glass-button p-2.5 rounded-2xl transition-colors shadow-lg ${
              onScreenLabels ? 'text-sky-400' : 'text-slate-500'
            }`}
          >
            {onScreenLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioOn ? 'Mute Audio' : 'Unmute Audio'}
            className="glass-button p-2.5 rounded-2xl text-slate-300 hover:text-white shadow-lg"
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Events Modal */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenEvents();
            }}
            title="Campus Events & Fests"
            className="glass-button p-2.5 rounded-2xl text-slate-300 hover:text-white shadow-lg"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
          </button>

          {/* About / Info Modal */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenAbout();
            }}
            title="About KIET University"
            className="glass-button p-2.5 rounded-2xl text-slate-300 hover:text-white shadow-lg"
          >
            <Info className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pointer-events-auto scrollbar-none max-w-full">
        {CAMPUS_CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-md ${
                isActive
                  ? 'bg-sky-500 text-white shadow-sky-500/25 border border-sky-400'
                  : 'glass-panel-light text-slate-300 hover:text-white hover:bg-slate-800/80 border border-white/5'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
