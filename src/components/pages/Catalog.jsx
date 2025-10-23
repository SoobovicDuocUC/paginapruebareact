import CatalogCard from '../molecules/CatalogCard.jsx';

const categorias = [
  { 
    nombre: 'Frutas', 
    image: 'https://cdn-icons-png.flaticon.com/512/1689/1689236.png'
  },
  { 
    nombre: 'Verduras', 
    image: 'https://cdn-icons-png.flaticon.com/512/5346/5346400.png'
  },
  { 
    nombre: 'Organicos', 
    image: 'https://cdn-icons-png.freepik.com/256/7615/7615384.png'
  },
  { 
    nombre: 'Lacteos', 
    image: 'https://cdn-icons-png.flaticon.com/512/2674/2674486.png'
  },
];

export default function Catalog() {
  return (
    <div className="catalog-container">
      <div className="catalog-top-section"></div>
      <div className="catalog-cards-container">
        {categorias.map((c, i) => (
          <CatalogCard key={i} categoria={c.nombre} image={c.image} />
        ))}
      </div>
    </div>
  );
}