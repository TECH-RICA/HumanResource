import { HiOutlineCurrencyDollar, HiOutlineDocumentText, HiOutlineCheck, HiOutlineClock } from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { payrollRecords, payrollSummary, payrollByDepartment } from '../../data/payroll';
import { formatCurrency, formatDate } from '../../utils/helpers';
import StatCard from '../../components/ui/StatCard';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import './Payroll.css';

export default function Payroll() {
  const columns = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'department', label: 'Department' },
    { key: 'position', label: 'Position' },
    { key: 'baseSalary', label: 'Base Salary', render: (v) => formatCurrency(v) },
    { key: 'bonus', label: 'Bonus', render: (v) => formatCurrency(v) },
    { key: 'deductions', label: 'Deductions', render: (v) => formatCurrency(v) },
    { key: 'netSalary', label: 'Net Pay', render: (v) => <strong>{formatCurrency(v)}</strong> },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'processed' ? 'success' : 'warning'} dot>{v}</Badge> },
  ];

  const tabs = [
    {
      key: 'records', label: 'Payroll Records',
      content: <Table columns={columns} data={payrollRecords} emptyMessage="No records" />,
    },
    {
      key: 'analytics', label: 'Analytics',
      content: (
        <Card>
          <div style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ marginBottom: 'var(--space-4)' }}>Salary Distribution by Department</h4>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={payrollByDepartment}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickFormatter={(v) => `$${(v/1000)}k`} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} formatter={(v) => formatCurrency(v)} />
                <Bar dataKey="amount" fill="#3b82f6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="page-container payroll-container">
      <div className="page-header">
        <div><h1>Payroll</h1><p className="page-header-subtitle">Manage employee compensation and payslips</p></div>
        <div className="payroll-actions">
          <Button variant="secondary" icon={HiOutlineDocumentText} className="payroll-action-btn">Export</Button>
          <Button icon={HiOutlineCheck} className="payroll-action-btn">Process Payroll</Button>
        </div>
      </div>
      <div className="payroll-stats-grid mb-6">
        <StatCard label="Total Payroll" value={formatCurrency(payrollSummary.totalPayroll)} icon={HiOutlineCurrencyDollar} color="#3b82f6" />
        <StatCard label="Total Bonuses" value={formatCurrency(payrollSummary.totalBonuses)} icon={HiOutlineCurrencyDollar} color="#22c55e" />
        <StatCard label="Processed" value={payrollSummary.processedCount} icon={HiOutlineCheck} color="#22c55e" />
        <StatCard label="Pending" value={payrollSummary.pendingCount} icon={HiOutlineClock} color="#f59e0b" />
      </div>
      <Tabs tabs={tabs} className="payroll-tabs" />
    </div>
  );
}
