import { forwardRef, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import './Input.css';

const Input = forwardRef(function Input(
{
  label,
  error,
  hint,
  icon: Icon,
  required,
  type = 'text',
  className = '',
  ...props
},
ref
) {
  const [showPassword, setShowPassword] = useState(false);

  const isTextarea = type === 'textarea';
  const isPassword = type === 'password';

  const Component = isTextarea ? 'textarea' : 'input';

  const inputType = isPassword
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        {Icon && <Icon size={18} className="input-icon" />}

        <Component
          ref={ref}
          type={isTextarea ? undefined : inputType}
          className={`input-field ${Icon ? 'has-icon' : ''} ${
            isPassword ? 'has-password-toggle' : ''
          } ${error ? 'input-error' : ''}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <HiOutlineEyeOff size={18} />
            ) : (
              <HiOutlineEye size={18} />
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="input-error-message">
          {error}
        </span>
      )}

      {hint && !error && (
        <span className="input-hint">
          {hint}
        </span>
      )}
    </div>
  );
});

export default Input;