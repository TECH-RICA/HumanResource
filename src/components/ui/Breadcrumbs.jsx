import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';
import './Breadcrumbs.css';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i} className="breadcrumb-item">
          {i > 0 && <HiChevronRight size={14} className="breadcrumb-sep" />}
          {i === items.length - 1 ? (
            <span className="breadcrumb-current">{item.label}</span>
          ) : (
            <Link to={item.path}>{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
