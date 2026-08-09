import os
import uuid
from fastapi import UploadFile, HTTPException
from app.core.config import settings

# Attempt Cloudinary import if available
try:
    import cloudinary
    import cloudinary.uploader
    CLOUDINARY_AVAILABLE = True
except ImportError:
    CLOUDINARY_AVAILABLE = False

if CLOUDINARY_AVAILABLE and settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET
    )

class ImageService:
    ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp3", ".wav", ".m4a"}
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

    @staticmethod
    async def upload_file(file: UploadFile) -> str:
        # Validate extension
        filename = file.filename or "uploaded_file"
        ext = os.path.splitext(filename)[1].lower()
        if ext not in ImageService.ALLOWED_EXTENSIONS:
            raise HTTPException(status_code=400, detail=f"Unsupported file format: {ext}")

        content = await file.read()
        if len(content) > ImageService.MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File size exceeds maximum 10MB limit.")

        # If Cloudinary is configured and available
        if CLOUDINARY_AVAILABLE and settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY:
            try:
                res = cloudinary.uploader.upload(content, folder="pellipatrika")
                return res.get("secure_url")
            except Exception as e:
                print(f"Cloudinary upload failed, falling back to local storage: {e}")

        # Local File System Fallback
        unique_name = f"{uuid.uuid4().hex}{ext}"
        filepath = os.path.join(settings.UPLOAD_DIR, unique_name)
        
        with open(filepath, "wb") as f:
            f.write(content)

        return f"/uploads/{unique_name}"
