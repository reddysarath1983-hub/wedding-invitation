import uuid
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.db.session import Base

class FamilyMember(Base):
    __tablename__ = "family_members"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    invitation_id = Column(String, ForeignKey("invitations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    relation = Column(String, nullable=False)
    side = Column(String, default="both", nullable=False)  # "bride", "groom", "both"
    display_order = Column(Integer, default=0, nullable=False)

    invitation = relationship("Invitation", back_populates="family_members")
