import { v2 as cloudinary } from "cloudinary";

// Global in-memory cache for uploaded images when Cloudinary is not configured
const memoryUploads = new Map<string, { buffer: Buffer; mimeType: string }>();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export async function saveUploadedFile(file: File, origin: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimeType = file.type || "image/jpeg";

  // 1. If Cloudinary configured, upload to Cloudinary
  if (cloudName && apiKey && apiSecret) {
    const base64Data = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64Data}`;

    const res = await cloudinary.uploader.upload(dataUri, {
      folder: "pellipatrika",
    });

    return res.secure_url;
  }

  // 2. Otherwise store in public endpoint serverless buffer
  const fileExt = file.name ? file.name.split(".").pop() || "jpg" : "jpg";
  const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  memoryUploads.set(id, { buffer, mimeType });

  return `${origin}/api/uploads/${id}`;
}

export function getUploadedFile(id: string) {
  return memoryUploads.get(id) || null;
}
