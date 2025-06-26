from sqlmodel import Session, select
from models import User, Movie, Review
from schema import UserCreate, MovieCreate, ReviewCreate
from auth import get_password_hash
from typing import List, Optional


# CRUD para Users
def create_user(session: Session, user: UserCreate) -> User:
    """Crear un nuevo usuario"""
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_username(session: Session, username: str) -> Optional[User]:
    """Obtener usuario por username"""
    return session.exec(select(User).where(User.username == username)).first()


def get_user_by_email(session: Session, email: str) -> Optional[User]:
    """Obtener usuario por email"""
    return session.exec(select(User).where(User.email == email)).first()


# CRUD para Movies
def create_movie(session: Session, movie: MovieCreate) -> Movie:
    """Crear una nueva película"""
    db_movie = Movie(**movie.model_dump())
    session.add(db_movie)
    session.commit()
    session.refresh(db_movie)
    return db_movie


def get_movies(session: Session, skip: int = 0, limit: int = 100) -> List[Movie]:
    """Obtener lista de películas"""
    return session.exec(select(Movie).offset(skip).limit(limit)).all()


def get_movie_by_id(session: Session, movie_id: int) -> Optional[Movie]:
    """Obtener película por ID"""
    return session.exec(select(Movie).where(Movie.id == movie_id)).first()


# CRUD para Reviews
def create_review(session: Session, review: ReviewCreate, user_id: int) -> Review:
    """Crear una nueva reseña"""
    db_review = Review(**review.model_dump(), user_id=user_id)
    session.add(db_review)
    session.commit()
    session.refresh(db_review)
    return db_review


def get_reviews_by_movie(session: Session, movie_id: int) -> List[Review]:
    """Obtener todas las reseñas de una película"""
    return session.exec(
        select(Review).where(Review.movie_id == movie_id)
    ).all()


def get_review_by_user_and_movie(session: Session, user_id: int, movie_id: int) -> Optional[Review]:
    """Verificar si un usuario ya dejó una reseña para una película"""
    return session.exec(
        select(Review).where(
            Review.user_id == user_id,
            Review.movie_id == movie_id
        )
    ).first()
