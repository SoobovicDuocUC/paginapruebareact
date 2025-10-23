import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const total = cart.reduce((acc, item) => acc + item.precio, 0);

  function addToCart(producto) {
  setCart(prevCart => [...prevCart, producto]);
}

  function removeFromCart(producto) {
    setCart(cart.filter(p => p !== producto));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
