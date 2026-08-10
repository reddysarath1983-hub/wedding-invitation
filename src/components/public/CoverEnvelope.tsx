"use client";

import { useState } from "react";
import { Sparkles, Heart } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface CoverEnvelopeProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  couplePhoto?: string;
  onOpen: () => void;
}

export function CoverEnvelope({ groomName, brideName, weddingDate, couplePhoto, onOpen }: CoverEnvelopeProps) {
  const [opening, setOpening] = useState(false);

  const handleOpenClick = () => {
    setOpening(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  const formattedDateParts = weddingDate ? weddingDate.split("-") : ["2026", "11", "20"];
  const displayDateStr = `${formattedDateParts[2] || "20"} • ${formattedDateParts[1] || "11"} • ${formattedDateParts[0] || "2026"}`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b080c] transition-all duration-700 ${
        opening ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Decorative Gradient & Mandalas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4a0e17] via-[#2b080c] to-[#140305] pointer-events-none opacity-90"></div>
      
      {/* Traditional Frame Container */}
      <div className="relative w-full max-w-md mx-auto p-8 rounded-[36px] bg-[#fdfbf7] text-[#4a0e17] shadow-2xl border-4 border-[#c59b27]/60 text-center flex flex-col justify-between min-h-[580px] sm:min-h-[640px] overflow-hidden">
        
        {/* Subtle Inner Gold Border */}
        <div className="absolute inset-3 border border-[#c59b27]/30 rounded-[28px] pointer-events-none"></div>

        {/* Top Header Motif */}
        <div className="pt-4 relative z-10">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#58121a]/10 border border-[#c59b27]/40 flex items-center justify-center text-[#c59b27]">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="font-telugu text-[#8b6508] text-sm tracking-widest font-semibold uppercase">
            శ్రీరస్తు • శుభమస్తు
          </p>
          <div className="w-16 h-[1px] bg-[#c59b27]/40 mx-auto my-2"></div>
        </div>

        {/* Middle Main Content */}
        <div className="py-6 relative z-10 flex-1 flex flex-col justify-center items-center">
          {couplePhoto ? (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#c59b27] p-1 shadow-md mb-4 bg-white">
              <img src={couplePhoto} alt="Couple" className="w-full h-full object-cover rounded-full" />
            </div>
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#c59b27]/60 p-1 shadow-inner mb-4 bg-[#58121a]/10 flex items-center justify-center text-[#c59b27]">
              <Heart className="w-10 h-10 fill-[#58121a] text-[#c59b27]" />
            </div>
          )}

          <h2 className="font-telugu text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6508]/80 mb-2">
            వివాహ శుభలేఖ
          </h2>

          <h1 className="font-telugu text-3xl sm:text-4xl font-bold text-[#58121a] tracking-tight my-1">
            {groomName}
          </h1>

          <div className="flex items-center justify-center gap-3 my-2 text-[#c59b27]">
            <span className="w-8 h-[1px] bg-[#c59b27]/30"></span>
            <Heart className="w-4 h-4 fill-[#8b1220] text-[#8b1220]" />
            <span className="w-8 h-[1px] bg-[#c59b27]/30"></span>
          </div>

          <h1 className="font-telugu text-3xl sm:text-4xl font-bold text-[#58121a] tracking-tight my-1">
            {brideName}
          </h1>

          <p className="font-luxury italic text-[#8b6508] text-base mt-3">
            {displayDateStr}
          </p>
        </div>

        {/* Bottom Trigger Button */}
        <div className="pb-4 relative z-10">
          <button
            onClick={handleOpenClick}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#58121a] via-[#7c1a29] to-[#58121a] text-[#fdfbf7] font-telugu text-sm font-semibold tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-[#c59b27]/50 flex items-center justify-center gap-2 group"
          >
            <span>ఆహ్వానం తెరవండి (OPEN INVITATION)</span>
            <span className="text-xs group-hover:translate-x-1 transition-transform">➔</span>
          </button>
        </div>

      </div>
    </div>
  );
}
