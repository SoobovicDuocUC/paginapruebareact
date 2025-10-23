import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../molecules/ProductCard.jsx';

const productos = [
  // FRUTAS
  { 
    codigo: 'FR001',
    nombre: 'Manzana Fuji', 
    precio: 937, 
    img: 'https://media.istockphoto.com/id/184276818/es/foto/manzana-red.jpg?s=612x612&w=0&k=20&c=BFD8ixD7eyXMm3aSVIdz1hUsLG-lX8Ig2HBr6IVJuzU=', 
    categoria: 'frutas',
    precioKilo: '$2.490 x kg',
    descripcion: 'Granel'
  },
  { 
    codigo: 'FR002',
    nombre: 'Naranjas Valencianas', 
    precio: 549, 
    img: 'https://media.istockphoto.com/id/185284489/es/foto/naranja.jpg?s=612x612&w=0&k=20&c=V_kmzGGofV9oTdQMU-SfT4Y9n3q9ksFZliED5O_eYPE=', 
    categoria: 'frutas',
    precioKilo: '$1.290 x kg',
    descripcion: 'Granel'
  },
  { 
    codigo: 'FR003',
    nombre: 'Plátanos Cavendish', 
    precio: 747, 
    img: 'https://media.istockphoto.com/id/173242750/es/foto/racimo-de-pl%C3%A1tanos.jpg?s=612x612&w=0&k=20&c=-RqILbvnZIp5YZRm3BGc-i5n_e2VsJCUu9GU9OqVAbk=', 
    categoria: 'frutas',
    precioKilo: '$1.490 x kg',
    descripcion: 'Granel'
  },
  
  // VERDURAS
  { 
    codigo: 'VR001',
    nombre: 'Zanahorias Hubolt', 
    precio: 937, 
    img: 'https://media.istockphoto.com/id/166106089/es/foto/aislado-de-zanahoria.jpg?s=612x612&w=0&k=20&c=4PYVf5-dUR1N5ZLjDBVBaATdUq3KjNS6tjFHiyaW6Xk=', 
    categoria: 'verduras',
    precioKilo: '$2.490 x kg',
    descripcion: 'Granel'
  },
  { 
    codigo: 'VR002',
    nombre: 'Espinacas Frescas', 
    precio: 549, 
    img: 'https://juanesparraguito.com/cdn/shop/files/FotosWeb_parte2_Mesadetrabajo1copia50.jpg?v=1711034505&width=1214', 
    categoria: 'verduras',
    precioKilo: '$1.290 x kg',
    descripcion: 'Granel'
  },
  { 
    codigo: 'VR003',
    nombre: 'Pimientos Tricolores', 
    precio: 747, 
    img: 'https://www.ammarket.com/wp-content/uploads/2021/11/pimiento_tricolor_ammarket_frutas_verduras_a_domicilio_2.jpg', 
    categoria: 'verduras',
    precioKilo: '$1.490 x kg',
    descripcion: 'Granel'
  },
  
  // ORGANICOS
  { 
    codigo: 'PO001',
    nombre: 'Miel Orgánica', 
    precio: 949, 
    img: 'https://www.ecopraha.cl/wp-content/uploads/2022/imagenes/POTE_MIEL_1KG.PNG', 
    categoria: 'organicos',
    precioKilo: '$2.490 x 2',
    descripcion: 'Granel'
  },
  { 
    codigo: 'PO002',
    nombre: 'Quinoa Avellana', 
    precio: 620, 
    img: 'https://acdn-us.mitiendanube.com/stores/002/625/145/products/granola-exotica-2023-04-03t152012-8511-89ac452da81f95c3b816805464075205-640-0.jpg', 
    categoria: 'organicos',
    precioKilo: '$1.490 x kg',
    descripcion: 'Granel'
  },
  
  // LACTEOS
  { 
    codigo: 'PL001',
    nombre: 'Leche Semidescremada Surlat', 
    precio: 1190, 
    img: 'https://i.bolder.run/r/czoyMzA1MyxnOjEwMDB4/0ab17529/856531-LECHE-SURLAT-SEMI-DESCREMADA-1LT.jpg', 
    categoria: 'lacteos',
    descripcion: '1 litro x unidad'
  },
];

export default function Products() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const filtrados = productos.filter(p => p.categoria === categoria);

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