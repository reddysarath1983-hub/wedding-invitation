"use client";

import { useState } from "react";
import { InvitationData, ImageTransform } from "@/types/invitation";
import { Countdown } from "@/components/public/Countdown";
import { WhatsAppShare } from "@/components/public/WhatsAppShare";
import { GalleryLightbox } from "@/components/public/GalleryLightbox";
import { MovableImage } from "@/components/public/MovableImage";
import { MapPin, Calendar, Heart, Sparkles } from "lucide-react";

export interface BaseTemplateProps {
  data: InvitationData;
  editable?: boolean;
  selectedImageKey?: string | null;
  transformsMap?: Record<string, ImageTransform>;
  onSelectImage?: (key: string) => void;
  onTransformChange?: (key: string, transform: ImageTransform) => void;
}

export function TraditionalHeritageTemplate({
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
    <div className="min-h-screen bg-[#fdfbf7] text-[#3c2415] font-telugu selection:bg-[#c59b27] selection:text-[#fdfbf7]">
      <div className="max-w-2xl mx-auto bg-[#fdfbf7] min-h-screen relative overflow-hidden border-x border-[#c59b27]/30 shadow-2xl">
        <div className="h-2 bg-gradient-to-r from-[#58121a] via-[#c59b27] to-[#58121a]"></div>

        <header className="pt-10 pb-6 px-6 text-center">
          <div className="inline-block px-5 py-1 rounded-full bg-[#58121a]/5 border border-[#c59b27]/30 text-[#8b6508] font-telugu text-xs font-semibold tracking-widest uppercase mb-3">
            ✨ శ్రీరస్తు • శుభమస్తు • అభయహస్తు ✨
          </div>
          <h2 className="text-xl sm:text-2xl font-telugu font-bold text-[#58121a]">
            వివాహ ఆహ్వాన పత్రిక
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-16 h-[1px] bg-[#c59b27]/40"></span>
            <Sparkles className="w-4 h-4 text-[#c59b27]" />
            <span className="w-16 h-[1px] bg-[#c59b27]/40"></span>
          </div>
        </header>

        <section className="px-6 py-4 text-center">
          {couple_photo ? (
            <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#c59b27] shadow-xl mb-6 p-1.5 bg-white flex items-center justify-center">
              <MovableImage
                imageKey="couple_photo"
                src={couple_photo}
                alt="Couple"
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
                <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-[#c59b27] p-1 bg-white shadow-md flex items-center justify-center">
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
                <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-[#c59b27] p-1 bg-white shadow-md flex items-center justify-center">
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
            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-[#58121a]">
              {groom_name}
            </h1>
            <div className="flex items-center justify-center gap-2 my-2 text-[#c59b27]">
              <span className="w-12 h-[1px] bg-[#c59b27]/40"></span>
              <Heart className="w-5 h-5 fill-[#58121a] text-[#58121a]" />
              <span className="w-12 h-[1px] bg-[#c59b27]/40"></span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-[#58121a]">
              {bride_name}
            </h1>
          </div>

          <p className="font-luxury italic text-sm text-[#8b6508] mt-3">
            Together with their families request the honor of your presence
          </p>
        </section>

        {invitation_text && (
          <section className="mx-6 my-6 p-6 rounded-3xl bg-white border border-[#c59b27]/30 text-center shadow-xs">
            <div className="w-8 h-8 mx-auto mb-2 text-[#c59b27] flex items-center justify-center">❖</div>
            <p className="font-telugu text-sm sm:text-base leading-relaxed text-[#4a2e1b] whitespace-pre-line">
              {invitation_text}
            </p>
            <div className="w-8 h-8 mx-auto mt-2 text-[#c59b27] flex items-center justify-center">❖</div>
          </section>
        )}

        <section className="py-8 px-6 text-center border-y border-[#c59b27]/20 bg-[#fbf7ef]">
          <span className="text-[11px] uppercase tracking-[0.2em] font-luxury font-semibold text-[#8b6508]">
            WEDDING CEREMONY DATE
          </span>
          <div className="my-3">
            <span className="text-5xl sm:text-6xl font-luxury font-bold text-[#58121a] block leading-none">
              {dayNum}
            </span>
            <span className="text-lg font-telugu font-semibold text-[#8b6508] block mt-1">
              {monthYearStr}
            </span>
            <span className="text-sm font-telugu text-[#58121a]/80 block mt-0.5">
              {weekdayStr} • సుముహూర్తం: {wedding_time}
            </span>
          </div>
          <div className="mt-6 pt-4 border-t border-[#c59b27]/20">
            <Countdown weddingDate={wedding_date} weddingTime={wedding_time} accentColor="text-[#58121a]" />
          </div>
        </section>

        {events.length > 0 && (
          <section className="px-6 py-10">
            <div className="text-center mb-8">
              <h3 className="font-telugu font-bold text-xl text-[#58121a]">
                శుభకార్యముల వివరములు (Wedding Events)
              </h3>
            </div>
            <div className="relative border-l-2 border-[#c59b27]/40 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {events.map((ev, idx) => (
                <div key={ev.id || idx} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#fdfbf7] border-2 border-[#c59b27] flex items-center justify-center text-[10px] text-[#58121a] font-bold">
                    ❖
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#58121a]/10 text-[#58121a] font-mono text-[11px] font-semibold mb-1">
                      {ev.time}
                    </span>
                    <h4 className="font-telugu font-bold text-base text-[#58121a]">
                      {ev.title}
                    </h4>
                    <p className="font-telugu text-xs text-[#8b6508] mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>{ev.date}</span>
                    </p>
                    <p className="font-telugu text-xs text-[#3c2415] mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>{ev.venue}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="px-6 py-8 mx-6 my-4 rounded-3xl bg-gradient-to-b from-white to-[#fbf7ef] border border-[#c59b27]/30 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#58121a]/10 border border-[#c59b27]/40 flex items-center justify-center mx-auto mb-3 text-[#58121a]">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-telugu font-bold text-lg text-[#58121a] mb-1">{venue_name}</h3>
          <p className="font-telugu text-xs text-[#4a2e1b] max-w-md mx-auto leading-relaxed mb-5">
            {venue_address}
          </p>
          {google_maps_url && (
            <a
              href={google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#58121a] text-[#fdfbf7] font-telugu text-xs font-semibold tracking-wider hover:bg-[#7c1a29] transition-colors shadow-md border border-[#c59b27]/40"
            >
              <MapPin className="w-4 h-4 text-[#c59b27]" />
              <span>గూగుల్ మ్యాప్స్ దిశలు (GET DIRECTIONS)</span>
            </a>
          )}
        </section>

        {family_members.length > 0 && (
          <section className="px-6 py-8 border-t border-[#c59b27]/20 text-center">
            <h3 className="font-telugu font-bold text-lg text-[#58121a] mb-6">
              ఆహ్వాన సంఘం (Honored Family)
            </h3>
            <div className="space-y-4 max-w-md mx-auto">
              {family_members.map((fm, idx) => (
                <div key={fm.id || idx} className="py-2 border-b border-[#c59b27]/15 last:border-0">
                  <p className="font-telugu text-sm font-bold text-[#58121a]">{fm.name}</p>
                  <p className="font-telugu text-xs text-[#8b6508] mt-0.5">{fm.relation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {gallery_images.length > 0 && (
          <section className="px-6 py-8 border-t border-[#c59b27]/20">
            <h3 className="text-center font-telugu font-bold text-lg text-[#58121a] mb-6">
              చిత్ర మాలిక (Wedding Album)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {gallery_images.map((img, idx) => {
                const key = `gallery_${idx}`;
                return (
                  <div
                    key={img.id || idx}
                    onClick={() => !editable && setActiveImage(img.image_url)}
                    className={`rounded-2xl overflow-hidden border border-[#c59b27]/40 shadow-xs flex items-center justify-center ${
                      idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <MovableImage
                      imageKey={key}
                      src={img.image_url}
                      alt={`Album ${idx + 1}`}
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

        <footer className="px-6 py-10 text-center bg-[#fbf7ef] border-t border-[#c59b27]/20">
          <WhatsAppShare
            groomName={groom_name}
            brideName={bride_name}
            weddingDate={wedding_date}
            venueName={venue_name}
            slug={slug}
          />
        </footer>
      </div>
      <GalleryLightbox imageUrl={activeImage} onClose={() => setActiveImage(null)} />
    </div>
  );
}
