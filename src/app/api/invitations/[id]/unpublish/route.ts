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
    const unpublished = await setInvitationStatus(resolvedParams.id, "DRAFT");
    return NextResponse.json(unpublished);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to unpublish invitation" }, { status: 400 });
  }
}
