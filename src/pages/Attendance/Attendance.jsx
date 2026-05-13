import { useState } from 'react';
import { HiOutlineClock, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { attendance, attendanceStats, monthlyAttendance } from '../../data/attendance';
import { formatDate } from '../../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import StatCard from '../../components/ui/StatCard';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import './Attendance.css';

export default function Attendance() {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState(null);

  const handleClock = () => {
    if (!clockedIn) {
      setClockedIn(true);
      setClockTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } else {
      setClockedIn(false);
      setClockTime(null);
    }
  };

  const columns = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'date', label: 'Date', render: (v) => formatDate(v) },
    { key: 'clockIn', label: 'Clock In', render: (v) => v || '—' },
    { key: 'clockOut', label: 'Clock Out', render: (v) => v || '—' },
    { key: 'hoursWorked', label: 'Hours', render: (v) => v?.toFixed(1) || '—' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'present' ? 'success' : 'danger'} dot>{v}</Badge> },
    { key: 'late', label: 'Late', render: (v) => v ? <Badge variant="warning">Late</Badge> : <span style={{ color: 'var(--text-tertiary)' }}>—</span> },
  ];

  const tabs = [
    {
      key: 'daily', label: 'Daily Attendance',
      content: <Table columns={columns} data={attendance} emptyMessage="No records" />,
    },
    {
      key: 'analytics', label: 'Analytics',
      content: (
        <Card>
          <div style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ marginBottom: 'var(--space-4)' }}>Monthly Attendance Trends</h4>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="present" fill="#22c55e" radius={[4,4,0,0]} />
                <Bar dataKey="absent" fill="#ef4444" radius={[4,4,0,0]} />
                <Bar dataKey="late" fill="#f59e0b" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Attendance</h1><p className="page-header-subtitle">Track employee attendance and time</p></div>
        <Button icon={clockedIn ? HiOutlineX : HiOutlineClock} variant={clockedIn ? 'danger' : 'primary'} onClick={handleClock}>
          {clockedIn ? 'Clock Out' : 'Clock In'}
        </Button>
      </div>

      {clockedIn && (
        <Card className="mb-6">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
            <span style={{ fontWeight: 500 }}>You clocked in at {clockTime}</span>
          </div>
        </Card>
      )}

      <div className="grid-4 mb-6">
        <StatCard label="Present Today" value={attendanceStats.totalPresent + '%'} icon={HiOutlineCheck} color="#22c55e" />
        <StatCard label="Absent" value={attendanceStats.totalAbsent} icon={HiOutlineX} color="#ef4444" />
        <StatCard label="Late Arrivals" value={attendanceStats.totalLate} icon={HiOutlineClock} color="#f59e0b" />
        <StatCard label="Avg Hours" value={attendanceStats.averageHours + 'h'} icon={HiOutlineClock} color="#3b82f6" />
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
}
