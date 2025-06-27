import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

function MovieCard({ movie, viewMode = 'grid' }) {
  const [isHovered, setIsHovered] = useState(false);
 
  if (viewMode === 'list') {
    return (
      <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700/30 p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
        <div className="flex items-center space-x-6">
          {/* Film Reel Icon */}
          <div className="w-20 h-20 border-4 border-purple-400/40 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl">
              🎬
            </div>
            {/* Small decorative dots like film reel */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-300/60 rounded-full"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-300/60 rounded-full"></div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {movie.title}
            </h3>
            <p className="text-gray-300 text-sm mb-1 leading-relaxed line-clamp-2">
              {movie.description}
            </p>
            <p className="text-purple-400 text-xs font-semibold">
              Año: {movie.year || 'N/A'}
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Link
              to={`/movie/${movie.id}`}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
            >
              <Eye className="w-5 h-5" />
              <span>Ver detalles</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700/30 overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster Placeholder */}
      <div className="aspect-[2/3] bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            {/* Film reel style icon */}
            <div className="w-16 h-16 border-4 border-white/40 rounded-full flex items-center justify-center mb-3 mx-auto relative">
              <div className="text-2xl">🎬</div>
              {/* Decorative dots */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/60 rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/60 rounded-full"></div>
            </div>
            <div className="text-sm font-bold opacity-90">Película</div>
          </div>
        </div>
        
        {/* Floating shapes similar to AddMovie */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 right-6 w-6 h-6 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
       
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Link
                to={`/movie/${movie.id}`}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-purple-500/40 transform hover:scale-105"
              >
                <Eye className="w-5 h-5" />
                <span>Ver detalles</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
     
      {/* Movie Info */}
      <div className="p-5">
        <h3 className="font-bold text-white mb-2 line-clamp-1 text-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {movie.title}
        </h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
          {movie.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-purple-400 text-xs font-semibold bg-purple-500/10 px-3 py-1 rounded-full">
            {movie.year || 'N/A'}
          </span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-purple-400/60 rounded-full"></div>
            <div className="w-2 h-2 bg-pink-400/60 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;