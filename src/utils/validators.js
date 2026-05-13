export const validators = {
  required: (value) => {
    if (value === undefined || value === null || value === '') return 'This field is required';
    return true;
  },
  email: (value) => {
    if (!value) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Please enter a valid email address';
  },
  phone: (value) => {
    if (!value) return true;
    const phoneRegex = /^[+]?[\d\s()-]{7,15}$/;
    return phoneRegex.test(value) || 'Please enter a valid phone number';
  },
  minLength: (min) => (value) => {
    if (!value) return true;
    return value.length >= min || `Must be at least ${min} characters`;
  },
  maxLength: (max) => (value) => {
    if (!value) return true;
    return value.length <= max || `Must be at most ${max} characters`;
  },
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain a number';
    return true;
  },
  confirmPassword: (getPassword) => (value) => {
    if (!value) return 'Please confirm your password';
    return value === getPassword() || 'Passwords do not match';
  },
  number: (value) => {
    if (!value && value !== 0) return true;
    return !isNaN(value) || 'Must be a valid number';
  },
  positiveNumber: (value) => {
    if (!value && value !== 0) return true;
    return (Number(value) > 0) || 'Must be a positive number';
  },
};
