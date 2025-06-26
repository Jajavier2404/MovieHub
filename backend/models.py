from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional, List


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relación con reviews
    reviews: List["Review"] = Relationship(back_populates="user")


class Movie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: Optional[str] = None
    release_year: Optional[int] = None
    genre: Optional[str] = None
    director: Optional[str] = None
    poster_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relación con reviews
    reviews: List["Review"] = Relationship(back_populates="movie")


class Review(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str
    rating: int = Field(ge=1, le=5)  # Rating de 1 a 5 estrellas
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Foreign keys
    user_id: int = Field(foreign_key="user.id")
    movie_id: int = Field(foreign_key="movie.id")
    
    # Relaciones
    user: User = Relationship(back_populates="reviews")
    movie: Movie = Relationship(back_populates="reviews")
