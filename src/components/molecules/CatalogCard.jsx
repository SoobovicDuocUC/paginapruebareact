import { Link } from 'react-router-dom';

export default function CatalogCard({ categoria, image }) {
  return (
    <div className="catalog-card" style={{ textAlign: 'center', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <img src={image} alt={categoria} width="150" />
      <h3>{categoria}</h3>
      <Link to={`/productos/${categoria.toLowerCase()}`}>Ver {categoria}</Link>
    </div>
  );
}