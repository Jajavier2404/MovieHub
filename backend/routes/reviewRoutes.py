from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from models import Review
from schemas import ReviewCreate
from auth import get_current_user

router = APIRouter(prefix="/reviews")

@router.post("/")
def create_review(review: ReviewCreate, db: Session = Depends(get_session), user=Depends(get_current_user)):
    new_review = Review(**review.dict(), user_id=1)  # Simplificado: user_id fijo o usar payload['sub']
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review

@router.get("/movie/{movie_id}")
def get_reviews_for_movie(movie_id: int, db: Session = Depends(get_session)):
    return db.exec(select(Review).where(Review.movie_id == movie_id)).all()
