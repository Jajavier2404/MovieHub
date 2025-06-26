import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50">
      {/* Movie Poster Placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <span className="text-6xl filter drop-shadow-lg">🎬</span>
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-yellow-400 font-bold text-sm">⭐ {movie.year}</span>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-200">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {movie.description}
        </p>
        
        {/* Action Button */}
        <Link 
          to={`/movie/${movie.id}`}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25 group-hover:scale-105"
        >
          <span>Ver detalles</span>
          <span className="text-lg">🎭</span>
        </Link>
      </div>
      
      {/* Decorative Gradient Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}

export default MovieCard;
