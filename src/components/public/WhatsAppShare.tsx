"use client";

import { Share2, Heart } from "lucide-react";
import { formatDate, getCanonicalShareUrl } from "@/lib/utils";

interface WhatsAppShareProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  venueName: string;
  slug?: string;
  buttonClass?: string;
}

export function WhatsAppShare({ 
  groomName, 
  brideName, 
  weddingDate, 
  venueName, 
  slug,
  buttonClass = "bg-[#58121a] hover:bg-[#7c1a29] text-[#fdfbf7] border border-[#c59b27]/40"
}: WhatsAppShareProps) {
  const handleShare = () => {
    const publicUrl = slug ? getCanonicalShareUrl(slug) : (typeof window !== "undefined" ? window.location.href : "");
    
    const formattedDate = formatDate(weddingDate);
    const message = `🌸 *వివాహ ఆహ్వాన పత్రిక (Wedding Invitation)* 🌸\n\n*${groomName}* 💍 *${brideName}*\n\n📅 *తేదీ (Date):* ${formattedDate}\n📍 *స్థలం (Venue):* ${venueName}\n\nమా వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి మమ్మల్ని ఆశీర్వదించగలరు!\n\n👇 క్రింది లింక్ ద్వారా పూర్తి డిజిటల్ ఆహ్వాన పత్రికను వీక్షించండి:\n${publicUrl}`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-center text-center my-6">
      <p className="font-telugu text-sm font-semibold text-[#8b6508] mb-1">
        మీ రాకతో మా ఆనందం మరింత రెట్టింపవుతుంది
      </p>
      <div className="flex items-center justify-center gap-1.5 font-telugu text-xs text-[#8b6508]/80 mb-4">
        <span>{groomName}</span>
        <Heart className="w-3 h-3 text-[#8b1220] fill-[#8b1220]" />
        <span>{brideName}</span>
      </div>

      <button
        onClick={handleShare}
        className={`px-8 py-3.5 rounded-full font-telugu text-xs font-semibold tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 ${buttonClass}`}
      >
        <Share2 className="w-4 h-4 text-[#c59b27]" />
        <span>వాట్సాప్‌లో షేర్ చేయండి (SHARE INVITATION)</span>
      </button>
    </div>
  );
}
