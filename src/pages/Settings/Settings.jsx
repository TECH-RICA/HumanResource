import { useState } from 'react';
import { HiOutlineOfficeBuilding, HiOutlineBell, HiOutlineShieldCheck, HiOutlineCreditCard, HiOutlineColorSwatch, HiOutlineUserGroup } from 'react-icons/hi';
import { useTenantStore } from '../../context/TenantContext';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import toast from 'react-hot-toast';
import './Settings.css';

export default function Settings() {
  const { tenant, updateTenant } = useTenantStore();

  const tabs = [
    {
      key: 'company', label: 'Company Profile',
      content: (
        <Card>
          <div className="settings-section">
            <h4>Company Information</h4>
            <div className="emp-form-grid">
              <Input label="Company Name" defaultValue={tenant.name} />
              <Input label="Industry" defaultValue={tenant.industry} />
              <Input label="Email" type="email" defaultValue={tenant.email} />
              <Input label="Phone" defaultValue={tenant.phone} />
              <Input label="Website" defaultValue={tenant.website} />
              <Input label="Address" defaultValue={tenant.address} />
            </div>
            <Button onClick={() => toast.success('Company profile updated')} style={{ marginTop: 'var(--space-4)' }}>Save Changes</Button>
          </div>
        </Card>
      ),
    },
    {
      key: 'branding', label: 'Branding',
      content: (
        <Card>
          <div className="settings-section">
            <h4>Company Branding</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Customize the look and feel of your workspace</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
              <div>
                <label className="input-label">Logo</label>
                <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-lg)', background: 'var(--color-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: 4 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-primary-600)' }}>P</span>
                </div>
              </div>
              <Input label="Primary Color" type="color" defaultValue={tenant.primaryColor} />
              <Input label="Company Domain" defaultValue={tenant.domain} />
            </div>
            <Button onClick={() => toast.success('Branding updated')} style={{ marginTop: 'var(--space-4)' }}>Save</Button>
          </div>
        </Card>
      ),
    },
    {
      key: 'roles', label: 'Roles & Permissions',
      content: (
        <Card>
          <div className="settings-section">
            <h4>Role Management</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              {['Super Admin', 'HR Admin', 'Manager', 'Employee'].map((role) => (
                <div key={role} className="role-item">
                  <div>
                    <div style={{ fontWeight: 500 }}>{role}</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                      {role === 'Super Admin' ? 'Full access to all features' : role === 'HR Admin' ? 'Manage employees, payroll, recruitment' : role === 'Manager' ? 'Manage team, approve leaves' : 'View own profile and apply for leave'}
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ),
    },
    {
      key: 'notifications', label: 'Notifications',
      content: (
        <Card>
          <div className="settings-section">
            <h4>Notification Preferences</h4>
            {['Leave requests', 'Payroll processed', 'New employees', 'Announcements', 'Performance reviews'].map((item) => (
              <div key={item} className="setting-toggle-row">
                <div>
                  <div style={{ fontWeight: 500 }}>{item}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>Receive notifications for {item.toLowerCase()}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider" />
                </label>
              </div>
            ))}
          </div>
        </Card>
      ),
    },
    {
      key: 'security', label: 'Security',
      content: (
        <Card>
          <div className="settings-section">
            <h4>Security Settings</h4>
            <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <Input label="Current Password" type="password" placeholder="Enter current password" />
              <Input label="New Password" type="password" placeholder="Enter new password" />
              <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
              <Button onClick={() => toast.success('Password updated')}>Update Password</Button>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Settings</h1><p className="page-header-subtitle">Manage your workspace settings</p></div>
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}
