import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const [registeredPassword, setRegisteredPassword] = useState(null);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('usuario');
    const savedPassword = localStorage.getItem('clave');
    const isLogged = localStorage.getItem('logueado') === 'true';
    
    if (savedUser) setRegisteredEmail(savedUser);
    if (savedPassword) setRegisteredPassword(savedPassword);
    if (isLogged && savedUser) {
      setUser(savedUser);
      setLogged(true);
    }
  }, []);

  function register(email, pass) {
    localStorage.setItem('usuario', email);
    localStorage.setItem('clave', pass);
    setRegisteredEmail(email);
    setRegisteredPassword(pass);
  }

  function login(email, pass) {
    const saved = registeredEmail || localStorage.getItem('usuario');
    const clave = registeredPassword || localStorage.getItem('clave');
    
    if (email === saved && pass === clave) {
      setLogged(true);
      setUser(email);
      localStorage.setItem('logueado', 'true');
      return true;
    }
    return false;
  }

  function logout() {
    setLogged(false);
    setUser(null);
    localStorage.removeItem('logueado');
  }

  return (
    <AuthContext.Provider value={{ user, logged, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);