import { useState } from 'react';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineUsers } from 'react-icons/hi';
import { departments } from '../../data/departments';
import { employees } from '../../data/employees';
import { formatCurrency } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import './Departments.css';

export default function Departments() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>DEPARTMENTS</h1><p className="page-header-subtitle">{departments.length} departments</p></div>
        <Button icon={HiOutlinePlus} onClick={() => setShowForm(true)}>Add Department</Button>
      </div>
      <div className="dept-grid">
        {departments.map((dept) => {
          const manager = employees.find((e) => e.id === dept.managerId);
          const deptEmployees = employees.filter((e) => e.departmentId === dept.id);
          return (
            <Card key={dept.id} className="dept-card">
              <div className="dept-card-header">
                <div className="dept-icon" style={{ background: dept.color + '18', color: dept.color }}>
                  <HiOutlineUsers size={20} />
                </div>
                <button className="btn btn-ghost btn-icon btn-sm"><HiOutlinePencil size={15} /></button>
              </div>
              <h3 className="dept-name">{dept.name}</h3>
              <p className="dept-desc">{dept.description}</p>
              <div className="dept-stats">
                <div className="dept-stat"><span className="dept-stat-value">{deptEmployees.length}</span><span className="dept-stat-label">Employees</span></div>
                <div className="dept-stat"><span className="dept-stat-value">{formatCurrency(dept.budget)}</span><span className="dept-stat-label">Budget</span></div>
              </div>
              {manager && (
                <div className="dept-manager">
                  <Avatar name={`${manager.firstName} ${manager.lastName}`} size="sm" />
                  <div><div className="dept-manager-name">{manager.firstName} {manager.lastName}</div><div className="dept-manager-role">{manager.position}</div></div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Department" size="md"
        footer={<><Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button><Button>Save</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Input label="Department Name" required placeholder="e.g. Engineering" />
          <Input label="Description" type="textarea" placeholder="Brief description" />
        </div>
      </Modal>
    </div>
  );
}
