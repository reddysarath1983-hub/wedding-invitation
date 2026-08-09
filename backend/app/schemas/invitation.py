from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# --- Event Schemas ---
class EventBase(BaseModel):
    title: str
    date: str
    time: str
    venue: str
    description: Optional[str] = None
    display_order: int = 0

class EventCreate(EventBase):
    pass

class EventUpdate(EventBase):
    pass

class EventOut(EventBase):
    id: str
    invitation_id: str

    class Config:
        from_attributes = True

# --- Family Schemas ---
class FamilyMemberBase(BaseModel):
    name: str
    relation: str
    side: str = "both"  # "bride", "groom", "both"
    display_order: int = 0

class FamilyMemberCreate(FamilyMemberBase):
    pass

class FamilyMemberUpdate(FamilyMemberBase):
    pass

class FamilyMemberOut(FamilyMemberBase):
    id: str
    invitation_id: str

    class Config:
        from_attributes = True

# --- Gallery Schemas ---
class GalleryImageBase(BaseModel):
    image_url: str
    display_order: int = 0

class GalleryImageCreate(GalleryImageBase):
    pass

class GalleryImageOut(GalleryImageBase):
    id: str
    invitation_id: str

    class Config:
        from_attributes = True

# --- Invitation Schemas ---
class InvitationBase(BaseModel):
    groom_name: str
    bride_name: str
    groom_photo: Optional[str] = None
    bride_photo: Optional[str] = None
    couple_photo: Optional[str] = None
    wedding_date: str
    wedding_time: str
    venue_name: str
    venue_address: str
    google_maps_url: Optional[str] = None
    template_id: str = "traditional"
    background_music_url: Optional[str] = None
    invitation_text: Optional[str] = None
    image_transforms: Optional[str] = None
    status: str = "DRAFT"
    slug: Optional[str] = None

class InvitationCreate(InvitationBase):
    events: Optional[List[EventCreate]] = []
    family_members: Optional[List[FamilyMemberCreate]] = []
    gallery_images: Optional[List[GalleryImageCreate]] = []

class InvitationUpdate(InvitationBase):
    events: Optional[List[EventCreate]] = None
    family_members: Optional[List[FamilyMemberCreate]] = None
    gallery_images: Optional[List[GalleryImageCreate]] = None

class InvitationOut(InvitationBase):
    id: str
    slug: str
    created_at: datetime
    updated_at: datetime
    events: List[EventOut] = []
    family_members: List[FamilyMemberOut] = []
    gallery_images: List[GalleryImageOut] = []

    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_invitations: int
    draft_invitations: int
    published_invitations: int
