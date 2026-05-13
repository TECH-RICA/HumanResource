import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineOfficeBuilding, HiOutlineCalendar, HiOutlineArrowLeft } from 'react-icons/hi';
import { employees } from '../../data/employees';
import { leaveRequests } from '../../data/leaveRequests';
import { attendance } from '../../data/attendance';
import { formatDate, formatCurrency } from '../../utils/helpers';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import './Employees.css';

export default function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const emp = employees.find((e) => e.id === id);

  if (!emp) return <div className="page-container"><p>Employee not found.</p></div>;

  const fullName = `${emp.firstName} ${emp.lastName}`;
  const empLeaves = leaveRequests.filter((l) => l.employeeId === id);
  const empAttendance = attendance.filter((a) => a.employeeId === id);

  const statusVariant = { active: 'success', inactive: 'gray', on_leave: 'info', probation: 'warning' };

  const tabs = [
    {
      key: 'personal', label: 'Personal Info',
      content: (
        <Card>
          <div className="emp-detail-grid">
            <div className="emp-detail-item"><div className="emp-detail-label">Full Name</div><div className="emp-detail-value">{fullName}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">Email</div><div className="emp-detail-value">{emp.email}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">Phone</div><div className="emp-detail-value">{emp.phone}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">Gender</div><div className="emp-detail-value">{emp.gender}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">Date of Birth</div><div className="emp-detail-value">{formatDate(emp.dateOfBirth)}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">ID Number</div><div className="emp-detail-value">{emp.idNumber}</div></div>
            <div className="emp-detail-item" style={{ gridColumn: '1 / -1' }}><div className="emp-detail-label">Address</div><div className="emp-detail-value">{emp.address}</div></div>
            {emp.emergencyContact && (
              <>
                <div className="emp-detail-item"><div className="emp-detail-label">Emergency Contact</div><div className="emp-detail-value">{emp.emergencyContact.name} ({emp.emergencyContact.relation})</div></div>
                <div className="emp-detail-item"><div className="emp-detail-label">Emergency Phone</div><div className="emp-detail-value">{emp.emergencyContact.phone}</div></div>
              </>
            )}
          </div>
        </Card>
      ),
    },
    {
      key: 'employment', label: 'Employment',
      content: (
        <Card>
          <div className="emp-detail-grid">
            <div className="emp-detail-item"><div className="emp-detail-label">Department</div><div className="emp-detail-value">{emp.department}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">Position</div><div className="emp-detail-value">{emp.position}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">Employment Type</div><div className="emp-detail-value" style={{ textTransform: 'capitalize' }}>{emp.employmentStatus?.replace('_', ' ')}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">Joining Date</div><div className="emp-detail-value">{formatDate(emp.joiningDate)}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">Salary</div><div className="emp-detail-value">{formatCurrency(emp.salary)}</div></div>
            <div className="emp-detail-item"><div className="emp-detail-label">Status</div><div className="emp-detail-value"><Badge variant={statusVariant[emp.status]} dot>{emp.status}</Badge></div></div>
          </div>
        </Card>
      ),
    },
    {
      key: 'leave', label: 'Leave History',
      content: (
        <Table
          columns={[
            { key: 'type', label: 'Type', render: (v) => <span style={{ textTransform: 'capitalize' }}>{v}</span> },
            { key: 'startDate', label: 'From', render: (v) => formatDate(v) },
            { key: 'endDate', label: 'To', render: (v) => formatDate(v) },
            { key: 'days', label: 'Days' },
            { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'approved' ? 'success' : v === 'pending' ? 'warning' : 'danger'} dot>{v}</Badge> },
          ]}
          data={empLeaves}
          emptyMessage="No leave records"
        />
      ),
    },
    {
      key: 'attendance', label: 'Attendance',
      content: (
        <Table
          columns={[
            { key: 'date', label: 'Date', render: (v) => formatDate(v) },
            { key: 'clockIn', label: 'Clock In' },
            { key: 'clockOut', label: 'Clock Out' },
            { key: 'hoursWorked', label: 'Hours', render: (v) => v?.toFixed(1) },
            { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'present' ? 'success' : 'danger'} dot>{v}</Badge> },
          ]}
          data={empAttendance}
          emptyMessage="No attendance records"
        />
      ),
    },
  ];

  return (
    <div className="page-container">
      <Button variant="ghost" icon={HiOutlineArrowLeft} onClick={() => navigate('/employees')} style={{ marginBottom: 'var(--space-4)' }}>Back to Employees</Button>

      <div className="emp-profile-header">
        <Avatar name={fullName} size="2xl" />
        <div className="emp-profile-info">
          <h2 className="emp-profile-name">{fullName}</h2>
          <p className="emp-profile-position">{emp.position} · {emp.department}</p>
          <div className="emp-profile-meta">
            <span className="emp-profile-meta-item"><HiOutlineMail size={15} />{emp.email}</span>
            <span className="emp-profile-meta-item"><HiOutlinePhone size={15} />{emp.phone}</span>
            <span className="emp-profile-meta-item"><HiOutlineCalendar size={15} />Joined {formatDate(emp.joiningDate)}</span>
          </div>
        </div>
        <Badge variant={statusVariant[emp.status]} dot>{emp.status}</Badge>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
}
