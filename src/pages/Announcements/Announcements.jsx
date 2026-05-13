import { useState } from 'react';
import { HiOutlinePlus, HiOutlineSpeakerphone } from 'react-icons/hi';
import { announcements as mockAnnouncements } from '../../data/announcements';
import { formatDate } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const priorityColors = { high: 'danger', medium: 'warning', low: 'info' };
const categoryIcons = { meeting: '📅', benefits: '💼', general: '📌', event: '🎉', security: '🔒' };

export default function Announcements() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Announcements</h1><p className="page-header-subtitle">Company news and notices</p></div>
        <Button icon={HiOutlinePlus} onClick={() => setShowForm(true)}>New Announcement</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {mockAnnouncements.map((ann) => (
          <Card key={ann.id}>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{categoryIcons[ann.category] || '📌'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>{ann.title}</h3>
                  <Badge variant={priorityColors[ann.priority]}>{ann.priority}</Badge>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>{ann.content}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                  <span>{ann.author} · {ann.authorRole}</span>
                  <span>·</span>
                  <span>{formatDate(ann.date)}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="New Announcement" size="md"
        footer={<><Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button><Button>Publish</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Input label="Title" required placeholder="Announcement title" />
          <Input label="Content" type="textarea" required placeholder="Write your announcement..." />
          <Select label="Priority" options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }]} />
        </div>
      </Modal>
    </div>
  );
}
