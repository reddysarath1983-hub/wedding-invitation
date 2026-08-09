"use client";

import { useState } from "react";
import { InvitationData, ImageTransform } from "@/types/invitation";
import { Countdown } from "@/components/public/Countdown";
import { WhatsAppShare } from "@/components/public/WhatsAppShare";
import { GalleryLightbox } from "@/components/public/GalleryLightbox";
import { MovableImage } from "@/components/public/MovableImage";
import { formatDate } from "@/lib/utils";
import { MapPin, Calendar, Clock, Crown, Sparkles } from "lucide-react";

interface TemplateProps {
  data: InvitationData;
  editable?: boolean;
  selectedImageKey?: string | null;
  transformsMap?: Record<string, ImageTransform>;
  onSelectImage?: (key: string) => void;
  onTransformChange?: (key: string, transform: ImageTransform) => void;
}

export function RoyalTempleTemplate({
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
    <div className="min-h-screen bg-[#2b080c] text-[#fdfbf7] font-telugu selection:bg-[#e5dec9] selection:text-[#2b080c]">
      <div className="max-w-2xl mx-auto bg-stationery-royal min-h-screen relative overflow-hidden border-x-4 border-[#c59b27]/50 shadow-2xl">
        
        {/* Header */}
        <header className="pt-12 pb-6 px-6 text-center border-b border-[#c59b27]/30 relative">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#c59b27]/20 border-2 border-[#c59b27] flex items-center justify-center text-[#f5d77f] shadow-lg">
            <Crown className="w-7 h-7" />
          </div>
          <span className="inline-block px-5 py-1 rounded-full bg-[#c59b27]/20 border border-[#c59b27]/40 text-[#f5d77f] font-telugu text-xs font-semibold tracking-wider">
            🏛️ శ్రీ లక్ష్మీ వేంకటేశ్వర ప్రసన్న 🏛️
          </span>
          <h2 className="text-2xl font-telugu font-bold text-[#f5d77f] mt-3">
            రాజసంల వివాహ ఆహ్వానం
          </h2>
        </header>

        {/* Hero Section with Movable Image */}
        <section className="px-6 py-8 text-center">
          {couple_photo ? (
            <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-t-full border-4 border-[#c59b27] p-2 shadow-2xl bg-[#2b080c] overflow-hidden mb-6 flex items-center justify-center">
              <MovableImage
                imageKey="couple_photo"
                src={couple_photo}
                alt="Royal Couple Portrait"
                className="w-full h-full object-cover rounded-t-full"
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
                <div className="w-28 h-36 rounded-t-full border-2 border-[#c59b27] p-1 bg-[#2b080c] overflow-hidden shadow-md flex items-center justify-center">
                  <MovableImage
                    imageKey="groom_photo"
                    src={groom_photo}
                    alt={groom_name}
                    className="w-full h-full object-cover rounded-t-full"
                    transform={transformsMap["groom_photo"]}
                    editable={editable}
                    isSelected={selectedImageKey === "groom_photo"}
                    onSelect={onSelectImage}
                    onTransformChange={onTransformChange}
                  />
                </div>
              )}
              {bride_photo && (
                <div className="w-28 h-36 rounded-t-full border-2 border-[#c59b27] p-1 bg-[#2b080c] overflow-hidden shadow-md flex items-center justify-center">
                  <MovableImage
                    imageKey="bride_photo"
                    src={bride_photo}
                    alt={bride_name}
                    className="w-full h-full object-cover rounded-t-full"
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

          <div className="p-6 rounded-3xl bg-[#2b080c]/80 border border-[#c59b27]/40 shadow-xl backdrop-blur-md max-w-md mx-auto">
            <span className="text-[11px] font-luxury uppercase tracking-[0.2em] text-[#f5d77f]">
              WEDDING CEREMONY
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-gold-gradient my-2">
              {groom_name}
            </h1>

            <div className="flex items-center justify-center gap-3 my-2 text-[#c59b27]">
              <Sparkles className="w-4 h-4" />
              <span className="font-script text-2xl text-[#f5d77f]">weds</span>
              <Sparkles className="w-4 h-4" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-telugu text-gold-gradient my-2">
              {bride_name}
            </h1>
          </div>
        </section>

        {/* Message */}
        {invitation_text && (
          <section className="mx-6 my-4 p-6 rounded-3xl bg-[#2b080c]/60 border border-[#c59b27]/30 text-center">
            <p className="font-telugu text-sm sm:text-base leading-relaxed text-[#fdfbf7] whitespace-pre-line">
              {invitation_text}
            </p>
          </section>
        )}

        {/* Date */}
        <section className="py-8 px-6 text-center border-y border-[#c59b27]/30 bg-[#2b080c]/90">
          <span className="text-[11px] font-luxury uppercase tracking-widest text-[#f5d77f]">
            WEDDING DATE & TIME
          </span>

          <div className="my-3">
            <span className="text-5xl sm:text-6xl font-luxury font-bold text-gold-gradient block leading-none">
              {dayNum}
            </span>
            <span className="text-lg font-telugu font-semibold text-[#f5d77f] block mt-1">
              {monthYearStr}
            </span>
            <span className="text-sm font-telugu text-[#e5dec9]/80 block mt-0.5">
              {weekdayStr} • సుముహూర్తం: {wedding_time}
            </span>
          </div>

          <div className="mt-6 pt-4 border-t border-[#c59b27]/20">
            <Countdown weddingDate={wedding_date} weddingTime={wedding_time} accentColor="text-[#f5d77f]" />
          </div>
        </section>

        {/* Events Timeline */}
        {events.length > 0 && (
          <section className="px-6 py-10">
            <div className="text-center mb-8">
              <h3 className="font-telugu font-bold text-xl text-[#f5d77f]">
                రాజకీయ కళ్యాణ వేడుకలు (Royal Schedule)
              </h3>
            </div>

            <div className="relative border-l-2 border-[#c59b27]/50 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {events.map((ev, idx) => (
                <div key={ev.id || idx} className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#4a0e17] border-2 border-[#c59b27] flex items-center justify-center text-[10px] text-[#f5d77f]">
                    👑
                  </div>

                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#c59b27]/20 text-[#f5d77f] font-mono text-[11px] font-semibold mb-1 border border-[#c59b27]/30">
                      {ev.time}
                    </span>
                    <h4 className="font-telugu font-bold text-base text-[#fdfbf7]">
                      {ev.title}
                    </h4>
                    <p className="font-telugu text-xs text-[#f5d77f]/90 mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>{ev.date}</span>
                    </p>
                    <p className="font-telugu text-xs text-[#e5dec9]/80 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>{ev.venue}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Venue */}
        <section className="px-6 py-8 mx-6 my-4 rounded-3xl bg-[#2b080c]/90 border border-[#c59b27]/40 text-center shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#c59b27]/20 border border-[#c59b27] flex items-center justify-center mx-auto mb-3 text-[#f5d77f]">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-telugu font-bold text-lg text-[#f5d77f] mb-1">{venue_name}</h3>
          <p className="font-telugu text-xs text-[#e5dec9]/90 max-w-md mx-auto leading-relaxed mb-5">
            {venue_address}
          </p>

          {google_maps_url && (
            <a
              href={google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c59b27] to-[#8b6508] text-[#2b080c] font-telugu text-xs font-bold tracking-wider hover:from-[#f5d77f] hover:to-[#c59b27] transition-all shadow-lg"
            >
              <MapPin className="w-4 h-4" />
              <span>గూగుల్ మ్యాప్స్ దిశలు (GET DIRECTIONS)</span>
            </a>
          )}
        </section>

        {/* Family */}
        {family_members.length > 0 && (
          <section className="px-6 py-8 border-t border-[#c59b27]/30 text-center">
            <h3 className="font-telugu font-bold text-lg text-[#f5d77f] mb-6">
              ఆహ్వాన సంఘం (Honored Family)
            </h3>
            <div className="space-y-4 max-w-md mx-auto">
              {family_members.map((fm, idx) => (
                <div key={fm.id || idx} className="py-2 border-b border-[#c59b27]/20 last:border-0">
                  <p className="font-telugu text-sm font-bold text-[#fdfbf7]">{fm.name}</p>
                  <p className="font-telugu text-xs text-[#f5d77f]/80 mt-0.5">{fm.relation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {gallery_images.length > 0 && (
          <section className="px-6 py-8 border-t border-[#c59b27]/30">
            <h3 className="text-center font-telugu font-bold text-lg text-[#f5d77f] mb-6">
              రాజకీయ జ్ఞాపకాలు (Royal Gallery)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {gallery_images.map((img, idx) => {
                const key = `gallery_${idx}`;
                return (
                  <div
                    key={img.id || idx}
                    onClick={() => !editable && setActiveImage(img.image_url)}
                    className={`rounded-2xl overflow-hidden border border-[#c59b27]/40 shadow-lg flex items-center justify-center ${
                      idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <MovableImage
                      imageKey={key}
                      src={img.image_url}
                      alt={`Royal Album ${idx + 1}`}
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

        {/* Footer */}
        <footer className="px-6 py-10 text-center bg-[#170305] border-t border-[#c59b27]/30">
          <WhatsAppShare
            groomName={groom_name}
            brideName={bride_name}
            weddingDate={wedding_date}
            venueName={venue_name}
            slug={slug}
            buttonClass="bg-gradient-to-r from-[#c59b27] to-[#8b6508] text-[#2b080c] font-bold"
          />
        </footer>

      </div>

      <GalleryLightbox imageUrl={activeImage} onClose={() => setActiveImage(null)} />
    </div>
  );
}
