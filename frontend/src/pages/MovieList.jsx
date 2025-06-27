import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Plus, TrendingUp } from 'lucide-react';
import MovieCard from './../components/MovieCard';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    try {
      // Intentar obtener datos de la API
      fetch('http://localhost:8000/movies')
        .then(res => res.json())
        .then(data => {
          setMovies(data || []);
          setLoading(false);
        })
        .catch(() => {
          // Si falla la API, usar array vacío
          setMovies([]);
          setLoading(false);
        });
    } catch (error) {
      setMovies([]);
      setLoading(false);
    }
  }, []);

  // Filtrar y ordenar películas
  useEffect(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Ordenar películas
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
          return b.id - a.id; // Asumiendo que ID más alto = más reciente
        default:
          return 0;
      }
    });
    
    setFilteredMovies(filtered);
  }, [movies, searchTerm, sortBy]);

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
            <h2 className="text-2xl font-bold text-white mb-4">Cargando películas...</h2>
            <p className="text-gray-300">Preparando la mejor experiencia cinematográfica</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 overflow-hidden">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        .movie-list-container {
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
        
        .hero-section {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-bottom: 50px;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(26, 32, 44, 0.95), rgba(45, 55, 72, 0.95));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 15px 25px rgba(0,0,0,0.2);
        }
        
        .search-section {
          position: relative;
          z-index: 10;
          background: linear-gradient(135deg, rgba(26, 32, 44, 0.95), rgba(45, 55, 72, 0.95));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        
        .search-input {
          background-color: rgba(45, 55, 72, 0.6);
          border: 2px solid rgba(99, 102, 241, 0.3);
          color: #E2E8F0;
          padding: 15px 20px 15px 50px;
          width: 100%;
          border-radius: 12px;
          transition: all 0.3s ease;
          font-size: 16px;
          backdrop-filter: blur(5px);
        }
        
        .search-input::placeholder { color: #A0AEC0; }
        .search-input:focus {
          outline: none;
          border-color: #6366F1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
          background-color: rgba(45, 55, 72, 0.8);
        }
        
        .filter-select {
          background-color: rgba(45, 55, 72, 0.6);
          border: 2px solid rgba(99, 102, 241, 0.3);
          color: #E2E8F0;
          padding: 15px 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          font-size: 16px;
          backdrop-filter: blur(5px);
        }
        
        .filter-select:focus {
          outline: none;
          border-color: #6366F1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }
        
        .view-toggle {
          background-color: rgba(45, 55, 72, 0.6);
          border-radius: 12px;
          padding: 4px;
          display: flex;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }
        
        .view-button {
          padding: 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
          color: #A0AEC0;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        
        .view-button.active {
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }
        
        .view-button:hover:not(.active) {
          color: white;
          background-color: rgba(99, 102, 241, 0.2);
        }
        
        .add-button {
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
        
        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
        }
        
        .results-section {
          position: relative;
          z-index: 10;
          background: linear-gradient(135deg, rgba(26, 32, 44, 0.95), rgba(45, 55, 72, 0.95));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        
        .empty-state {
          text-align: center;
          padding: 80px 40px;
        }
        
        .trending-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99, 102, 241, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 25px;
          padding: 8px 16px;
          color: #A78BFA;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .count-badge {
          background: linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-left: 15px;
        }
      `}</style>

      {/* Floating background shapes */}
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="movie-list-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="trending-badge">
            <TrendingUp className="w-4 h-4" />
            <span>Diviertete</span>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            🎬 Cinemática
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Descubre, explora y comparte las mejores películas del cine mundial. 
            Tu plataforma definitiva para cinéfilos apasionados.
          </p>
          
          <Link to="/add" className="add-button">
            <Plus className="w-5 h-5" />
            <span>Agregar Nueva Película</span>
            <span>🎭</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="search-section">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="text"
                placeholder="Buscar películas por título o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="title">Ordenar por Título</option>
                <option value="newest">Más Recientes</option>
              </select>

              {/* View Mode Toggle */}
              <div className="view-toggle">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Results */}
        <div className="results-section">
          {filteredMovies.length === 0 ? (
            <div className="empty-state">
              <div className="text-8xl mb-8 opacity-50">🎬</div>
              <h3 className="text-4xl font-bold text-white mb-6">
                {searchTerm ? 'No se encontraron películas' : 'No hay películas disponibles'}
              </h3>
              <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
                {searchTerm 
                  ? `No hay resultados para "${searchTerm}". Intenta con otros términos de búsqueda.`
                  : '¡Sé el primero en agregar una película a la colección y comienza esta increíble aventura cinematográfica!'
                }
              </p>
              {!searchTerm && (
                <Link to="/add" className="add-button">
                  <Plus className="w-5 h-5" />
                  <span>Agregar Primera Película</span>
                  <span>🌟</span>
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center">
                  <span className="mr-4">🍿</span>
                  <span>
                    {searchTerm ? `Resultados para "${searchTerm}"` : 'Películas Disponibles'}
                  </span>
                  <span className="count-badge">
                    {filteredMovies.length}
                  </span>
                </h2>
              </div>
              
              {/* Movies Display */}
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6" 
                : "space-y-4"
              }>
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} viewMode={viewMode} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieList;