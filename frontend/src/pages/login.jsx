import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Validación básica
    if (!formData.username || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.access_token) {
        // Guardar token
        console.log('Token recibido:', data.access_token);
        localStorage.setItem('token', data.access_token); 
        navigate('/');
      } else {
        setError(data.message || data.detail || 'Credenciales inválidas. Por favor, verifica tus datos.');
      }
    } catch (error) {
      setError('Error de conexión con el servidor. Por favor, intenta de nuevo.');
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔑</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Iniciar Sesión
          </h1>
          <p className="text-gray-400 text-lg">
            Accede a tu cuenta de MovieHub
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3">
                <span className="text-red-400 text-xl">⚠️</span>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-gray-300 font-medium mb-3 flex items-center space-x-2">
                <span>👤</span>
                <span>Nombre de usuario</span>
              </label>
              <input
                type="text"
                placeholder="tu_usuario"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-300 font-medium mb-3 flex items-center space-x-2">
                <span>📧</span>
                <span>Correo electrónico</span>
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-300 font-medium mb-3 flex items-center space-x-2">
                <span>🔒</span>
                <span>Contraseña</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isSubmitting || !formData.username || !formData.email || !formData.password}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 disabled:scale-100 disabled:shadow-none flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <span>Ingresar</span>
                  <span>🚀</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">o</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-400 mb-4">¿No tienes una cuenta?</p>
            <button
              type="button"
              onClick={handleRegisterClick}
              className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
            >
              <span>Crear cuenta nueva</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-2xl mb-2">⭐</div>
            <p className="text-gray-400 text-sm">Califica películas</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-gray-400 text-sm">Escribe reseñas</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-2xl mb-2">🎬</div>
            <p className="text-gray-400 text-sm">Agrega contenido</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;