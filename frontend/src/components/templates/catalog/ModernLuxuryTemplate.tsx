"use client";

import { useState } from "react";
import { BaseTemplateProps } from "./TraditionalHeritageTemplate";
import { Countdown } from "@/components/public/Countdown";
import { WhatsAppShare } from "@/components/public/WhatsAppShare";
import { GalleryLightbox } from "@/components/public/GalleryLightbox";
import { MovableImage } from "@/components/public/MovableImage";
import { MapPin, Calendar, Sparkles } from "lucide-react";

export function ModernLuxuryTemplate({
  data,
  editable = false,
  selectedImageKey = null,
  transformsMap = {},
  onSelectImage,
  onTransformChange
}: BaseTemplateProps) {
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
    <div className="min-h-screen bg-[#020617] text-[#fef08a] font-telugu selection:bg-[#eab308] selection:text-[#020617]">
      <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#0f172a] via-[#090d16] to-[#020617] min-h-screen relative overflow-hidden border-x border-[#eab308]/30 shadow-2xl">
        
        {/* Sleek Gold Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#eab308] to-transparent"></div>

        <header className="pt-12 pb-6 px-6 text-center border-b border-[#eab308]/20">
          <h2 className="text-2xl font-telugu font-bold text-gold-gradient mt-3">
            ఆధునిక రాజస వివాహ మహోత్సవం
          </h2>
        </header>

        <section className="px-6 py-8 text-center">
          {couple_photo ? (
            <div className="relative w-full max-w-sm mx-auto aspect-[4/3] rounded-3xl overflow-hidden border border-[#eab308]/40 p-1 bg-[#090d16] shadow-2xl mb-6 flex items-center justify-center">
              <MovableImage
                imageKey="couple_photo"
                src={couple_photo}
                alt="Luxury Couple"
                className="w-full h-full object-cover rounded-[22px]"
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
                <div className="w-28 h-36 rounded-2xl overflow-hidden border border-[#eab308]/40 p-1 bg-[#090d16] shadow-md flex items-center justify-center">
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
                <div className="w-28 h-36 rounded-2xl overflow-hidden border border-[#eab308]/40 p-1 bg-[#090d16] shadow-md flex items-center justify-center">
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

          <div className="p-6 rounded-3xl bg-[#0f172a]/60 border border-[#eab308]/30 backdrop-blur-md max-w-md mx-auto shadow-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-gold-gradient">
              {groom_name}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2 text-[#eab308]">
              <Sparkles className="w-4 h-4" />
              <span className="font-script text-xl text-[#fef08a]">weds</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-gold-gradient">
              {bride_name}
            </h1>
          </div>
        </section>

        {invitation_text && (
          <section className="mx-6 my-4 p-6 rounded-3xl bg-[#0f172a]/40 border border-[#eab308]/20 text-center">
            <p className="font-telugu text-sm sm:text-base leading-relaxed text-[#fdfbf7] whitespace-pre-line">
              {invitation_text}
            </p>
          </section>
        )}

        <section className="py-8 px-6 text-center border-y border-[#eab308]/20 bg-[#0f172a]/80">
          <span className="text-[11px] font-luxury uppercase tracking-[0.2em] text-[#eab308]">
            WEDDING CEREMONY DATE
          </span>
          <div className="my-3">
            <span className="text-5xl sm:text-6xl font-luxury font-bold text-gold-gradient block leading-none">
              {dayNum}
            </span>
            <span className="text-lg font-telugu font-semibold text-[#fef08a] block mt-1">
              {monthYearStr}
            </span>
            <span className="text-sm font-telugu text-[#fef08a]/80 block mt-0.5">
              {weekdayStr} • సుముహూర్తం: {wedding_time}
            </span>
          </div>
          <div className="mt-6 pt-4 border-t border-[#eab308]/20">
            <Countdown weddingDate={wedding_date} weddingTime={wedding_time} accentColor="text-[#eab308]" />
          </div>
        </section>

        {events.length > 0 && (
          <section className="px-6 py-10">
            <div className="text-center mb-8">
              <h3 className="font-telugu font-bold text-xl text-[#eab308]">
                శుభకార్యముల పట్టిక (Luxury Schedule)
              </h3>
            </div>
            <div className="relative border-l-2 border-[#eab308]/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {events.map((ev, idx) => (
                <div key={ev.id || idx} className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#0f172a] border border-[#eab308] flex items-center justify-center text-[10px] text-[#eab308]">
                    ✦
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#eab308]/15 text-[#eab308] font-mono text-[11px] font-semibold mb-1 border border-[#eab308]/30">
                      {ev.time}
                    </span>
                    <h4 className="font-telugu font-bold text-base text-[#fef08a]">
                      {ev.title}
                    </h4>
                    <p className="font-telugu text-xs text-[#eab308] mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#eab308]" />
                      <span>{ev.date}</span>
                    </p>
                    <p className="font-telugu text-xs text-[#fdfbf7]/80 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#eab308]" />
                      <span>{ev.venue}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="px-6 py-8 mx-6 my-4 rounded-3xl bg-[#0f172a]/60 border border-[#eab308]/30 text-center shadow-2xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-full bg-[#eab308]/15 border border-[#eab308]/40 flex items-center justify-center mx-auto mb-3 text-[#eab308]">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-telugu font-bold text-lg text-[#eab308] mb-1">{venue_name}</h3>
          <p className="font-telugu text-xs text-[#fdfbf7]/80 max-w-md mx-auto leading-relaxed mb-5">
            {venue_address}
          </p>
          {google_maps_url && (
            <a
              href={google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-[#020617] font-telugu text-xs font-bold tracking-wider hover:from-[#fef08a] hover:to-[#eab308] transition-all shadow-lg"
            >
              <MapPin className="w-4 h-4" />
              <span>గూగుల్ మ్యాప్స్ దిశలు (GET DIRECTIONS)</span>
            </a>
          )}
        </section>

        {gallery_images.length > 0 && (
          <section className="px-6 py-8 border-t border-[#eab308]/20">
            <h3 className="text-center font-telugu font-bold text-lg text-[#eab308] mb-6">
              చిత్రాల మాలిక (Luxury Gallery)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {gallery_images.map((img, idx) => {
                const key = `gallery_${idx}`;
                return (
                  <div
                    key={img.id || idx}
                    onClick={() => !editable && setActiveImage(img.image_url)}
                    className={`rounded-2xl overflow-hidden border border-[#eab308]/30 shadow-2xl flex items-center justify-center ${
                      idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <MovableImage
                      imageKey={key}
                      src={img.image_url}
                      alt={`Luxury Album ${idx + 1}`}
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

        <footer className="px-6 py-10 text-center bg-[#020617] border-t border-[#eab308]/20">
          <WhatsAppShare
            groomName={groom_name}
            brideName={bride_name}
            weddingDate={wedding_date}
            venueName={venue_name}
            slug={slug}
            buttonClass="bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-[#020617] font-bold"
          />
        </footer>
      </div>
      <GalleryLightbox imageUrl={activeImage} onClose={() => setActiveImage(null)} />
    </div>
  );
}
