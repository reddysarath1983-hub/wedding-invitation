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
    groom_name: "",
    bride_name: "",
    groom_photo: "",
    bride_photo: "",
    couple_photo: "",
    wedding_date: "",
    wedding_time: "",
    venue_name: "",
    venue_address: "",
    google_maps_url: "",
    template_id: "traditional",
    background_music_url: "",
    invitation_text: "",
    status: "DRAFT",
    events: [],
    family_members: [],
    gallery_images: []
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
      const fullUrl = `${window.location.origin}/invite/${created.slug}`;
      alert(`Invitation ${publish ? "published" : "saved as draft"} successfully!\n\nShareable URL:\n${fullUrl}`);
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
