import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-brand-logo">P</div>
            <span className="auth-brand-name">PeopleCore</span>
          </div>
          <Outlet />
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-right-content">
          <h2>Modern HR Management for Growing Teams</h2>
          <p>Streamline your HR operations with PeopleCore. Manage employees, payroll, attendance, leave, recruitment, and more — all in one place.</p>
        </div>
      </div>
    </div>
  );
}
