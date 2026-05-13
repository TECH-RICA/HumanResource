import { HiInbox } from 'react-icons/hi';
import './EmptyState.css';

export default function EmptyState({ icon: Icon = HiInbox, title = 'No data', description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon"><Icon size={48} /></div>
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-desc">{description}</p>}
      {action}
    </div>
  );
}
