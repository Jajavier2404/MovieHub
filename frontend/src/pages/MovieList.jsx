import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          <p className="text-gray-300 text-lg">Cargando películas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🎬 Descubre Películas Increíbles
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Explora nuestra colección de películas, lee reseñas y comparte tus opiniones con otros cinéfilos.
          </p>
          
          <Link 
            to="/add" 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
          >
            <span>➕</span>
            <span>Agregar Nueva Película</span>
            <span>🎭</span>
          </Link>
        </div>

        {/* Movies Grid */}
        {movies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">No hay películas disponibles</h3>
            <p className="text-gray-500 mb-8">¡Sé el primero en agregar una película a la colección!</p>
            <Link 
              to="/add" 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              <span>Agregar Primera Película</span>
              <span>🌟</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>🍿</span>
                <span>Películas Disponibles</span>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  {movies.length}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}

        {/* Featured Section */}
        {movies.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
                <span>✨</span>
                <span>¡Únete a la Comunidad!</span>
                <span>✨</span>
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Comparte tus películas favoritas y descubre nuevas recomendaciones de otros usuarios.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-gray-800/50 rounded-lg px-4 py-2 flex items-center space-x-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-gray-300">Califica películas</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg px-4 py-2 flex items-center space-x-2">
                  <span className="text-blue-400">💬</span>
                  <span className="text-gray-300">Deja reseñas</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg px-4 py-2 flex items-center space-x-2">
                  <span className="text-green-400">🎬</span>
                  <span className="text-gray-300">Agrega contenido</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieList;
