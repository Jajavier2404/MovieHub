import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, Star } from 'lucide-react';

function MovieCard({ movie, viewMode = 'grid' }) {
  const [isHovered, setIsHovered] = useState(false);
  
  if (viewMode === 'list') {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            🎬
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">{movie.title}</h3>
            <p className="text-gray-400 text-sm mb-2 line-clamp-2">{movie.description}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Link 
              to={`/movie/${movie.id}`}
              className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <Eye className="w-4 h-4" />
              <span>Ver detalles</span>
            </Link>
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
              <Heart className="w-4 h-4" />
              <span>Favorito</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster Placeholder */}
      <div className="aspect-[2/3] bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-2">🎬</div>
            <div className="text-sm font-bold">Película</div>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Link 
                to={`/movie/${movie.id}`}
                className="inline-flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Ver detalles</span>
              </Link>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-800/80 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-800/80 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Star className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="p-4">
        <h3 className="font-bold text-white mb-2 line-clamp-1">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieCard;