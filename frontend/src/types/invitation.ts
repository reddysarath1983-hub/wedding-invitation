export interface EventItem {
  id?: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
  display_order?: number;
}

export interface FamilyMemberItem {
  id?: string;
  name: string;
  relation: string;
  side: "bride" | "groom" | "both";
  display_order?: number;
}

export interface GalleryImageItem {
  id?: string;
  image_url: string;
  display_order?: number;
}

export type TemplateId =
  | "traditional"
  | "royal"
  | "floral"
  | "kalamkari"
  | "banarasi"
  | "gold-red"
  | "green-gold"
  | "vintage"
  | "pattachitra"
  | "luxury"
  | "pastel"
  | "contemporary"
  | "cinematic"
  | "family"
  | "festive"
  | "engagement"
  | "reception"
  | "haldi"
  | "sangeet"
  | "sacred-vivaha";

export interface ImageTransform {
  x?: number;        // Position X in px relative to element default
  y?: number;        // Position Y in px relative to element default
  scale?: number;    // Scale multiplier (1.0 = 100%)
  rotation?: number; // Rotation in degrees (-180 to +180)
  opacity?: number;  // Opacity (0.0 to 1.0)
  zIndex?: number;   // Layer ordering
  cropX?: number;    // Object offset X (%)
  cropY?: number;    // Object offset Y (%)
}

export interface InvitationData {
  id?: string;
  slug?: string;
  groom_name: string;
  bride_name: string;
  groom_photo?: string;
  bride_photo?: string;
  couple_photo?: string;
  wedding_date: string;
  wedding_time: string;
  venue_name: string;
  venue_address: string;
  google_maps_url?: string;
  template_id: TemplateId;
  background_music_url?: string;
  invitation_text?: string;
  image_transforms?: Record<string, ImageTransform> | string;
  status: "DRAFT" | "PUBLISHED";
  created_at?: string;
  updated_at?: string;
  events: EventItem[];
  family_members: FamilyMemberItem[];
  gallery_images: GalleryImageItem[];
}

export interface DashboardStats {
  total_invitations: number;
  draft_invitations: number;
  published_invitations: number;
}
