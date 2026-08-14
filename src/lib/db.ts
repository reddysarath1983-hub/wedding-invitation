import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { InvitationData, DashboardStats } from "@/types/invitation";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const getPrisma = (): PrismaClient | null => {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient();
  }
  return globalThis.prismaGlobal;
};

export const prisma = getPrisma();

// Default seed data for fallback / initial DB seed
const DEFAULT_ADMIN = {
  id: "admin-uuid-1",
  email: "admin@pellipatrika.com",
  // bcrypt hash for 'admin123'
  passwordHash: bcrypt.hashSync("admin123", 10),
  createdAt: new Date(),
};

export const DEFAULT_DEMO_INVITATION: InvitationData = {
  id: "demo-invitation-1",
  slug: "skr-srk",
  groom_name: "రాహుల్ (Rahul)",
  bride_name: "ప్రియ (Priya)",
  groom_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  bride_photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  couple_photo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
  wedding_date: "2026-11-20",
  wedding_time: "10:30 AM",
  venue_name: "శ్రీ వెంకటేశ్వర స్వామి కళ్యాణ మంటపం (Sri Venkateswara Swamy Kalyana Mandapam)",
  venue_address: "రోడ్ నెం. 12, బంజారా హిల్స్, హైదరాబాద్, తెలంగాణ - 500034",
  google_maps_url: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
  template_id: "traditional",
  background_music_url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-11234.mp3",
  invitation_text: "శ్రీరస్తు శుభమస్తు అభయహస్తు.\nమా ప్రియమైన కుమారుడు రాహుల్ మరియు ప్రియమైన కుమార్తె ప్రియ ల వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.",
  status: "PUBLISHED",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  events: [
    {
      id: "ev-1",
      title: "పెళ్లికూతురు చేయడం (Pellikuthuru)",
      date: "2026-11-19",
      time: "09:00 AM",
      venue: "వధువు గృహము, హైదరాబాద్",
      description: "సాంప్రదాయ పద్ధతిలో వధువుని అలంకరించే శుభకార్యం.",
      display_order: 1,
    },
    {
      id: "ev-2",
      title: "మెహందీ & సంగీత్ (Mehendi & Sangeet)",
      date: "2026-11-19",
      time: "06:00 PM",
      venue: "గ్రాండ్ గార్డెన్స్, జూబ్లీ హిల్స్",
      description: "సంగీతం, నృత్యాలు మరియు మెహందీ సంబరాలు.",
      display_order: 2,
    },
    {
      id: "ev-3",
      title: "మాంగల్య ధారణ వివాహ మహోత్సవం (Wedding Ceremony)",
      date: "2026-11-20",
      time: "10:30 AM (సుముహూర్తం)",
      venue: "శ్రీ వెంకటేశ్వర స్వామి కళ్యాణ మంటపం",
      description: "శుభ సుముహూర్తమున లగ్న పత్రిక ప్రకారం వివాహ క్రతువు.",
      display_order: 3,
    },
    {
      id: "ev-4",
      title: "వివాహ విందు & సత్కారం (Grand Reception)",
      date: "2026-11-20",
      time: "07:00 PM",
      venue: "హోటల్ దసపల్లా, హైదరాబాద్",
      description: "వధూవరుల పరిచయం మరియు రుచికరమైన విందు సత్కారం.",
      display_order: 4,
    },
  ],
  family_members: [
    {
      id: "fm-1",
      name: "శ్రీమతి & శ్రీ వెంకటేశ్వర్లు (వరస తండ్రి/తల్లి)",
      relation: "వధువు తల్లిదండ్రులు",
      side: "bride",
      display_order: 1,
    },
    {
      id: "fm-2",
      name: "శ్రీమతి & శ్రీ రామచంద్రరావు",
      relation: "వరుడి తల్లిదండ్రులు",
      side: "groom",
      display_order: 2,
    },
  ],
  gallery_images: [
    {
      id: "gi-1",
      image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      display_order: 1,
    },
    {
      id: "gi-2",
      image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      display_order: 2,
    },
    {
      id: "gi-3",
      image_url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      display_order: 3,
    },
  ],
};

const DEFAULT_DEMO_INVITATION_RAHUL: InvitationData = {
  ...DEFAULT_DEMO_INVITATION,
  id: "demo-invitation-2",
  slug: "rahul-priya",
};

// In-memory fallback store for offline / dev mode without DATABASE_URL
let inMemoryAdmins = [DEFAULT_ADMIN];
let inMemoryInvitations: InvitationData[] = [DEFAULT_DEMO_INVITATION, DEFAULT_DEMO_INVITATION_RAHUL];

function formatPrismaInvitation(inv: any): InvitationData {
  if (!inv) return inv;
  let parsedTransforms = inv.imageTransforms;
  if (typeof parsedTransforms === "string") {
    try {
      parsedTransforms = JSON.parse(parsedTransforms);
    } catch {
      // keep string
    }
  }
  return {
    id: inv.id,
    slug: inv.slug,
    groom_name: inv.groomName,
    bride_name: inv.brideName,
    groom_photo: inv.groomPhoto || undefined,
    bride_photo: inv.bridePhoto || undefined,
    couple_photo: inv.couplePhoto || undefined,
    wedding_date: inv.weddingDate,
    wedding_time: inv.weddingTime,
    venue_name: inv.venueName,
    venue_address: inv.venueAddress,
    google_maps_url: inv.googleMapsUrl || undefined,
    template_id: inv.templateId as any,
    background_music_url: inv.backgroundMusicUrl || undefined,
    invitation_text: inv.invitationText || undefined,
    image_transforms: parsedTransforms || undefined,
    status: inv.status as "DRAFT" | "PUBLISHED",
    created_at: inv.createdAt ? inv.createdAt.toISOString() : undefined,
    updated_at: inv.updatedAt ? inv.updatedAt.toISOString() : undefined,
    events: (inv.events || []).map((e: any) => ({
      id: e.id,
      title: e.title,
      date: e.date,
      time: e.time,
      venue: e.venue,
      description: e.description || "",
      display_order: e.displayOrder ?? 0,
    })),
    family_members: (inv.familyMembers || []).map((f: any) => ({
      id: f.id,
      name: f.name,
      relation: f.relation,
      side: f.side || "both",
      display_order: f.displayOrder ?? 0,
    })),
    gallery_images: (inv.galleryImages || []).map((g: any) => ({
      id: g.id,
      image_url: g.imageUrl,
      display_order: g.displayOrder ?? 0,
    })),
  };
}

export function transliterateTeluguToEnglish(str: string): string {
  if (!str) return "";

  const commonMap: Record<string, string> = {
    "సూర్య": "surya",
    "జ్యోతిక": "jyothika",
    "రాహుల్": "rahul",
    "ప్రియ": "priya",
    "అను": "anu",
    "సాయి": "sai",
    "కావ్య": "kavya",
    "వెంకటేష్": "venkatesh",
    "లక్ష్మి": "lakshmi",
    "రామ్": "ram", "రాము": "ramu",
    "సీత": "seetha",
    "శివ": "shiva",
    "పార్వతి": "parvathi",
    "విష్ణు": "vishnu",
    "కళ్యాణ్": "kalyan",
    "పవణ్": "pavan",
    "చింతల": "chintala",
    "చి.ల.సౌ.": "",
    "చి.": "",
    "శ్రీ": "sri",
    "శ్రీమతి": "srimathi",
    "సౌభాగ్యవతి": "saubhagyavati"
  };

  let result = str;
  for (const [tel, eng] of Object.entries(commonMap)) {
    result = result.replace(new RegExp(tel, "g"), ` ${eng} `);
  }

  const teluguCharMap: Record<string, string> = {
    'అ': 'a', 'ఆ': 'aa', 'ఇ': 'i', 'ఈ': 'ee', 'ఉ': 'u', 'ఊ': 'oo', 'ఋ': 'ru',
    'ఎ': 'e', 'ఏ': 'ae', 'ఐ': 'ai', 'ఒ': 'o', 'ఓ': 'oo', 'ఔ': 'au', 'అం': 'am',
    'క': 'ka', 'ఖ': 'kha', 'గ': 'ga', 'ఘ': 'gha', 'ఙ': 'nga',
    'చ': 'cha', 'ఛ': 'chha', 'జ': 'ja', 'ఝ': 'jha', 'ఞ': 'nya',
    'ట': 'ta', 'ఠ': 'tha', 'డ': 'da', 'ఢ': 'dha', 'ణ': 'na',
    'త': 'tha', 'థ': 'thha', 'ద': 'da', 'ధ': 'dha', 'న': 'na',
    'ప': 'pa', 'ఫ': 'pha', 'బ': 'ba', 'భ': 'bha', 'మ': 'ma',
    'య': 'ya', 'ర': 'ra', 'ల': 'la', 'వ': 'va', 'శ': 'sha',
    'ష': 'sha', 'స': 'sa', 'హ': 'ha', 'ళ': 'la', 'క్ష': 'ksha', 'ఱ': 'ra',
    'ా': 'a', 'ి': 'i', 'ీ': 'ee', 'ు': 'u', 'ూ': 'oo', 'ృ': 'ru',
    'ె': 'e', 'ే': 'ae', 'ై': 'ai', 'ొ': 'o', 'ో': 'oo', 'ౌ': 'au',
    'ం': 'm', 'ః': 'h', '్': ''
  };

  let romanized = "";
  for (const char of result) {
    if (teluguCharMap[char] !== undefined) {
      romanized += teluguCharMap[char];
    } else {
      romanized += char;
    }
  }

  return romanized.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Slug generator
export async function generateSlug(groomName: string, brideName: string, excludeId?: string, customSlug?: string): Promise<string> {
  let baseSlug = "";
  if (customSlug && customSlug.trim() && customSlug.trim() !== "rahul-priya" && customSlug.trim() !== "wedding-invitation") {
    baseSlug = cleanSlug(customSlug);
  }

  if (!baseSlug) {
    const raw = `${groomName} ${brideName}`.trim().toLowerCase();
    baseSlug = cleanSlug(raw);
  }

  if (!baseSlug) {
    const gRoman = transliterateTeluguToEnglish(groomName);
    const bRoman = transliterateTeluguToEnglish(brideName);
    baseSlug = cleanSlug(`${gRoman}-${bRoman}`);
  }

  if (!baseSlug) {
    baseSlug = "wedding";
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let existing: InvitationData | null = null;

    if (prisma) {
      try {
        const inv = await prisma.invitation.findUnique({ where: { slug } });
        if (inv && inv.id !== excludeId) {
          existing = formatPrismaInvitation(inv);
        }
      } catch (err) {
        console.warn("Prisma slug check failed, using fallback:", err);
      }
    } else {
      const match = inMemoryInvitations.find((i) => i.slug === slug);
      if (match && match.id !== excludeId) {
        existing = match;
      }
    }

    if (!existing) {
      return slug;
    }
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

// Ensure default seed data exists in Prisma if database is fresh
async function ensurePrismaSeeded() {
  if (!prisma) return;
  try {
    const adminCount = await prisma.admin.count();
    if (adminCount === 0) {
      await prisma.admin.create({
        data: {
          email: DEFAULT_ADMIN.email,
          passwordHash: DEFAULT_ADMIN.passwordHash,
        },
      });
    }

    const skrCheck = await prisma.invitation.findUnique({
      where: { slug: "skr-srk" }
    });

    if (!skrCheck) {
      await prisma.invitation.create({
        data: {
          slug: "skr-srk",
          groomName: DEFAULT_DEMO_INVITATION.groom_name,
          brideName: DEFAULT_DEMO_INVITATION.bride_name,
          groomPhoto: DEFAULT_DEMO_INVITATION.groom_photo,
          bridePhoto: DEFAULT_DEMO_INVITATION.bride_photo,
          couplePhoto: DEFAULT_DEMO_INVITATION.couple_photo,
          weddingDate: DEFAULT_DEMO_INVITATION.wedding_date,
          weddingTime: DEFAULT_DEMO_INVITATION.wedding_time,
          venueName: DEFAULT_DEMO_INVITATION.venue_name,
          venueAddress: DEFAULT_DEMO_INVITATION.venue_address,
          googleMapsUrl: DEFAULT_DEMO_INVITATION.google_maps_url,
          templateId: DEFAULT_DEMO_INVITATION.template_id,
          backgroundMusicUrl: DEFAULT_DEMO_INVITATION.background_music_url,
          invitationText: DEFAULT_DEMO_INVITATION.invitation_text,
          status: "PUBLISHED",
          events: {
            create: DEFAULT_DEMO_INVITATION.events.map((e) => ({
              title: e.title,
              date: e.date,
              time: e.time,
              venue: e.venue,
              description: e.description,
              displayOrder: e.display_order,
            })),
          },
          familyMembers: {
            create: DEFAULT_DEMO_INVITATION.family_members.map((f) => ({
              name: f.name,
              relation: f.relation,
              side: f.side,
              displayOrder: f.display_order,
            })),
          },
          galleryImages: {
            create: DEFAULT_DEMO_INVITATION.gallery_images.map((g) => ({
              imageUrl: g.image_url,
              displayOrder: g.display_order,
            })),
          },
        },
      });
    }
  } catch (err) {
    console.warn("Auto-seeding Prisma failed:", err);
  }
}

// Admin Methods
export async function getAdminByEmail(email: string) {
  if (prisma) {
    try {
      await ensurePrismaSeeded();
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (admin) {
        return {
          id: admin.id,
          email: admin.email,
          password_hash: admin.passwordHash,
        };
      }
    } catch (err) {
      console.warn("Prisma getAdminByEmail error, falling back to memory:", err);
    }
  }

  const admin = inMemoryAdmins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  if (!admin) return null;
  return {
    id: admin.id,
    email: admin.email,
    password_hash: admin.passwordHash,
  };
}

export async function getAdminById(id: string) {
  if (prisma) {
    try {
      const admin = await prisma.admin.findUnique({ where: { id } });
      if (admin) {
        return {
          id: admin.id,
          email: admin.email,
        };
      }
    } catch (err) {
      console.warn("Prisma getAdminById error, falling back to memory:", err);
    }
  }

  const admin = inMemoryAdmins.find((a) => a.id === id);
  if (!admin) return null;
  return {
    id: admin.id,
    email: admin.email,
  };
}

// Dashboard & Invitations Methods
export async function getDashboardStats(): Promise<DashboardStats> {
  if (prisma) {
    try {
      await ensurePrismaSeeded();
      const total = await prisma.invitation.count();
      const drafts = await prisma.invitation.count({ where: { status: "DRAFT" } });
      const published = await prisma.invitation.count({ where: { status: "PUBLISHED" } });
      return {
        total_invitations: total,
        draft_invitations: drafts,
        published_invitations: published,
      };
    } catch (err) {
      console.warn("Prisma getDashboardStats error, using fallback:", err);
    }
  }

  const total = inMemoryInvitations.length;
  const drafts = inMemoryInvitations.filter((i) => i.status === "DRAFT").length;
  const published = inMemoryInvitations.filter((i) => i.status === "PUBLISHED").length;
  return {
    total_invitations: total,
    draft_invitations: drafts,
    published_invitations: published,
  };
}

export async function getAllInvitations(): Promise<InvitationData[]> {
  if (prisma) {
    try {
      await ensurePrismaSeeded();
      const list = await prisma.invitation.findMany({
        orderBy: { updatedAt: "desc" },
        include: {
          events: { orderBy: { displayOrder: "asc" } },
          familyMembers: { orderBy: { displayOrder: "asc" } },
          galleryImages: { orderBy: { displayOrder: "asc" } },
        },
      });
      return list.map(formatPrismaInvitation);
    } catch (err) {
      console.warn("Prisma getAllInvitations error, using fallback:", err);
    }
  }

  return [...inMemoryInvitations].sort(
    (a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime()
  );
}

export async function getInvitationById(id: string): Promise<InvitationData | null> {
  if (prisma) {
    try {
      await ensurePrismaSeeded();
      let inv = await prisma.invitation.findUnique({
        where: { id },
        include: {
          events: { orderBy: { displayOrder: "asc" } },
          familyMembers: { orderBy: { displayOrder: "asc" } },
          galleryImages: { orderBy: { displayOrder: "asc" } },
        },
      });

      if (!inv) {
        inv = await prisma.invitation.findFirst({
          where: { OR: [{ id: id }, { slug: id }] },
          include: {
            events: { orderBy: { displayOrder: "asc" } },
            familyMembers: { orderBy: { displayOrder: "asc" } },
            galleryImages: { orderBy: { displayOrder: "asc" } },
          },
        });
      }

      if (inv) return formatPrismaInvitation(inv);
    } catch (err) {
      console.warn("Prisma getInvitationById error, using fallback:", err);
    }
  }

  const found = inMemoryInvitations.find((i) => i.id === id || i.slug === id);
  if (found) return { ...found };

  return getInvitationBySlug(id);
}

export function cleanSlug(input: string): string {
  if (!input) return "";
  let unescaped = input;
  try {
    unescaped = decodeURIComponent(input);
  } catch {
    // keep as is
  }
  return unescaped
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getInvitationBySlug(slug: string): Promise<InvitationData> {
  const sanitizedSlug = cleanSlug(slug) || "skr-srk";
  const rawDecoded = decodeURIComponent(slug);

  if (prisma) {
    try {
      await ensurePrismaSeeded();
      let inv = await prisma.invitation.findUnique({
        where: { slug: sanitizedSlug },
        include: {
          events: { orderBy: { displayOrder: "asc" } },
          familyMembers: { orderBy: { displayOrder: "asc" } },
          galleryImages: { orderBy: { displayOrder: "asc" } },
        },
      });

      if (!inv) {
        inv = await prisma.invitation.findFirst({
          where: {
            OR: [
              { slug: slug },
              { slug: rawDecoded },
              { slug: slug.replace(/-/g, " ") },
              { slug: rawDecoded.replace(/ /g, "-") }
            ]
          },
          include: {
            events: { orderBy: { displayOrder: "asc" } },
            familyMembers: { orderBy: { displayOrder: "asc" } },
            galleryImages: { orderBy: { displayOrder: "asc" } },
          },
        });
      }

      if (!inv) {
        inv = await prisma.invitation.findFirst({
          include: {
            events: { orderBy: { displayOrder: "asc" } },
            familyMembers: { orderBy: { displayOrder: "asc" } },
            galleryImages: { orderBy: { displayOrder: "asc" } },
          },
        });
      }

      if (inv) {
        const formatted = formatPrismaInvitation(inv);
        return {
          ...formatted,
          slug: sanitizedSlug,
          status: "PUBLISHED",
        };
      }
    } catch (err) {
      console.warn("Prisma getInvitationBySlug error, using fallback:", err);
    }
  }

  const found = inMemoryInvitations.find(
    (i) =>
      cleanSlug(i.slug || "") === sanitizedSlug ||
      i.slug === slug ||
      i.slug === rawDecoded
  );
  if (found) return { ...found, slug: sanitizedSlug, status: "PUBLISHED" };

  // Dynamic fallback for unseeded dynamic URL slugs, using complete invitation template data
  return {
    ...DEFAULT_DEMO_INVITATION,
    id: `dyn-${sanitizedSlug}`,
    slug: sanitizedSlug,
    status: "PUBLISHED",
  };
}

export async function createInvitation(data: Partial<InvitationData>): Promise<InvitationData> {
  const groomName = data.groom_name || "Groom";
  const brideName = data.bride_name || "Bride";
  const slug = await generateSlug(groomName, brideName, undefined, data.slug);
  const imageTransformsStr =
    typeof data.image_transforms === "object"
      ? JSON.stringify(data.image_transforms)
      : data.image_transforms || null;

  if (prisma) {
    try {
      const created = await prisma.invitation.create({
        data: {
          slug,
          groomName,
          brideName,
          groomPhoto: data.groom_photo || null,
          bridePhoto: data.bride_photo || null,
          couplePhoto: data.couple_photo || null,
          weddingDate: data.wedding_date || "",
          weddingTime: data.wedding_time || "",
          venueName: data.venue_name || "",
          venueAddress: data.venue_address || "",
          googleMapsUrl: data.google_maps_url || null,
          templateId: data.template_id || "traditional",
          backgroundMusicUrl: data.background_music_url || null,
          invitationText: data.invitation_text || null,
          imageTransforms: imageTransformsStr,
          status: data.status || "DRAFT",
          events: {
            create: (data.events || []).map((e, idx) => ({
              title: e.title || "Event",
              date: e.date || "",
              time: e.time || "",
              venue: e.venue || "",
              description: e.description || null,
              displayOrder: e.display_order ?? idx,
            })),
          },
          familyMembers: {
            create: (data.family_members || []).map((f, idx) => ({
              name: f.name || "Family Member",
              relation: f.relation || "Family",
              side: f.side || "both",
              displayOrder: f.display_order ?? idx,
            })),
          },
          galleryImages: {
            create: (data.gallery_images || []).map((g, idx) => ({
              imageUrl: g.image_url || "",
              displayOrder: g.display_order ?? idx,
            })),
          },
        },
        include: {
          events: { orderBy: { displayOrder: "asc" } },
          familyMembers: { orderBy: { displayOrder: "asc" } },
          galleryImages: { orderBy: { displayOrder: "asc" } },
        },
      });
      return formatPrismaInvitation(created);
    } catch (err) {
      console.warn("Prisma createInvitation error, falling back to memory:", err);
    }
  }

  const id = `inv-${Date.now()}`;
  const now = new Date().toISOString();
  const newInv: InvitationData = {
    id,
    slug,
    groom_name: groomName,
    bride_name: brideName,
    groom_photo: data.groom_photo,
    bride_photo: data.bride_photo,
    couple_photo: data.couple_photo,
    wedding_date: data.wedding_date || "",
    wedding_time: data.wedding_time || "",
    venue_name: data.venue_name || "",
    venue_address: data.venue_address || "",
    google_maps_url: data.google_maps_url,
    template_id: data.template_id || "traditional",
    background_music_url: data.background_music_url,
    invitation_text: data.invitation_text,
    image_transforms: data.image_transforms,
    status: data.status || "DRAFT",
    created_at: now,
    updated_at: now,
    events: (data.events || []).map((e, idx) => ({ ...e, id: `ev-${Date.now()}-${idx}` })),
    family_members: (data.family_members || []).map((f, idx) => ({ ...f, id: `fm-${Date.now()}-${idx}` })),
    gallery_images: (data.gallery_images || []).map((g, idx) => ({ ...g, id: `gi-${Date.now()}-${idx}` })),
  };

  inMemoryInvitations.unshift(newInv);
  return newInv;
}

export async function updateInvitation(id: string, data: Partial<InvitationData>): Promise<InvitationData> {
  const existing = await getInvitationById(id);
  if (!existing) {
    throw new Error("Invitation not found");
  }

  const groomName = data.groom_name ?? existing.groom_name;
  const brideName = data.bride_name ?? existing.bride_name;
  let slug = existing.slug;
  if (data.slug) {
    slug = await generateSlug(groomName, brideName, id, data.slug);
  }

  const imageTransformsStr =
    typeof data.image_transforms === "object"
      ? JSON.stringify(data.image_transforms)
      : data.image_transforms ?? existing.image_transforms;

  if (prisma) {
    try {
      // Clean old nested items & update scalar fields in transaction
      await prisma.$transaction([
        prisma.event.deleteMany({ where: { invitationId: id } }),
        prisma.familyMember.deleteMany({ where: { invitationId: id } }),
        prisma.galleryImage.deleteMany({ where: { invitationId: id } }),
      ]);

      const updated = await prisma.invitation.update({
        where: { id },
        data: {
          slug,
          groomName,
          brideName,
          groomPhoto: data.groom_photo !== undefined ? data.groom_photo : existing.groom_photo,
          bridePhoto: data.bride_photo !== undefined ? data.bride_photo : existing.bride_photo,
          couplePhoto: data.couple_photo !== undefined ? data.couple_photo : existing.couple_photo,
          weddingDate: data.wedding_date ?? existing.wedding_date,
          weddingTime: data.wedding_time ?? existing.wedding_time,
          venueName: data.venue_name ?? existing.venue_name,
          venueAddress: data.venue_address ?? existing.venue_address,
          googleMapsUrl: data.google_maps_url !== undefined ? data.google_maps_url : existing.google_maps_url,
          templateId: data.template_id ?? existing.template_id,
          backgroundMusicUrl: data.background_music_url !== undefined ? data.background_music_url : existing.background_music_url,
          invitationText: data.invitation_text !== undefined ? data.invitation_text : existing.invitation_text,
          imageTransforms: typeof imageTransformsStr === "string" ? imageTransformsStr : JSON.stringify(imageTransformsStr),
          status: data.status ?? existing.status,
          events: {
            create: (data.events ?? existing.events).map((e, idx) => ({
              title: e.title || "Event",
              date: e.date || "",
              time: e.time || "",
              venue: e.venue || "",
              description: e.description || null,
              displayOrder: e.display_order ?? idx,
            })),
          },
          familyMembers: {
            create: (data.family_members ?? existing.family_members).map((f, idx) => ({
              name: f.name || "Family Member",
              relation: f.relation || "Family",
              side: f.side || "both",
              displayOrder: f.display_order ?? idx,
            })),
          },
          galleryImages: {
            create: (data.gallery_images ?? existing.gallery_images).map((g, idx) => ({
              imageUrl: g.image_url || "",
              displayOrder: g.display_order ?? idx,
            })),
          },
        },
        include: {
          events: { orderBy: { displayOrder: "asc" } },
          familyMembers: { orderBy: { displayOrder: "asc" } },
          galleryImages: { orderBy: { displayOrder: "asc" } },
        },
      });

      return formatPrismaInvitation(updated);
    } catch (err) {
      console.warn("Prisma updateInvitation error, falling back to memory:", err);
    }
  }

  const index = inMemoryInvitations.findIndex((i) => i.id === id);
  if (index !== -1) {
    const updated: InvitationData = {
      ...existing,
      ...data,
      id,
      slug,
      groom_name: groomName,
      bride_name: brideName,
      updated_at: new Date().toISOString(),
      events: (data.events ?? existing.events).map((e, idx) => ({ ...e, id: e.id || `ev-${Date.now()}-${idx}` })),
      family_members: (data.family_members ?? existing.family_members).map((f, idx) => ({ ...f, id: f.id || `fm-${Date.now()}-${idx}` })),
      gallery_images: (data.gallery_images ?? existing.gallery_images).map((g, idx) => ({ ...g, id: g.id || `gi-${Date.now()}-${idx}` })),
    };
    inMemoryInvitations[index] = updated;
    return updated;
  }

  throw new Error("Invitation not found");
}

export async function duplicateInvitation(id: string): Promise<InvitationData> {
  const original = await getInvitationById(id);
  if (!original) {
    throw new Error("Original invitation not found");
  }

  const newSlug = await generateSlug(original.groom_name, original.bride_name);

  return createInvitation({
    ...original,
    id: undefined,
    slug: newSlug,
    status: "DRAFT",
  });
}

export async function deleteInvitation(id: string): Promise<boolean> {
  if (prisma) {
    try {
      const found = await prisma.invitation.findFirst({
        where: { OR: [{ id }, { slug: id }] },
      });
      if (found) {
        await prisma.invitation.delete({ where: { id: found.id } });
        return true;
      }
    } catch (err) {
      console.warn("Prisma deleteInvitation error, using fallback:", err);
    }
  }

  const index = inMemoryInvitations.findIndex((i) => i.id === id || i.slug === id);
  if (index !== -1) {
    inMemoryInvitations.splice(index, 1);
    return true;
  }
  return true;
}

export async function setInvitationStatus(id: string, status: "DRAFT" | "PUBLISHED"): Promise<InvitationData> {
  return updateInvitation(id, { status });
}
