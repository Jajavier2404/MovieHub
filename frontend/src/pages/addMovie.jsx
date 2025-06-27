import React, { useState } from 'react';

function AddMovie() {
  const [form, setForm] = useState({ title: '', year: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    
    // Validación
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!form.year) newErrors.year = 'El año es obligatorio';
    if (!form.description.trim()) newErrors.description = 'La descripción es obligatoria';
    else if (form.description.length < 10) newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const response = await fetch('http://localhost:8000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || 'demo-token'}`
        },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        setSuccessMessage('¡Película agregada exitosamente! 🎉');
        setForm({ title: '', year: '', description: '' });
      } else {
        throw new Error('Error al guardar la película');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      setErrors({ submit: 'Error al guardar la película. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header mejorado */}
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <div className="text-8xl mb-6 filter drop-shadow-2xl animate-bounce-slow">🎬</div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
              Agregar Nueva Película
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              🌟 Comparte una película increíble con la comunidad y ayuda a otros a descubrir grandes historias
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulario principal */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 hover:shadow-purple-500/10 transition-all duration-500">
                <div onSubmit={handleAdd} className="space-y-8">
                  {/* Mensaje de éxito */}
                  {successMessage && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center space-x-3 animate-pulse">
                      <span className="text-2xl">✅</span>
                      <span className="text-green-300">{successMessage}</span>
                    </div>
                  )}

                  {/* Error general */}
                  {errors.submit && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
                      <span className="text-2xl">⚠️</span>
                      <span className="text-red-300">{errors.submit}</span>
                    </div>
                  )}

                  {/* Título */}
                  <div className="group">
                    <label className="block text-gray-200 font-semibold mb-4 flex items-center space-x-3 text-lg">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🎭</span>
                      <span>Título de la película</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: El Padrino, Inception, Interstellar..."
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      className={`w-full bg-white/5 border-2 ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 text-lg backdrop-blur-sm hover:bg-white/10`}
                      required
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-2 flex items-center space-x-2">
                        <span>⚠️</span>
                        <span>{errors.title}</span>
                      </p>
                    )}
                  </div>

                  {/* Año */}
                  <div className="group">
                    <label className="block text-gray-200 font-semibold mb-4 flex items-center space-x-3 text-lg">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200">📅</span>
                      <span>Año de lanzamiento</span>
                    </label>
                    <input
                      type="number"
                      placeholder={`Ej: ${currentYear}`}
                      min="1900"
                      max={currentYear + 2}
                      value={form.year}
                      onChange={e => setForm({ ...form, year: e.target.value })}
                      className={`w-full bg-white/5 border-2 ${errors.year ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 text-lg backdrop-blur-sm hover:bg-white/10`}
                      required
                    />
                    {errors.year && (
                      <p className="text-red-400 text-sm mt-2 flex items-center space-x-2">
                        <span>⚠️</span>
                        <span>{errors.year}</span>
                      </p>
                    )}
                  </div>

                  {/* Descripción */}
                  <div className="group">
                    <label className="block text-gray-200 font-semibold mb-4 flex items-center space-x-3 text-lg">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200">📖</span>
                      <span>Descripción / Sinopsis</span>
                    </label>
                    <textarea
                      placeholder="Cuenta de qué trata la película, su género, actores principales, o por qué la recomiendas..."
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      rows={6}
                      className={`w-full bg-white/5 border-2 ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 text-lg resize-none backdrop-blur-sm hover:bg-white/10`}
                      required
                    />
                    <div className="flex justify-between items-center mt-3">
                      {errors.description ? (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                          <span>⚠️</span>
                          <span>{errors.description}</span>
                        </p>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          {form.description.length}/10 caracteres mínimo
                        </p>
                      )}
                      <div className={`w-3 h-3 rounded-full ${form.description.length >= 10 ? 'bg-green-500' : 'bg-gray-500'} transition-colors duration-200`}></div>
                    </div>
                  </div>

                  {/* Botón de envío mejorado */}
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isSubmitting || !form.title || !form.year || !form.description || form.description.length < 10}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/40 hover:scale-105 disabled:scale-100 disabled:shadow-none flex items-center justify-center space-x-3 text-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-7 w-7 border-b-3 border-white"></div>
                        <span>Guardando película...</span>
                      </>
                    ) : (
                      <>
                        <span>🎬</span>
                        <span>Guardar Película</span>
                        <span className="animate-pulse">🌟</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Panel lateral de consejos mejorado */}
            <div className="lg:col-span-1 space-y-6">
              

              {/* Estadísticas */}
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl border border-green-500/20 p-6 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
                <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center space-x-3">
                  <span className="text-2xl">📊</span>
                  <span>Tu Progreso</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Título:</span>
                    <span className={`w-4 h-4 rounded-full ${form.title ? 'bg-green-500' : 'bg-gray-500'} transition-colors duration-200`}></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Año:</span>
                    <span className={`w-4 h-4 rounded-full ${form.year ? 'bg-green-500' : 'bg-gray-500'} transition-colors duration-200`}></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Descripción:</span>
                    <span className={`w-4 h-4 rounded-full ${form.description.length >= 10 ? 'bg-green-500' : 'bg-gray-500'} transition-colors duration-200`}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default AddMovie;