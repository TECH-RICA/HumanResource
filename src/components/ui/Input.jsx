import { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(function Input({
  label, error, hint, icon: Icon, required, type = 'text', className = '', ...props
}, ref) {
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && <Icon size={16} className="input-icon" />}
        <Component
          ref={ref}
          type={isTextarea ? undefined : type}
          className={`input-field ${Icon ? 'has-icon' : ''} ${error ? 'input-error' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="input-error-message">{error}</span>}
      {hint && !error && <span className="input-hint">{hint}</span>}
    </div>
  );
});

export default Input;
