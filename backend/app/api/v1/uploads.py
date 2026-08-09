from fastapi import APIRouter, Depends, UploadFile, File
from app.api.deps import get_current_admin
from app.models.admin import Admin
from app.services.image_service import ImageService

router = APIRouter()

@router.post("")
async def upload_file(
    file: UploadFile = File(...),
    admin: Admin = Depends(get_current_admin)
):
    file_url = await ImageService.upload_file(file)
    return {"url": file_url}
