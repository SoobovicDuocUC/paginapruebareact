import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../molecules/AuthForm.jsx';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, clave)) {
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
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
