import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { duplicateInvitation } from "@/lib/db";

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
    const duplicated = await duplicateInvitation(resolvedParams.id);
    return NextResponse.json(duplicated);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to duplicate invitation" }, { status: 400 });
  }
}
