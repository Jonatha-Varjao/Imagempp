from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()

@router.get("/load-config")
async def load_config():
    return {"message": "End-Point to Read a config.json saved from user and routerly into forms"}

@router.post("/save-config")
async def save_config():
    return {"message": "End-Point to save a config.json from user and write in disk"}