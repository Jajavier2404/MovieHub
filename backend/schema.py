from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# User Schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: str
    password: str


# Movie Schemas
class MovieCreate(BaseModel):
    title: str
    description: Optional[str] = None
    release_year: Optional[int] = None
    genre: Optional[str] = None
    director: Optional[str] = None
    poster_url: Optional[str] = None


class MovieResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    release_year: Optional[int] = None
    genre: Optional[str] = None
    director: Optional[str] = None
    poster_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


# Review Schemas
class ReviewCreate(BaseModel):
    content: str
    rating: int  # 1-5 estrellas
    movie_id: int


class ReviewResponse(BaseModel):
    id: int
    content: str
    rating: int
    created_at: datetime
    user_id: int
    movie_id: int
    user: UserResponse
    
    class Config:
        from_attributes = True


# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
