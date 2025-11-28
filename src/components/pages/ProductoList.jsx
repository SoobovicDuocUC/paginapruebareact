import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ¡CORRECCIÓN FINAL! Es "../services/" (un solo ../ y en plural)
import productoService from '../services/ProductoService.js'; 

export default function ProductoList() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  // Función para cargar todos los productos
  const fetchProductos = () => {
    productoService.getAllProductos()
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => console.error('Error al cargar productos:', error));
  };

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProductos();
  }, []);

  // Función para borrar
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      productoService.deleteProducto(id)
        .then(() => {
          // Recargar la lista de productos después de borrar
          fetchProductos(); 
        })
        .catch(error => console.error('Error al eliminar producto:', error));
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
      <h2>Gestión de Productos</h2>
      <Link to="/admin/add" className="btn" style={{ marginBottom: '1rem', backgroundColor: '#2E8B57' }}>
        Añadir Nuevo Producto
      </Link>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableCellStyle}>Código</th>
            <th style={tableCellStyle}>Nombre</th>
            <th style={tableCellStyle}>Categoría</th>
            <th style={tableCellStyle}>Precio</th>
            <th style={tableCellStyle}>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td style={tableCellStyle}>{producto.codigo}</td>
              <td style={tableCellStyle}>{producto.nombre}</td>
              <td style={tableCellStyle}>{producto.categoria}</td>
              <td style={tableCellStyle}>${producto.precio}</td>
              <td style={tableCellStyle}>
                <button 
                  onClick={() => navigate(`/admin/edit/${producto.id}`)} 
                  style={{ marginRight: '5px', ...buttonStyle('blue') }}>
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(producto.id)} 
                  style={buttonStyle('red')}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

// Estilos para la tabla (puedes moverlos a tu CSS)
const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left'
};

const buttonStyle = (color) => ({
  backgroundColor: color,
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
});