from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    email: str
    password: str
    reviews: List["Review"] = Relationship(back_populates="user")

class Movie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    year: int
    description: str
    reviews: List["Review"] = Relationship(back_populates="movie")

class Review(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    rating: int
    comment: str
    user_id: int = Field(foreign_key="user.id")
    movie_id: int = Field(foreign_key="movie.id")
    user: Optional[User] = Relationship(back_populates="reviews")
    movie: Optional[Movie] = Relationship(back_populates="reviews")
