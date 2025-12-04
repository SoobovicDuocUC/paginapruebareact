import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import logo from '../../assets/imagenes/image-removebg-preview.png';

export default function Header() {
  const { logged, logout, user, role } = useAuth(); // Obtenemos el role

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="HuertoHogar" height="50" />
      </div>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', alignItems: 'center' }}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to="/productos/frutas">Productos</Link></li>
          
          {/* BOTÓN SOLO PARA ADMIN */}
          {logged && role === 'ADMIN' && (
             <li>
               <Link to="/admin" style={{ color: 'red', fontWeight: 'bold', textTransform:'uppercase' }}>Admin</Link>
             </li>
          )}

          <li><Link to="/carrito"><Icon name="cart" /> Carrito</Link></li>
          {!logged ? (
            <li><Link to="/login">Login</Link></li>
          ) : (
            <>
              <li style={{ color: '#2e8b57', fontWeight: 'bold' }}>{user}</li>
              <li>
                <button 
                  onClick={logout}
                  style={{
                    background: '#2e8b57',
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          <li><Link to="/nosotros">Nosotros</Link></li>
        </ul>
      </nav>
    </header>
  );
}