import { useNavigate } from 'react-router-dom';
import {
  HiOutlineUsers, HiOutlineUserAdd, HiOutlineClipboardCheck, HiOutlineCurrencyDollar,
  HiOutlineClock, HiOutlineCake, HiOutlineChartBar, HiOutlineCalendar,
} from 'react-icons/hi';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useAuthStore } from '../../context/AuthContext';
import { employees } from '../../data/employees';
import { leaveRequests } from '../../data/leaveRequests';
import { payrollSummary, payrollByDepartment } from '../../data/payroll';
import { monthlyAttendance } from '../../data/attendance';
import { formatCurrency, formatDate } from '../../utils/helpers';
import StatCard from '../../components/ui/StatCard';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import './Dashboard.css';

const hiringData = [
  { month: 'Jan', hires: 3 }, { month: 'Feb', hires: 5 }, { month: 'Mar', hires: 2 },
  { month: 'Apr', hires: 7 }, { month: 'May', hires: 4 }, { month: 'Jun', hires: 6 },
  { month: 'Jul', hires: 3 }, { month: 'Aug', hires: 8 }, { month: 'Sep', hires: 5 },
  { month: 'Oct', hires: 4 }, { month: 'Nov', hires: 6 }, { month: 'Dec', hires: 3 },
];

const leaveStats = [
  { name: 'Annual', value: 45, color: '#3b82f6' },
  { name: 'Sick', value: 20, color: '#ef4444' },
  { name: 'Maternity', value: 5, color: '#8b5cf6' },
  { name: 'Paternity', value: 8, color: '#06b6d4' },
  { name: 'Other', value: 12, color: '#f59e0b' },
];

const COLORS = ['#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4', '#f59e0b'];

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const activeEmployees = employees.filter((e) => e.status === 'active').length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'pending').length;
  const recentHires = employees.filter((e) => e.status === 'active').sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate)).slice(0, 5);
  
  const now = new Date();
  const upcomingBirthdays = employees
    .filter((e) => e.status === 'active')
    .map((e) => {
      const dob = new Date(e.dateOfBirth);
      const nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
      if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
      return { ...e, nextBirthday: nextBday };
    })
    .sort((a, b) => a.nextBirthday - b.nextBirthday)
    .slice(0, 5);

  return (
    <div className="page-container">
      <div className="welcome-banner">
        <div className="welcome-title">Good morning, {user?.firstName || 'Admin'} 👋</div>
        <div className="welcome-subtitle">Here's what's happening with your team today.</div>
        <div className="quick-actions">
          <button className="quick-action-btn" onClick={() => navigate('/employees')}><HiOutlineUserAdd size={16} /> Add Employee</button>
          <button className="quick-action-btn" onClick={() => navigate('/leave')}><HiOutlineClipboardCheck size={16} /> Review Leaves</button>
          <button className="quick-action-btn" onClick={() => navigate('/reports')}><HiOutlineChartBar size={16} /> View Reports</button>
        </div>
      </div>

      <div className="dashboard-stats">
        <StatCard label="Total Employees" value={employees.length} icon={HiOutlineUsers} color="#3b82f6" change={12} />
        <StatCard label="Active Employees" value={activeEmployees} icon={HiOutlineUsers} color="#22c55e" change={8} />
        <StatCard label="Pending Leave Requests" value={pendingLeaves} icon={HiOutlineCalendar} color="#f59e0b" change={-5} />
        <StatCard label="Monthly Payroll" value={formatCurrency(payrollSummary.totalNetPay / 12)} icon={HiOutlineCurrencyDollar} color="#8b5cf6" change={3.2} />
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Monthly Hiring Trends</div>
              <div className="chart-card-subtitle">New hires per month</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hiringData}>
              <defs>
                <linearGradient id="hireGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }} />
              <Area type="monotone" dataKey="hires" stroke="#3b82f6" strokeWidth={2} fill="url(#hireGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Leave Distribution</div>
              <div className="chart-card-subtitle">By leave type</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={leaveStats} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {leaveStats.map((entry, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Attendance Analytics</div>
              <div className="chart-card-subtitle">Monthly overview</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="present" fill="#22c55e" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} name="Absent" />
              <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Payroll by Department</div>
              <div className="chart-card-subtitle">Annual distribution</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={payrollByDepartment} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000)}k`} />
              <YAxis dataKey="department" type="category" width={110} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">🎂 Upcoming Birthdays</div>
          </div>
          <div className="birthday-list">
            {upcomingBirthdays.map((e) => (
              <div key={e.id} className="birthday-item">
                <Avatar name={`${e.firstName} ${e.lastName}`} size="sm" />
                <div className="birthday-info">
                  <div className="birthday-name">{e.firstName} {e.lastName}</div>
                  <div className="birthday-date">{formatDate(e.dateOfBirth, 'MMMM dd')} · {e.department}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">🆕 Recent Hires</div>
          </div>
          <div className="recent-hires-list">
            {recentHires.map((e) => (
              <div key={e.id} className="hire-item" onClick={() => navigate(`/employees/${e.id}`)} style={{ cursor: 'pointer' }}>
                <Avatar name={`${e.firstName} ${e.lastName}`} size="sm" />
                <div className="hire-info">
                  <div className="hire-name">{e.firstName} {e.lastName}</div>
                  <div className="hire-dept">{e.position} · {e.department}</div>
                </div>
                <Badge variant="info">{formatDate(e.joiningDate, 'MMM dd')}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
