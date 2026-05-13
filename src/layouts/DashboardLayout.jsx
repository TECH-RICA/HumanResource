import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { useUIStore } from '../context/UIContext';
import './DashboardLayout.css';

const pageTitles = {
  '/': 'Dashboard',
  '/employees': 'Employees',
  '/departments': 'Departments',
  '/attendance': 'Attendance',
  '/leave': 'Leave Management',
  '/payroll': 'Payroll',
  '/recruitment': 'Recruitment',
  '/performance': 'Performance',
  '/documents': 'Documents',
  '/announcements': 'Announcements',
  '/reports': 'Reports',
  '/calendar': 'Calendar',
  '/settings': 'Settings',
  '/subscription': 'Subscription',
  '/support': 'Support',
  '/notifications': 'Notifications',
};

export default function DashboardLayout() {
  const { sidebarOpen } = useUIStore();
  const location = useLocation();
  const basePath = '/' + (location.pathname.split('/')[1] || '');
  const title = pageTitles[basePath] || 'PeopleCore';

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className={`dashboard-main ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <Navbar title={title} />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
