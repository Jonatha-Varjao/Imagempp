from fastapi import APIRouter

from api.routers.endpoints import augmentation, config

api_router = APIRouter()
api_router.include_router(config.router, prefix="/config", tags=["config"])
api_router.include_router(augmentation.router, prefix="/augmentation", tags=["augmentation"])

