import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; // Importamos Auth

export default function ProductoList() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const { token, role } = useAuth(); // Necesitamos el token para borrar

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/productos');
      if (response.ok) {
        setProductos(await response.json());
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${token}` // Token obligatorio para borrar
          }
        });
        
        if (response.ok) {
          fetchProductos(); // Recargar lista
        } else {
          alert("Error al eliminar (¿Tienes permisos?)");
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  // Si no es admin, mostramos mensaje (opcional)
  if (role !== 'ADMIN') return <h2 style={{textAlign:'center', marginTop:'2rem'}}>Acceso Denegado</h2>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
      <h2>Gestión de Productos</h2>
      <Link to="/admin/add" className="btn" style={{ display:'inline-block', padding:'10px', textDecoration:'none', color:'white', marginBottom: '1rem', backgroundColor: '#2E8B57', borderRadius:'5px' }}>
        Añadir Nuevo Producto
      </Link>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop:'1rem' }}>
        <thead>
          <tr style={{background:'#f2f2f2'}}>
            <th style={tableCellStyle}>Código</th>
            <th style={tableCellStyle}>Nombre</th>
            <th style={tableCellStyle}>Categoría</th>
            <th style={tableCellStyle}>Precio</th>
            <th style={tableCellStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id} style={{borderBottom:'1px solid #ddd'}}>
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

const tableCellStyle = { padding: '10px', textAlign: 'left' };
const buttonStyle = (color) => ({ backgroundColor: color, color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' });