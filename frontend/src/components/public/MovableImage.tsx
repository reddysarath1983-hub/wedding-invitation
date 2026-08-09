"use client";

import { useState, useRef, useEffect } from "react";
import { ImageTransform } from "@/types/invitation";
import { RotateCw, Move } from "lucide-react";

interface MovableImageProps {
  imageKey: string;
  src: string;
  alt?: string;
  className?: string;
  transform?: ImageTransform;
  editable?: boolean;
  isSelected?: boolean;
  onSelect?: (key: string) => void;
  onTransformChange?: (key: string, updated: ImageTransform) => void;
}

export function MovableImage({
  imageKey,
  src,
  alt = "Wedding Image",
  className = "",
  transform = {},
  editable = false,
  isSelected = false,
  onSelect,
  onTransformChange
}: MovableImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Extract transform values with safe defaults
  const x = transform.x || 0;
  const y = transform.y || 0;
  const scale = transform.scale !== undefined ? transform.scale : 1.0;
  const rotation = transform.rotation || 0;
  const opacity = transform.opacity !== undefined ? transform.opacity : 1.0;
  const zIndex = transform.zIndex !== undefined ? transform.zIndex : 10;
  const cropX = transform.cropX !== undefined ? transform.cropX : 50;
  const cropY = transform.cropY !== undefined ? transform.cropY : 50;

  // Interaction State
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  // Touch pinch-to-zoom tracking
  const touchStartDist = useRef<number | null>(null);
  const touchStartScale = useRef<number>(scale);
  const dragStart = useRef<{ x: number; y: number; initialX: number; initialY: number }>({ x: 0, y: 0, initialX: 0, initialY: 0 });

  const handleClick = (e: React.MouseEvent) => {
    if (editable && onSelect) {
      e.stopPropagation();
      onSelect(imageKey);
    }
  };

  // --- MOUSE DRAG HANDLERS ---
  const handleDragStart = (e: React.MouseEvent) => {
    if (!editable) return;
    e.stopPropagation();
    if (onSelect) onSelect(imageKey);
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      initialX: x,
      initialY: y
    };
  };

  // --- CORNER RESIZE START ---
  const handleResizeStart = (e: React.MouseEvent, corner: string) => {
    if (!editable) return;
    e.stopPropagation();
    setIsResizing(corner);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      initialX: scale,
      initialY: 0
    };
  };

  // --- ROTATION HANDLE START ---
  const handleRotateStart = (e: React.MouseEvent) => {
    if (!editable) return;
    e.stopPropagation();
    setIsRotating(true);
  };

  // --- GLOBAL MOUSE LISTENERS ---
  useEffect(() => {
    if (!isDragging && !isResizing && !isRotating) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && onTransformChange) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        onTransformChange(imageKey, {
          ...transform,
          x: Math.round(dragStart.current.initialX + dx),
          y: Math.round(dragStart.current.initialY + dy)
        });
      } else if (isResizing && onTransformChange) {
        const dy = e.clientY - dragStart.current.y;
        const deltaScale = dy * (isResizing.includes("n") ? -0.01 : 0.01);
        const newScale = Math.max(0.3, Math.min(3.0, dragStart.current.initialX + deltaScale));
        onTransformChange(imageKey, {
          ...transform,
          scale: parseFloat(newScale.toFixed(2))
        });
      } else if (isRotating && containerRef.current && onTransformChange) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        let degrees = Math.round(radians * (180 / Math.PI)) - 90;
        if (degrees < -180) degrees += 360;
        if (degrees > 180) degrees -= 360;
        onTransformChange(imageKey, {
          ...transform,
          rotation: degrees
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      setIsRotating(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, isRotating, transform, imageKey, onTransformChange]);

  // --- TOUCH GESTURE LISTENERS FOR MOBILE ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!editable) return;
    if (onSelect) onSelect(imageKey);

    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        initialX: x,
        initialY: y
      };
    } else if (e.touches.length === 2) {
      // Pinch-to-zoom initial distance
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDist.current = dist;
      touchStartScale.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!editable) return;

    if (e.touches.length === 1 && isDragging && onTransformChange) {
      const dx = e.touches[0].clientX - dragStart.current.x;
      const dy = e.touches[0].clientY - dragStart.current.y;
      onTransformChange(imageKey, {
        ...transform,
        x: Math.round(dragStart.current.initialX + dx),
        y: Math.round(dragStart.current.initialY + dy)
      });
    } else if (e.touches.length === 2 && touchStartDist.current !== null && onTransformChange) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / touchStartDist.current;
      const newScale = Math.max(0.3, Math.min(3.0, touchStartScale.current * ratio));
      onTransformChange(imageKey, {
        ...transform,
        scale: parseFloat(newScale.toFixed(2))
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartDist.current = null;
  };

  // Build inline CSS transform
  const transformStyle: React.CSSProperties = {
    transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
    opacity,
    zIndex,
    transition: isDragging || isResizing || isRotating ? "none" : "transform 0.1s ease-out",
  };

  const imageStyle: React.CSSProperties = {
    objectPosition: `${cropX}% ${cropY}%`
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={transformStyle}
      className={`relative group inline-block ${editable ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      {/* Target Image */}
      <img
        src={src}
        alt={alt}
        style={imageStyle}
        className={`${className} pointer-events-none select-none`}
        loading="lazy"
      />

      {/* CANVA SELECTION BOUNDING BOX & HANDLES (Only shown in editor when selected) */}
      {editable && isSelected && (
        <div className="absolute -inset-1.5 border-2 border-amber-400 rounded-lg pointer-events-none z-30 shadow-lg ring-1 ring-amber-400/50">
          
          {/* Central Drag Icon Indicator */}
          <div
            onMouseDown={handleDragStart}
            className="pointer-events-auto absolute inset-0 cursor-move flex items-center justify-center bg-amber-500/10 backdrop-blur-[1px] text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Click and drag to position"
          >
            <Move className="w-6 h-6 animate-pulse" />
          </div>

          {/* Top Rotation Handle */}
          <div
            onMouseDown={handleRotateStart}
            className="pointer-events-auto absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md border border-slate-900 hover:scale-110 transition-transform"
            title="Click and drag to rotate"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </div>
          {/* Connector Line to rotation handle */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[1.5px] h-3 bg-amber-400"></div>

          {/* 4 Corner Resize Handles */}
          {/* Top-Left */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "nw")}
            className="pointer-events-auto absolute -top-2 -left-2 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 cursor-nwse-resize shadow-md hover:scale-125 transition-transform"
          ></div>

          {/* Top-Right */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "ne")}
            className="pointer-events-auto absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 cursor-nesw-resize shadow-md hover:scale-125 transition-transform"
          ></div>

          {/* Bottom-Left */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "sw")}
            className="pointer-events-auto absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 cursor-nesw-resize shadow-md hover:scale-125 transition-transform"
          ></div>

          {/* Bottom-Right */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "se")}
            className="pointer-events-auto absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 cursor-nwse-resize shadow-md hover:scale-125 transition-transform"
          ></div>

        </div>
      )}
    </div>
  );
}
