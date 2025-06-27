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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500/30"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-purple-500 absolute top-0"></div>
          </div>
          <div className="text-center">
            <p className="text-white text-xl font-semibold mb-2">Cargando películas...</p>
            <p className="text-gray-400">Preparando la mejor experiencia cinematográfica</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 text-purple-300 text-sm mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Now</span>
            </div>
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              🎬 Cinemática
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Descubre, explora y comparte las mejores películas del cine mundial. 
              Tu plataforma definitiva para cinéfilos apasionados.
            </p>
            
            <Link 
              to="/add" 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
            >
              <Plus className="w-5 h-5" />
              <span>Agregar Nueva Película</span>
              <span>🎭</span>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar películas por título o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="title">Ordenar por Título</option>
                  <option value="newest">Más Recientes</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-700/50 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Movies Grid/List */}
          {filteredMovies.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 opacity-50">🎬</div>
              <h3 className="text-3xl font-bold text-gray-300 mb-4">
                {searchTerm ? 'No se encontraron películas' : 'No hay películas disponibles'}
              </h3>
              <p className="text-gray-500 mb-8 text-lg">
                {searchTerm 
                  ? `No hay resultados para "${searchTerm}". Intenta con otros términos.`
                  : '¡Sé el primero en agregar una película a la colección!'
                }
              </p>
              {!searchTerm && (
                <Link 
                  to="/add" 
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                >
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
                <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                  <span>🍿</span>
                  <span>
                    {searchTerm ? `Resultados para "${searchTerm}"` : 'Películas Disponibles'}
                  </span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
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