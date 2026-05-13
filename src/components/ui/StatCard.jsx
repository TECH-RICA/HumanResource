import Card from './Card';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';
import './StatCard.css';

export default function StatCard({ label, value, icon: Icon, color = '#3b82f6', change, changeLabel }) {
  const isPositive = change > 0;
  return (
    <Card>
      <div className="stat-card">
        <div className="stat-card-icon" style={{ background: color + '15', color }}>
          {Icon && <Icon size={22} />}
        </div>
        <div className="stat-card-content">
          <div className="stat-card-label">{label}</div>
          <div className="stat-card-value">{value}</div>
          {change !== undefined && (
            <div className={`stat-card-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? <HiArrowUp size={12} /> : <HiArrowDown size={12} />}
              {Math.abs(change)}% {changeLabel || 'vs last month'}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
