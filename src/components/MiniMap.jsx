import React, { useRef, useEffect } from 'react';
import { Compass, Maximize2 } from 'lucide-react';
import { BUILDINGS_DATA } from '../data/campusData';
import { soundEngine } from '../utils/audioEffects';

export default function MiniMap({
  activeBuilding,
  onSelectBuilding,
  activeRoute
}) {
  const canvasRef = useRef(null);

  // Map coordinate conversion: Campus bounds [-130..130] in X, [-110..110] in Z
  const mapWidth = 160;
  const mapHeight = 140;

  const toMapX = (x) => ((x + 130) / 260) * mapWidth;
  const toMapY = (z) => ((z + 110) / 220) * mapHeight;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Clear
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, mapWidth, mapHeight);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < mapWidth; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, mapHeight);
      ctx.stroke();
    }
    for (let y = 0; y < mapHeight; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(mapWidth, y);
      ctx.stroke();
    }

    // Roads (Main spine)
    ctx.fillStyle = '#334155';
    ctx.fillRect(toMapX(-5), 0, 10, mapHeight);
    ctx.fillRect(0, toMapY(-48), mapWidth, 6);
    ctx.fillRect(0, toMapY(-10), mapWidth, 6);
    ctx.fillRect(0, toMapY(30), mapWidth, 6);

    // Draw active route on radar
    if (activeRoute && activeRoute.points && activeRoute.points.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      activeRoute.points.forEach((p, idx) => {
        const mx = toMapX(p[0]);
        const my = toMapY(p[2]);
        if (idx === 0) ctx.moveTo(mx, my);
        else ctx.lineTo(mx, my);
      });
      ctx.stroke();
    }

    // Draw all building footprints
    BUILDINGS_DATA.forEach(b => {
      const bx = toMapX(b.position[0] - b.dimensions[0] / 2);
      const by = toMapY(b.position[2] - b.dimensions[2] / 2);
      const bw = (b.dimensions[0] / 260) * mapWidth;
      const bh = (b.dimensions[2] / 220) * mapHeight;

      const isSelected = activeBuilding?.id === b.id;

      ctx.fillStyle = isSelected ? '#f59e0b' : b.color;
      ctx.fillRect(bx, by, bw, bh);

      if (isSelected) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx - 1, by - 1, bw + 2, bh + 2);
      }
    });

    // North Indicator
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('N', mapWidth - 14, 14);
  }, [activeBuilding, activeRoute]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Inverse coordinate transform
    const campusX = (clickX / mapWidth) * 260 - 130;
    const campusZ = (clickY / mapHeight) * 220 - 110;

    // Find clicked building
    const clicked = BUILDINGS_DATA.find(b => {
      const halfW = b.dimensions[0] / 2 + 3;
      const halfD = b.dimensions[2] / 2 + 3;
      return (
        Math.abs(campusX - b.position[0]) <= halfW &&
        Math.abs(campusZ - b.position[2]) <= halfD
      );
    });

    if (clicked) {
      soundEngine.playSelect();
      onSelectBuilding(clicked);
    }
  };

  return (
    <div className="absolute bottom-6 right-4 glass-panel rounded-2xl p-2 shadow-2xl z-30 border border-sky-500/20 pointer-events-auto hidden md:block group">
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-1 mb-1.5">
        <span className="flex items-center gap-1 text-sky-400">
          <Compass className="w-3 h-3" />
          Campus Radar
        </span>
        <span className="text-slate-500 text-[9px]">21.56 Acres</span>
      </div>
      <canvas
        ref={canvasRef}
        width={mapWidth}
        height={mapHeight}
        onClick={handleCanvasClick}
        className="rounded-xl border border-slate-700/60 cursor-pointer shadow-inner"
      />
    </div>
  );
}
