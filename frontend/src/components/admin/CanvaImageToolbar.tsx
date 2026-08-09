"use client";

import { ImageTransform } from "@/types/invitation";
import { 
  Move, RotateCw, ZoomIn, Eye, ArrowUp, ArrowDown, 
  Layers, RotateCcw, X, Crop, ChevronUp, ChevronDown, ChevronLeft, ChevronRight
} from "lucide-react";

interface CanvaImageToolbarProps {
  imageKey: string;
  transform: ImageTransform;
  onChange: (updated: ImageTransform) => void;
  onDeselect: () => void;
}

export function CanvaImageToolbar({ imageKey, transform, onChange, onDeselect }: CanvaImageToolbarProps) {
  const currentX = transform.x || 0;
  const currentY = transform.y || 0;
  const currentScale = transform.scale !== undefined ? transform.scale : 1.0;
  const currentRotation = transform.rotation || 0;
  const currentOpacity = transform.opacity !== undefined ? transform.opacity : 1.0;
  const currentZIndex = transform.zIndex || 10;
  const currentCropX = transform.cropX || 50;
  const currentCropY = transform.cropY || 50;

  const update = (field: keyof ImageTransform, value: number) => {
    onChange({
      ...transform,
      [field]: value,
    });
  };

  const nudge = (dx: number, dy: number) => {
    onChange({
      ...transform,
      x: currentX + dx,
      y: currentY + dy,
    });
  };

  const handleBringToFront = () => update("zIndex", currentZIndex + 10);
  const handleBringForward = () => update("zIndex", currentZIndex + 1);
  const handleSendBackward = () => update("zIndex", Math.max(1, currentZIndex - 1));
  const handleSendToBack = () => update("zIndex", 1);

  const handleReset = () => {
    onChange({
      x: 0,
      y: 0,
      scale: 1.0,
      rotation: 0,
      opacity: 1.0,
      zIndex: 10,
      cropX: 50,
      cropY: 50,
    });
  };

  return (
    <div className="my-4 p-4 rounded-2xl bg-slate-900/95 border border-amber-500/40 text-slate-100 shadow-2xl backdrop-blur-md space-y-4 animate-reveal-up text-xs font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span className="font-bold font-telugu text-amber-300 text-sm">
            ఇమేజ్ ఎడిటర్ ప్యానెల్ (Image Editor Control Panel)
          </span>
          <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            {imageKey}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
            title="Reset to default transform"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={onDeselect}
            className="p-1 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
            title="Close Editor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. POSITION X/Y & NUDGE */}
        <div className="space-y-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-amber-400" />
              <span>Position (X/Y)</span>
            </span>
            <span className="font-mono text-[10px] text-amber-400">
              {currentX}px, {currentY}px
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">X (px)</label>
              <input
                type="number"
                value={currentX}
                onChange={(e) => update("x", parseInt(e.target.value, 10) || 0)}
                className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Y (px)</label>
              <input
                type="number"
                value={currentY}
                onChange={(e) => update("y", parseInt(e.target.value, 10) || 0)}
                className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100"
              />
            </div>
          </div>

          {/* D-Pad Nudge Buttons */}
          <div className="flex items-center justify-center gap-1 pt-1">
            <button type="button" onClick={() => nudge(-5, 0)} className="p-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="flex flex-col gap-1">
              <button type="button" onClick={() => nudge(0, -5)} className="p-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300">
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => nudge(0, 5)} className="p-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300">
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <button type="button" onClick={() => nudge(5, 0)} className="p-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. SCALE / ZOOM */}
        <div className="space-y-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Zoom / Scale</span>
            </span>
            <span className="font-mono text-[10px] text-amber-400">
              {Math.round(currentScale * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0.3"
            max="2.5"
            step="0.05"
            value={currentScale}
            onChange={(e) => update("scale", parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>30%</span>
            <span>100%</span>
            <span>250%</span>
          </div>
        </div>

        {/* 3. ROTATION & OPACITY */}
        <div className="space-y-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          {/* Rotation */}
          <div>
            <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
              <span className="flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Rotate</span>
              </span>
              <span className="font-mono text-[10px] text-amber-400">
                {currentRotation}°
              </span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={currentRotation}
              onChange={(e) => update("rotation", parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Opacity */}
          <div>
            <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Opacity</span>
              </span>
              <span className="font-mono text-[10px] text-amber-400">
                {Math.round(currentOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={currentOpacity}
              onChange={(e) => update("opacity", parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* 4. LAYER ORDERING & CROP */}
        <div className="space-y-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Layering (Z-Index)</span>
            </span>
            <span className="font-mono text-[10px] text-amber-400">
              Level {currentZIndex}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={handleBringToFront}
              className="px-2 py-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-[10px] font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <ArrowUp className="w-3 h-3" />
              <span>To Front</span>
            </button>
            <button
              type="button"
              onClick={handleBringForward}
              className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span>Forward</span>
            </button>
            <button
              type="button"
              onClick={handleSendBackward}
              className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span>Backward</span>
            </button>
            <button
              type="button"
              onClick={handleSendToBack}
              className="px-2 py-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-[10px] font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <ArrowDown className="w-3 h-3" />
              <span>To Back</span>
            </button>
          </div>

          {/* Focal / Crop position */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
              <span className="flex items-center gap-1">
                <Crop className="w-3 h-3 text-amber-400" />
                <span className="text-[11px]">Focal Crop Offset</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={currentCropX}
                onChange={(e) => update("cropX", parseInt(e.target.value, 10))}
                className="w-full accent-amber-500"
                title="Horizontal Crop Offset"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={currentCropY}
                onChange={(e) => update("cropY", parseInt(e.target.value, 10))}
                className="w-full accent-amber-500"
                title="Vertical Crop Offset"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
