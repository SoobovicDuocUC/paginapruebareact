export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2E8B57',
      color: 'white',
      padding: '2rem',
      marginTop: '3rem',
      textAlign: 'center'
    }}>
      <p style={{ margin: '0 0 1rem 0' }}>© 2025 Huerto Hogar - Todos los derechos reservados.</p>
      
      <div className="social" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '1rem',
        listStyle: 'none',
        padding: 0
      }}>
        <a href="#" style={{ display: 'inline-block' }}>
          <img 
            src="https://cdn-icons-png.flaticon.com/256/87/87390.png" 
            alt="Instagram" 
            width="30"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </a>
        <a href="#" style={{ display: 'inline-block' }}>
          <img 
            src="https://cdn-icons-png.flaticon.com/256/20/20673.png" 
            alt="Facebook" 
            width="30"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </a>
      </div>
    </footer>
  );
}