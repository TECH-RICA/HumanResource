import { notifications as allNotifs } from '../../data/notifications';
import { formatTimeAgo } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const typeColors = { leave: 'warning', payroll: 'success', announcement: 'info', employee: 'info', performance: 'gray', recruitment: 'gray' };
const typeIcons = { leave: '📅', payroll: '💰', announcement: '📢', employee: '👤', performance: '⭐', recruitment: '💼' };

export default function Notifications() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Notifications</h1><p className="page-header-subtitle">All notifications</p></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {allNotifs.map((n) => (
          <Card key={n.id} className={n.read ? '' : ''}>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', opacity: n.read ? 0.7 : 1 }}>
              <span style={{ fontSize: 24 }}>{typeIcons[n.type] || '🔔'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 2 }}>
                  <strong style={{ fontSize: 'var(--font-size-base)' }}>{n.title}</strong>
                  {!n.read && <Badge variant="info">New</Badge>}
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 4 }}>{n.message}</p>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{formatTimeAgo(n.time)}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
