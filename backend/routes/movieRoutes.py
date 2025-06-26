from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session
from typing import List
from schema import MovieCreate, MovieResponse
from database import get_session
from auth import get_current_user
from crud import create_movie, get_movies, get_movie_by_id
from models import User

router = APIRouter(prefix="/movies", tags=["Movies"])


@router.get("/", response_model=List[MovieResponse])
def list_movies(
    skip: int = Query(0, ge=0, description="Number of movies to skip"),
    limit: int = Query(100, ge=1, le=100, description="Number of movies to return"),
    session: Session = Depends(get_session)
):
    """Obtener lista de películas"""
    movies = get_movies(session, skip=skip, limit=limit)
    return movies


@router.get("/{movie_id}", response_model=MovieResponse)
def get_movie(movie_id: int, session: Session = Depends(get_session)):
    """Obtener una película por ID"""
    movie = get_movie_by_id(session, movie_id)
    if not movie:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found"
        )
    return movie


@router.post("/", response_model=MovieResponse, status_code=status.HTTP_201_CREATED)
def add_movie(
    movie: MovieCreate, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """Crear una nueva película (requiere autenticación)"""
    db_movie = create_movie(session, movie)
    return db_movie
