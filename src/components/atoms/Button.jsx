export default function Button({ children, onClick, type = "button", style = {} }) {
  return (
    <button type={type} onClick={onClick} style={{ padding: '0.5rem 1rem', ...style }}>
      {children}
    </button>
  );
}
