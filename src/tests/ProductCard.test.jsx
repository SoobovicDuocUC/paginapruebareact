import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/molecules/ProductCard';
import { CartProvider } from '../context/CartContext';

describe('ProductCard Component', () => {
  const mockProducto = {
    codigo: 'FR001',
    nombre: 'Manzana Fuji',
    precio: 937,
    img: 'https://example.com/manzana.jpg',
    categoria: 'frutas',
    precioKilo: '$2.490 x kg',
    descripcion: 'Granel'
  };

  const renderProductCard = (producto = mockProducto) => {
    return render(
      <CartProvider>
        <ProductCard producto={producto} />
      </CartProvider>
    );
  };

  it('debería renderizar toda la información del producto', () => {
    renderProductCard();

    expect(screen.getByText('FR001 Manzana Fuji')).toBeInTheDocument();
    expect(screen.getByText('$937')).toBeInTheDocument();
    expect(screen.getByText('$2.490 x kg')).toBeInTheDocument();
    expect(screen.getByText('Granel')).toBeInTheDocument();
  });

  it('debería mostrar la imagen del producto', () => {
    renderProductCard();

    const imagen = screen.getByAltText('Manzana Fuji');
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', mockProducto.img);
  });

  it('debería tener un botón de Agregar', () => {
    renderProductCard();

    expect(screen.getByText(/Agregar/i)).toBeInTheDocument();
  });

  it('debería manejar el click del botón', () => {
    renderProductCard();

    const boton = screen.getByText(/Agregar/i);
    fireEvent.click(boton);
    
    expect(boton).toBeInTheDocument();
  });

  it('debería renderizar sin precioKilo cuando no está definido', () => {
    const productoSinPrecioKilo = { ...mockProducto, precioKilo: undefined };
    renderProductCard(productoSinPrecioKilo);

    expect(screen.queryByText('$2.490 x kg')).not.toBeInTheDocument();
  });
});