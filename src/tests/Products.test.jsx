import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Products from '../components/pages/Products';
import { CartProvider } from '../context/CartContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ categoria: 'frutas' }),
  useNavigate: () => jest.fn(),
}));

describe('Products Component - Frutas', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Products />
        </CartProvider>
      </BrowserRouter>
    );
  });

  it('debería renderizar el título de productos', () => {
    expect(screen.getByText(/Nuestros Productos/i)).toBeInTheDocument();
  });

  it('debería mostrar 3 productos de frutas', () => {
    expect(screen.getByText(/Manzana Fuji/i)).toBeInTheDocument();
    expect(screen.getByText(/Naranjas Valencianas/i)).toBeInTheDocument();
    expect(screen.getByText(/Plátanos Cavendish/i)).toBeInTheDocument();
  });

  it('debería mostrar los precios correctos', () => {
    expect(screen.getByText('$937')).toBeInTheDocument();
    expect(screen.getByText('$549')).toBeInTheDocument();
    expect(screen.getByText('$747')).toBeInTheDocument();
  });

  it('debería mostrar los códigos de productos', () => {
    expect(screen.getByText(/FR001/i)).toBeInTheDocument();
    expect(screen.getByText(/FR002/i)).toBeInTheDocument();
    expect(screen.getByText(/FR003/i)).toBeInTheDocument();
  });

  it('debería mostrar los precios por kilo', () => {
    expect(screen.getByText('$2.490 x kg')).toBeInTheDocument();
    expect(screen.getByText('$1.290 x kg')).toBeInTheDocument();
    expect(screen.getByText('$1.490 x kg')).toBeInTheDocument();
  });

  it('debería tener un botón Volver Atrás', () => {
    expect(screen.getByText(/Volver Atrás/i)).toBeInTheDocument();
  });

  it('debería tener 3 botones de Agregar', () => {
    const botonesAgregar = screen.getAllByText(/Agregar/i);
    expect(botonesAgregar).toHaveLength(3);
  });
});