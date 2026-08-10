import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { setInvitationStatus } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const published = await setInvitationStatus(resolvedParams.id, "PUBLISHED");
    return NextResponse.json(published);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to publish invitation" }, { status: 400 });
  }
}
