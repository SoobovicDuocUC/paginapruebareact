import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const [showLogin, setShowLogin] = useState(false);
  
  // Formulario Registro
  const [correo, setCorreo] = useState('');
  const [clave1, setClave1] = useState('');
  const [clave2, setClave2] = useState('');
  const [rol, setRol] = useState('USER'); // Por defecto es usuario normal
  const [errorRegistro, setErrorRegistro] = useState('');
  
  // Formulario Login
  const [loginCorreo, setLoginCorreo] = useState('');
  const [loginClave, setLoginClave] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorRegistro('');

    if (!correo || !isValidEmail(correo)) {
      setErrorRegistro('Ingresa un correo válido');
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

    // Registramos enviando también el rol seleccionado
    const success = await register(correo, clave1, rol);
    if (success) {
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setShowLogin(true);
      setCorreo(''); setClave1(''); setClave2('');
    } else {
      setErrorRegistro('Error al registrar. El correo podría estar en uso.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorLogin('');

    if (!loginCorreo || !loginClave) {
      setErrorLogin('Completa todos los campos');
      return;
    }

    const success = await login(loginCorreo, loginClave);
    if (success) {
      navigate('/');
    } else {
      setErrorLogin('Credenciales incorrectas');
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
                <input type="email" id="correo" placeholder="usuario@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

                <label htmlFor="clave1">Contraseña:</label>
                <input type="password" id="clave1" placeholder="Contraseña" value={clave1} onChange={(e) => setClave1(e.target.value)} required />

                <label htmlFor="clave2">Repetir contraseña:</label>
                <input type="password" id="clave2" placeholder="Repetir contraseña" value={clave2} onChange={(e) => setClave2(e.target.value)} required />

                {/* Selector de Rol */}
                <label htmlFor="rol">Tipo de Usuario:</label>
                <select 
                  id="rol" 
                  value={rol} 
                  onChange={(e) => setRol(e.target.value)}
                  style={{ padding: '0.7rem', borderRadius: '5px', border: '1px solid #ddd', background: 'white', marginBottom: '0.5rem' }}
                >
                  <option value="USER">Cliente Normal</option>
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
          <div className="form-container">
            <div className="form-content">
              <h2>Iniciar sesión</h2>
              <form onSubmit={handleLogin}>
                <label htmlFor="loginCorreo">Correo electrónico:</label>
                <input type="email" id="loginCorreo" placeholder="usuario@correo.com" value={loginCorreo} onChange={(e) => setLoginCorreo(e.target.value)} required />

                <label htmlFor="loginClave">Contraseña:</label>
                <input type="password" id="loginClave" placeholder="Contraseña" value={loginClave} onChange={(e) => setLoginClave(e.target.value)} required />

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