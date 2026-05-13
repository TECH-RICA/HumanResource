import { useState, useCallback } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import './Dropdown.css';

export default function Dropdown({ trigger, items, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useClickOutside(close);

  return (
    <div className="dropdown" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="dropdown-menu" style={align === 'left' ? { left: 0, right: 'auto' } : undefined}>
          {items.map((item, i) => item.divider ? (
            <div key={i} className="dropdown-divider" />
          ) : (
            <button key={i} className={`dropdown-item ${item.danger ? 'danger' : ''}`} onClick={() => { item.onClick?.(); close(); }}>
              {item.icon && <item.icon size={15} />} {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
