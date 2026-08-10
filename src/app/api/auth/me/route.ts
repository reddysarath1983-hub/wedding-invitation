import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const admin = await getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json(admin);
}
