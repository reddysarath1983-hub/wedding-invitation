"use client";

import Link from "next/link";
import { Heart, Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1c1917] text-[#fdfbf7] flex items-center justify-center p-4 font-telugu selection:bg-[#c59b27] selection:text-[#1c1917]">
      <div className="max-w-md w-full p-8 rounded-[32px] bg-[#2b080c] border-2 border-[#c59b27]/40 text-center shadow-2xl space-y-6 relative overflow-hidden">
        {/* Decorative Inner Border */}
        <div className="absolute inset-3 border border-[#c59b27]/20 rounded-[24px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-[#58121a] border border-[#c59b27]/60 flex items-center justify-center mx-auto text-[#c59b27] shadow-lg mb-4">
            <Heart className="w-8 h-8 fill-[#c59b27]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#c59b27] tracking-tight">
            ఈ ఆహ్వానం అందుబాటులో లేదు
          </h1>
          <p className="text-xs text-[#c59b27]/70 font-semibold tracking-widest uppercase mt-1">
            INVITATION NOT FOUND
          </p>

          <div className="w-16 h-[1px] bg-[#c59b27]/30 mx-auto my-4"></div>

          <p className="text-sm text-[#fdfbf7]/90 leading-relaxed max-w-xs mx-auto">
            క్షమించండి, మీరు అడిగిన వివాహ ఆహ్వాన పత్రిక (Invitation) లభించలేదు లేదా లింక్ తప్పుగా టైప్ చేయబడింది.
          </p>
        </div>

        <div className="pt-4 border-t border-[#c59b27]/20 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#58121a] via-[#7c1a29] to-[#58121a] hover:scale-[1.02] text-[#fdfbf7] border border-[#c59b27]/50 text-xs font-semibold tracking-wider transition-all shadow-lg active:scale-95"
          >
            <Home className="w-4 h-4 text-[#c59b27]" />
            <span>హోమ్‌పేజీకి వెళ్లండి (GO TO HOME)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
