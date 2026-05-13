import { HiOutlineDocumentText, HiOutlineUpload, HiOutlineDownload, HiOutlineEye, HiOutlineFolder } from 'react-icons/hi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { formatDate } from '../../utils/helpers';

const documents = [
  { id: 'doc-1', name: 'Employment Contract - Emily Thompson', type: 'Contract', department: 'Engineering', uploadedBy: 'Maria Rodriguez', date: '2024-01-15', size: '245 KB' },
  { id: 'doc-2', name: 'NDA Agreement - All Employees', type: 'Policy', department: 'All', uploadedBy: 'Maria Rodriguez', date: '2024-02-01', size: '180 KB' },
  { id: 'doc-3', name: 'Health Insurance Certificate', type: 'Certificate', department: 'HR', uploadedBy: 'Ashley Jackson', date: '2024-02-15', size: '320 KB' },
  { id: 'doc-4', name: 'Q1 Financial Report', type: 'Report', department: 'Finance', uploadedBy: 'Amanda Martinez', date: '2024-03-01', size: '1.2 MB' },
  { id: 'doc-5', name: 'Employee Handbook 2024', type: 'Policy', department: 'HR', uploadedBy: 'Maria Rodriguez', date: '2024-01-01', size: '2.5 MB' },
  { id: 'doc-6', name: 'ISO Certification', type: 'Certificate', department: 'Operations', uploadedBy: 'Jessica Anderson', date: '2024-03-10', size: '890 KB' },
];

const typeColors = { Contract: 'info', Policy: 'warning', Certificate: 'success', Report: 'gray' };

export default function Documents() {
  const columns = [
    { key: 'name', label: 'Document', render: (v, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <HiOutlineDocumentText size={18} style={{ color: 'var(--color-primary-500)', flexShrink: 0 }} />
        <strong>{v}</strong>
      </div>
    )},
    { key: 'type', label: 'Type', render: (v) => <Badge variant={typeColors[v] || 'gray'}>{v}</Badge> },
    { key: 'department', label: 'Department' },
    { key: 'uploadedBy', label: 'Uploaded By' },
    { key: 'date', label: 'Date', render: (v) => formatDate(v) },
    { key: 'size', label: 'Size' },
    { key: 'actions', label: '', width: '80px', render: () => (
      <div style={{ display: 'flex', gap: 4 }}>
        <button className="btn btn-ghost btn-icon btn-sm" title="Preview"><HiOutlineEye size={15} /></button>
        <button className="btn btn-ghost btn-icon btn-sm" title="Download"><HiOutlineDownload size={15} /></button>
      </div>
    )},
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Documents</h1><p className="page-header-subtitle">{documents.length} documents</p></div>
        <Button icon={HiOutlineUpload}>Upload Document</Button>
      </div>
      <div className="grid-4 mb-6">
        {['Contract', 'Policy', 'Certificate', 'Report'].map((t) => (
          <Card key={t}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HiOutlineFolder size={20} style={{ color: 'var(--color-primary-600)' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{documents.filter((d) => d.type === t).length}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{t}s</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Table columns={columns} data={documents} />
    </div>
  );
}
