import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null); // Guardamos el rol

  useEffect(() => {
    // Al recargar, recuperamos la sesión
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('usuario');
    const storedRole = localStorage.getItem('role');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setRole(storedRole);
      setLogged(true);
    }
  }, []);

  async function register(email, password, roleInput) {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: roleInput || 'USER' })
      });
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function login(email, password) {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', data.email);
        localStorage.setItem('role', data.role);
        setToken(data.token);
        setUser(data.email);
        setRole(data.role);
        setLogged(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  function logout() {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setRole(null);
    setLogged(false);
  }

  return (
    <AuthContext.Provider value={{ user, logged, token, role, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);