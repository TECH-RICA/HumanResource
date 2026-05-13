import { HiSearch, HiX } from 'react-icons/hi';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`search-bar ${className}`}>
      <HiSearch size={16} className="search-bar-icon" />
      <input type="text" className="search-bar-input" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      {value && <button className="search-bar-clear" onClick={() => onChange('')}><HiX size={12} /></button>}
    </div>
  );
}
