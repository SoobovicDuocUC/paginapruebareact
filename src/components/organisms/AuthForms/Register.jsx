import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import AuthForm from '../../molecules/AuthForm.jsx';

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, clave);
    alert('Usuario registrado con éxito');
  };

  return (
    <AuthForm
      title="Registro"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      clave={clave}
      setClave={setClave}
      buttonText="Registrar"
    />
  );
}
