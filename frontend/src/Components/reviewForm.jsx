import React, { useState } from 'react';
import { getToken, isAuthenticated } from '../auth';

function ReviewForm({ movieId }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      alert('Debes iniciar sesión para comentar');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('http://localhost:8000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ rating: parseInt(rating), comment, movie_id: movieId })
      });
      window.location.reload();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-2xl transition-all duration-200 hover:scale-110 ${
              star <= value ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'
            }`}
          >
            ⭐
          </button>
        ))}
        <span className="ml-2 text-gray-300 font-medium">({value}/5)</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-2xl">💬</span>
        <h4 className="text-xl font-bold text-white">Deja tu reseña</h4>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="block text-gray-300 font-medium mb-3">
            Puntuación:
          </label>
          <StarRating value={rating} onChange={setRating} />
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-gray-300 font-medium mb-3">
            Comentario:
          </label>
          <textarea
            placeholder="Comparte tu opinión sobre esta película..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !comment.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 disabled:scale-100 disabled:shadow-none flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>Enviar reseña</span>
              <span className="text-lg">🚀</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
