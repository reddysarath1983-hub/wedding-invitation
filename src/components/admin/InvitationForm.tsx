"use client";

import { useState } from "react";
import { InvitationData, TemplateId } from "@/types/invitation";
import { TemplateGallerySelector } from "./TemplateGallerySelector";
import { EventsEditor } from "./EventsEditor";
import { FamilyEditor } from "./FamilyEditor";
import { GalleryUploader } from "./GalleryUploader";
import { uploadImage } from "@/lib/api";
import { 
  Heart, Calendar, MapPin, Sparkles, Music, Image as ImageIcon, 
  Users, Save, Send, Loader2, Upload, Link2
} from "lucide-react";

interface InvitationFormProps {
  initialData: Partial<InvitationData>;
  onSave: (data: InvitationData, publish?: boolean) => Promise<void>;
  onPreviewChange: (data: InvitationData) => void;
  isSaving: boolean;
}

export function InvitationForm({ initialData, onSave, onPreviewChange, isSaving }: InvitationFormProps) {
  const [formData, setFormData] = useState<InvitationData>({
    groom_name: initialData.groom_name || "రాహుల్ (Rahul)",
    bride_name: initialData.bride_name || "ప్రియ (Priya)",
    groom_photo: initialData.groom_photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bride_photo: initialData.bride_photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    couple_photo: initialData.couple_photo || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    wedding_date: initialData.wedding_date || "2026-11-20",
    wedding_time: initialData.wedding_time || "10:30 AM",
    venue_name: initialData.venue_name || "శ్రీ వెంకటేశ్వర స్వామి కళ్యాణ మంటపం",
    venue_address: initialData.venue_address || "రోడ్ నెం. 12, బంజారా హిల్స్, హైదరాబాద్, తెలంగాణ - 500034",
    google_maps_url: initialData.google_maps_url || "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
    template_id: (initialData.template_id as TemplateId) || "traditional",
    background_music_url: initialData.background_music_url || "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-11234.mp3",
    invitation_text: initialData.invitation_text || "శ్రీరస్తు శుభమస్తు అభయహస్తు.\nమా ప్రియమైన కుమారుడు రాహుల్ మరియు ప్రియమైన కుమార్తె ప్రియ ల వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.",
    status: initialData.status || "DRAFT",
    slug: initialData.slug || "rahul-priya",
    events: initialData.events && initialData.events.length > 0 ? initialData.events : [
      {
        title: "మాంగల్య ధారణ వివాహ మహోత్సవం (Wedding Ceremony)",
        date: initialData.wedding_date || "2026-11-20",
        time: initialData.wedding_time || "10:30 AM",
        venue: initialData.venue_name || "శ్రీ వెంకటేశ్వర స్వామి కళ్యాణ మంటపం",
        description: "శుభ సుముహూర్తమున లగ్న పత్రిక ప్రకారం వివాహ క్రతువు.",
        display_order: 1
      }
    ],
    family_members: initialData.family_members && initialData.family_members.length > 0 ? initialData.family_members : [
      { name: "శ్రీమతి & శ్రీ (వధువు తల్లిదండ్రులు)", relation: "వధువు తల్లిదండ్రులు", side: "bride", display_order: 1 },
      { name: "శ్రీమతి & శ్రీ (వరుడి తల్లిదండ్రులు)", relation: "వరుడి తల్లిదండ్రులు", side: "groom", display_order: 2 }
    ],
    gallery_images: initialData.gallery_images && initialData.gallery_images.length > 0 ? initialData.gallery_images : [
      { image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", display_order: 1 },
      { image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", display_order: 2 }
    ]
  });

  const [uploadingGroom, setUploadingGroom] = useState(false);
  const [uploadingBride, setUploadingBride] = useState(false);
  const [uploadingCouple, setUploadingCouple] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);

  const updateField = (field: keyof InvitationData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onPreviewChange(updated);
  };

  const handlePrefixInsert = (field: "groom_name" | "bride_name", prefix: string) => {
    const currentValue = formData[field];
    if (!currentValue.startsWith(prefix)) {
      updateField(field, `${prefix} ${currentValue}`);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: "groom_photo" | "bride_photo" | "couple_photo") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (targetField === "groom_photo") setUploadingGroom(true);
    if (targetField === "bride_photo") setUploadingBride(true);
    if (targetField === "couple_photo") setUploadingCouple(true);

    try {
      const url = await uploadImage(file);
      updateField(targetField, url);
    } catch (err: any) {
      alert(err.message || "Failed to upload photo");
    } finally {
      setUploadingGroom(false);
      setUploadingBride(false);
      setUploadingCouple(false);
      e.target.value = "";
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAudio(true);
    try {
      const url = await uploadImage(file);
      updateField("background_music_url", url);
    } catch (err: any) {
      alert(err.message || "Failed to upload audio file");
    } finally {
      setUploadingAudio(false);
      e.target.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    const finalStatus = publish ? "PUBLISHED" : formData.status;
    onSave({ ...formData, status: finalStatus }, publish);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 pb-12">
      {/* Action Bar Header */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md py-3 border-b border-slate-800 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400">
            {formData.status}
          </span>
          <h2 className="text-lg font-bold text-slate-100 font-telugu">
            {formData.groom_name || "Groom"} 💍 {formData.bride_name || "Bride"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs transition-colors flex items-center gap-1.5 border border-amber-500/30"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Publish Invitation</span>
          </button>
        </div>
      </div>

      {/* SECTION 1 — COUPLE & CUSTOM URL SLUG */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <h3 className="text-base font-bold text-slate-100 font-telugu">
            1. వధూవరుల వివరాలు & లింక్ (Couple Info & Custom Web Link)
          </h3>
        </div>

        {/* Custom Slug Box */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/30">
          <label className="block text-xs font-semibold text-amber-300 font-telugu mb-1 flex items-center gap-1">
            <Link2 className="w-4 h-4 text-amber-400" />
            <span>ప్రత్యేక ఆహ్వాన Web లింక్ (Custom Web Link Slug)</span>
          </label>
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 font-mono text-xs">
            <span className="text-slate-400">/invite/</span>
            <input
              type="text"
              value={formData.slug || ""}
              onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
              placeholder="e.g. rahul-priya or surya-anu"
              className="flex-1 bg-transparent text-amber-300 font-bold focus:outline-none placeholder-slate-600"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">
            మీ శ్రేయోభిలాషులకు షేర్ చేయడానికి ఇది మీ ఆహ్వాన పత్రిక ప్రత్యేక లింక్ (e.g. rahul-priya, surya-anu).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300 font-telugu">
                వరుడి పేరు (Groom Name) *
              </label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handlePrefixInsert("groom_name", "చి.")}
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-amber-300 font-telugu hover:bg-slate-700"
                >
                  + చి.
                </button>
                <button
                  type="button"
                  onClick={() => handlePrefixInsert("groom_name", "శ్రీ")}
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-amber-300 font-telugu hover:bg-slate-700"
                >
                  + శ్రీ
                </button>
              </div>
            </div>
            <input
              type="text"
              required
              value={formData.groom_name}
              onChange={(e) => updateField("groom_name", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-telugu focus:outline-none focus:border-amber-500"
              placeholder="e.g. చి. సూర్య (Chi. Surya)"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300 font-telugu">
                వధువు పేరు (Bride Name) *
              </label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handlePrefixInsert("bride_name", "చి.ల.సౌ.")}
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-amber-300 font-telugu hover:bg-slate-700"
                >
                  + చి.ల.సౌ.
                </button>
                <button
                  type="button"
                  onClick={() => handlePrefixInsert("bride_name", "శ్రీమతి")}
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-amber-300 font-telugu hover:bg-slate-700"
                >
                  + శ్రీమతి
                </button>
              </div>
            </div>
            <input
              type="text"
              required
              value={formData.bride_name}
              onChange={(e) => updateField("bride_name", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-telugu focus:outline-none focus:border-amber-500"
              placeholder="e.g. చి.ల.సౌ. జ్యోతిక (Chi. La. Sow. Jyothika)"
            />
          </div>
        </div>

        {/* Photos Uploads */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Groom Photo */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 font-telugu mb-1">
              వరుడి ఫోటో (Groom Photo)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.groom_photo || ""}
                onChange={(e) => updateField("groom_photo", e.target.value)}
                placeholder="Image URL"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <label className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 cursor-pointer">
                {uploadingGroom ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, "groom_photo")}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Bride Photo */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 font-telugu mb-1">
              వధువు ఫోటో (Bride Photo)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.bride_photo || ""}
                onChange={(e) => updateField("bride_photo", e.target.value)}
                placeholder="Image URL"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <label className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 cursor-pointer">
                {uploadingBride ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, "bride_photo")}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Couple Photo */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 font-telugu mb-1">
              జంట ఫోటో (Couple Hero Photo)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.couple_photo || ""}
                onChange={(e) => updateField("couple_photo", e.target.value)}
                placeholder="Hero Image URL"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <label className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 cursor-pointer">
                {uploadingCouple ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, "couple_photo")}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WEDDING DETAILS */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Calendar className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100 font-telugu">
            2. వివాహ సమయం & కళ్యాణ వేదిక (Wedding Date & Venue)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 font-telugu mb-1">
              వివాహ తేదీ (Wedding Date) *
            </label>
            <input
              type="date"
              required
              value={formData.wedding_date}
              onChange={(e) => updateField("wedding_date", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 font-telugu mb-1">
              సుముహూర్తం సమయం (Wedding Time) *
            </label>
            <input
              type="text"
              required
              value={formData.wedding_time}
              onChange={(e) => updateField("wedding_time", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              placeholder="e.g. 10:30 AM (సుముహూర్తం)"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 font-telugu mb-1">
            కళ్యాణ వేదిక పేరు (Venue Name) *
          </label>
          <input
            type="text"
            required
            value={formData.venue_name}
            onChange={(e) => updateField("venue_name", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-telugu focus:outline-none focus:border-amber-500"
            placeholder="e.g. శ్రీ వెంకటేశ్వర స్వామి కళ్యాణ మంటపం"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 font-telugu mb-1">
            చిరునామా (Venue Address) *
          </label>
          <textarea
            rows={2}
            required
            value={formData.venue_address}
            onChange={(e) => updateField("venue_address", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-telugu focus:outline-none focus:border-amber-500"
            placeholder="e.g. రోడ్ నెం. 12, బంజారా హిల్స్, హైదరాబాద్"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Google Maps Link (Optional)
          </label>
          <input
            type="url"
            value={formData.google_maps_url || ""}
            onChange={(e) => updateField("google_maps_url", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            placeholder="https://maps.google.com/?q=..."
          />
        </div>
      </section>

      {/* SECTION 3 — TELUGU INVITATION MESSAGE */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100 font-telugu">
            3. ఆహ్వాన వాక్యాలు (Invitation Text & Wording)
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 font-telugu mb-1">
            తెలుగు శుభలేఖ వాక్యములు (Editable Telugu Invitation Text)
          </label>
          <textarea
            rows={4}
            value={formData.invitation_text || ""}
            onChange={(e) => updateField("invitation_text", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-telugu leading-relaxed focus:outline-none focus:border-amber-500"
            placeholder="శ్రీరస్తు శుభమస్తు..."
          />
        </div>
      </section>

      {/* SECTION 4 — EVENTS */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Calendar className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100 font-telugu">
            4. వివాహ శుభకార్యములు (Events List)
          </h3>
        </div>
        <EventsEditor
          events={formData.events}
          onChange={(events) => updateField("events", events)}
        />
      </section>

      {/* SECTION 5 — FAMILY */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Users className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100 font-telugu">
            5. ఆహ్వాన సంఘం & బంధుమిత్రులు (Family & Relatives)
          </h3>
        </div>
        <FamilyEditor
          familyMembers={formData.family_members}
          onChange={(members) => updateField("family_members", members)}
        />
      </section>

      {/* SECTION 6 — GALLERY */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <ImageIcon className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100 font-telugu">
            6. చిత్ర మాలిక (Photo Gallery)
          </h3>
        </div>
        <GalleryUploader
          images={formData.gallery_images}
          onChange={(images) => updateField("gallery_images", images)}
        />
      </section>

      {/* SECTION 7 — MUSIC */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Music className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100 font-telugu">
            7. నేపథ్య సంగీతం (Background Music)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="url"
            value={formData.background_music_url || ""}
            onChange={(e) => updateField("background_music_url", e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            placeholder="Audio File URL (.mp3)"
          />
          <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs cursor-pointer flex items-center gap-1.5">
            {uploadingAudio ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>Upload Audio</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
            />
          </label>
        </div>
      </section>

      {/* SECTION 8 — 20 TEMPLATES GALLERY SELECTOR */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100 font-telugu">
              8. 20 తెలుగు డిజైన్ల గ్యాలరీ (Select from 20 Telugu Templates)
            </h3>
          </div>
        </div>

        <TemplateGallerySelector
          selectedTemplateId={formData.template_id}
          onSelectTemplate={(id) => updateField("template_id", id)}
        />
      </section>
    </form>
  );
}
