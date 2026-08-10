"use client";

import { FamilyMemberItem } from "@/types/invitation";
import { Plus, Trash2, Users } from "lucide-react";

interface FamilyEditorProps {
  familyMembers: FamilyMemberItem[];
  onChange: (members: FamilyMemberItem[]) => void;
}

const SUGGESTIONS = [
  { name: "శ్రీమతి & శ్రీ (వధువు తల్లిదండ్రులు)", relation: "వధువు తల్లిదండ్రులు", side: "bride" as const },
  { name: "శ్రీమతి & శ్రీ (వరుడి తల్లిదండ్రులు)", relation: "వరుడి తల్లిదండ్రులు", side: "groom" as const },
  { name: "బంధుమిత్రులు & శ్రేయోభిలాషులు", relation: "ఆహ్వాన సంఘం", side: "both" as const },
];

export function FamilyEditor({ familyMembers, onChange }: FamilyEditorProps) {
  const addMember = (defaultName?: string, defaultRelation?: string, side: "bride" | "groom" | "both" = "both") => {
    const newMember: FamilyMemberItem = {
      name: defaultName || "శ్రీమతి & శ్రీ...",
      relation: defaultRelation || "తల్లిదండ్రులు / బంధువులు",
      side,
      display_order: familyMembers.length + 1
    };
    onChange([...familyMembers, newMember]);
  };

  const updateMember = (index: number, field: keyof FamilyMemberItem, value: any) => {
    const updated = [...familyMembers];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeMember = (index: number) => {
    onChange(familyMembers.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <span className="text-xs font-semibold text-amber-400 font-telugu">సూచనలు (Suggestions):</span>
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => addMember(s.name, s.relation, s.side)}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-telugu border border-amber-500/30 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>{s.relation}</span>
          </button>
        ))}
      </div>

      {familyMembers.length === 0 ? (
        <div className="text-center p-6 rounded-xl border border-dashed border-slate-800 text-slate-400 text-sm">
          No family members added yet. Add bride/groom parents or relatives.
        </div>
      ) : (
        familyMembers.map((fm, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-semibold text-amber-400">Family Member #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeMember(idx)}
                className="p-1 rounded hover:bg-rose-500/20 text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs text-slate-300 font-telugu mb-1">పేరు (Name)</label>
                <input
                  type="text"
                  value={fm.name}
                  onChange={(e) => updateMember(idx, "name", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 font-telugu focus:outline-none focus:border-amber-500"
                  placeholder="e.g. శ్రీమతి & శ్రీ రామచంద్రరావు"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-telugu mb-1">వరుస / సంబంధం (Relation)</label>
                <input
                  type="text"
                  value={fm.relation}
                  onChange={(e) => updateMember(idx, "relation", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 font-telugu focus:outline-none focus:border-amber-500"
                  placeholder="e.g. వధువు తల్లిదండ్రులు"
                />
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={() => addMember()}
        className="w-full py-2.5 rounded-xl border border-dashed border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-telugu text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        <span>బంధుమిత్రుల సమాచారం జోడించండి (Add Family Member)</span>
      </button>
    </div>
  );
}
