from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import User
from schemas import UserCreate
from auth import create_token

router = APIRouter(prefix="/auth")

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_session)):
    existing = db.exec(select(User).where(User.email == user.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Ya existe")
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "Registrado"}

@router.post("/login")
def login(user: UserCreate, db: Session = Depends(get_session)):
    db_user = db.exec(select(User).where(User.email == user.email)).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Credenciales inválidas")
    token = create_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}
