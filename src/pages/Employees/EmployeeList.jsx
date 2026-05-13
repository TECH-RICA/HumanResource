import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiOutlineDotsVertical } from 'react-icons/hi';
import { employees as allEmployees } from '../../data/employees';
import { departments } from '../../data/departments';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';
import Dropdown from '../../components/ui/Dropdown';
import Modal from '../../components/ui/Modal';
import EmployeeForm from './EmployeeForm';
import './Employees.css';

const PAGE_SIZE = 10;
const statusVariant = { active: 'success', inactive: 'gray', on_leave: 'info', terminated: 'danger', probation: 'warning' };
const statusLabel = { active: 'Active', inactive: 'Inactive', on_leave: 'On Leave', terminated: 'Terminated', probation: 'Probation' };

export default function EmployeeList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    return allEmployees.filter((e) => {
      const matchSearch = !debouncedSearch ||
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        e.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        e.position.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchDept = !deptFilter || e.departmentId === deptFilter;
      const matchStatus = !statusFilter || e.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [debouncedSearch, deptFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    {
      key: 'name', label: 'Employee', render: (_, row) => (
        <div className="emp-row-info">
          <Avatar name={`${row.firstName} ${row.lastName}`} size="sm" />
          <div>
            <div className="emp-row-name">{row.firstName} {row.lastName}</div>
            <div className="emp-row-email">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'department', label: 'Department' },
    { key: 'position', label: 'Position' },
    {
      key: 'status', label: 'Status', render: (val) => (
        <Badge variant={statusVariant[val] || 'gray'} dot>{statusLabel[val] || val}</Badge>
      ),
    },
    { key: 'joiningDate', label: 'Joined', render: (val) => formatDate(val) },
    {
      key: 'actions', label: '', width: '48px', render: (_, row) => (
        <Dropdown
          trigger={<button className="btn btn-ghost btn-icon btn-sm"><HiOutlineDotsVertical size={16} /></button>}
          items={[
            { icon: HiOutlineEye, label: 'View Profile', onClick: () => navigate(`/employees/${row.id}`) },
            { icon: HiOutlinePencil, label: 'Edit', onClick: () => navigate(`/employees/${row.id}`) },
            { divider: true },
            { icon: HiOutlineTrash, label: 'Delete', danger: true, onClick: () => {} },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p className="page-header-subtitle">{allEmployees.length} total employees</p>
        </div>
        <Button icon={HiOutlinePlus} onClick={() => setShowForm(true)}>Add Employee</Button>
      </div>

      <div className="emp-toolbar">
        <div className="emp-filters">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search employees..." className="emp-search" />
          <select className="emp-filter-select" value={deptFilter} onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}>
            <option value="">All Departments</option>
            {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <select className="emp-filter-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
            <option value="probation">Probation</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <Table columns={columns} data={paged} onRowClick={(row) => navigate(`/employees/${row.id}`)} />
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add New Employee" size="lg">
        <EmployeeForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}
