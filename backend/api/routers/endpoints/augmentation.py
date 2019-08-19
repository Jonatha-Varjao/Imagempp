from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()

@router.post("/run")
async def augmentation_run():
    return {"message": "End-Point to run an augmentation routine"}