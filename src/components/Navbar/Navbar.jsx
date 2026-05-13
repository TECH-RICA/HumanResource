import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineBell, HiOutlineMenu, HiOutlineLogout, HiOutlineUser, HiOutlineCog } from 'react-icons/hi';
import { useAuthStore } from '../../context/AuthContext';
import { useUIStore } from '../../context/UIContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { notifications as mockNotifs } from '../../data/notifications';
import { formatTimeAgo } from '../../utils/helpers';
import { ROLE_LABELS } from '../../constants/roles';
import Avatar from '../ui/Avatar';
import Dropdown from '../ui/Dropdown';
import './Navbar.css';

export default function Navbar({ title }) {
  const { user, logout } = useAuthStore();
  const { toggleMobileSidebar } = useUIStore();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const closeNotifs = useCallback(() => setShowNotifs(false), []);
  const notifRef = useClickOutside(closeNotifs);
  const unreadCount = mockNotifs.filter((n) => !n.read).length;

  const handleLogout = () => { logout(); navigate('/login'); };
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'User';

  const userMenuItems = [
    { icon: HiOutlineUser, label: 'My Profile', onClick: () => navigate('/employees/emp-1') },
    { icon: HiOutlineCog, label: 'Settings', onClick: () => navigate('/settings') },
    { divider: true },
    { icon: HiOutlineLogout, label: 'Sign Out', onClick: handleLogout, danger: true },
  ];

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="navbar-hamburger" onClick={toggleMobileSidebar}>
          <HiOutlineMenu size={22} />
        </button>
        <h1 className="navbar-title">{title}</h1>
      </div>

      <div className="navbar-right">
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button className="navbar-icon-btn" onClick={() => setShowNotifs(!showNotifs)}>
            <HiOutlineBell size={20} />
            {unreadCount > 0 && <span className="navbar-badge" />}
          </button>
          {showNotifs && (
            <div className="dropdown-menu notif-dropdown" style={{ right: 0, top: '100%', marginTop: 4, minWidth: 360 }}>
              <div className="notif-header">
                <h4>Notifications</h4>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{unreadCount} unread</span>
              </div>
              {mockNotifs.slice(0, 5).map((n) => (
                <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`} onClick={() => { navigate(n.actionUrl); closeNotifs(); }}>
                  <div className={`notif-dot ${n.read ? 'read' : ''}`} />
                  <div className="notif-content">
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-message">{n.message}</div>
                    <div className="notif-time">{formatTimeAgo(n.time)}</div>
                  </div>
                </div>
              ))}
              <div className="notif-footer">
                <Link to="/notifications" onClick={closeNotifs}>View all notifications</Link>
              </div>
            </div>
          )}
        </div>

        <Dropdown
          trigger={
            <div className="navbar-user">
              <div className="navbar-user-info">
                <div className="navbar-user-name">{fullName}</div>
                <div className="navbar-user-role">{ROLE_LABELS[user?.role] || 'User'}</div>
              </div>
              <Avatar name={fullName} size="sm" />
            </div>
          }
          items={userMenuItems}
        />
      </div>
    </header>
  );
}
