import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const [showLogin, setShowLogin] = useState(true); // Iniciar mostrando Login por defecto
  
  // Register form state
  const [correo, setCorreo] = useState('');
  const [clave1, setClave1] = useState('');
  const [clave2, setClave2] = useState('');
  const [rol, setRol] = useState('USER'); // Nuevo estado para el Rol
  const [errorRegistro, setErrorRegistro] = useState('');
  
  // Login form state
  const [loginCorreo, setLoginCorreo] = useState('');
  const [loginClave, setLoginClave] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => { // Async para esperar al backend
    e.preventDefault();
    setErrorRegistro('');

    if (!correo || !isValidEmail(correo)) {
      setErrorRegistro('Ingresa un correo válido');
      return;
    }
    if (clave1.length < 4) { // Ajustado a longitud razonable para pruebas
      setErrorRegistro('La contraseña es muy corta');
      return;
    }
    if (clave1 !== clave2) {
      setErrorRegistro('Las contraseñas no coinciden');
      return;
    }

    // Pasamos el rol seleccionado a la función register
    const exito = await register(correo, clave1, rol);
    
    if (exito) {
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      // Limpiar formulario y cambiar a login
      setCorreo(''); setClave1(''); setClave2(''); setRol('USER');
      setShowLogin(true);
    }
  };

  const handleLogin = async (e) => { // Async para esperar al backend
    e.preventDefault();
    setErrorLogin('');

    const exito = await login(loginCorreo, loginClave);
    
    if (exito) {
      navigate('/');
    } else {
      setErrorLogin('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-overlay"></div>
        
        {!showLogin ? (
          /* FORMULARIO DE REGISTRO */
          <div className="form-container">
            <div className="form-content">
              <h2>Crear una cuenta</h2>
              <form onSubmit={handleRegister}>
                <label htmlFor="correo">Correo electrónico:</label>
                <input
                  type="email"
                  id="correo"
                  placeholder="usuario@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />

                <label htmlFor="clave1">Contraseña:</label>
                <input
                  type="password"
                  id="clave1"
                  placeholder="Contraseña"
                  value={clave1}
                  onChange={(e) => setClave1(e.target.value)}
                  required
                />

                <label htmlFor="clave2">Repetir contraseña:</label>
                <input
                  type="password"
                  id="clave2"
                  placeholder="Repetir contraseña"
                  value={clave2}
                  onChange={(e) => setClave2(e.target.value)}
                  required
                />

                {/* SELECTOR DE ROL AÑADIDO */}
                <label htmlFor="rol">Tipo de Usuario:</label>
                <select 
                  id="rol" 
                  value={rol} 
                  onChange={(e) => setRol(e.target.value)}
                  style={{
                    padding: '0.7rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    backgroundColor: 'white',
                    marginBottom: '1rem'
                  }}
                >
                  <option value="USER">Cliente</option>
                  <option value="ADMIN">Administrador</option>
                </select>

                <button type="submit" className="submit-btn">Registrarse</button>
              </form>
              <p className="switch-form">
                ¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setShowLogin(true); }}>Iniciar sesión</a>
              </p>
              {errorRegistro && <p className="error-message">{errorRegistro}</p>}
            </div>
          </div>
        ) : (
          /* FORMULARIO DE LOGIN */
          <div className="form-container">
            <div className="form-content">
              <h2>Iniciar sesión</h2>
              <form onSubmit={handleLogin}>
                <label htmlFor="loginCorreo">Correo electrónico:</label>
                <input
                  type="email"
                  id="loginCorreo"
                  placeholder="usuario@correo.com"
                  value={loginCorreo}
                  onChange={(e) => setLoginCorreo(e.target.value)}
                  required
                />

                <label htmlFor="loginClave">Contraseña:</label>
                <input
                  type="password"
                  id="loginClave"
                  placeholder="Contraseña"
                  value={loginClave}
                  onChange={(e) => setLoginClave(e.target.value)}
                  required
                />

                <button type="submit" className="submit-btn">Entrar</button>
              </form>
              <p className="switch-form">
                ¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setShowLogin(false); }}>Registrarse</a>
              </p>
              {errorLogin && <p className="error-message">{errorLogin}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}