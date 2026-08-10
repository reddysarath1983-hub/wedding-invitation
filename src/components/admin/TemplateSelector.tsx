"use client";

import { TemplateId } from "@/types/invitation";
import { Check, Sparkles, Crown, Flower2 } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  onSelect: (templateId: TemplateId) => void;
}

const TEMPLATES: { id: TemplateId; name: string; subtitle: string; icon: any; colorScheme: string; description: string }[] = [
  {
    id: "traditional",
    name: "Traditional Telugu",
    subtitle: "సాంప్రదాయ పద్ధతి",
    icon: Sparkles,
    colorScheme: "from-[#581c87] to-[#3b0764] border-amber-500",
    description: "Gold & Maroon traditional Telugu wedding aesthetic with ornamental borders and sacred motifs."
  },
  {
    id: "royal",
    name: "Royal Temple",
    subtitle: "రాజకీయ క్షేత్ర శైలి",
    icon: Crown,
    colorScheme: "from-[#450a0a] to-[#170303] border-amber-400",
    description: "Crimson & Royal Gold temple-inspired architecture with mandap arch frames."
  },
  {
    id: "floral",
    name: "Modern Floral",
    subtitle: "ఆధునిక పుష్ప అలంకరణ",
    icon: Flower2,
    colorScheme: "from-[#fffaf5] to-[#fef2f2] border-rose-400 text-slate-800",
    description: "Pastel Cream & Rose modern floral design, soft cards, clean Telugu + English typography."
  }
];

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {TEMPLATES.map((tmpl) => {
        const Icon = tmpl.icon;
        const isSelected = selectedTemplate === tmpl.id;

        return (
          <div
            key={tmpl.id}
            onClick={() => onSelect(tmpl.id)}
            className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border-2 relative flex flex-col justify-between ${
              isSelected
                ? "border-amber-400 bg-amber-500/10 shadow-xl ring-2 ring-amber-400/40 scale-[1.02]"
                : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
            }`}
          >
            {isSelected && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 text-sm">{tmpl.name}</h4>
                  <span className="font-telugu text-xs text-amber-400">{tmpl.subtitle}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {tmpl.description}
              </p>
            </div>

            <div className={`mt-4 h-12 rounded-lg bg-gradient-to-r ${tmpl.colorScheme} flex items-center justify-center text-xs font-semibold text-amber-200 border border-white/10`}>
              Preview Layout
            </div>
          </div>
        );
      })}
    </div>
  );
}
