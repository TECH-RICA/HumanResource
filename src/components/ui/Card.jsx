import './Card.css';

export default function Card({ children, className = '', onClick, header, footer }) {
  return (
    <div className={`card ${onClick ? 'card-clickable' : ''} ${className}`} onClick={onClick}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
