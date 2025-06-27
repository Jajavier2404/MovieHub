import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-lg">🎬</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MovieHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white hover:bg-purple-500/20 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              🏠 Inicio
            </Link>
            
            {isAuthenticated() ? (
              <>
                <Link 
                  to="/add" 
                  className="text-gray-300 hover:text-white hover:bg-purple-500/20 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  ➕ Agregar
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105"
                >
                  🚪 Cerrar sesión
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-white hover:bg-purple-500/20 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  🔑 Login
                </Link>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
