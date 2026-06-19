import { useState, useEffect, useRef } from 'react';
import { 
  HiOutlineDocumentText, 
  HiOutlineUpload, 
  HiOutlineDownload, 
  HiOutlineEye, 
  HiOutlineFolder, 
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { formatDate } from '../../utils/helpers';
import { saveFile, getFile, deleteFile, getMockPdfBlob } from '../../utils/documentStorage';
import './Documents.css';

const DEFAULT_DOCUMENTS = [
  { id: 'doc-1', name: 'Employment Contract - Emily Thompson', type: 'Contract', department: 'Engineering', uploadedBy: 'Maria Rodriguez', date: '2024-01-15', size: '245 KB', isMock: true },
  { id: 'doc-2', name: 'NDA Agreement - All Employees', type: 'Policy', department: 'All', uploadedBy: 'Maria Rodriguez', date: '2024-02-01', size: '180 KB', isMock: true },
  { id: 'doc-3', name: 'Health Insurance Certificate', type: 'Certificate', department: 'HR', uploadedBy: 'Ashley Jackson', date: '2024-02-15', size: '320 KB', isMock: true },
  { id: 'doc-4', name: 'Q1 Financial Report', type: 'Report', department: 'Finance', uploadedBy: 'Amanda Martinez', date: '2024-03-01', size: '1.2 MB', isMock: true },
  { id: 'doc-5', name: 'Employee Handbook 2024', type: 'Policy', department: 'HR', uploadedBy: 'Maria Rodriguez', date: '2024-01-01', size: '2.5 MB', isMock: true },
  { id: 'doc-6', name: 'ISO Certification', type: 'Certificate', department: 'Operations', uploadedBy: 'Jessica Anderson', date: '2024-03-10', size: '890 KB', isMock: true },
];

const typeColors = { Contract: 'info', Policy: 'warning', Certificate: 'success', Report: 'gray' };

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState(null); // 'Contract', 'Policy', etc.
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('');
  
  // Upload modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('Contract');
  const [newDocDept, setNewDocDept] = useState('All');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Load documents metadata from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hrms_documents');
    if (saved) {
      setDocuments(JSON.parse(saved));
    } else {
      localStorage.setItem('hrms_documents', JSON.stringify(DEFAULT_DOCUMENTS));
      setDocuments(DEFAULT_DOCUMENTS);
    }
  }, []);

  const saveDocsState = (updatedDocs) => {
    localStorage.setItem('hrms_documents', JSON.stringify(updatedDocs));
    setDocuments(updatedDocs);
  };

  // Filter handlers
  const handleTypeCardClick = (type) => {
    if (selectedTypeFilter === type) {
      setSelectedTypeFilter(null); // clear filter if clicking active
    } else {
      setSelectedTypeFilter(type);
    }
  };

  // Upload handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      toast.error('Only PDF documents are allowed.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setSelectedFile(file);
    // Auto-fill document name if empty
    if (!newDocName) {
      const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setNewDocName(cleanName);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a PDF file.');
      return;
    }
    if (!newDocName.trim()) {
      toast.error('Please enter a document name.');
      return;
    }

    try {
      const docId = `doc-${Date.now()}`;
      // Save file binary in IndexedDB
      await saveFile(docId, selectedFile);

      // Save metadata in LocalStorage
      const sizeStr = selectedFile.size > 1024 * 1024 
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(selectedFile.size / 1024).toFixed(0)} KB`;

      // Get current logged-in user or default
      const userStr = localStorage.getItem('hrms_user');
      const uploader = userStr ? JSON.parse(userStr) : null;
      const uploaderName = uploader ? `${uploader.firstName} ${uploader.lastName}` : 'Maria Rodriguez';

      const newDoc = {
        id: docId,
        name: newDocName,
        type: newDocType,
        department: newDocDept,
        uploadedBy: uploaderName,
        date: new Date().toISOString().split('T')[0],
        size: sizeStr,
        isMock: false
      };

      const updated = [newDoc, ...documents];
      saveDocsState(updated);
      toast.success('Document uploaded successfully.');

      // Reset form
      setShowUploadModal(false);
      setNewDocName('');
      setNewDocType('Contract');
      setNewDocDept('All');
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload document.');
    }
  };

  // Preview handler
  const handlePreview = async (doc) => {
    try {
      let fileBlob;
      if (doc.isMock) {
        fileBlob = getMockPdfBlob(doc.name, doc.department);
      } else {
        const file = await getFile(doc.id);
        if (!file) {
          // Fallback to generating mock PDF if binary not found
          fileBlob = getMockPdfBlob(doc.name, doc.department);
        } else {
          fileBlob = file;
        }
      }

      const fileUrl = URL.createObjectURL(fileBlob);
      window.open(fileUrl, '_blank');
      
      // Revoke URL after a small delay to avoid memory leak
      setTimeout(() => URL.revokeObjectURL(fileUrl), 60000);
    } catch (error) {
      console.error("Preview failed:", error);
      toast.error("Failed to open preview.");
    }
  };

  // Download handler
  const handleDownload = async (doc) => {
    try {
      let fileBlob;
      if (doc.isMock) {
        fileBlob = getMockPdfBlob(doc.name, doc.department);
      } else {
        const file = await getFile(doc.id);
        if (!file) {
          fileBlob = getMockPdfBlob(doc.name, doc.department);
        } else {
          fileBlob = file;
        }
      }

      const fileUrl = URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = doc.name.endsWith('.pdf') ? doc.name : `${doc.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => URL.revokeObjectURL(fileUrl), 10000);
      toast.success('Downloading started...');
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download file.");
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        // Delete binary from DB
        await deleteFile(id);
        
        // Delete metadata from state/localstorage
        const updated = documents.filter((d) => d.id !== id);
        saveDocsState(updated);
        toast.success("Document deleted.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete document.");
      }
    }
  };

  // Apply filters
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedTypeFilter ? doc.type === selectedTypeFilter : true;
    
    const matchesDept = selectedDeptFilter 
      ? doc.department.toLowerCase() === selectedDeptFilter.toLowerCase() || doc.department === 'All'
      : true;

    return matchesSearch && matchesType && matchesDept;
  });

  const columns = [
    { 
      key: 'name', 
      label: 'Document', 
      render: (v, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <HiOutlineDocumentText size={20} style={{ color: 'var(--color-primary-600)', flexShrink: 0 }} />
          <div>
            <strong style={{ display: 'block', marginBottom: 2 }}>{v}</strong>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>Size: {row.size}</span>
          </div>
        </div>
      )
    },
    { 
      key: 'type', 
      label: 'Type', 
      render: (v) => <Badge variant={typeColors[v] || 'gray'}>{v}</Badge> 
    },
    { key: 'department', label: 'Department' },
    { key: 'uploadedBy', label: 'Uploaded By' },
    { key: 'date', label: 'Upload Date', render: (v) => formatDate(v) },
    { 
      key: 'actions', 
      label: 'Actions', 
      width: '120px', 
      render: (_, row) => (
        <div className="actions-cell" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => handlePreview(row)} title="Preview PDF"><HiOutlineEye size={16} /></button>
          <button onClick={() => handleDownload(row)} title="Download PDF"><HiOutlineDownload size={16} /></button>
          <button className="delete-btn-hover" onClick={() => handleDelete(row.id)} title="Delete Document"><HiOutlineTrash size={16} /></button>
        </div>
      )
    },
  ];

  // Helper to count by category type
  const countByType = (type) => documents.filter((d) => d.type === type).length;

  return (
    <div className="page-container documents-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Documents</h1>
          <p className="page-header-subtitle">Manage company contracts, certificates, policies, and files.</p>
        </div>
        <Button icon={HiOutlineUpload} onClick={() => setShowUploadModal(true)}>Upload Document</Button>
      </div>

      {/* Interactive folders grid */}
      <div className="folder-grid">
        {[
          { label: 'Contracts', key: 'Contract' },
          { label: 'Policies', key: 'Policy' },
          { label: 'Certificates', key: 'Certificate' },
          { label: 'Reports', key: 'Report' }
        ].map((f) => {
          const isActive = selectedTypeFilter === f.key;
          return (
            <div 
              key={f.key} 
              className={`folder-card ${isActive ? 'active' : ''}`}
              onClick={() => handleTypeCardClick(f.key)}
            >
              <div className="folder-icon-wrapper">
                <HiOutlineFolder size={24} />
              </div>
              <div className="folder-info">
                <div className="folder-count">{countByType(f.key)}</div>
                <div className="folder-label">{f.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters panel */}
      <div className="search-filter-row">
        <div className="search-input-wrapper">
          <Input 
            placeholder="Search documents by name or uploaded by..." 
            icon={HiOutlineSearch}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <select 
            className="dept-select"
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>
          {(selectedTypeFilter || searchQuery || selectedDeptFilter) && (
            <button className="clear-btn" onClick={() => {
              setSelectedTypeFilter(null);
              setSearchQuery('');
              setSelectedDeptFilter('');
              toast.success('Filters cleared.');
            }}>
              <HiOutlineX size={14} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <Table 
        columns={columns} 
        data={filteredDocuments} 
        emptyMessage={
          <div className="table-empty-container">
            <HiOutlineDocumentText size={48} style={{ color: 'var(--color-gray-300)' }} />
            <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>No PDF documents found</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>Try resetting the active search/filters or upload a new file.</div>
          </div>
        }
      />

      {/* Upload Document Modal */}
      <Modal 
        isOpen={showUploadModal} 
        onClose={() => {
          setShowUploadModal(false);
          setSelectedFile(null);
          setNewDocName('');
        }}
        title="Upload Document"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => {
              setShowUploadModal(false);
              setSelectedFile(null);
              setNewDocName('');
            }}>Cancel</Button>
            <Button onClick={handleUploadSubmit} disabled={!selectedFile || !newDocName.trim()}>Save Document</Button>
          </>
        }
      >
        <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div 
            className={`upload-dropzone ${selectedFile ? 'has-file' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".pdf"
              onChange={handleFileChange}
            />
            <HiOutlineUpload size={32} className="upload-icon" />
            <div className="upload-text">Click to choose a file or drag here</div>
            <div className="upload-subtext">PDF format only (Max 10MB)</div>
          </div>

          {selectedFile && (
            <div className="selected-file-banner">
              <div className="selected-file-info">
                <HiOutlineDocumentText size={20} style={{ color: 'var(--color-primary-500)' }} />
                <div>
                  <div className="selected-file-name">{selectedFile.name}</div>
                  <div className="selected-file-size">{(selectedFile.size / 1024).toFixed(0)} KB</div>
                </div>
              </div>
              <button 
                type="button" 
                className="remove-file-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
              >
                <HiOutlineX size={18} />
              </button>
            </div>
          )}

          <Input 
            label="Document Display Name" 
            required 
            placeholder="Enter custom document name" 
            value={newDocName}
            onChange={(e) => setNewDocName(e.target.value)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Select 
              label="Document Type" 
              options={[
                { value: 'Contract', label: 'Contract' },
                { value: 'Policy', label: 'Policy' },
                { value: 'Certificate', label: 'Certificate' },
                { value: 'Report', label: 'Report' }
              ]}
              value={newDocType}
              onChange={(e) => setNewDocType(e.target.value)}
            />
            <Select 
              label="Assigned Department" 
              options={[
                { value: 'All', label: 'All Departments' },
                { value: 'Engineering', label: 'Engineering' },
                { value: 'HR', label: 'HR' },
                { value: 'Finance', label: 'Finance' },
                { value: 'Operations', label: 'Operations' },
                { value: 'Sales', label: 'Sales' },
                { value: 'Marketing', label: 'Marketing' }
              ]}
              value={newDocDept}
              onChange={(e) => setNewDocDept(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
