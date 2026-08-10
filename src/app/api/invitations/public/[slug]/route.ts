import { NextRequest, NextResponse } from "next/server";
import { getInvitationBySlug } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const invitation = await getInvitationBySlug(slug);

  if (!invitation || invitation.status !== "PUBLISHED") {
    return NextResponse.json(
      { detail: "Invitation not found or not published" },
      { status: 404 }
    );
  }

  return NextResponse.json(invitation);
}
