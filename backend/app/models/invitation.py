import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.db.session import Base

class Invitation(Base):
    __tablename__ = "invitations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    slug = Column(String, unique=True, index=True, nullable=False)
    groom_name = Column(String, nullable=False)
    bride_name = Column(String, nullable=False)
    groom_photo = Column(String, nullable=True)
    bride_photo = Column(String, nullable=True)
    couple_photo = Column(String, nullable=True)
    wedding_date = Column(String, nullable=False)  # ISO string YYYY-MM-DD
    wedding_time = Column(String, nullable=False)  # e.g., "10:30 AM"
    venue_name = Column(String, nullable=False)
    venue_address = Column(Text, nullable=False)
    google_maps_url = Column(Text, nullable=True)
    template_id = Column(String, default="traditional", nullable=False)
    background_music_url = Column(String, nullable=True)
    invitation_text = Column(Text, nullable=True)
    image_transforms = Column(Text, nullable=True)  # JSON string storing image transforms
    status = Column(String, default="DRAFT", nullable=False)  # DRAFT or PUBLISHED
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    events = relationship("Event", back_populates="invitation", cascade="all, delete-orphan", order_by="Event.display_order")
    family_members = relationship("FamilyMember", back_populates="invitation", cascade="all, delete-orphan", order_by="FamilyMember.display_order")
    gallery_images = relationship("GalleryImage", back_populates="invitation", cascade="all, delete-orphan", order_by="GalleryImage.display_order")
