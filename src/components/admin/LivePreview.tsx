"use client";

import { useState } from "react";
import { InvitationData, ImageTransform } from "@/types/invitation";
import { TemplateContainer, parseImageTransforms } from "@/components/templates/TemplateContainer";
import { Smartphone, Tablet } from "lucide-react";

interface LivePreviewProps {
  data: InvitationData;
  editable?: boolean;
  onTransformChange?: (imageKey: string, transform: ImageTransform) => void;
}

export function LivePreview({ data, editable = true, onTransformChange }: LivePreviewProps) {
  const [deviceMode, setDeviceMode] = useState<"mobile" | "tablet">("mobile");

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Header controls */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-semibold text-slate-300 ml-2 font-telugu">లైవ్ ప్రివ్యూ & ఇమేజ్ ఎడిటర్ (Live Canvas)</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
              deviceMode === "mobile" ? "bg-amber-500 text-slate-950 font-semibold" : "text-slate-400 hover:text-slate-200"
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
              deviceMode === "tablet" ? "bg-amber-500 text-slate-950 font-semibold" : "text-slate-400 hover:text-slate-200"
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 p-4 bg-slate-900/50 overflow-y-auto flex justify-center items-start">
        <div
          className={`transition-all duration-300 bg-slate-950 shadow-2xl rounded-[32px] border-4 border-slate-800 overflow-hidden relative ${
            deviceMode === "mobile" ? "w-full max-w-[390px] min-h-[750px]" : "w-full max-w-[600px] min-h-[800px]"
          }`}
        >
          {/* Speaker Notch */}
          <div className="w-28 h-4 bg-slate-800 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center">
            <div className="w-10 h-1 bg-slate-950 rounded-full"></div>
          </div>

          <div className="h-full overflow-y-auto pt-4 no-scrollbar">
            <TemplateContainer
              data={data}
              editable={editable}
              onTransformChange={onTransformChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
