"use client";

import { X } from "lucide-react";

interface GalleryLightboxProps {
  imageUrl: string | null;
  onClose: () => void;
}

export function GalleryLightbox({ imageUrl, onClose }: GalleryLightboxProps) {
  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity animate-reveal-up"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
      >
        <img src={imageUrl} alt="Wedding Photo" className="w-full h-full object-contain max-h-[85vh]" />
      </div>
    </div>
  );
}
