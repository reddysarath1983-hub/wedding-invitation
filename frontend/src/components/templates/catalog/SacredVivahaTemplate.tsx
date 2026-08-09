"use client";

import { useState } from "react";
import { BaseTemplateProps } from "./TraditionalHeritageTemplate";
import { Countdown } from "@/components/public/Countdown";
import { WhatsAppShare } from "@/components/public/WhatsAppShare";
import { GalleryLightbox } from "@/components/public/GalleryLightbox";
import { MovableImage } from "@/components/public/MovableImage";
import { MapPin, Calendar, Heart, Flame } from "lucide-react";

export function SacredVivahaTemplate({
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
    <div className="min-h-screen bg-[#5f0909] text-[#fff8e1] font-telugu selection:bg-[#ffd700] selection:text-[#5f0909]">
      <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#b71c1c] via-[#880e0e] to-[#5f0909] min-h-screen relative overflow-hidden border-x-4 border-[#ffd700]/60 shadow-2xl">
        
        <div className="h-3 bg-gradient-to-r from-[#ffd700] via-[#fff8e1] to-[#ffd700]"></div>

        <header className="pt-10 pb-6 px-6 text-center border-b border-[#ffd700]/30">
          <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-[#ffd700]/20 border-2 border-[#ffd700] flex items-center justify-center text-[#ffd700]">
            <Flame className="w-7 h-7 animate-pulse" />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-[#ffd700]/20 border border-[#ffd700]/40 text-[#ffd700] font-telugu text-xs font-semibold tracking-wider">
            🔥 సప్తపది పవిత్ర వివాహ హోమం 🔥
          </span>
          <h2 className="text-2xl sm:text-3xl font-telugu font-bold text-[#ffd700] mt-3">
            పవిత్ర వివాహ మహోత్సవం
          </h2>
        </header>

        <section className="px-6 py-8 text-center">
          {couple_photo ? (
            <div className="relative w-full max-w-sm mx-auto aspect-[4/3] rounded-3xl overflow-hidden border-4 border-[#ffd700] p-1.5 bg-[#880e0e] shadow-2xl mb-6 flex items-center justify-center">
              <MovableImage
                imageKey="couple_photo"
                src={couple_photo}
                alt="Sacred Couple"
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
                <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-[#ffd700] p-1 bg-[#880e0e] shadow-md flex items-center justify-center">
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
                <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-[#ffd700] p-1 bg-[#880e0e] shadow-md flex items-center justify-center">
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

          <div className="p-6 rounded-3xl bg-[#5f0909]/80 border border-[#ffd700]/40 shadow-xl max-w-md mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-[#ffd700]">
              {groom_name}
            </h1>
            <div className="flex items-center justify-center gap-2 my-2 text-[#ffd700]">
              <span className="w-10 h-[1px] bg-[#ffd700]/40"></span>
              <Heart className="w-4 h-4 fill-[#ffd700]" />
              <span className="w-10 h-[1px] bg-[#ffd700]/40"></span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-[#ffd700]">
              {bride_name}
            </h1>
          </div>
        </section>

        {invitation_text && (
          <section className="mx-6 my-4 p-6 rounded-3xl bg-[#5f0909]/90 border border-[#ffd700]/40 text-center">
            <p className="font-telugu text-sm sm:text-base leading-relaxed text-[#fff8e1] whitespace-pre-line">
              {invitation_text}
            </p>
          </section>
        )}

        <section className="py-8 px-6 text-center border-y border-[#ffd700]/30 bg-[#5f0909]/90">
          <span className="text-[11px] font-luxury uppercase tracking-widest text-[#ffd700]">
            SACRED VIVAHA MUHURTHAM
          </span>
          <div className="my-3">
            <span className="text-5xl sm:text-6xl font-luxury font-bold text-[#ffd700] block leading-none">
              {dayNum}
            </span>
            <span className="text-lg font-telugu font-semibold text-[#fff8e1] block mt-1">
              {monthYearStr}
            </span>
            <span className="text-sm font-telugu text-[#ffd700] block mt-0.5">
              {weekdayStr} • సుముహూర్తం: {wedding_time}
            </span>
          </div>
          <div className="mt-6 pt-4 border-t border-[#ffd700]/20">
            <Countdown weddingDate={wedding_date} weddingTime={wedding_time} accentColor="text-[#ffd700]" />
          </div>
        </section>

        {events.length > 0 && (
          <section className="px-6 py-10">
            <div className="text-center mb-8">
              <h3 className="font-telugu font-bold text-xl text-[#ffd700]">
                వేద వివాహ కార్యక్రమాలు (Sacred Schedule)
              </h3>
            </div>
            <div className="relative border-l-2 border-[#ffd700]/50 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {events.map((ev, idx) => (
                <div key={ev.id || idx} className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#b71c1c] border-2 border-[#ffd700] flex items-center justify-center text-[10px] text-[#ffd700]">
                    🔥
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#ffd700]/20 text-[#ffd700] font-mono text-[11px] font-semibold mb-1 border border-[#ffd700]/30">
                      {ev.time}
                    </span>
                    <h4 className="font-telugu font-bold text-base text-[#fff8e1]">
                      {ev.title}
                    </h4>
                    <p className="font-telugu text-xs text-[#ffd700] mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>{ev.date}</span>
                    </p>
                    <p className="font-telugu text-xs text-[#fff8e1]/80 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>{ev.venue}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="px-6 py-8 mx-6 my-4 rounded-3xl bg-[#5f0909]/90 border border-[#ffd700]/40 text-center shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#ffd700]/20 border border-[#ffd700] flex items-center justify-center mx-auto mb-3 text-[#ffd700]">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-telugu font-bold text-lg text-[#ffd700] mb-1">{venue_name}</h3>
          <p className="font-telugu text-xs text-[#fff8e1]/90 max-w-md mx-auto leading-relaxed mb-5">
            {venue_address}
          </p>
          {google_maps_url && (
            <a
              href={google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ffd700] text-[#5f0909] font-telugu text-xs font-bold tracking-wider hover:bg-[#fff8e1] transition-all shadow-lg"
            >
              <MapPin className="w-4 h-4" />
              <span>గూగుల్ మ్యాప్స్ దిశలు (GET DIRECTIONS)</span>
            </a>
          )}
        </section>

        {gallery_images.length > 0 && (
          <section className="px-6 py-8 border-t border-[#ffd700]/30">
            <h3 className="text-center font-telugu font-bold text-lg text-[#ffd700] mb-6">
              చిత్రాల మాలిక (Sacred Gallery)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {gallery_images.map((img, idx) => {
                const key = `gallery_${idx}`;
                return (
                  <div
                    key={img.id || idx}
                    onClick={() => !editable && setActiveImage(img.image_url)}
                    className={`rounded-2xl overflow-hidden border border-[#ffd700]/40 shadow-lg flex items-center justify-center ${
                      idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <MovableImage
                      imageKey={key}
                      src={img.image_url}
                      alt={`Sacred Album ${idx + 1}`}
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

        <footer className="px-6 py-10 text-center bg-[#3b0404] border-t border-[#ffd700]/30">
          <WhatsAppShare
            groomName={groom_name}
            brideName={bride_name}
            weddingDate={wedding_date}
            venueName={venue_name}
            slug={slug}
            buttonClass="bg-[#ffd700] text-[#5f0909] font-bold"
          />
        </footer>
      </div>
      <GalleryLightbox imageUrl={activeImage} onClose={() => setActiveImage(null)} />
    </div>
  );
}
