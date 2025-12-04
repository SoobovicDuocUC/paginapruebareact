import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../molecules/ProductCard.jsx';

export default function Products() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener productos del backend
    const fetchProductos = async () => {
      try {
        setLoading(true);
        // Hacemos la petición al backend filtrando por categoría
        // Asegúrate de que la categoría en la URL coincida con la BD (ej: "frutas", "verduras")
        const response = await fetch(`http://localhost:8080/api/productos/categoria/${categoria}`);
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          console.error("Error al obtener productos");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoria]);

  return (
    <div className="productos-container">
      <h2>Nuestros Productos: {categoria}</h2>
      
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="productos-grid">
          {productos.length > 0 ? (
            productos.map((p) => <ProductCard key={p.id} producto={p} />)
          ) : (
            <p>No hay productos disponibles en esta categoría.</p>
          )}
        </div>
      )}
      
      <button className="btn-atras" onClick={() => navigate('/catalogo')}>
        Volver Atrás
      </button>
    </div>
  );
}