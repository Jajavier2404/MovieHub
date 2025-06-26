from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True


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


class ReviewCreate(BaseModel):
    content: str
    rating: int
    movie_id: int


class ReviewResponse(BaseModel):
    id: int
    content: str
    rating: int
    created_at: datetime
    user_id: int
    movie_id: int
    
    class Config:
        from_attributes = True
