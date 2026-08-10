"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { fetchInvitationById, updateInvitation, isAuthenticated } from "@/lib/api";
import { InvitationData, ImageTransform } from "@/types/invitation";
import { InvitationForm } from "@/components/admin/InvitationForm";
import { LivePreview } from "@/components/admin/LivePreview";
import { ArrowLeft, Loader2, ExternalLink, Eye, Edit3 } from "lucide-react";

export default function EditInvitationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      router.replace("/login");
      return;
    }

    if (id) {
      fetchInvitationById(id)
        .then((data) => {
          setInvitationData(data);
        })
        .catch((err) => {
          alert("Failed to load invitation: " + err.message);
          router.push("/dashboard");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, router]);

  const handleTransformChange = (imageKey: string, updated: ImageTransform) => {
    setInvitationData((prev) => {
      if (!prev) return prev;
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
    if (!id) return;
    setIsSaving(true);
    try {
      const updated = await updateInvitation(id, { ...data, status: publish ? "PUBLISHED" : data.status });
      setInvitationData(updated);
      alert(`Invitation updated successfully! Public URL remains: /invite/${updated.slug}`);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Failed to update invitation");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !invitationData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400 mb-2" />
        <span className="font-telugu text-sm">ఆహ్వాన పత్రిక వివరాలు లోడ్ అవుతున్నాయి...</span>
      </div>
    );
  }

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
                ఆహ్వాన పత్రిక సవరణ (Edit Invitation)
              </h1>
              <p className="text-xs text-amber-400">
                Slug: <span className="font-mono text-slate-300">/invite/{invitationData.slug}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {invitationData.status === "PUBLISHED" && (
              <a
                href={`/invite/${invitationData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5"
              >
                <span>View Public URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Mobile Switcher */}
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
                <span>Canvas</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className={`lg:col-span-7 ${activeTab === "form" ? "block" : "hidden lg:block"}`}>
            <InvitationForm
              initialData={invitationData}
              onSave={handleSave}
              onPreviewChange={(updated) => setInvitationData(updated)}
              isSaving={isSaving}
            />
          </div>

          {/* Live Preview Frame with Canva Control */}
          <div className={`lg:col-span-5 lg:sticky lg:top-20 h-[calc(100vh-100px)] ${activeTab === "preview" ? "block" : "hidden lg:block"}`}>
            <LivePreview
              data={invitationData}
              editable={true}
              onTransformChange={handleTransformChange}
            />
          </div>

        </div>
      </main>
    </div>
  );
}
