from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.deps import get_current_admin
from app.models.admin import Admin
from app.models.invitation import Invitation
from app.schemas.invitation import (
    InvitationOut, InvitationCreate, InvitationUpdate, DashboardStats
)
from app.services.invitation_service import InvitationService

router = APIRouter()

# PUBLIC ENDPOINT: Get published invitation by slug
@router.get("/public/{slug}", response_model=InvitationOut)
def get_public_invitation(slug: str, db: Session = Depends(get_db)):
    invitation = InvitationService.get_by_slug(db, slug)
    if invitation.status != "PUBLISHED":
        raise HTTPException(status_code=404, detail="Invitation not found or not published")
    return invitation

# ADMIN ENDPOINTS
@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    return InvitationService.get_stats(db)

@router.get("", response_model=List[InvitationOut])
def list_invitations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    return InvitationService.get_all(db, skip=skip, limit=limit)

@router.post("", response_model=InvitationOut, status_code=status.HTTP_201_CREATED)
def create_invitation(
    obj_in: InvitationCreate,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    return InvitationService.create(db, obj_in)

@router.get("/{invitation_id}", response_model=InvitationOut)
def get_invitation_by_id(
    invitation_id: str,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    return InvitationService.get_by_id(db, invitation_id)

@router.put("/{invitation_id}", response_model=InvitationOut)
def update_invitation(
    invitation_id: str,
    obj_in: InvitationUpdate,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    return InvitationService.update(db, invitation_id, obj_in)

@router.delete("/{invitation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_invitation(
    invitation_id: str,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    InvitationService.delete(db, invitation_id)
    return None

@router.post("/{invitation_id}/duplicate", response_model=InvitationOut)
def duplicate_invitation(
    invitation_id: str,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    return InvitationService.duplicate(db, invitation_id)

@router.post("/{invitation_id}/publish", response_model=InvitationOut)
def publish_invitation(
    invitation_id: str,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    invitation = InvitationService.get_by_id(db, invitation_id)
    invitation.status = "PUBLISHED"
    db.commit()
    db.refresh(invitation)
    return invitation

@router.post("/{invitation_id}/unpublish", response_model=InvitationOut)
def unpublish_invitation(
    invitation_id: str,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin)
):
    invitation = InvitationService.get_by_id(db, invitation_id)
    invitation.status = "DRAFT"
    db.commit()
    db.refresh(invitation)
    return invitation
