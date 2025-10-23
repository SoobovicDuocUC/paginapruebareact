import Input from '../atoms/Input.jsx';
import Button from '../atoms/Button.jsx';

export default function AuthForm({ title, onSubmit, email, setEmail, clave, setClave, buttonText }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
      <h2>{title}</h2>
      <Input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
      <Input type="password" placeholder="Contraseña" value={clave} onChange={e => setClave(e.target.value)} />
      <Button type="submit">{buttonText}</Button>
    </form>
  );
}
