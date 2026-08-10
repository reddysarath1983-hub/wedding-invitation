"use client";

import { useState, useEffect } from "react";
import { InvitationData, ImageTransform } from "@/types/invitation";
import { RoyalTempleTemplate } from "./RoyalTempleTemplate";
import { ModernFloralTemplate } from "./ModernFloralTemplate";
import {
  TraditionalHeritageTemplate,
  KalamkariArtTemplate,
  BanarasiSilkTemplate,
  VintagePatrikaTemplate,
  ModernLuxuryTemplate,
  NischitardhamTemplate,
  HaldiCeremonyTemplate,
  SangeetMehendiTemplate,
  SacredVivahaTemplate
} from "./catalog";
import { AudioPlayer } from "@/components/public/AudioPlayer";
import { CoverEnvelope } from "@/components/public/CoverEnvelope";
import { CanvaImageToolbar } from "@/components/admin/CanvaImageToolbar";

interface TemplateContainerProps {
  data: InvitationData;
  editable?: boolean;
  onTransformChange?: (imageKey: string, transform: ImageTransform) => void;
}

export function parseImageTransforms(transforms?: any): Record<string, ImageTransform> {
  if (!transforms) return {};
  if (typeof transforms === "string") {
    try {
      return JSON.parse(transforms);
    } catch {
      return {};
    }
  }
  return transforms;
}

export function TemplateContainer({ data, editable = false, onTransformChange }: TemplateContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageKey, setSelectedImageKey] = useState<string | null>(null);
  const [invData, setInvData] = useState<InvitationData>(data);

  useEffect(() => {
    setInvData(data);
    if (typeof window !== "undefined" && data.slug) {
      try {
        const stored = localStorage.getItem(`pellipatrika_inv_${data.slug}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.slug === data.slug) {
            setInvData(parsed);
          }
        }
      } catch {}
    }
  }, [data]);

  const transformsMap = parseImageTransforms(invData.image_transforms);

  const handleSelectImage = (key: string) => {
    if (editable) {
      setSelectedImageKey(key);
    }
  };

  const handleTransformUpdate = (key: string, updated: ImageTransform) => {
    if (onTransformChange) {
      onTransformChange(key, updated);
    }
  };

  const templateProps = {
    data: invData,
    editable,
    selectedImageKey,
    transformsMap,
    onSelectImage: handleSelectImage,
    onTransformChange: handleTransformUpdate,
  };

  const renderTemplate = () => {
    switch (data.template_id) {
      case "royal":
        return <RoyalTempleTemplate {...templateProps} />;
      case "floral":
        return <ModernFloralTemplate {...templateProps} />;
      case "kalamkari":
        return <KalamkariArtTemplate {...templateProps} />;
      case "banarasi":
        return <BanarasiSilkTemplate {...templateProps} />;
      case "gold-red":
        return <SacredVivahaTemplate {...templateProps} />;
      case "green-gold":
        return <BanarasiSilkTemplate {...templateProps} />;
      case "vintage":
        return <VintagePatrikaTemplate {...templateProps} />;
      case "pattachitra":
        return <KalamkariArtTemplate {...templateProps} />;
      case "luxury":
        return <ModernLuxuryTemplate {...templateProps} />;
      case "pastel":
        return <ModernFloralTemplate {...templateProps} />;
      case "contemporary":
        return <ModernLuxuryTemplate {...templateProps} />;
      case "cinematic":
        return <ModernLuxuryTemplate {...templateProps} />;
      case "family":
        return <TraditionalHeritageTemplate {...templateProps} />;
      case "festive":
        return <HaldiCeremonyTemplate {...templateProps} />;
      case "engagement":
        return <NischitardhamTemplate {...templateProps} />;
      case "reception":
        return <ModernLuxuryTemplate {...templateProps} />;
      case "haldi":
        return <HaldiCeremonyTemplate {...templateProps} />;
      case "sangeet":
        return <SangeetMehendiTemplate {...templateProps} />;
      case "sacred-vivaha":
        return <SacredVivahaTemplate {...templateProps} />;
      case "traditional":
      default:
        return <TraditionalHeritageTemplate {...templateProps} />;
    }
  };

  const activeTransform = selectedImageKey ? (transformsMap[selectedImageKey] || {}) : {};

  return (
    <div className="relative min-h-screen bg-[#1c1917] selection:bg-[#c59b27] selection:text-[#1c1917]">
      {/* Opening Cover Envelope */}
      {!isOpen && (
        <CoverEnvelope
          groomName={data.groom_name}
          brideName={data.bride_name}
          weddingDate={data.wedding_date}
          couplePhoto={data.couple_photo || data.groom_photo || data.bride_photo}
          onOpen={() => setIsOpen(true)}
        />
      )}

      {/* Main invitation container */}
      <div className={`transition-all duration-700 ${isOpen ? "animate-reveal-up opacity-100" : "opacity-0"}`}>
        
        {/* Floating Canva Control Toolbar in Admin Editor mode */}
        {editable && selectedImageKey && (
          <div className="sticky top-2 z-50 px-4 max-w-2xl mx-auto">
            <CanvaImageToolbar
              imageKey={selectedImageKey}
              transform={activeTransform}
              onChange={(updated) => handleTransformUpdate(selectedImageKey, updated)}
              onDeselect={() => setSelectedImageKey(null)}
            />
          </div>
        )}

        <div className="max-w-2xl mx-auto min-h-screen bg-[#fdfbf7] shadow-2xl relative">
          {renderTemplate()}
        </div>
        <AudioPlayer musicUrl={data.background_music_url} />
      </div>
    </div>
  );
}
