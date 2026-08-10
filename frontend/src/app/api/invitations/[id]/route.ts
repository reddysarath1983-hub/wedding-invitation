import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { getInvitationById, updateInvitation, deleteInvitation } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const resolvedParams = await params;
  const invitation = await getInvitationById(resolvedParams.id);
  if (!invitation) {
    return NextResponse.json({ detail: "Invitation not found" }, { status: 404 });
  }

  return NextResponse.json(invitation);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const body = await req.json();
    const updated = await updateInvitation(resolvedParams.id, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to update invitation" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const resolvedParams = await params;
  const success = await deleteInvitation(resolvedParams.id);
  if (!success) {
    return NextResponse.json({ detail: "Invitation not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
