import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/video/login.mp4'; // Asegúrate que esta ruta sea correcta

function SlidingAuthForm() {
  const navigate = useNavigate();
  
  // Estados para el formulario
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Estados para los formularios
  const [loginData, setLoginData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [registerData, setRegisterData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  
  // Estados para el modal
  const [modal, setModal] = useState({ isVisible: false, message: '', isSuccess: false });

  // Funciones para el modal
  const showModal = (message, isSuccess) => {
    setModal({ isVisible: true, message, isSuccess });
  };

  const hideModal = () => {
    setModal({ isVisible: false, message: '', isSuccess: false });
  };

  // Manejar registro (lógica original)
  const handleRegister = async () => {
    if (!registerData.username || !registerData.email || !registerData.password) {
      showModal('Todos los campos son obligatorios', false);
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(registerData)
      });
      const data = await response.json();
      if (response.ok) {
        showModal('Registro exitoso. ¡Ahora inicia sesión!', true);
        setTimeout(() => {
          setIsRightPanelActive(false);
          setRegisterData({ username: '', email: '', password: '' });
          hideModal();
        }, 2000);
      } else {
        const errorMessage = data.message || data.detail || 'Error en el registro';
        showModal(errorMessage, false);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      showModal('Error de conexión con el servidor', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar login (lógica original)
  const handleLogin = async () => {
    if (!loginData.username || !loginData.email || !loginData.password) {
      showModal('Todos los campos son obligatorios', false);
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          username: loginData.username,
          email: loginData.email,
          password: loginData.password
        })
      });
      const data = await response.json();
      if (response.ok && data.access_token) {
        localStorage.setItem('token', data.access_token);
        showModal('Inicio de sesión exitoso. Redirigiendo...', true);
        setTimeout(() => {
          hideModal();
          navigate('/');
        }, 1500);
        setLoginData({ username: '', email: '', password: '' });
      } else {
        const errorMessage = data.message || data.detail || 'Credenciales inválidas.';
        showModal(errorMessage, false);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      showModal('Error de conexión con el servidor.', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      {/* INICIO DE ESTILOS CORREGIDOS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        .sliding-container {
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
          width: 90%;
          max-width: 900px;
          min-height: 550px;
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0,0,0,0.4), 0 10px 10px rgba(0,0,0,0.3);
          background-color: #1a202c;
        }
        
        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
          width: 50%;
        }
        
        .sign-in-container {
          left: 0;
          z-index: 2;
        }
        
        .sign-up-container {
          left: 0;
          opacity: 0;
          z-index: 1;
        }
        
        .form-panel {
          background-color: rgba(26, 32, 44, 0.95);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 10px;
          height: 100%;
          text-align: center;
          color: #E2E8F0;
        }
        
        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }
        
        .overlay {
          background: linear-gradient(to right, rgba(10, 20, 30, 0.8), rgba(30, 50, 60, 0.7));
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
          color: white;
        }
        
        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }
        
        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }
        
        .overlay-left {
          transform: translateX(-20%);
        }
        
        .overlay-right {
          right: 0;
          transform: translateX(0);
        }

        /* --- Reglas de animación para el cambio de panel CORREGIDAS --- */
        
        .right-panel-active .sign-in-container {
          transform: translateX(100%);
          opacity: 0;
          z-index: 1;
        }

        .right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: show 0.6s;
        }

        .right-panel-active .overlay-container {
          transform: translateX(-100%);
        }
        
        .right-panel-active .overlay {
          transform: translateX(50%);
        }
        
        .right-panel-active .overlay-left {
          transform: translateX(0);
        }
        
        .right-panel-active .overlay-right {
          transform: translateX(20%);
        }
        
        @keyframes show {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }
          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }
        
        .auth-input {
          background-color: #2D3748;
          border: 1px solid #4A5568;
          color: #E2E8F0;
          padding: 12px 15px;
          margin: 8px 0;
          width: 100%;
          border-radius: 5px;
          transition: border-color 0.3s;
        }
        .auth-input::placeholder { color: #A0AEC0; }
        .auth-input:focus {
          outline: none;
          border-color: #6366F1;
        }
        
        .auth-button {
          border-radius: 20px;
          border: 1px solid #6366F1;
          background-color: #6366F1;
          color: white;
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .auth-button:hover {
          background-color: #4F46E5;
          border-color: #4F46E5;
          transform: scale(1.05);
        }
        .auth-button:active { transform: scale(0.95); }
        .auth-button:disabled { background-color: #4A5568; border-color: #4A5568; cursor: not-allowed; opacity: 0.6; }
        
        .ghost-button {
          background-color: transparent;
          border-color: white;
        }
        .ghost-button:hover { background-color: rgba(255, 255, 255, 0.1); }
        
        .social-container { margin: 20px 0; }
        .social-icon {
          border: 1px solid #4A5568;
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
          color: #A0AEC0;
          transition: all 0.3s ease;
        }
        .social-icon:hover { color: white; border-color: #6366F1; }
        
        .modal-backdrop {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px);
          z-index: 1000; opacity: 0; transition: opacity 0.3s ease;
        }
        .modal-backdrop.visible { opacity: 1; }
        
        .custom-modal {
          position: fixed; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.95);
          background-color: rgba(30, 40, 50, 0.95);
          padding: 30px 20px; border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); z-index: 1001;
          opacity: 0; transition: all 0.3s ease;
          min-width: 300px; max-width: 400px; width: 90%;
          text-align: center; border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .custom-modal.visible { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        
        .modal-icon {
          width: 60px; height: 60px; margin: 0 auto 20px auto; border-radius: 50%;
          display: flex; justify-content: center; align-items: center;
          font-size: 30px; color: white;
        }
        .modal-icon.success { background-color: #2ecc71; }
        .modal-icon.error { background-color: #e74c3c; }

        /* Centrar el botón de login */
        .login-button-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 20px;
        }
      `}</style>
      {/* FIN DE ESTILOS */}

      <div className={`sliding-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        
        {/* Formulario de Iniciar Sesión */}
        <div className="form-container sign-in-container">
          <div className="form-panel">
            <div className="w-full max-w-sm">
              <h1 className="text-3xl font-bold text-white mb-4">Iniciar Sesión</h1>
              <div className="social-container">
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
              </div>
              <span className="text-sm text-gray-400 mb-4">o usa tu cuenta</span>
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              {/* Botón centrado sin "¿Olvidaste tu contraseña?" */}
              <div className="login-button-container">
                <button onClick={handleLogin} disabled={isSubmitting} className="auth-button">
                  {isSubmitting ? 'Verificando...' : 'Iniciar Sesión'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Registro */}
        <div className="form-container sign-up-container">
          <div className="form-panel">
            <div className="w-full max-w-sm">
              <h1 className="text-3xl font-bold text-white mb-4">Regístrate Aquí</h1>
              <div className="social-container">
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
              </div>
              <span className="text-sm text-gray-400 mb-4">o crea tu cuenta</span>
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={registerData.username}
                onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <button onClick={handleRegister} disabled={isSubmitting} className="auth-button mt-4">
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <video autoPlay loop muted playsInline className="background-video">
              <source src={fondo} type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
            <div className="overlay-panel overlay-left">
              <h1 className="text-4xl font-bold mb-4">¡Bienvenido de nuevo!</h1>
              <p className="text-lg mb-8 px-4">Para seguir conectado con nosotros, por favor inicia sesión con tus datos</p>
              <button className="auth-button ghost-button" onClick={() => setIsRightPanelActive(false)}>Iniciar Sesión</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-4xl font-bold mb-4">¡Hola, Amigo!</h1>
              <p className="text-lg mb-8 px-4">Ingresa tus datos personales y comienza tu aventura con nosotros</p>
              <button className="auth-button ghost-button" onClick={() => setIsRightPanelActive(true)}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.isVisible && (
        <>
          <div className={`modal-backdrop visible`} onClick={hideModal}></div>
          <div className={`custom-modal visible`}>
            <div className="relative">
              <button
                className="absolute -top-4 -right-2 text-gray-400 hover:text-white text-3xl p-2"
                onClick={hideModal}
              >
                &times;
              </button>
              <div className={`modal-icon ${modal.isSuccess ? 'success' : 'error'}`}>
                {modal.isSuccess ? '✓' : '✕'}
              </div>
              <p className="text-white text-lg font-semibold mt-4">{modal.message}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SlidingAuthForm;