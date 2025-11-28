import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// ¡CORRECCIÓN FINAL! Es "../services/" (un solo ../ y en plural)
import productoService from '../services/ProductoService.js'; 

export default function ProductoForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [img, setImg] = useState('');
  const [categoria, setCategoria] = useState('frutas'); 
  const [precioKilo, setPrecioKilo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const pageTitle = id ? 'Editar Producto' : 'Añadir Producto';

  useEffect(() => {
    if (id) {
      productoService.getProductoById(id)
        .then(response => {
          const p = response.data;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const producto = { codigo, nombre, precio: parseInt(precio), img, categoria, precioKilo, descripcion };

    if (id) {
      productoService.updateProducto(id, producto)
        .then(() => navigate('/admin'))
        .catch(error => console.error('Error al actualizar:', error));
    } else {
      productoService.createProducto(producto)
        .then(() => navigate('/admin'))
        .catch(error => console.error('Error al crear:', error));
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>{pageTitle}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Código (ej: FR004)" value={codigo} onChange={e => setCodigo(e.target.value)} required />
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} required />
        <input type="text" placeholder="URL de la Imagen" value={img} onChange={e => setImg(e.target.value)} required />
        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="frutas">Frutas</option>
          <option value="verduras">Verduras</option>
          <option value="organicos">Orgánicos</option>
          <option value="lacteos">Lácteos</option>
        </select>
        <input type="text" placeholder="Precio por Kilo (ej: $1.990 x kg)" value={precioKilo} onChange={e => setPrecioKilo(e.target.value)} />
        <input type="text" placeholder="Descripción (ej: Granel)" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        
        <button type="submit" className="btn" style={{ backgroundColor: '#2E8B57' }}>
          {id ? 'Actualizar' : 'Guardar'}
        </button>
        <button type="button" className="btn" onClick={() => navigate('/admin')} style={{ backgroundColor: 'grey' }}>
          Cancelar
        </button>
      </form>
    </div>
  );
}