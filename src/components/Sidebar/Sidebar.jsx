import { NavLink, useLocation } from 'react-router-dom';
import {
  HiOutlineViewGrid, HiOutlineUsers, HiOutlineOfficeBuilding, HiOutlineClock,
  HiOutlineCalendar, HiOutlineCurrencyDollar, HiOutlineBriefcase, HiOutlineStar,
  HiOutlineDocumentText, HiOutlineSpeakerphone, HiOutlineChartBar, HiOutlineCog,
  HiOutlineCreditCard, HiOutlineSupport, HiOutlineChevronLeft, HiOutlineChevronRight,
} from 'react-icons/hi';
import { useUIStore } from '../../context/UIContext';
import { useAuthStore } from '../../context/AuthContext';
import { permissions } from '../../utils/permissions';
import './Sidebar.css';

const menuSections = [
  {
    title: 'Main',
    items: [
      { path: '/', icon: HiOutlineViewGrid, label: 'Dashboard' },
      { path: '/employees', icon: HiOutlineUsers, label: 'Employees' },
      { path: '/departments', icon: HiOutlineOfficeBuilding, label: 'Departments' },
    ],
  },
  {
    title: 'Management',
    items: [
      { path: '/attendance', icon: HiOutlineClock, label: 'Attendance' },
      { path: '/leave', icon: HiOutlineCalendar, label: 'Leave Management' },
      { path: '/payroll', icon: HiOutlineCurrencyDollar, label: 'Payroll', permission: 'canManagePayroll' },
      { path: '/recruitment', icon: HiOutlineBriefcase, label: 'Recruitment', permission: 'canManageRecruitment' },
      { path: '/performance', icon: HiOutlineStar, label: 'Performance' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { path: '/documents', icon: HiOutlineDocumentText, label: 'Documents' },
      { path: '/announcements', icon: HiOutlineSpeakerphone, label: 'Announcements' },
      { path: '/reports', icon: HiOutlineChartBar, label: 'Reports', permission: 'canViewReports' },
      { path: '/calendar', icon: HiOutlineCalendar, label: 'Calendar' },
    ],
  },
  {
    title: 'System',
    items: [
      { path: '/settings', icon: HiOutlineCog, label: 'Settings' },
      { path: '/subscription', icon: HiOutlineCreditCard, label: 'Subscription', permission: 'canManageSubscription' },
      { path: '/support', icon: HiOutlineSupport, label: 'Support' },
    ],
  },
];

export default function Sidebar() {
  const { sidebarOpen, sidebarMobileOpen, toggleSidebar, closeMobileSidebar } = useUIStore();
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  const userRole = user?.role || 'employee';

  const isVisible = (item) => {
    if (!item.permission) return true;
    const check = permissions[item.permission];
    return check ? check(userRole) : true;
  };

  return (
    <>
      <div className={`sidebar-overlay ${sidebarMobileOpen ? 'show' : ''}`} onClick={closeMobileSidebar} />
      <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'} ${sidebarMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">P</div>
          <span className="sidebar-brand-name">PeopleCore</span>
        </div>

        <nav className="sidebar-nav">
          {menuSections.map((section) => {
            const visibleItems = section.items.filter(isVisible);
            if (visibleItems.length === 0) return null;
            return (
              <div key={section.title}>
                <div className="sidebar-section-title">{section.title}</div>
                {visibleItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={closeMobileSidebar}
                  >
                    <span className="sidebar-link-icon"><item.icon size={20} /></span>
                    <span className="sidebar-link-label">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
            {sidebarOpen ? <HiOutlineChevronLeft size={16} /> : <HiOutlineChevronRight size={16} />}
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
