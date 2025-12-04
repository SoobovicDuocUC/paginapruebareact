import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; // Importamos Auth

export default function ProductoForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { token } = useAuth(); // Necesitamos el token para Guardar/Editar

  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [img, setImg] = useState('');
  const [categoria, setCategoria] = useState('frutas'); 
  const [precioKilo, setPrecioKilo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const pageTitle = id ? 'Editar Producto' : 'Añadir Producto';

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/productos/${id}`)
        .then(res => res.json())
        .then(p => {
          setCodigo(p.codigo);
          setNombre(p.nombre);
          setPrecio(p.precio);
          setImg(p.img);
          setCategoria(p.categoria);
          setPrecioKilo(p.precioKilo || ''); 
          setDescripcion(p.descripcion || ''); 
        })
        .catch(error => console.error('Error al cargar producto:', error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const producto = { codigo, nombre, precio: parseInt(precio), img, categoria, precioKilo, descripcion };
    
    const url = id 
      ? `http://localhost:8080/api/productos/${id}` // Editar
      : 'http://localhost:8080/api/productos';      // Crear
      
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Token obligatorio
        },
        body: JSON.stringify(producto)
      });

      if (response.ok) {
        alert(id ? 'Producto actualizado' : 'Producto creado');
        navigate('/admin');
      } else {
        alert('Error al guardar. Verifica que seas Administrador.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{marginBottom:'1rem', color:'#2E8B57'}}>{pageTitle}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Código (ej: FR004)" value={codigo} onChange={e => setCodigo(e.target.value)} required style={inputStyle}/>
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required style={inputStyle}/>
        <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} required style={inputStyle}/>
        <input type="text" placeholder="URL de la Imagen" value={img} onChange={e => setImg(e.target.value)} style={inputStyle}/>
        
        <select value={categoria} onChange={e => setCategoria(e.target.value)} style={inputStyle}>
          <option value="frutas">Frutas</option>
          <option value="verduras">Verduras</option>
          <option value="organicos">Orgánicos</option>
          <option value="lacteos">Lácteos</option>
        </select>
        
        <input type="text" placeholder="Precio por Kilo (ej: $1.990 x kg)" value={precioKilo} onChange={e => setPrecioKilo(e.target.value)} style={inputStyle}/>
        <input type="text" placeholder="Descripción (ej: Granel)" value={descripcion} onChange={e => setDescripcion(e.target.value)} style={inputStyle}/>
        
        <div style={{display:'flex', gap:'10px'}}>
            <button type="submit" style={{ ...btnStyle, backgroundColor: '#2E8B57' }}>
            {id ? 'Actualizar' : 'Guardar'}
            </button>
            <button type="button" onClick={() => navigate('/admin')} style={{ ...btnStyle, backgroundColor: 'grey' }}>
            Cancelar
            </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ddd' };
const btnStyle = { padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 };