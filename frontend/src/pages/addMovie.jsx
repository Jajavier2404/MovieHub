import React, { useState } from 'react';
import filmReelIcon from '../assets/images/vinilo.png'; 

function AddMovie() {
  const [form, setForm] = useState({ title: '', year: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ isVisible: false, message: '', isSuccess: false });
  const [progress, setProgress] = useState(0);

  // Funciones para el modal
  const showModal = (message, isSuccess) => {
    setModal({ isVisible: true, message, isSuccess });
  };

  const hideModal = () => {
    setModal({ isVisible: false, message: '', isSuccess: false });
  };

  // Simulador de progreso
  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return interval;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    
    // --- Lógica de validación concisa ---
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!form.year) newErrors.year = 'El año es obligatorio';
    if (!form.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (form.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // --- Fin de la lógica de validación concisa ---
    
    setIsSubmitting(true);
    setErrors({}); // Limpiar errores previos
    
    // Iniciar barra de progreso
    const progressInterval = simulateProgress();
    
    try {
      // --- Lógica de envío de la película optimizada ---
      const response = await fetch('http://localhost:8000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Asegúrate de que este token sea el correcto para tu autenticación
          Authorization: `Bearer ${localStorage.getItem('token') || 'demo-token'}` 
        },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        // Esperar a que la barra de progreso simule el 100% antes de mostrar el éxito
        setTimeout(() => {
          showModal('¡Película agregada exitosamente! 🎉', true);
          setForm({ title: '', year: '', description: '' }); // Resetear el formulario
          setProgress(0); // Resetear progreso visual
        }, 2200); // Ajustar este tiempo si tu simulación es más larga o corta
      } else {
        clearInterval(progressInterval); // Detener el progreso si hay un error
        setProgress(0); // Resetear progreso
        const errorData = await response.json();
        const errorMessage = errorData.message || errorData.detail || 'Error al guardar la película';
        showModal(errorMessage, false);
      }
    } catch (error) {
      clearInterval(progressInterval); // Detener el progreso si hay un error de red
      setProgress(0); // Resetear progreso
      console.error('Error adding movie:', error);
      showModal('Error de conexión con el servidor. Inténtalo de nuevo.', false);
    } finally {
      // Retrasar el setIsSubmitting(false) para que la animación del modal o de éxito se complete
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2200); 
    }
    // --- Fin de la lógica de envío de la película optimizada ---
  };

  const currentYear = new Date().getFullYear();
  // Calcula el progreso del formulario: 1 punto por cada campo válido (título, año, descripción con mínimo 10 caracteres)
  const formProgress = [form.title.trim(), form.year, form.description.trim().length >= 10].filter(Boolean).length;
  const progressPercentage = (formProgress / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        .movie-container {
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
          width: 95%;
          max-width: 1100px;
          min-height: 600px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 15px 25px rgba(0,0,0,0.3);
          background: linear-gradient(135deg, rgba(26, 32, 44, 0.95), rgba(45, 55, 72, 0.95));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
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
        
        .shape:nth-child(1) { width: 100px; height: 100px; top: 20%; left: 10%; animation-delay: 0s; }
        .shape:nth-child(2) { width: 150px; height: 150px; top: 60%; left: 20%; animation-delay: 2s; }
        .shape:nth-child(3) { width: 80px; height: 80px; top: 30%; right: 15%; animation-delay: 4s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        .form-section {
          position: relative;
          z-index: 10;
          padding: 40px;
          width: 60%;
          height: 100%;
          color: #E2E8F0;
        }
        
        .visual-section {
          position: absolute;
          right: 0;
          top: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border-radius: 0 20px 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .cinema-animation {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .film-reel {
          width: 120px;
          height: 120px;
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          position: relative;
          animation: rotate 4s linear infinite;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
        }
        
        .film-reel-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .film-reel::before,
        .film-reel::after {
          content: '';
          position: absolute;
          width: 15px;
          height: 15px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .film-reel::before {
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .film-reel::after {
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .movie-icons {
          display: flex;
          gap: 20px;
          font-size: 2rem;
          animation: bounce 2s ease-in-out infinite alternate;
        }
        
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
        
        .auth-input {
          background-color: rgba(45, 55, 72, 0.6);
          border: 2px solid rgba(99, 102, 241, 0.3);
          color: #E2E8F0;
          padding: 15px 20px;
          margin: 12px 0;
          width: 100%;
          border-radius: 12px;
          transition: all 0.3s ease;
          font-size: 16px;
          backdrop-filter: blur(5px);
        }
        
        .auth-input::placeholder { color: #A0AEC0; }
        .auth-input:focus {
          outline: none;
          border-color: #6366F1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
          background-color: rgba(45, 55, 72, 0.8);
        }
        
        .auth-input.error {
          border-color: #EF4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
        }
        
        .auth-button {
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
          width: 100%;
          margin-top: 20px;
        }
        
        .auth-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
        }
        
        .auth-button:active:not(:disabled) { transform: translateY(0); }
        .auth-button:disabled { 
          background: linear-gradient(135deg, #4A5568, #6B7280);
          cursor: not-allowed; 
          transform: none;
          box-shadow: none;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin: 20px 0;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .submission-progress {
          width: 100%;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 15px;
        }
        
        .submission-fill {
          height: 100%;
          background: linear-gradient(90deg, #10B981, #06D6A0);
          border-radius: 3px;
          transition: width 0.2s ease;
        }
        
        .modal-backdrop {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);
          z-index: 1000; opacity: 0; transition: opacity 0.3s ease;
        }
        .modal-backdrop.visible { opacity: 1; }
        
        .custom-modal {
          position: fixed; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.95);
          background: linear-gradient(135deg, rgba(30, 40, 50, 0.95), rgba(45, 55, 72, 0.95));
          padding: 40px 30px; border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          z-index: 1001; opacity: 0; transition: all 0.3s ease;
          min-width: 350px; max-width: 450px; width: 90%;
          text-align: center; border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
        }
        .custom-modal.visible { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        
        .modal-icon {
          width: 80px; height: 80px; margin: 0 auto 25px auto; border-radius: 50%;
          display: flex; justify-content: center; align-items: center;
          font-size: 40px; color: white;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        .modal-icon.success { background: linear-gradient(135deg, #10B981, #059669); }
        .modal-icon.error { background: linear-gradient(135deg, #EF4444, #DC2626); }
        
        .field-group {
          margin-bottom: 25px;
        }
        
        .field-label {
          display: block;
          color: #E2E8F0;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .error-message {
          color: #F87171;
          font-size: 14px;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .form-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
          padding: 15px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 10px;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #E2E8F0;
          font-size: 14px;
        }
        
        .stat-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }
        
        .stat-dot.complete { background-color: #10B981; }
        .stat-dot.incomplete { background-color: #6B7280; }
      `}</style>

      <div className="movie-container">
        {/* Floating background shapes */}
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        {/* Form section */}
        <div className="form-section">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Agregar Nueva Película
            </h1>
            <p className="text-gray-300 text-lg">
              Comparte una película increíble con la comunidad 🎬
            </p>
          </div>

          {/* Form progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">Progreso del formulario</span>
              <span className="text-sm font-semibold text-purple-400">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Title field */}
            <div className="field-group">
              <label className="field-label">🎭 Título de la película</label>
              <input
                type="text"
                placeholder="Ej: El Padrino, Inception, Interstellar..."
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className={`auth-input ${errors.title ? 'error' : ''}`}
                disabled={isSubmitting}
                required
              />
              {errors.title && (
                <div className="error-message">
                  <span>⚠️</span>
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Year field */}
            <div className="field-group">
              <label className="field-label">📅 Año de lanzamiento</label>
              <input
                type="number"
                placeholder={`Ej: ${currentYear}`}
                min="1900"
                max={currentYear + 2}
                value={form.year}
                onChange={e => setForm({ ...form, year: e.target.value })}
                className={`auth-input ${errors.year ? 'error' : ''}`}
                disabled={isSubmitting}
                required
              />
              {errors.year && (
                <div className="error-message">
                  <span>⚠️</span>
                  <span>{errors.year}</span>
                </div>
              )}
            </div>

            {/* Description field */}
            <div className="field-group">
              <label className="field-label">📖 Descripción / Sinopsis</label>
              <textarea
                placeholder="Cuenta de qué trata la película, su género, actores principales, o por qué la recomiendas..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={4}
                className={`auth-input resize-none ${errors.description ? 'error' : ''}`}
                disabled={isSubmitting}
                required
              />
              <div className="flex justify-between items-center mt-2">
                {errors.description ? (
                  <div className="error-message">
                    <span>⚠️</span>
                    <span>{errors.description}</span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">
                    {form.description.length}/10 caracteres mínimo
                  </span>
                )}
                <div className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  form.description.length >= 10 ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
              </div>
            </div>

            {/* Form statistics */}
            <div className="form-stats">
              <div className="stat-item">
                <div className={`stat-dot ${form.title.trim() ? 'complete' : 'incomplete'}`}></div>
                <span>Título</span>
              </div>
              <div className="stat-item">
                <div className={`stat-dot ${form.year ? 'complete' : 'incomplete'}`}></div>
                <span>Año</span>
              </div>
              <div className="stat-item">
                <div className={`stat-dot ${form.description.length >= 10 ? 'complete' : 'incomplete'}`}></div>
                <span>Descripción</span>
              </div>
            </div>

            {/* Submission progress bar */}
            {isSubmitting && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-300">Guardando película...</span>
                  <span className="text-sm font-semibold text-green-400">{progress}%</span>
                </div>
                <div className="submission-progress">
                  <div 
                    className="submission-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              onClick={handleAdd} // We use onClick and not onSubmit on the form wrapper
              disabled={isSubmitting || !form.title.trim() || !form.year || form.description.trim().length < 10}
              className="auth-button"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Guardando película...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>🎬</span>
                  <span>Guardar Película</span>
                  <span>🌟</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Visual section */}
        <div className="visual-section">
          <div className="cinema-animation">
            <div className="film-reel">
              <img 
                src={filmReelIcon} 
                alt="Cinema background"
                className="film-reel-image"
              />
            </div>
            <div className="movie-icons">
              <div>🎬</div>
              <div>🎭</div>
              <div>🍿</div>
            </div>
            <div className="text-center mt-8 px-6">
              <h3 className="text-2xl font-bold mb-4">¡Luces, Cámara, Acción!</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Cada película que compartes enriquece nuestra comunidad. 
                Tu recomendación puede ser el próximo tesoro cinematográfico de alguien más.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.isVisible && (
        <>
          <div className="modal-backdrop visible" onClick={hideModal}></div>
          <div className="custom-modal visible">
            <div className="relative">
              <button
                className="absolute -top-4 -right-4 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                onClick={hideModal}
              >
                ×
              </button>
              <div className={`modal-icon ${modal.isSuccess ? 'success' : 'error'}`}>
                {modal.isSuccess ? '✓' : '✕'}
              </div>
              <h3 className="text-white text-xl font-bold mb-2">
                {modal.isSuccess ? '¡Éxito!' : 'Error'}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">{modal.message}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddMovie;