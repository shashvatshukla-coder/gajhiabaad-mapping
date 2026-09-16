import React from 'react';
import {
  Globe,
  GraduationCap,
  Home,
  Trophy,
  DoorOpen,
  Mic
} from 'lucide-react';
import { CAMERA_PRESETS } from '../data/campusData';
import { soundEngine } from '../utils/audioEffects';

export default function QuickViewPresets({
  activePreset,
  onSelectPreset
}) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-3.5 h-3.5" />;
      case 'GraduationCap': return <GraduationCap className="w-3.5 h-3.5" />;
      case 'Home': return <Home className="w-3.5 h-3.5" />;
      case 'Trophy': return <Trophy className="w-3.5 h-3.5" />;
      case 'DoorOpen': return <DoorOpen className="w-3.5 h-3.5" />;
      case 'Mic': return <Mic className="w-3.5 h-3.5" />;
      default: return <Globe className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="absolute bottom-6 left-4 flex items-center gap-1.5 glass-panel p-1.5 rounded-2xl shadow-xl z-30 border border-white/10 pointer-events-auto hidden sm:flex">
      {CAMERA_PRESETS.map(preset => {
        const isActive = activePreset?.id === preset.id;
        return (
          <button
            key={preset.id}
            onClick={() => {
              soundEngine.playClick();
              onSelectPreset(preset);
            }}
            title={`Jump view to ${preset.name}`}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isActive
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            {getIcon(preset.icon)}
            <span className="hidden lg:inline">{preset.name}</span>
          </button>
        );
      })}
    </div>
  );
}
