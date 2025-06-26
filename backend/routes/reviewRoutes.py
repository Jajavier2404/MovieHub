from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List
from schema import ReviewCreate, ReviewResponse
from database import get_session
from auth import get_current_user
from crud import create_review, get_reviews_by_movie, get_review_by_user_and_movie, get_movie_by_id
from models import User

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.post("/", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_movie_review(
    review: ReviewCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """Crear una nueva reseña para una película (requiere autenticación)"""
    
    # Verificar que la película existe
    movie = get_movie_by_id(session, review.movie_id)
    if not movie:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found"
        )
    
    # Verificar que el usuario no haya dejado ya una reseña para esta película
    existing_review = get_review_by_user_and_movie(session, current_user.id, review.movie_id)
    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already reviewed this movie"
        )
    
    # Validar rating
    if review.rating < 1 or review.rating > 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rating must be between 1 and 5"
        )
    
    # Crear la reseña
    db_review = create_review(session, review, current_user.id)
    
    # Cargar las relaciones para la respuesta
    session.refresh(db_review)
    # Cargar explícitamente las relaciones
    from sqlmodel import select
    review_with_relations = session.exec(
        select(Review).where(Review.id == db_review.id)
    ).first()
    return review_with_relations


@router.get("/movie/{movie_id}", response_model=List[ReviewResponse])
def get_movie_reviews(movie_id: int, session: Session = Depends(get_session)):
    """Obtener todas las reseñas de una película"""
    
    # Verificar que la película existe
    movie = get_movie_by_id(session, movie_id)
    if not movie:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found"
        )
    
    reviews = get_reviews_by_movie(session, movie_id)
    return reviews
