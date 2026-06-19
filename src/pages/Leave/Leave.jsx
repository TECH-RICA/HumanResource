import { useState } from 'react';
import { HiOutlinePlus, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { leaveRequests } from '../../data/leaveRequests';
import { formatDate } from '../../utils/helpers';
import { LEAVE_TYPE_LABELS } from '../../constants/leaveTypes';
import StatCard from '../../components/ui/StatCard';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Card from '../../components/ui/Card';
import toast from 'react-hot-toast';
import './Leave.css';

const statusMap = { approved: 'success', pending: 'warning', rejected: 'danger' };

export default function Leave() {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState(leaveRequests);

  const pending = requests.filter((r) => r.status === 'pending').length;
  const approved = requests.filter((r) => r.status === 'approved').length;

  const handleAction = (id, action) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
    toast.success(`Leave ${action}`);
  };

  const columns = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'department', label: 'Department' },
    { key: 'type', label: 'Type', render: (v) => LEAVE_TYPE_LABELS[v] || v },
    { key: 'startDate', label: 'From', render: (v) => formatDate(v) },
    { key: 'endDate', label: 'To', render: (v) => formatDate(v) },
    { key: 'days', label: 'Days' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={statusMap[v]} dot>{v}</Badge> },
    {
      key: 'actions', label: 'Actions', render: (_, row) => row.status === 'pending' ? (
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="btn btn-ghost btn-icon btn-sm" title="Approve" onClick={(e) => { e.stopPropagation(); handleAction(row.id, 'approved'); }}><HiOutlineCheck size={16} style={{ color: 'var(--color-success-600)' }} /></button>
          <button className="btn btn-ghost btn-icon btn-sm" title="Reject" onClick={(e) => { e.stopPropagation(); handleAction(row.id, 'rejected'); }}><HiOutlineX size={16} style={{ color: 'var(--color-danger-600)' }} /></button>
        </div>
      ) : <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-xs)' }}>{row.approvedBy ? `by ${row.approvedBy}` : '—'}</span>,
    },
  ];

  const leaveTypeOptions = Object.entries(LEAVE_TYPE_LABELS).map(([val, label]) => ({ value: val, label }));

  const balances = [
    { type: 'Annual', total: 20, used: 8, color: '#3b82f6' },
    { type: 'Sick', total: 10, used: 3, color: '#ef4444' },
    { type: 'Maternity', total: 90, used: 0, color: '#8b5cf6' },
    { type: 'Compassionate', total: 5, used: 2, color: '#f59e0b' },
  ];

  return (
    <div className="page-container leave-container">
      <div className="page-header">
        <div><h1>Leave Management</h1><p className="page-header-subtitle">Manage leave requests and balances</p></div>
        <Button icon={HiOutlinePlus} onClick={() => setShowForm(true)}>Apply Leave</Button>
      </div>

      <div className="leave-balance-list mb-6">
        {balances.map((b) => (
          <div key={b.type} className="leave-balance-item" style={{ borderLeftColor: b.color }}>
            <div className="leave-balance-type">{b.type}</div>
            <div className="leave-balance-count" style={{ color: b.color }}>{b.total - b.used}</div>
            <div className="leave-balance-days">{b.used} used of {b.total}</div>
            <div style={{ height: 4, background: 'var(--color-gray-200)', borderRadius: 2, marginTop: 8 }}>
              <div style={{ height: '100%', width: `${(b.used / b.total) * 100}%`, background: b.color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      <Table columns={columns} data={requests} emptyMessage="No leave requests" />

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Apply for Leave" size="md"
        footer={<><Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button><Button onClick={() => { setShowForm(false); toast.success('Leave request submitted'); }}>Submit</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Select label="Leave Type" required options={leaveTypeOptions} placeholder="Select type" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Input label="Start Date" type="date" required />
            <Input label="End Date" type="date" required />
          </div>
          <Input label="Reason" type="textarea" placeholder="Reason for leave..." required />
        </div>
      </Modal>
    </div>
  );
}
