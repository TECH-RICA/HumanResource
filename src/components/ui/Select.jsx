import { forwardRef } from 'react';
import './Input.css';

const Select = forwardRef(function Select({
  label, error, required, options = [], placeholder, className = '', ...props
}, ref) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select ref={ref} className={`input-field ${error ? 'input-error' : ''}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
});

export default Select;
