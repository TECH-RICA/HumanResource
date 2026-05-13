import './Button.css';

export default function Button({
  children, variant = 'primary', size = '', icon: Icon, iconRight: IconRight,
  loading = false, disabled = false, className = '', type = 'button', ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size && `btn-${size}`,
    loading && 'btn-loading',
    !children && Icon && 'btn-icon',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...props}>
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 14 : 16} />}
    </button>
  );
}
