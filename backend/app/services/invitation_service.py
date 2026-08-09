import re
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from app.models.invitation import Invitation
from app.models.event import Event
from app.models.family import FamilyMember
from app.models.gallery import GalleryImage
from app.schemas.invitation import InvitationCreate, InvitationUpdate, DashboardStats

def generate_slug(groom_name: str, bride_name: str, db: Session, current_invitation_id: str = None) -> str:
    # Clean string to lowercase alphanumeric with hyphens
    raw = f"{groom_name} {bride_name}".strip().lower()
    base_slug = re.sub(r'[^a-z0-9]+', '-', raw).strip('-')
    if not base_slug:
        base_slug = "wedding-invitation"

    slug = base_slug
    counter = 1

    while True:
        query = db.query(Invitation).filter(Invitation.slug == slug)
        if current_invitation_id:
            query = query.filter(Invitation.id != current_invitation_id)
        existing = query.first()
        if not existing:
            return slug
        counter += 1
        slug = f"{base_slug}-{counter}"

class InvitationService:

    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Invitation).order_by(Invitation.updated_at.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def get_by_id(db: Session, invitation_id: str) -> Invitation:
        invitation = db.query(Invitation).filter(Invitation.id == invitation_id).first()
        if not invitation:
            raise HTTPException(status_code=404, detail="Invitation not found")
        return invitation

    @staticmethod
    def get_by_slug(db: Session, slug: str) -> Invitation:
        invitation = db.query(Invitation).filter(Invitation.slug == slug).first()
        if not invitation:
            raise HTTPException(status_code=404, detail="Invitation not found")
        return invitation

    @staticmethod
    def create(db: Session, obj_in: InvitationCreate) -> Invitation:
        # Determine slug
        slug = obj_in.slug if obj_in.slug else generate_slug(obj_in.groom_name, obj_in.bride_name, db)

        db_invitation = Invitation(
            slug=slug,
            groom_name=obj_in.groom_name,
            bride_name=obj_in.bride_name,
            groom_photo=obj_in.groom_photo,
            bride_photo=obj_in.bride_photo,
            couple_photo=obj_in.couple_photo,
            wedding_date=obj_in.wedding_date,
            wedding_time=obj_in.wedding_time,
            venue_name=obj_in.venue_name,
            venue_address=obj_in.venue_address,
            google_maps_url=obj_in.google_maps_url,
            template_id=obj_in.template_id,
            background_music_url=obj_in.background_music_url,
            invitation_text=obj_in.invitation_text,
            image_transforms=obj_in.image_transforms,
            status=obj_in.status
        )
        db.add(db_invitation)
        db.flush()

        # Add Events
        if obj_in.events:
            for idx, ev in enumerate(obj_in.events):
                db_event = Event(
                    invitation_id=db_invitation.id,
                    title=ev.title,
                    date=ev.date,
                    time=ev.time,
                    venue=ev.venue,
                    description=ev.description,
                    display_order=ev.display_order if ev.display_order is not None else idx
                )
                db.add(db_event)

        # Add Family Members
        if obj_in.family_members:
            for idx, fm in enumerate(obj_in.family_members):
                db_fm = FamilyMember(
                    invitation_id=db_invitation.id,
                    name=fm.name,
                    relation=fm.relation,
                    side=fm.side,
                    display_order=fm.display_order if fm.display_order is not None else idx
                )
                db.add(db_fm)

        # Add Gallery Images
        if obj_in.gallery_images:
            for idx, gi in enumerate(obj_in.gallery_images):
                db_gi = GalleryImage(
                    invitation_id=db_invitation.id,
                    image_url=gi.image_url,
                    display_order=gi.display_order if gi.display_order is not None else idx
                )
                db.add(db_gi)

        db.commit()
        db.refresh(db_invitation)
        return db_invitation

    @staticmethod
    def update(db: Session, invitation_id: str, obj_in: InvitationUpdate) -> Invitation:
        db_invitation = InvitationService.get_by_id(db, invitation_id)

        # Update slug if custom slug provided or if names changed
        if obj_in.slug and obj_in.slug != db_invitation.slug:
            db_invitation.slug = generate_slug(obj_in.groom_name, obj_in.bride_name, db, current_invitation_id=invitation_id)

        update_data = obj_in.model_dump(exclude_unset=True)
        
        # Scalar fields
        for field in ["groom_name", "bride_name", "groom_photo", "bride_photo", "couple_photo", 
                      "wedding_date", "wedding_time", "venue_name", "venue_address", 
                      "google_maps_url", "template_id", "background_music_url", "invitation_text", "image_transforms", "status"]:
            if field in update_data and update_data[field] is not None:
                setattr(db_invitation, field, update_data[field])

        # Replace events if provided
        if obj_in.events is not None:
            db.query(Event).filter(Event.invitation_id == invitation_id).delete()
            for idx, ev in enumerate(obj_in.events):
                db.add(Event(
                    invitation_id=invitation_id,
                    title=ev.title,
                    date=ev.date,
                    time=ev.time,
                    venue=ev.venue,
                    description=ev.description,
                    display_order=ev.display_order if ev.display_order is not None else idx
                ))

        # Replace family members if provided
        if obj_in.family_members is not None:
            db.query(FamilyMember).filter(FamilyMember.invitation_id == invitation_id).delete()
            for idx, fm in enumerate(obj_in.family_members):
                db.add(FamilyMember(
                    invitation_id=invitation_id,
                    name=fm.name,
                    relation=fm.relation,
                    side=fm.side,
                    display_order=fm.display_order if fm.display_order is not None else idx
                ))

        # Replace gallery images if provided
        if obj_in.gallery_images is not None:
            db.query(GalleryImage).filter(GalleryImage.invitation_id == invitation_id).delete()
            for idx, gi in enumerate(obj_in.gallery_images):
                db.add(GalleryImage(
                    invitation_id=invitation_id,
                    image_url=gi.image_url,
                    display_order=gi.display_order if gi.display_order is not None else idx
                ))

        db.commit()
        db.refresh(db_invitation)
        return db_invitation

    @staticmethod
    def duplicate(db: Session, invitation_id: str) -> Invitation:
        original = InvitationService.get_by_id(db, invitation_id)

        # Generate new unique slug
        new_slug = generate_slug(original.groom_name, original.bride_name, db)

        new_invitation = Invitation(
            slug=new_slug,
            groom_name=original.groom_name,
            bride_name=original.bride_name,
            groom_photo=original.groom_photo,
            bride_photo=original.bride_photo,
            couple_photo=original.couple_photo,
            wedding_date=original.wedding_date,
            wedding_time=original.wedding_time,
            venue_name=original.venue_name,
            venue_address=original.venue_address,
            google_maps_url=original.google_maps_url,
            template_id=original.template_id,
            background_music_url=original.background_music_url,
            invitation_text=original.invitation_text,
            image_transforms=original.image_transforms,
            status="DRAFT"  # Always set duplicate to DRAFT
        )
        db.add(new_invitation)
        db.flush()

        # Copy events
        for ev in original.events:
            db.add(Event(
                invitation_id=new_invitation.id,
                title=ev.title,
                date=ev.date,
                time=ev.time,
                venue=ev.venue,
                description=ev.description,
                display_order=ev.display_order
            ))

        # Copy family members
        for fm in original.family_members:
            db.add(FamilyMember(
                invitation_id=new_invitation.id,
                name=fm.name,
                relation=fm.relation,
                side=fm.side,
                display_order=fm.display_order
            ))

        # Copy gallery images
        for gi in original.gallery_images:
            db.add(GalleryImage(
                invitation_id=new_invitation.id,
                image_url=gi.image_url,
                display_order=gi.display_order
            ))

        db.commit()
        db.refresh(new_invitation)
        return new_invitation

    @staticmethod
    def delete(db: Session, invitation_id: str):
        invitation = InvitationService.get_by_id(db, invitation_id)
        db.delete(invitation)
        db.commit()
        return True

    @staticmethod
    def get_stats(db: Session) -> DashboardStats:
        total = db.query(func.count(Invitation.id)).scalar() or 0
        drafts = db.query(func.count(Invitation.id)).filter(Invitation.status == "DRAFT").scalar() or 0
        published = db.query(func.count(Invitation.id)).filter(Invitation.status == "PUBLISHED").scalar() or 0
        return DashboardStats(
            total_invitations=total,
            draft_invitations=drafts,
            published_invitations=published
        )
