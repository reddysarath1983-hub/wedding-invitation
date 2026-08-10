import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateContainer } from "@/components/templates/TemplateContainer";
import { InvitationData } from "@/types/invitation";
import { getInvitationBySlug } from "@/lib/db";

async function getInvitationData(slug: string): Promise<InvitationData | null> {
  try {
    const inv = await getInvitationBySlug(slug);
    return inv;
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

  const title = `${data.groom_name || "Wedding"} & ${data.bride_name || "Invitation"} — PelliPatrika (వివాహ శుభలేఖ)`;
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

  return (
    <div className="relative">
      {data.status === "DRAFT" && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-semibold font-telugu shadow-lg sticky top-0 z-50 flex items-center justify-center gap-2">
          <span>⚠️ ఈ ఆహ్వాన పత్రిక ప్రస్తుతం డ్రాఫ్ట్‌లో ఉంది. అందరికీ షేర్ చేయడానికి అడ్మిన్ డాష్‌బోర్డ్ నుండి 'Publish' చేయండి.</span>
        </div>
      )}
      <TemplateContainer data={data} />
    </div>
  );
}
