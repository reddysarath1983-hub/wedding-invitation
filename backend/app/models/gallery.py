import uuid
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.db.session import Base

class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    invitation_id = Column(String, ForeignKey("invitations.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)

    invitation = relationship("Invitation", back_populates="gallery_images")
