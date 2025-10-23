import Button from '../atoms/Button.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function CartList() {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 && <p>Tu carrito está vacío</p>}
      {cart.map((item, idx) => (
        <div key={idx} className="carrito-item">
          <div>
            <strong>{item.nombre}</strong> - ${item.precio}
            {item.descripcion && <p style={{ fontSize: '0.85rem', color: '#666' }}>{item.descripcion}</p>}
          </div>
          <Button onClick={() => removeFromCart(item)}>Eliminar</Button>
        </div>
      ))}
      <div className="carrito-total">Total: ${total}</div>
    </div>
  );
}