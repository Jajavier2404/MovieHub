import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8000/movies/${id}`).then(res => res.json()),
      fetch(`http://localhost:8000/reviews/movie/${id}`).then(res => res.json())
    ]).then(([movieData, reviewsData]) => {
      setMovie(movieData);
      setReviews(reviewsData);
      if (reviewsData.length > 0) {
        const avg = reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length;
        setAverage(avg.toFixed(1));
      }
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          <p className="text-gray-300 text-lg">Cargando película...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-300 mb-4">Película no encontrada</h2>
          <Link 
            to="/" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const StarDisplay = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200"
        >
          <span className="text-xl">←</span>
          <span>Volver a películas</span>
        </Link>

        {/* Movie Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            {/* Movie Poster */}
            <div className="lg:w-1/3 h-64 lg:h-96 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <span className="text-8xl filter drop-shadow-lg relative z-10">🎬</span>
            </div>
            
            {/* Movie Info */}
            <div className="lg:w-2/3 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {movie.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      📅 {movie.year}
                    </span>
                    {average > 0 && (
                      <div className="flex items-center space-x-2">
                        <StarDisplay rating={Math.round(average)} />
                        <span className="text-yellow-400 font-bold">{average}/5</span>
                        <span className="text-gray-500">({reviews.length} reseñas)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                  <span>📖</span>
                  <span>Sinopsis</span>
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.description}
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl text-yellow-400 mb-1">⭐</div>
                  <div className="text-2xl font-bold text-white">{average || 'N/A'}</div>
                  <div className="text-sm text-gray-400">Calificación</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl text-purple-400 mb-1">💬</div>
                  <div className="text-2xl font-bold text-white">{reviews.length}</div>
                  <div className="text-sm text-gray-400">Reseñas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-2xl">💭</span>
            <h3 className="text-2xl font-bold text-white">
              Reseñas {reviews.length > 0 && `(${reviews.length})`}
            </h3>
          </div>
          
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🤔</div>
              <p className="text-gray-400 text-lg mb-4">
                Aún no hay reseñas para esta película.
              </p>
              <p className="text-gray-500">
                ¡Sé el primero en compartir tu opinión!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">👤</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <StarDisplay rating={review.rating} />
                          <span className="text-yellow-400 font-bold">{review.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <ReviewForm movieId={id} />
      </div>
    </div>
  );
}

export default MovieDetail;
