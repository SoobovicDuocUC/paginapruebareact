import { createContext, useContext, useState, useEffect } from 'react';
import usuarioService from '../components/services/UsuarioService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    // Recuperar sesión al recargar la página
    const storedUser = localStorage.getItem('usuario_data');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLogged(true);
    }
  }, []);

  const register = async (email, password, role) => {
    try {
      // Enviamos el usuario y su rol al backend
      await usuarioService.register({ email, password, role });
      return true;
    } catch (error) {
      console.error("Error en registro:", error);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await usuarioService.login(email, password);
      if (response.data) {
        setUser(response.data); // Guardamos los datos del usuario (incluido el rol)
        setLogged(true);
        localStorage.setItem('usuario_data', JSON.stringify(response.data));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  const logout = () => {
    setLogged(false);
    setUser(null);
    localStorage.removeItem('usuario_data');
  };

  return (
    <AuthContext.Provider value={{ user, logged, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);