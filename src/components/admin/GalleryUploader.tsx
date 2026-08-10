"use client";

import { useState } from "react";
import { GalleryImageItem } from "@/types/invitation";
import { uploadImage } from "@/lib/api";
import { Upload, Trash2, Image as ImageIcon, Loader2, Link as LinkIcon, MoveUp, MoveDown } from "lucide-react";

interface GalleryUploaderProps {
  images: GalleryImageItem[];
  onChange: (images: GalleryImageItem[]) => void;
}

export function GalleryUploader({ images, onChange }: GalleryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const newImages: GalleryImageItem[] = [...images];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i]);
        newImages.push({
          image_url: url,
          display_order: newImages.length + 1
        });
      }
      onChange(newImages);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    onChange([
      ...images,
      {
        image_url: urlInput.trim(),
        display_order: images.length + 1
      }
    ]);
    setUrlInput("");
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === images.length - 1)) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div className="p-6 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/50 text-center hover:border-amber-500/50 transition-colors">
        <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-slate-200">Upload Gallery Photos</p>
        <p className="text-xs text-slate-400 mt-1 mb-4">PNG, JPG, WEBP up to 10MB each</p>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs cursor-pointer shadow-md transition-colors">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <span>{uploading ? "Uploading photos..." : "Choose Files"}</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Or Paste URL */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Or paste image URL (https://...)"
          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
        />
        <button
          type="button"
          onClick={handleAddUrl}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold flex items-center gap-1.5"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Add URL</span>
        </button>
      </div>

      {error && <p className="text-xs text-rose-400">{error}</p>}

      {/* Gallery Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-800 group bg-slate-950">
              <img src={img.image_url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-full bg-slate-800 text-amber-300 disabled:opacity-30"
                  title="Move Left"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === images.length - 1}
                  className="p-1.5 rounded-full bg-slate-800 text-amber-300 disabled:opacity-30"
                  title="Move Right"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 rounded-full bg-rose-600 text-white"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
