import Button from '../atoms/Button.jsx';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section">
      <div>
        <h1>BIENVENIDO A HUERTO HOGAR</h1>
        <p>Frutas y verduras frescas directo a tu mesa.</p>
        <Link to="/catalogo" className="btn">Explorar Catálogo</Link>
      </div>
    </section>
  );
}