import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getAuthAdmin } from "@/lib/auth";

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

export async function POST(req: NextRequest) {
  const admin = await getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ detail: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary if configured
    if (cloudName && apiKey && apiSecret) {
      const base64Data = buffer.toString("base64");
      const mimeType = file.type || "image/jpeg";
      const dataUri = `data:${mimeType};base64,${base64Data}`;

      const res = await cloudinary.uploader.upload(dataUri, {
        folder: "pellipatrika",
      });

      return NextResponse.json({ url: res.secure_url });
    }

    // Fallback: Convert to Data URL for instant serverless availability without external storage
    const mimeType = file.type || "image/jpeg";
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({ url: dataUrl });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Upload failed" }, { status: 500 });
  }
}
