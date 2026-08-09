import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateContainer } from "@/components/templates/TemplateContainer";
import { InvitationData } from "@/types/invitation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

async function getInvitationData(slug: string): Promise<InvitationData | null> {
  try {
    const res = await fetch(`${API_BASE}/invitations/public/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getInvitationData(resolvedParams.slug);
  if (!data) {
    return {
      title: "Invitation Not Found — PelliPatrika",
    };
  }

  const title = `${data.groom_name} & ${data.bride_name} — Wedding Invitation (వివాహ శుభలేఖ)`;
  const description = `మా వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి వధూవరులను ఆశీర్వదించవలసిందిగా కోరుచున్నాము. Wedding Date: ${data.wedding_date} at ${data.venue_name}.`;
  const image = data.couple_photo || data.groom_photo || data.bride_photo || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function PublicInvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getInvitationData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return <TemplateContainer data={data} />;
}
