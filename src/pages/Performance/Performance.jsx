import { HiOutlineStar, HiOutlineTrendingUp, HiOutlineChartBar } from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { employees } from '../../data/employees';
import StatCard from '../../components/ui/StatCard';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';

const reviews = [
  { id: 'rev-1', employeeId: 'emp-4', employeeName: 'Emily Thompson', department: 'Engineering', reviewer: 'David Chen', rating: 4.5, period: 'Q4 2023', status: 'completed', date: '2024-01-15' },
  { id: 'rev-2', employeeId: 'emp-6', employeeName: 'Sarah Williams', department: 'Engineering', reviewer: 'David Chen', rating: 4.2, period: 'Q4 2023', status: 'completed', date: '2024-01-15' },
  { id: 'rev-3', employeeId: 'emp-9', employeeName: 'William Garcia', department: 'Sales', reviewer: 'Jennifer Davis', rating: 3.8, period: 'Q4 2023', status: 'completed', date: '2024-01-20' },
  { id: 'rev-4', employeeId: 'emp-13', employeeName: 'Daniel Thomas', department: 'Marketing', reviewer: 'Michael Johnson', rating: 4.0, period: 'Q1 2024', status: 'pending', date: null },
  { id: 'rev-5', employeeId: 'emp-19', employeeName: 'Ryan Robinson', department: 'Engineering', reviewer: 'David Chen', rating: 0, period: 'Q1 2024', status: 'pending', date: null },
];

const ratingDistribution = [
  { range: '4.5-5.0', count: 8 }, { range: '4.0-4.4', count: 12 }, { range: '3.5-3.9', count: 6 },
  { range: '3.0-3.4', count: 3 }, { range: 'Below 3', count: 1 },
];

export default function Performance() {
  const completed = reviews.filter((r) => r.status === 'completed').length;
  const avgRating = (reviews.filter((r) => r.rating > 0).reduce((s, r) => s + r.rating, 0) / completed).toFixed(1);

  const columns = [
    { key: 'employeeName', label: 'Employee', render: (v, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar name={v} size="sm" />
        <div><div style={{ fontWeight: 500 }}>{v}</div><div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{row.department}</div></div>
      </div>
    )},
    { key: 'reviewer', label: 'Reviewer' },
    { key: 'period', label: 'Period' },
    { key: 'rating', label: 'Rating', render: (v) => v > 0 ? <span style={{ fontWeight: 600 }}>⭐ {v}</span> : '—' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'completed' ? 'success' : 'warning'} dot>{v}</Badge> },
  ];

  const tabs = [
    { key: 'reviews', label: 'Reviews', content: <Table columns={columns} data={reviews} /> },
    {
      key: 'analytics', label: 'Analytics',
      content: (
        <Card>
          <div style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ marginBottom: 'var(--space-4)' }}>Rating Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6,6,0,0]} />
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
        <div><h1>Performance</h1><p className="page-header-subtitle">Track employee performance and reviews</p></div>
        <Button icon={HiOutlineStar}>New Review</Button>
      </div>
      <div className="grid-3 mb-6">
        <StatCard label="Avg Rating" value={avgRating} icon={HiOutlineStar} color="#f59e0b" />
        <StatCard label="Completed Reviews" value={completed} icon={HiOutlineChartBar} color="#22c55e" />
        <StatCard label="Pending Reviews" value={reviews.length - completed} icon={HiOutlineTrendingUp} color="#3b82f6" />
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}
