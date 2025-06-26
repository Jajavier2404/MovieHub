from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from datetime import timedelta
from schema import UserCreate, UserResponse, UserLogin, Token
from database import get_session
from auth import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_user
from crud import create_user, get_user_by_username, get_user_by_email

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, session: Session = Depends(get_session)):
    """Registrar un nuevo usuario"""
    
    # Verificar si el usuario ya existe
    if get_user_by_username(session, user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    if get_user_by_email(session, user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Crear el usuario
    db_user = create_user(session, user)
    return db_user


@router.post("/login", response_model=Token)
def login_user(user_credentials: UserLogin, session: Session = Depends(get_session)):
    """Iniciar sesión y obtener token JWT"""
    
    user = authenticate_user(session, user_credentials.username, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user = Depends(get_current_user)):
    """Obtener información del usuario actual"""
    return current_user
