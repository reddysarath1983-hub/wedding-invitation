"use client";

import { useState } from "react";
import { TemplateId } from "@/types/invitation";
import { TEMPLATE_CATALOG, TemplateDefinition } from "@/lib/templates";
import { Check, Sparkles } from "lucide-react";

interface TemplateGallerySelectorProps {
  selectedTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

export function TemplateGallerySelector({
  selectedTemplateId,
  onSelectTemplate
}: TemplateGallerySelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "అన్నీ (All)" },
    { id: "wedding", label: "వివాహం" },
    { id: "engagement", label: "నిశ్చితార్థం" },
    { id: "reception", label: "రిసెప్షన్" },
    { id: "haldi-sangeet", label: "హల్దీ & సంగీత్" },
    { id: "heritage", label: "సంస్కృతి" },
  ];

  const filteredTemplates = TEMPLATE_CATALOG.filter((t) => {
    return activeCategory === "all" || t.category === activeCategory;
  });

  return (
    <div className="space-y-4 font-sans">
      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-telugu font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-amber-500 text-slate-950 shadow-lg scale-105"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Pure Visual Invitation Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[520px] overflow-y-auto pr-1 no-scrollbar">
        {filteredTemplates.map((t) => {
          const isSelected = selectedTemplateId === t.id;
          return (
            <div
              key={t.id}
              onClick={() => onSelectTemplate(t.id)}
              className={`group relative aspect-[3/4] rounded-2xl cursor-pointer overflow-hidden border-2 transition-all duration-300 shadow-md ${
                isSelected
                  ? "border-amber-400 ring-4 ring-amber-400/40 scale-[1.03] z-10"
                  : "border-slate-800 hover:border-amber-500/60 hover:scale-[1.02]"
              }`}
            >
              {/* Miniature Invitation Visual Render */}
              <div className={`w-full h-full bg-gradient-to-b ${t.bgGradient} p-3 flex flex-col justify-between items-center text-center relative overflow-hidden select-none`}>
                
                {/* Decorative Ornate Header Line */}
                <div className="w-full text-center space-y-1">
                  <div className="w-6 h-0.5 mx-auto bg-current opacity-40 rounded-full"></div>
                  <span className="text-[9px] font-telugu block tracking-tighter opacity-80" style={{ color: t.textColor }}>
                    ✨ శ్రీరస్తు • శుభమస్తు ✨
                  </span>
                  <div className="w-8 h-[1px] mx-auto bg-current opacity-30"></div>
                </div>

                {/* Couple Names Silhouette & Frame */}
                <div className="my-auto py-2 w-full space-y-1">
                  <div className="w-8 h-8 rounded-full mx-auto border border-current opacity-50 flex items-center justify-center text-[10px]" style={{ color: t.textColor }}>
                    ❖
                  </div>
                  <div className="font-telugu font-bold text-xs leading-tight" style={{ color: t.textColor }}>
                    రాహుల్
                  </div>
                  <div className="text-[9px] opacity-70 italic" style={{ color: t.textColor }}>
                    ♡
                  </div>
                  <div className="font-telugu font-bold text-xs leading-tight" style={{ color: t.textColor }}>
                    ప్రియ
                  </div>
                </div>

                {/* Miniature Date Banner */}
                <div className="w-full pt-1 border-t border-current/20 text-[8px] font-telugu opacity-75" style={{ color: t.textColor }}>
                  20 • 11 • 2026
                </div>
              </div>

              {/* Selection Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl z-20 animate-bounce">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              {/* Hover Overlay Button "ఎంచుకోండి" */}
              <div className={`absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 ${
                isSelected ? "opacity-0 hover:opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(t.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-telugu text-xs font-bold shadow-xl transition-transform transform active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ఎంచుకోండి</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
