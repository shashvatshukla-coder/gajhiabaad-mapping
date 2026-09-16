import React from 'react';
import {
  X,
  Award,
  BookOpen,
  Users,
  ShieldAlert,
  Phone,
  Navigation2,
  MousePointerClick,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { CAMPUS_STATS } from '../data/campusData';
import { soundEngine } from '../utils/audioEffects';

export default function AboutModal({
  isOpen,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 pointer-events-auto animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl p-6 max-w-2xl w-full border border-sky-500/30 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center text-white font-extrabold text-xl shadow-lg ring-2 ring-sky-400/30">
              K
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{CAMPUS_STATS.name}</h2>
              <p className="text-xs text-sky-400 font-semibold">{CAMPUS_STATS.subTitle}</p>
              <div className="text-[10px] text-amber-400 font-bold mt-0.5">{CAMPUS_STATS.accreditation}</div>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-900/60 p-3 rounded-2xl border border-white/5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Campus Area</div>
            <div className="text-sm font-extrabold text-white mt-0.5">{CAMPUS_STATS.area}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-2xl border border-white/5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Student Body</div>
            <div className="text-sm font-extrabold text-sky-400 mt-0.5">{CAMPUS_STATS.students}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-2xl border border-white/5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Faculty</div>
            <div className="text-sm font-extrabold text-emerald-400 mt-0.5">{CAMPUS_STATS.faculty}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-2xl border border-white/5 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Established</div>
            <div className="text-sm font-extrabold text-amber-400 mt-0.5">{CAMPUS_STATS.established}</div>
          </div>
        </div>

        {/* Quick 3D Interaction Guide */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
            <MousePointerClick className="w-4 h-4 text-sky-400" />
            3D Map Interactive Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5 text-slate-300">
              <strong className="text-white block mb-0.5">🏢 3D Building Slicing & Explode:</strong>
              Click any building and hit "Explode 3D" to vertically separate floor levels and explore laboratories inside.
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5 text-slate-300">
              <strong className="text-white block mb-0.5">🚶 Campus Wayfinding:</strong>
              Click "Directions" to calculate the shortest walkway route between any two blocks with step-by-step guidance.
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5 text-slate-300">
              <strong className="text-white block mb-0.5">🚁 Cinematic Drone Tour:</strong>
              Click "Drone Tour" for an 8-stop automated 3D flyover highlighting institutional landmarks.
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5 text-slate-300">
              <strong className="text-white block mb-0.5">🌓 Day / Night / Rain Modes:</strong>
              Switch between daylight, golden hour sunset, night mode with illuminated windows, and rain weather.
            </div>
          </div>
        </div>

        {/* Emergency Helplines */}
        <div className="space-y-2 bg-rose-950/20 p-3.5 rounded-2xl border border-rose-500/20">
          <h3 className="text-xs font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            24/7 Campus Emergency Helplines
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block">Main Gate Security</span>
              <span className="font-bold text-slate-200">{CAMPUS_STATS.emergency.security}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Dispensary & Health</span>
              <span className="font-bold text-slate-200">{CAMPUS_STATS.emergency.dispensary}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Ambulance Bay</span>
              <span className="font-bold text-rose-400">{CAMPUS_STATS.emergency.ambulance}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{CAMPUS_STATS.address}</span>
          </div>
          <a
            href="https://www.kiet.edu"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
          >
            <span>kiet.edu</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
