import { Metadata } from "next";
import { TemplateContainer } from "@/components/templates/TemplateContainer";
import { InvitationData } from "@/types/invitation";
import { getInvitationBySlug, cleanSlug, DEFAULT_DEMO_INVITATION } from "@/lib/db";

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  return [
    { slug: "skr-srk" },
    { slug: "rahul-priya" },
  ];
}

async function safeResolveSlug(params: any): Promise<string> {
  if (!params) return "skr-srk";
  try {
    const resolved = await Promise.resolve(params);
    return resolved?.slug || "skr-srk";
  } catch {
    return "skr-srk";
  }
}

async function getInvitationData(slug: string): Promise<InvitationData> {
  const sanitized = cleanSlug(slug);
  try {
    const inv = await getInvitationBySlug(slug);
    if (inv) return inv;
  } catch (err) {
    console.error("Error loading invitation data:", err);
  }

  return {
    ...DEFAULT_DEMO_INVITATION,
    id: `dyn-${sanitized || "skr-srk"}`,
    slug: sanitized || "skr-srk",
    status: "PUBLISHED",
  };
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const slug = await safeResolveSlug(params);
  const data = await getInvitationData(slug);

  const groomName = data.groom_name || "Groom";
  const brideName = data.bride_name || "Bride";
  const title = `${groomName} & ${brideName} — Wedding Invitation (వివాహ శుభలేఖ)`;
  const description = `మా వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి వధూవరులను ఆశీర్వదించవలసిందిగా కోరుచున్నాము. Wedding Date: ${data.wedding_date} at ${data.venue_name}.`;

  let shareImage = data.couple_photo || data.groom_photo || data.bride_photo || "";
  if (!shareImage || !shareImage.startsWith("http")) {
    shareImage = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80";
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: `${groomName} & ${brideName} Wedding Invitation`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export default async function PublicInvitationPage({ params }: { params: any }) {
  const slug = await safeResolveSlug(params);
  let data: InvitationData;

  try {
    data = await getInvitationData(slug);
  } catch {
    data = {
      ...DEFAULT_DEMO_INVITATION,
      id: `fallback-${cleanSlug(slug)}`,
      slug: cleanSlug(slug) || "skr-srk",
      status: "PUBLISHED",
    };
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
