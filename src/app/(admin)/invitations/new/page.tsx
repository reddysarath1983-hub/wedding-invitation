"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createInvitation, isAuthenticated } from "@/lib/api";
import { InvitationData, ImageTransform } from "@/types/invitation";
import { InvitationForm } from "@/components/admin/InvitationForm";
import { LivePreview } from "@/components/admin/LivePreview";
import { ArrowLeft, Edit3, Eye } from "lucide-react";

export default function CreateInvitationPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  const [previewData, setPreviewData] = useState<InvitationData>({
    groom_name: "రాహుల్ (Rahul)",
    bride_name: "ప్రియ (Priya)",
    groom_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bride_photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    couple_photo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    wedding_date: "2026-11-20",
    wedding_time: "10:30 AM",
    venue_name: "శ్రీ వెంకటేశ్వర స్వామి కళ్యాణ మంటపం",
    venue_address: "రోడ్ నెం. 12, బంజారా హిల్స్, హైదరాబాద్, తెలంగాణ - 500034",
    google_maps_url: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
    template_id: "traditional",
    background_music_url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-11234.mp3",
    invitation_text: "శ్రీరస్తు శుభమస్తు అభయహస్తు.\nమా ప్రియమైన కుమారుడు రాహుల్ మరియు ప్రియమైన కుమార్తె ప్రియ ల వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.",
    status: "DRAFT",
    events: [
      {
        title: "మాంగల్య ధారణ వివాహ మహోత్సవం (Wedding Ceremony)",
        date: "2026-11-20",
        time: "10:30 AM",
        venue: "శ్రీ వెంకటేశ్వర స్వామి కళ్యాణ మంటపం",
        description: "శుభ సుముహూర్తమున లగ్న పత్రిక ప్రకారం వివాహ క్రతువు.",
        display_order: 1
      }
    ],
    family_members: [
      { name: "శ్రీమతి & శ్రీ (వధువు తల్లిదండ్రులు)", relation: "వధువు తల్లిదండ్రులు", side: "bride", display_order: 1 },
      { name: "శ్రీమతి & శ్రీ (వరుడి తల్లిదండ్రులు)", relation: "వరుడి తల్లిదండ్రులు", side: "groom", display_order: 2 }
    ],
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", display_order: 1 },
      { image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", display_order: 2 }
    ]
  });

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  const handleTransformChange = (imageKey: string, updated: ImageTransform) => {
    setPreviewData((prev) => {
      let currentMap: Record<string, ImageTransform> = {};
      if (typeof prev.image_transforms === "string") {
        try { currentMap = JSON.parse(prev.image_transforms); } catch {}
      } else if (prev.image_transforms) {
        currentMap = { ...prev.image_transforms };
      }
      currentMap[imageKey] = updated;
      return {
        ...prev,
        image_transforms: JSON.stringify(currentMap)
      };
    });
  };

  const handleSave = async (data: InvitationData, publish: boolean = false) => {
    setIsSaving(true);
    try {
      const created = await createInvitation({ ...data, status: publish ? "PUBLISHED" : "DRAFT" });
      alert(`Invitation ${publish ? "published" : "saved as draft"} successfully! Public URL: /invite/${created.slug}`);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Failed to create invitation");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-bold text-base text-slate-100 font-telugu">
                కొత్త వివాహ ఆహ్వాన పత్రిక సృష్టించండి (Create New Invitation)
              </h1>
              <p className="text-xs text-amber-400">PelliPatrika Admin Creator</p>
            </div>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="flex lg:hidden items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("form")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                activeTab === "form" ? "bg-amber-500 text-slate-950" : "text-slate-400"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Form</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                activeTab === "preview" ? "bg-amber-500 text-slate-950" : "text-slate-400"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Canvas</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container: Split Screen on Desktop */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className={`lg:col-span-7 ${activeTab === "form" ? "block" : "hidden lg:block"}`}>
            <InvitationForm
              initialData={previewData}
              onSave={handleSave}
              onPreviewChange={(updated) => setPreviewData(updated)}
              isSaving={isSaving}
            />
          </div>

          {/* Right Column: Live Canva Preview Frame */}
          <div className={`lg:col-span-5 lg:sticky lg:top-20 h-[calc(100vh-100px)] ${activeTab === "preview" ? "block" : "hidden lg:block"}`}>
            <LivePreview
              data={previewData}
              editable={true}
              onTransformChange={handleTransformChange}
            />
          </div>

        </div>
      </main>
    </div>
  );
}
