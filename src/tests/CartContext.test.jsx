import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

describe('CartContext', () => {
  it('debería iniciar con carrito vacío', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    expect(result.current.cart).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it('debería agregar un producto al carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    const producto = {
      codigo: 'FR001',
      nombre: 'Manzana Fuji',
      precio: 937,
      categoria: 'frutas'
    };

    act(() => {
      result.current.addToCart(producto);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual(producto);
    expect(result.current.total).toBe(937);
  });

  it('debería calcular el total correctamente con múltiples productos', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    const productos = [
      { nombre: 'Manzana', precio: 937 },
      { nombre: 'Naranja', precio: 549 },
      { nombre: 'Plátano', precio: 747 }
    ];

    act(() => {
      productos.forEach(p => result.current.addToCart(p));
    });

    expect(result.current.cart).toHaveLength(3);
    expect(result.current.total).toBe(2233);
  });

  it('debería eliminar un producto del carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    const producto1 = { nombre: 'Manzana', precio: 937 };
    const producto2 = { nombre: 'Naranja', precio: 549 };

    act(() => {
      result.current.addToCart(producto1);
      result.current.addToCart(producto2);
    });

    expect(result.current.cart).toHaveLength(2);

    act(() => {
      result.current.removeFromCart(producto1);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual(producto2);
    expect(result.current.total).toBe(549);
  });

  it('debería permitir agregar el mismo producto múltiples veces', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    const producto = { nombre: 'Manzana', precio: 937 };

    act(() => {
      result.current.addToCart(producto);
      result.current.addToCart(producto);
      result.current.addToCart(producto);
    });

    expect(result.current.cart).toHaveLength(3);
    expect(result.current.total).toBe(2811);
  });
});