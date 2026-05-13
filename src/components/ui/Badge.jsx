import './Badge.css';
export default function Badge({ children, variant = 'gray', dot = false }) {
  return (
    <span className={`badge badge-${variant}`}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
}
