import { useState } from 'react';
import { HiOutlineDocumentDownload, HiOutlineChartBar } from 'react-icons/hi';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { employees } from '../../data/employees';
import { monthlyAttendance } from '../../data/attendance';
import { payrollByDepartment } from '../../data/payroll';
import { formatCurrency } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import Select from '../../components/ui/Select';
import toast from 'react-hot-toast';

const deptDistribution = ['Engineering', 'Sales', 'Marketing', 'Operations', 'Customer Support', 'Finance', 'Human Resources', 'Design']
  .map((dept) => ({ department: dept, count: employees.filter((e) => e.department === dept).length }));

export default function Reports() {
  const handleExport = (format) => toast.success(`Report exported as ${format}`);

  const tabs = [
    {
      key: 'employee', label: 'Employee',
      content: (
        <Card>
          <div style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <h4>Employees by Department</h4>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="secondary" size="sm" icon={HiOutlineDocumentDownload} onClick={() => handleExport('PDF')}>PDF</Button>
                <Button variant="secondary" size="sm" icon={HiOutlineDocumentDownload} onClick={() => handleExport('CSV')}>CSV</Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={deptDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="department" tick={{ fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      ),
    },
    {
      key: 'attendance', label: 'Attendance',
      content: (
        <Card>
          <div style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ marginBottom: 'var(--space-4)' }}>Monthly Attendance Overview</h4>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Legend iconType="circle" iconSize={8} />
                <Line type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      ),
    },
    {
      key: 'payroll', label: 'Payroll',
      content: (
        <Card>
          <div style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ marginBottom: 'var(--space-4)' }}>Payroll by Department</h4>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={payrollByDepartment} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickFormatter={(v) => `$${(v/1000)}k`} />
                <YAxis dataKey="department" type="category" width={110} tick={{ fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8 }} formatter={(v) => formatCurrency(v)} />
                <Bar dataKey="amount" fill="#8b5cf6" radius={[0,4,4,0]} barSize={18} />
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
        <div><h1>Reports</h1><p className="page-header-subtitle">Analytics and insights</p></div>
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}
