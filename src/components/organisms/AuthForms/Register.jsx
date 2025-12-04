import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import AuthForm from '../../molecules/AuthForm.jsx';

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exito = await register(email, clave);
    if (exito) {
      alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
      setEmail('');
      setClave('');
    }
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