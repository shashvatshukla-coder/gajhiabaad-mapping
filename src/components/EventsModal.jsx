import React from 'react';
import { X, Calendar, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { CAMPUS_EVENTS, BUILDINGS_DATA } from '../data/campusData';
import { soundEngine } from '../utils/audioEffects';

export default function EventsModal({
  isOpen,
  onClose,
  onSelectBuilding
}) {
  if (!isOpen) return null;

  const handleFocusEvent = (targetBuildingId) => {
    soundEngine.playSelect();
    const b = BUILDINGS_DATA.find(x => x.id === targetBuildingId);
    if (b) {
      onSelectBuilding(b);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4 pointer-events-auto animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl p-6 max-w-xl w-full border border-sky-500/30 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Campus Fests & Major Events</h2>
              <p className="text-xs text-slate-400">KIET Deemed to be University Annual Calendar</p>
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

        {/* Events List */}
        <div className="space-y-3">
          {CAMPUS_EVENTS.map(ev => (
            <div
              key={ev.id}
              className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-sky-500/40 transition-all space-y-2 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {ev.tag}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1 group-hover:text-sky-300 transition-colors">
                    {ev.name}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
                  {ev.date}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {ev.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{ev.location}</span>
                </div>
                <button
                  onClick={() => handleFocusEvent(ev.targetBuildingId)}
                  className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1 border border-sky-500/30"
                >
                  <span>View Venue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
