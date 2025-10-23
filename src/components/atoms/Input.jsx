export default function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem' }}
    />
  );
}
