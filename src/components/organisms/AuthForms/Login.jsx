import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../molecules/AuthForm.jsx';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exito = await login(email, clave);
    if (exito) {
      navigate('/');
    } else {
      alert('Credenciales incorrectas o error de conexión');
    }
  };

  return (
    <AuthForm
      title="Iniciar Sesión"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      clave={clave}
      setClave={setClave}
      buttonText="Entrar"
    />
  );
}