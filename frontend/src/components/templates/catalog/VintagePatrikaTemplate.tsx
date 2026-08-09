"use client";

import { useState } from "react";
import { BaseTemplateProps } from "./TraditionalHeritageTemplate";
import { Countdown } from "@/components/public/Countdown";
import { WhatsAppShare } from "@/components/public/WhatsAppShare";
import { GalleryLightbox } from "@/components/public/GalleryLightbox";
import { MovableImage } from "@/components/public/MovableImage";
import { MapPin, Calendar, Heart, Flame } from "lucide-react";

export function VintagePatrikaTemplate({
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
    <div className="min-h-screen bg-[#e6b800] text-[#7a0c1a] font-telugu selection:bg-[#b30000] selection:text-[#f7d070]">
      <div className="max-w-2xl mx-auto bg-[#f7d070] min-h-screen relative overflow-hidden border-x-4 border-[#b30000] shadow-2xl">
        
        {/* Vermillion Red Border Frame */}
        <div className="h-3 bg-[#b30000]"></div>

        <header className="pt-10 pb-6 px-6 text-center border-b-2 border-[#b30000]/40">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#b30000] text-[#f7d070] flex items-center justify-center font-bold text-xl shadow-md">
            卐
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-[#b30000]/15 border border-[#b30000]/40 text-[#b30000] font-telugu text-xs font-bold tracking-wider">
            卐 శ్రీ లక్ష్మీ ప్రసన్న 卐
          </span>
          <h2 className="text-2xl font-telugu font-bold text-[#b30000] mt-3">
            వింటేజ్ వివాహ లగ్న పత్రిక
          </h2>
        </header>

        <section className="px-6 py-8 text-center">
          {couple_photo ? (
            <div className="relative w-full max-w-sm mx-auto aspect-[4/3] rounded-2xl overflow-hidden border-4 border-[#b30000] p-1 bg-[#fffdfa] shadow-xl mb-6 flex items-center justify-center">
              <MovableImage
                imageKey="couple_photo"
                src={couple_photo}
                alt="Vintage Couple"
                className="w-full h-full object-cover rounded-xl"
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
                <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-[#b30000] p-1 bg-[#fffdfa] shadow-md flex items-center justify-center">
                  <MovableImage
                    imageKey="groom_photo"
                    src={groom_photo}
                    alt={groom_name}
                    className="w-full h-full object-cover rounded-lg"
                    transform={transformsMap["groom_photo"]}
                    editable={editable}
                    isSelected={selectedImageKey === "groom_photo"}
                    onSelect={onSelectImage}
                    onTransformChange={onTransformChange}
                  />
                </div>
              )}
              {bride_photo && (
                <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-[#b30000] p-1 bg-[#fffdfa] shadow-md flex items-center justify-center">
                  <MovableImage
                    imageKey="bride_photo"
                    src={bride_photo}
                    alt={bride_name}
                    className="w-full h-full object-cover rounded-lg"
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

          <div className="p-6 rounded-2xl bg-[#fffdfa] border-2 border-[#b30000] shadow-md max-w-md mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-[#b30000]">
              {groom_name}
            </h1>
            <div className="flex items-center justify-center gap-2 my-2 text-[#b30000]">
              <span className="w-10 h-[2px] bg-[#b30000]"></span>
              <Heart className="w-4 h-4 fill-[#b30000]" />
              <span className="w-10 h-[2px] bg-[#b30000]"></span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-[#b30000]">
              {bride_name}
            </h1>
          </div>
        </section>

        {invitation_text && (
          <section className="mx-6 my-4 p-6 rounded-2xl bg-[#fffdfa] border-2 border-[#b30000] text-center shadow-xs">
            <p className="font-telugu text-sm sm:text-base leading-relaxed text-[#7a0c1a] whitespace-pre-line">
              {invitation_text}
            </p>
          </section>
        )}

        <section className="py-8 px-6 text-center border-y-2 border-[#b30000] bg-[#fffdfa]">
          <span className="text-[11px] font-luxury uppercase tracking-widest text-[#b30000] font-bold">
            WEDDING CEREMONY DATE
          </span>
          <div className="my-3">
            <span className="text-5xl sm:text-6xl font-luxury font-bold text-[#b30000] block leading-none">
              {dayNum}
            </span>
            <span className="text-lg font-telugu font-bold text-[#7a0c1a] block mt-1">
              {monthYearStr}
            </span>
            <span className="text-sm font-telugu text-[#b30000] block mt-0.5 font-semibold">
              {weekdayStr} • సుముహూర్తం: {wedding_time}
            </span>
          </div>
          <div className="mt-6 pt-4 border-t border-[#b30000]/30">
            <Countdown weddingDate={wedding_date} weddingTime={wedding_time} accentColor="text-[#b30000]" />
          </div>
        </section>

        {events.length > 0 && (
          <section className="px-6 py-10">
            <div className="text-center mb-8">
              <h3 className="font-telugu font-bold text-xl text-[#b30000]">
                శుభకార్యముల పట్టిక (Vintage Schedule)
              </h3>
            </div>
            <div className="relative border-l-2 border-[#b30000] ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {events.map((ev, idx) => (
                <div key={ev.id || idx} className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#f7d070] border-2 border-[#b30000] flex items-center justify-center text-[10px] text-[#b30000] font-bold">
                    卐
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#b30000] text-[#f7d070] font-mono text-[11px] font-bold mb-1">
                      {ev.time}
                    </span>
                    <h4 className="font-telugu font-bold text-base text-[#b30000]">
                      {ev.title}
                    </h4>
                    <p className="font-telugu text-xs text-[#7a0c1a] mt-0.5 flex items-center gap-1.5 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#b30000]" />
                      <span>{ev.date}</span>
                    </p>
                    <p className="font-telugu text-xs text-[#7a0c1a] mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#b30000]" />
                      <span>{ev.venue}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="px-6 py-8 mx-6 my-4 rounded-2xl bg-[#fffdfa] border-2 border-[#b30000] text-center shadow-md">
          <div className="w-12 h-12 rounded-full bg-[#b30000] text-[#f7d070] flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-telugu font-bold text-lg text-[#b30000] mb-1">{venue_name}</h3>
          <p className="font-telugu text-xs text-[#7a0c1a] max-w-md mx-auto leading-relaxed mb-5 font-medium">
            {venue_address}
          </p>
          {google_maps_url && (
            <a
              href={google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#b30000] text-[#f7d070] font-telugu text-xs font-bold tracking-wider hover:bg-[#800000] transition-all shadow-md"
            >
              <MapPin className="w-4 h-4" />
              <span>గూగుల్ మ్యాప్స్ దిశలు (GET DIRECTIONS)</span>
            </a>
          )}
        </section>

        {gallery_images.length > 0 && (
          <section className="px-6 py-8 border-t-2 border-[#b30000]">
            <h3 className="text-center font-telugu font-bold text-lg text-[#b30000] mb-6">
              చిత్రాల మాలిక (Vintage Gallery)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {gallery_images.map((img, idx) => {
                const key = `gallery_${idx}`;
                return (
                  <div
                    key={img.id || idx}
                    onClick={() => !editable && setActiveImage(img.image_url)}
                    className={`rounded-xl overflow-hidden border-2 border-[#b30000] shadow-md flex items-center justify-center bg-[#fffdfa] ${
                      idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <MovableImage
                      imageKey={key}
                      src={img.image_url}
                      alt={`Vintage Album ${idx + 1}`}
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

        <footer className="px-6 py-10 text-center bg-[#e6b800] border-t-2 border-[#b30000]">
          <WhatsAppShare
            groomName={groom_name}
            brideName={bride_name}
            weddingDate={wedding_date}
            venueName={venue_name}
            slug={slug}
            buttonClass="bg-[#b30000] text-[#f7d070] font-bold"
          />
        </footer>
      </div>
      <GalleryLightbox imageUrl={activeImage} onClose={() => setActiveImage(null)} />
    </div>
  );
}
