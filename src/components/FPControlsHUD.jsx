import React, { useEffect, useState } from 'react';
import {
  Footprints,
  X,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Eye
} from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';

export default function FPControlsHUD({
  onExitFP,
  setFpMoveVector
}) {
  const [keysPressed, setKeysPressed] = useState({
    w: false, s: false, a: false, d: false
  });

  // Keyboard Event Listeners for WASD / Arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'arrowup'].includes(key)) setKeysPressed(p => ({ ...p, w: true }));
      if (['s', 'arrowdown'].includes(key)) setKeysPressed(p => ({ ...p, s: true }));
      if (['a', 'arrowleft'].includes(key)) setKeysPressed(p => ({ ...p, a: true }));
      if (['d', 'arrowright'].includes(key)) setKeysPressed(p => ({ ...p, d: true }));
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'arrowup'].includes(key)) setKeysPressed(p => ({ ...p, w: false }));
      if (['s', 'arrowdown'].includes(key)) setKeysPressed(p => ({ ...p, s: false }));
      if (['a', 'arrowleft'].includes(key)) setKeysPressed(p => ({ ...p, a: false }));
      if (['d', 'arrowright'].includes(key)) setKeysPressed(p => ({ ...p, d: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Compute movement vector
  useEffect(() => {
    let forward = 0;
    let strafe = 0;
    if (keysPressed.w) forward += 1;
    if (keysPressed.s) forward -= 1;
    if (keysPressed.d) strafe += 1;
    if (keysPressed.a) strafe -= 1;

    setFpMoveVector({ x: strafe, y: forward });
  }, [keysPressed, setFpMoveVector]);

  return (
    <>
      {/* Top Center Walking Badge */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 glass-panel rounded-2xl px-4 py-2 shadow-2xl z-40 border border-sky-500/30 flex items-center gap-3 pointer-events-auto animate-pulse-slow">
        <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
          <Footprints className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-white">First-Person Campus Walk Mode</div>
          <div className="text-[10px] text-slate-400">Use WASD / Arrow keys to walk • Drag to look around</div>
        </div>
        <button
          onClick={() => {
            soundEngine.playClick();
            onExitFP();
          }}
          className="ml-2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Left On-Screen Virtual D-Pad for Touch/Click */}
      <div className="absolute bottom-6 left-6 glass-panel rounded-3xl p-3 z-40 border border-white/10 pointer-events-auto flex flex-col items-center gap-1.5 shadow-2xl">
        <button
          onMouseDown={() => setKeysPressed(p => ({ ...p, w: true }))}
          onMouseUp={() => setKeysPressed(p => ({ ...p, w: false }))}
          onTouchStart={() => setKeysPressed(p => ({ ...p, w: true }))}
          onTouchEnd={() => setKeysPressed(p => ({ ...p, w: false }))}
          className={`w-10 h-10 rounded-xl glass-button flex items-center justify-center font-bold ${
            keysPressed.w ? 'bg-sky-500 text-white' : 'text-slate-200'
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onMouseDown={() => setKeysPressed(p => ({ ...p, a: true }))}
            onMouseUp={() => setKeysPressed(p => ({ ...p, a: false }))}
            onTouchStart={() => setKeysPressed(p => ({ ...p, a: true }))}
            onTouchEnd={() => setKeysPressed(p => ({ ...p, a: false }))}
            className={`w-10 h-10 rounded-xl glass-button flex items-center justify-center font-bold ${
              keysPressed.a ? 'bg-sky-500 text-white' : 'text-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onMouseDown={() => setKeysPressed(p => ({ ...p, s: true }))}
            onMouseUp={() => setKeysPressed(p => ({ ...p, s: false }))}
            onTouchStart={() => setKeysPressed(p => ({ ...p, s: true }))}
            onTouchEnd={() => setKeysPressed(p => ({ ...p, s: false }))}
            className={`w-10 h-10 rounded-xl glass-button flex items-center justify-center font-bold ${
              keysPressed.s ? 'bg-sky-500 text-white' : 'text-slate-200'
            }`}
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onMouseDown={() => setKeysPressed(p => ({ ...p, d: true }))}
            onMouseUp={() => setKeysPressed(p => ({ ...p, d: false }))}
            onTouchStart={() => setKeysPressed(p => ({ ...p, d: true }))}
            onTouchEnd={() => setKeysPressed(p => ({ ...p, d: false }))}
            className={`w-10 h-10 rounded-xl glass-button flex items-center justify-center font-bold ${
              keysPressed.d ? 'bg-sky-500 text-white' : 'text-slate-200'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
