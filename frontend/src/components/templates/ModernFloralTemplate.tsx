"use client";

import { useState } from "react";
import { InvitationData, ImageTransform } from "@/types/invitation";
import { Countdown } from "@/components/public/Countdown";
import { WhatsAppShare } from "@/components/public/WhatsAppShare";
import { GalleryLightbox } from "@/components/public/GalleryLightbox";
import { MovableImage } from "@/components/public/MovableImage";
import { formatDate } from "@/lib/utils";
import { MapPin, Calendar, Clock, Heart, Flower2 } from "lucide-react";

interface TemplateProps {
  data: InvitationData;
  editable?: boolean;
  selectedImageKey?: string | null;
  transformsMap?: Record<string, ImageTransform>;
  onSelectImage?: (key: string) => void;
  onTransformChange?: (key: string, transform: ImageTransform) => void;
}

export function ModernFloralTemplate({
  data,
  editable = false,
  selectedImageKey = null,
  transformsMap = {},
  onSelectImage,
  onTransformChange
}: TemplateProps) {
  const {
    groom_name,
    bride_name,
    groom_photo,
    bride_photo,
    couple_photo,
    wedding_date,
    wedding_time,
    venue_name,
    venue_address,
    google_maps_url,
    invitation_text,
    events = [],
    family_members = [],
    gallery_images = [],
    slug
  } = data;

  const [activeImage, setActiveImage] = useState<string | null>(null);

  const dateObj = wedding_date ? new Date(wedding_date) : new Date();
  const dayNum = dateObj.getDate() || 20;
  const monthYearStr = dateObj.toLocaleDateString("te-IN", { month: "long", year: "numeric" });
  const weekdayStr = dateObj.toLocaleDateString("te-IN", { weekday: "long" });

  return (
    <div className="min-h-screen bg-[#f9f6f0] text-[#2d4a3e] font-telugu selection:bg-[#2d4a3e] selection:text-[#f9f6f0]">
      <div className="max-w-2xl mx-auto bg-stationery-modern min-h-screen relative overflow-hidden border-x border-[#2d4a3e]/15 shadow-xl">
        
        {/* Top Accent Line */}
        <div className="h-1.5 bg-gradient-to-r from-[#2d4a3e] via-[#8b1220] to-[#2d4a3e]"></div>

        {/* 1. HEADER */}
        <header className="pt-10 pb-6 px-6 text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#2d4a3e]/10 flex items-center justify-center text-[#2d4a3e]">
            <Flower2 className="w-5 h-5" />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-[#2d4a3e]/10 text-[#2d4a3e] font-telugu text-xs font-semibold tracking-wider">
            🌸 శ్రీరస్తు • శుభమస్తు 🌸
          </span>
          <h2 className="text-xl sm:text-2xl font-telugu font-bold text-[#2d4a3e] mt-3">
            వివాహ మహోత్సవ ఆహ్వాన పత్రిక
          </h2>
        </header>

        {/* 2. COUPLE HERO COMPOSITION WITH MOVABLE IMAGE */}
        <section className="px-6 py-6 text-center">
          {couple_photo ? (
            <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-3xl overflow-hidden border border-[#2d4a3e]/20 shadow-md mb-6 p-1.5 bg-white flex items-center justify-center">
              <MovableImage
                imageKey="couple_photo"
                src={couple_photo}
                alt="Couple"
                className="w-full h-full object-cover rounded-[20px]"
                transform={transformsMap["couple_photo"]}
                editable={editable}
                isSelected={selectedImageKey === "couple_photo"}
                onSelect={onSelectImage}
                onTransformChange={onTransformChange}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center gap-6 mb-6">
              {groom_photo && (
                <div className="w-28 h-36 rounded-2xl overflow-hidden border border-[#2d4a3e]/20 p-1 bg-white shadow-xs flex items-center justify-center">
                  <MovableImage
                    imageKey="groom_photo"
                    src={groom_photo}
                    alt={groom_name}
                    className="w-full h-full object-cover rounded-xl"
                    transform={transformsMap["groom_photo"]}
                    editable={editable}
                    isSelected={selectedImageKey === "groom_photo"}
                    onSelect={onSelectImage}
                    onTransformChange={onTransformChange}
                  />
                </div>
              )}
              {bride_photo && (
                <div className="w-28 h-36 rounded-2xl overflow-hidden border border-[#2d4a3e]/20 p-1 bg-white shadow-xs flex items-center justify-center">
                  <MovableImage
                    imageKey="bride_photo"
                    src={bride_photo}
                    alt={bride_name}
                    className="w-full h-full object-cover rounded-xl"
                    transform={transformsMap["bride_photo"]}
                    editable={editable}
                    isSelected={selectedImageKey === "bride_photo"}
                    onSelect={onSelectImage}
                    onTransformChange={onTransformChange}
                  />
                </div>
              )}
            </div>
          )}

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-[#2d4a3e]">
              {groom_name}
            </h1>
            
            <div className="flex items-center justify-center gap-2 my-2 text-[#8b1220]">
              <span className="w-10 h-[1px] bg-[#2d4a3e]/20"></span>
              <Heart className="w-4 h-4 fill-[#8b1220]" />
              <span className="w-10 h-[1px] bg-[#2d4a3e]/20"></span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-[#2d4a3e]">
              {bride_name}
            </h1>
          </div>

          <p className="font-luxury italic text-sm text-[#2d4a3e]/80 mt-3">
            Together with their families cordially invite you to celebrate
          </p>
        </section>

        {/* 3. INVITATION MESSAGE */}
        {invitation_text && (
          <section className="mx-6 my-6 p-6 rounded-3xl bg-white border border-[#2d4a3e]/15 text-center shadow-xs">
            <p className="font-telugu text-sm sm:text-base leading-relaxed text-[#2d4a3e] whitespace-pre-line">
              {invitation_text}
            </p>
          </section>
        )}

        {/* 4. DATE */}
        <section className="py-8 px-6 text-center border-y border-[#2d4a3e]/15 bg-white/70">
          <span className="text-[11px] font-luxury uppercase tracking-widest text-[#2d4a3e]/80">
            WEDDING DATE & TIME
          </span>

          <div className="my-3">
            <span className="text-5xl sm:text-6xl font-luxury font-bold text-[#2d4a3e] block leading-none">
              {dayNum}
            </span>
            <span className="text-lg font-telugu font-semibold text-[#8b1220] block mt-1">
              {monthYearStr}
            </span>
            <span className="text-sm font-telugu text-[#2d4a3e]/80 block mt-0.5">
              {weekdayStr} • సుముహూర్తం: {wedding_time}
            </span>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2d4a3e]/15">
            <Countdown weddingDate={wedding_date} weddingTime={wedding_time} accentColor="text-[#2d4a3e]" />
          </div>
        </section>

        {/* 5. VERTICAL TIMELINE */}
        {events.length > 0 && (
          <section className="px-6 py-10">
            <div className="text-center mb-8">
              <h3 className="font-telugu font-bold text-xl text-[#2d4a3e]">
                శుభకార్యముల పట్టిక (Events Timeline)
              </h3>
            </div>

            <div className="relative border-l-2 border-[#2d4a3e]/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {events.map((ev, idx) => (
                <div key={ev.id || idx} className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#f9f6f0] border-2 border-[#2d4a3e] flex items-center justify-center text-[10px] text-[#2d4a3e]">
                    🌸
                  </div>

                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#2d4a3e]/10 text-[#2d4a3e] font-mono text-[11px] font-semibold mb-1">
                      {ev.time}
                    </span>
                    <h4 className="font-telugu font-bold text-base text-[#2d4a3e]">
                      {ev.title}
                    </h4>
                    <p className="font-telugu text-xs text-[#2d4a3e]/80 mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8b1220]" />
                      <span>{ev.date}</span>
                    </p>
                    <p className="font-telugu text-xs text-[#2d4a3e] mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8b1220]" />
                      <span>{ev.venue}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. VENUE */}
        <section className="px-6 py-8 mx-6 my-4 rounded-3xl bg-white border border-[#2d4a3e]/15 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#2d4a3e]/10 flex items-center justify-center mx-auto mb-3 text-[#2d4a3e]">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-telugu font-bold text-lg text-[#2d4a3e] mb-1">{venue_name}</h3>
          <p className="font-telugu text-xs text-[#2d4a3e]/80 max-w-md mx-auto leading-relaxed mb-5">
            {venue_address}
          </p>

          {google_maps_url && (
            <a
              href={google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2d4a3e] hover:bg-[#1b382b] text-white font-telugu text-xs font-semibold tracking-wider transition-colors shadow-md"
            >
              <MapPin className="w-4 h-4 text-[#e5dec9]" />
              <span>గూగుల్ మ్యాప్స్ దిశలు (GET DIRECTIONS)</span>
            </a>
          )}
        </section>

        {/* 7. FAMILY */}
        {family_members.length > 0 && (
          <section className="px-6 py-8 border-t border-[#2d4a3e]/15 text-center">
            <h3 className="font-telugu font-bold text-lg text-[#2d4a3e] mb-6">
              ఆహ్వాన సంఘం (Honored Family)
            </h3>
            <div className="space-y-4 max-w-md mx-auto">
              {family_members.map((fm, idx) => (
                <div key={fm.id || idx} className="py-2 border-b border-[#2d4a3e]/10 last:border-0">
                  <p className="font-telugu text-sm font-bold text-[#2d4a3e]">{fm.name}</p>
                  <p className="font-telugu text-xs text-[#8b1220] mt-0.5">{fm.relation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. GALLERY WITH MOVABLE IMAGES */}
        {gallery_images.length > 0 && (
          <section className="px-6 py-8 border-t border-[#2d4a3e]/15">
            <h3 className="text-center font-telugu font-bold text-lg text-[#2d4a3e] mb-6">
              చిత్రాల మాలిక (Photo Gallery)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {gallery_images.map((img, idx) => {
                const key = `gallery_${idx}`;
                return (
                  <div
                    key={img.id || idx}
                    onClick={() => !editable && setActiveImage(img.image_url)}
                    className={`rounded-2xl overflow-hidden border border-[#2d4a3e]/15 shadow-xs flex items-center justify-center ${
                      idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <MovableImage
                      imageKey={key}
                      src={img.image_url}
                      alt={`Modern Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                      transform={transformsMap[key]}
                      editable={editable}
                      isSelected={selectedImageKey === key}
                      onSelect={onSelectImage}
                      onTransformChange={onTransformChange}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 9. FOOTER */}
        <footer className="px-6 py-10 text-center bg-white border-t border-[#2d4a3e]/15">
          <WhatsAppShare
            groomName={groom_name}
            brideName={bride_name}
            weddingDate={wedding_date}
            venueName={venue_name}
            slug={slug}
            buttonClass="bg-[#2d4a3e] hover:bg-[#1b382b] text-white"
          />
        </footer>

      </div>

      <GalleryLightbox imageUrl={activeImage} onClose={() => setActiveImage(null)} />
    </div>
  );
}
