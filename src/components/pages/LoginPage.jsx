import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const [showLogin, setShowLogin] = useState(false);
  
  // Register form
  const [correo, setCorreo] = useState('');
  const [clave1, setClave1] = useState('');
  const [clave2, setClave2] = useState('');
  const [errorRegistro, setErrorRegistro] = useState('');
  
  // Login form
  const [loginCorreo, setLoginCorreo] = useState('');
  const [loginClave, setLoginClave] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorRegistro('');

    if (!correo) {
      setErrorRegistro('El correo es obligatorio');
      return;
    }

    if (!isValidEmail(correo)) {
      setErrorRegistro('Por favor ingresa un correo válido');
      return;
    }

    if (!clave1) {
      setErrorRegistro('La contraseña es obligatoria');
      return;
    }

    if (clave1.length < 6) {
      setErrorRegistro('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (clave1 !== clave2) {
      setErrorRegistro('Las contraseñas no coinciden');
      return;
    }

    register(correo, clave1);
    setErrorRegistro('');
    setCorreo('');
    setClave1('');
    setClave2('');
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setShowLogin(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorLogin('');

    if (!loginCorreo) {
      setErrorLogin('El correo es obligatorio');
      return;
    }

    if (!loginClave) {
      setErrorLogin('La contraseña es obligatoria');
      return;
    }

    if (login(loginCorreo, loginClave)) {
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

                <button type="submit" className="submit-btn">Registrarse</button>
              </form>
              <p className="switch-form">
                ¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setShowLogin(true); }}>Iniciar sesión</a>
              </p>
              {errorRegistro && <p className="error-message">{errorRegistro}</p>}
            </div>
          </div>
        ) : (
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