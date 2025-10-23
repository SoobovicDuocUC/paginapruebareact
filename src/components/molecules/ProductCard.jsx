import Button from '../atoms/Button.jsx';
import { useCart } from "../../context/CartContext.jsx";

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={producto.img} alt={producto.nombre} />
      <p className="precio">${producto.precio}</p>
      {producto.precioKilo && <p className="precio-kilo">{producto.precioKilo}</p>}
      {producto.descripcion && <p className="descripcion">{producto.descripcion}</p>}
      <h4>{producto.codigo} {producto.nombre}</h4>
      <button onClick={() => addToCart(producto)}>Agregar</button>
    </div>
  );
}