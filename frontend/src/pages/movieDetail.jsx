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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
          
          .loading-container {
            font-family: 'Poppins', sans-serif;
            position: relative;
            overflow: hidden;
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 15px 25px rgba(0,0,0,0.3);
            background: linear-gradient(135deg, rgba(26, 32, 44, 0.95), rgba(45, 55, 72, 0.95));
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            max-width: 500px;
          }
          
          .floating-shapes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
          }
          
          .shape {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            animation: float 6s ease-in-out infinite;
          }
          
          .shape:nth-child(1) { width: 80px; height: 80px; top: 10%; left: 10%; animation-delay: 0s; }
          .shape:nth-child(2) { width: 60px; height: 60px; top: 70%; right: 15%; animation-delay: 2s; }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
          
          .film-reel-loader {
            width: 80px;
            height: 80px;
            border: 6px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            position: relative;
            animation: rotate 2s linear infinite;
            margin: 0 auto 30px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
          }
          
          .film-reel-loader::before,
          .film-reel-loader::after {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
          }
          
          .film-reel-loader::before {
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
          }
          
          .film-reel-loader::after {
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
          }
          
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        
        <div className="loading-container">
          <div className="floating-shapes">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          
          <div className="relative z-10">
            <div className="film-reel-loader">
              <div className="text-2xl">🎬</div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Cargando película...</h2>
            <p className="text-gray-300">Preparando los detalles cinematográficos</p>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
          
          .error-container {
            font-family: 'Poppins', sans-serif;
            position: relative;
            overflow: hidden;
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 15px 25px rgba(0,0,0,0.3);
            background: linear-gradient(135deg, rgba(26, 32, 44, 0.95), rgba(45, 55, 72, 0.95));
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            max-width: 500px;
          }
          
          .floating-shapes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
          }
          
          .shape {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            animation: float 6s ease-in-out infinite;
          }
          
          .shape:nth-child(1) { width: 80px; height: 80px; top: 10%; left: 10%; animation-delay: 0s; }
          .shape:nth-child(2) { width: 60px; height: 60px; top: 70%; right: 15%; animation-delay: 2s; }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
          
          .back-button {
            border-radius: 12px;
            border: none;
            background: linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899);
            color: white;
            font-size: 16px;
            font-weight: 600;
            padding: 16px 32px;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 12px;
          }
          
          .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
          }
        `}</style>
        
        <div className="error-container">
          <div className="floating-shapes">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-8xl mb-6 opacity-70">😕</div>
            <h2 className="text-3xl font-bold text-white mb-6">Película no encontrada</h2>
            <p className="text-gray-300 mb-10 leading-relaxed">
              Lo sentimos, no pudimos encontrar la película que estás buscando.
            </p>
            <Link to="/" className="back-button">
              <span>←</span>
              <span>Volver al inicio</span>
              <span>🏠</span>
            </Link>
          </div>
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
            className={`text-lg transition-colors duration-200 ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 overflow-hidden">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        .movie-detail-container {
          font-family: 'Poppins', sans-serif;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }
        
        .floating-shapes {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        
        .shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08));
          animation: float 8s ease-in-out infinite;
        }
        
        .shape:nth-child(1) { width: 300px; height: 300px; top: 10%; left: -10%; animation-delay: 0s; }
        .shape:nth-child(2) { width: 200px; height: 200px; top: 50%; right: -5%; animation-delay: 3s; }
        .shape:nth-child(3) { width: 150px; height: 150px; bottom: 20%; left: 20%; animation-delay: 6s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        .glass-card {
          position: relative;
          z-index: 10;
          background: linear-gradient(135deg, rgba(26, 32, 44, 0.95), rgba(45, 55, 72, 0.95));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 15px 25px rgba(0,0,0,0.2);
        }
        
        .back-button {
          color: #A0AEC0;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: rgba(45, 55, 72, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-weight: 500;
        }
        
        .back-button:hover {
          color: white;
          background: rgba(99, 102, 241, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.2);
        }
        
        .movie-poster {
          background: linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .movie-poster::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0,0,0,0.1), rgba(255,255,255,0.05));
        }
        
        .poster-icon {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
        }
        
        .film-reel {
          width: 80px;
          height: 80px;
          border: 4px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          position: relative;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .film-reel::before,
        .film-reel::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
        }
        
        .film-reel::before {
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .film-reel::after {
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .stat-card {
          background: rgba(55, 65, 81, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.2);
        }
        
        .review-card {
          background: rgba(55, 65, 81, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }
        
        .review-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.1);
        }
        
        .user-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .empty-reviews {
          text-align: center;
          padding: 80px 40px;
        }
        
        .year-badge {
          background: rgba(99, 102, 241, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 25px;
          padding: 6px 16px;
          color: #A78BFA;
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      {/* Floating background shapes */}
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="movie-detail-container">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/" className="back-button">
            <span className="text-xl">←</span>
            <span>Volver a películas</span>
          </Link>
        </div>

        {/* Movie Header */}
        <div className="glass-card overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            {/* Movie Poster */}
            <div className="lg:w-1/3 h-64 lg:h-96 movie-poster">
              <div className="poster-icon">
                <div className="film-reel">
                  <span className="text-3xl">🎬</span>
                </div>
                <div className="text-lg font-bold opacity-90">Película</div>
              </div>
            </div>
            
            {/* Movie Info */}
            <div className="lg:w-2/3 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    {movie.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="year-badge">
                      <span>📅</span>
                      <span>{movie.year}</span>
                    </div>
                    {average > 0 && (
                      <div className="flex items-center space-x-3">
                        <StarDisplay rating={Math.round(average)} />
                        <span className="text-yellow-400 font-bold text-lg">{average}/5</span>
                        <span className="text-gray-400">({reviews.length} reseñas)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-3">
                  <span className="text-2xl">📖</span>
                  <span>Sinopsis</span>
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.description}
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="stat-card">
                  <div className="text-3xl text-yellow-400 mb-3">⭐</div>
                  <div className="text-3xl font-bold text-white mb-2">{average || 'N/A'}</div>
                  <div className="text-sm text-gray-400 font-medium">Calificación Promedio</div>
                </div>
                <div className="stat-card">
                  <div className="text-3xl text-purple-400 mb-3">💬</div>
                  <div className="text-3xl font-bold text-white mb-2">{reviews.length}</div>
                  <div className="text-sm text-gray-400 font-medium">Total de Reseñas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-center space-x-3 mb-8">
            <span className="text-3xl">💭</span>
            <h3 className="text-3xl font-bold text-white">
              Reseñas 
              {reviews.length > 0 && (
                <span className="ml-3 text-lg text-purple-400 font-normal">
                  ({reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'})
                </span>
              )}
            </h3>
          </div>
          
          {reviews.length === 0 ? (
            <div className="empty-reviews">
              <div className="text-6xl mb-6 opacity-60">🤔</div>
              <h4 className="text-2xl font-bold text-white mb-4">
                Aún no hay reseñas para esta película
              </h4>
              <p className="text-gray-300 text-lg mb-2">
                ¡Sé el primero en compartir tu opinión!
              </p>
              <p className="text-gray-500">
                Tu reseña ayudará a otros cinéfilos a descubrir esta película.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="user-avatar">
                        <span>👤</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <StarDisplay rating={review.rating} />
                          <span className="text-yellow-400 font-bold text-lg">{review.rating}/5</span>
                        </div>
                        <div className="text-sm text-gray-400">Reseña verificada</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
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