from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from models import Movie
from schemas import MovieCreate

router = APIRouter(prefix="/movies")

@router.post("/")
def create_movie(movie: MovieCreate, db: Session = Depends(get_session)):
    new_movie = Movie(**movie.dict())
    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)
    return new_movie

@router.get("/")
def get_movies(db: Session = Depends(get_session)):
    return db.exec(select(Movie)).all()

@router.get("/{movie_id}")
def get_movie(movie_id: int, db: Session = Depends(get_session)):
    return db.get(Movie, movie_id)
