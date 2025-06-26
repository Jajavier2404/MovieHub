import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../auth';

function AddMovie() {
  const [form, setForm] = useState({ title: '', year: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('http://localhost:8000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(form)
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding movie:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Agregar Nueva Película
          </h1>
          <p className="text-gray-400 text-lg">
            Comparte una película increíble con la comunidad
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
          <form onSubmit={handleAdd} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-gray-300 font-medium mb-3 flex items-center space-x-2">
                <span>🎭</span>
                <span>Título de la película</span>
              </label>
              <input
                type="text"
                placeholder="Ej: El Padrino, Inception, Pulp Fiction..."
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Year Input */}
            <div>
              <label className="block text-gray-300 font-medium mb-3 flex items-center space-x-2">
                <span>📅</span>
                <span>Año de lanzamiento</span>
              </label>
              <input
                type="number"
                placeholder={`Ej: ${currentYear}`}
                min="1900"
                max={currentYear + 2}
                value={form.year}
                onChange={e => setForm({ ...form, year: e.target.value })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-gray-300 font-medium mb-3 flex items-center space-x-2">
                <span>📖</span>
                <span>Descripción / Sinopsis</span>
              </label>
              <textarea
                placeholder="Cuenta de qué trata la película, su género, actores principales, o por qué la recomiendas..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={6}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                required
              />
              <p className="text-gray-500 text-sm mt-2">
                Mínimo 10 caracteres para una buena descripción
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !form.title || !form.year || !form.description || form.description.length < 10}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 disabled:scale-100 disabled:shadow-none flex items-center justify-center space-x-2 text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Guardando película...</span>
                </>
              ) : (
                <>
                  <span>Guardar Película</span>
                  <span>🌟</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 mt-8">
          <h3 className="text-lg font-bold text-blue-300 mb-4 flex items-center space-x-2">
            <span>💡</span>
            <span>Consejos para una buena descripción:</span>
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Incluye el género de la película (drama, acción, comedia, etc.)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Menciona actores o directores destacados</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Describe brevemente la trama sin spoilers</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Explica por qué vale la pena verla</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
