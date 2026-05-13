import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import Loader from '../components/ui/Loader';

/* Auth pages */
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));

/* Dashboard pages */
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const EmployeeList = lazy(() => import('../pages/Employees/EmployeeList'));
const EmployeeProfile = lazy(() => import('../pages/Employees/EmployeeProfile'));
const Departments = lazy(() => import('../pages/Departments/Departments'));
const Attendance = lazy(() => import('../pages/Attendance/Attendance'));
const Leave = lazy(() => import('../pages/Leave/Leave'));
const Payroll = lazy(() => import('../pages/Payroll/Payroll'));
const Recruitment = lazy(() => import('../pages/Recruitment/Recruitment'));
const Performance = lazy(() => import('../pages/Performance/Performance'));
const Documents = lazy(() => import('../pages/Documents/Documents'));
const Announcements = lazy(() => import('../pages/Announcements/Announcements'));
const Reports = lazy(() => import('../pages/Reports/Reports'));
const Calendar = lazy(() => import('../pages/Calendar/Calendar'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const Subscription = lazy(() => import('../pages/Subscription/Subscription'));
const Support = lazy(() => import('../pages/Support/Support'));
const Notifications = lazy(() => import('../pages/Notifications/Notifications'));

function SuspenseWrapper({ children }) {
  return <Suspense fallback={<Loader text="Loading page..." />}>{children}</Suspense>;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SuspenseWrapper><Login /></SuspenseWrapper>} />
        <Route path="/register" element={<SuspenseWrapper><Register /></SuspenseWrapper>} />
        <Route path="/forgot-password" element={<SuspenseWrapper><ForgotPassword /></SuspenseWrapper>} />
      </Route>

      {/* Protected dashboard routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/" element={<SuspenseWrapper><Dashboard /></SuspenseWrapper>} />
        <Route path="/employees" element={<SuspenseWrapper><EmployeeList /></SuspenseWrapper>} />
        <Route path="/employees/:id" element={<SuspenseWrapper><EmployeeProfile /></SuspenseWrapper>} />
        <Route path="/departments" element={<SuspenseWrapper><Departments /></SuspenseWrapper>} />
        <Route path="/attendance" element={<SuspenseWrapper><Attendance /></SuspenseWrapper>} />
        <Route path="/leave" element={<SuspenseWrapper><Leave /></SuspenseWrapper>} />
        <Route path="/payroll" element={<SuspenseWrapper><Payroll /></SuspenseWrapper>} />
        <Route path="/recruitment" element={<SuspenseWrapper><Recruitment /></SuspenseWrapper>} />
        <Route path="/performance" element={<SuspenseWrapper><Performance /></SuspenseWrapper>} />
        <Route path="/documents" element={<SuspenseWrapper><Documents /></SuspenseWrapper>} />
        <Route path="/announcements" element={<SuspenseWrapper><Announcements /></SuspenseWrapper>} />
        <Route path="/reports" element={<SuspenseWrapper><Reports /></SuspenseWrapper>} />
        <Route path="/calendar" element={<SuspenseWrapper><Calendar /></SuspenseWrapper>} />
        <Route path="/settings" element={<SuspenseWrapper><Settings /></SuspenseWrapper>} />
        <Route path="/subscription" element={<SuspenseWrapper><Subscription /></SuspenseWrapper>} />
        <Route path="/support" element={<SuspenseWrapper><Support /></SuspenseWrapper>} />
        <Route path="/notifications" element={<SuspenseWrapper><Notifications /></SuspenseWrapper>} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
