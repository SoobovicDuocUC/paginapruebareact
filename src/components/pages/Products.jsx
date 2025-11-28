import { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../molecules/ProductCard.jsx';

// ¡CORRECCIÓN FINAL! Es "../services/" (un solo ../ y en plural)
import productoService from '../services/ProductoService.js'; 

export default function Products() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    productoService.getProductosByCategoria(categoria)
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al cargar productos:', error);
      });
  }, [categoria]); 

  const filtrados = productos; 

  return (
    <div className="productos-container">
      <h2>Nuestros Productos</h2>
      <div className="productos-grid">
        {filtrados.length > 0 ? (
          filtrados.map((p, i) => <ProductCard key={i} producto={p} />)
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>
      <button className="btn-atras" onClick={() => navigate('/catalogo')}>
        Volver Atrás
      </button>
    </div>
  );
}