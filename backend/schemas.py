from sqlmodel import SQLModel
from typing import Optional

class UserCreate(SQLModel):
    username: str
    email: str
    password: str

class UserRead(SQLModel):
    id: int
    username: str
    email: str

class MovieCreate(SQLModel):
    title: str
    year: int
    description: str

class MovieRead(SQLModel):
    id: int
    title: str
    year: int
    description: str

class ReviewCreate(SQLModel):
    rating: int
    comment: str
    movie_id: int

class ReviewRead(SQLModel):
    id: int
    rating: int
    comment: str
    user_id: int
    movie_id: int
