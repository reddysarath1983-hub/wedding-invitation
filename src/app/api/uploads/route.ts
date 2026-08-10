import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/uploads";

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

    let origin = req.nextUrl.origin;
    if (origin.includes("-git-") && origin.includes(".vercel.app")) {
      origin = origin.replace(/-git-[^.]+\.vercel\.app$/, ".vercel.app");
    }

    const url = await saveUploadedFile(file, origin);
    return NextResponse.json({ url });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Upload failed" }, { status: 500 });
  }
}
