import { getInitials, getAvatarColor } from '../../utils/helpers';
import './Avatar.css';

export default function Avatar({ name, src, size = 'md', className = '' }) {
  const bgColor = getAvatarColor(name);
  return (
    <div className={`avatar avatar-${size} ${className}`} style={{ background: src ? 'transparent' : bgColor }}>
      {src ? <img src={src} alt={name} /> : getInitials(name)}
    </div>
  );
}
