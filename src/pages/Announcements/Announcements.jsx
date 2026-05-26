import { useState, useEffect } from 'react';
import { 
  HiOutlinePlus, 
  HiOutlineSpeakerphone, 
  HiOutlineTrash, 
  HiOutlinePencil, 
  HiOutlineSearch, 
  HiOutlineX, 
  HiOutlineEye 
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { announcements as initialAnnouncements } from '../../data/announcements';
import { formatDate } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useAuthStore } from '../../context/AuthContext';
import './Announcements.css';

const priorityColors = { high: 'danger', medium: 'warning', low: 'info' };
const categoryIcons = { meeting: '📅', benefits: '💼', general: '📌', event: '🎉', security: '🔒' };
const categoryLabels = { meeting: 'Meeting', benefits: 'Benefits', general: 'General', event: 'Event', security: 'Security' };

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  
  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formPriority, setFormPriority] = useState('medium');
  const [formCategory, setFormCategory] = useState('general');

  const currentUser = useAuthStore((s) => s.user);

  // Load announcements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hrms_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      localStorage.setItem('hrms_announcements', JSON.stringify(initialAnnouncements));
      setAnnouncements(initialAnnouncements);
    }
  }, []);

  const saveAnnouncementsState = (updated) => {
    localStorage.setItem('hrms_announcements', JSON.stringify(updated));
    setAnnouncements(updated);
  };

  // Open creation modal
  const handleOpenCreate = () => {
    setIsEditMode(false);
    setFormTitle('');
    setFormContent('');
    setFormPriority('medium');
    setFormCategory('general');
    setShowFormModal(true);
  };

  // Open edit modal
  const handleOpenEdit = (ann, e) => {
    e.stopPropagation(); // Prevent card click reader modal
    setIsEditMode(true);
    setActiveAnnouncement(ann);
    setFormTitle(ann.title);
    setFormContent(ann.content);
    setFormPriority(ann.priority);
    setFormCategory(ann.category);
    setShowFormModal(true);
  };

  // Click card handler (open detail view)
  const handleCardClick = (ann) => {
    setActiveAnnouncement(ann);
    setShowDetailModal(true);
  };

  // Form submission (publish / update)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error('Title is required.');
      return;
    }
    if (!formContent.trim()) {
      toast.error('Content is required.');
      return;
    }

    if (isEditMode && activeAnnouncement) {
      // Update existing
      const updated = announcements.map((ann) => {
        if (ann.id === activeAnnouncement.id) {
          return {
            ...ann,
            title: formTitle,
            content: formContent,
            priority: formPriority,
            category: formCategory,
          };
        }
        return ann;
      });
      saveAnnouncementsState(updated);
      toast.success('Announcement updated successfully.');
    } else {
      // Create new
      const authorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'James Mitchell';
      const authorRole = currentUser ? currentUser.position : 'CTO';
      
      const newAnn = {
        id: `ann-${Date.now()}`,
        title: formTitle,
        content: formContent,
        priority: formPriority,
        category: formCategory,
        author: authorName,
        authorRole: authorRole,
        date: new Date().toISOString().split('T')[0],
      };

      const updated = [newAnn, ...announcements];
      saveAnnouncementsState(updated);
      toast.success('Announcement published successfully.');
    }

    // Close and reset
    setShowFormModal(false);
    setFormTitle('');
    setFormContent('');
  };

  // Delete handler
  const handleDelete = (id, e) => {
    e.stopPropagation(); // Prevent card click
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      const updated = announcements.filter((ann) => ann.id !== id);
      saveAnnouncementsState(updated);
      toast.success('Announcement deleted.');
    }
  };

  // Apply filters
  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch = 
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? ann.category === selectedCategory : true;
    const matchesPriority = selectedPriority ? ann.priority === selectedPriority : true;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <div className="page-container announcements-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Announcements</h1>
          <p className="page-header-subtitle">Stay updated with company announcements, safety notes, and events.</p>
        </div>
        <Button icon={HiOutlinePlus} onClick={handleOpenCreate}>New Announcement</Button>
      </div>

      {/* Filter panel */}
      <div className="announcements-filters">
        <div className="announcements-search">
          <Input 
            placeholder="Search announcements by title, content or publisher..."
            icon={HiOutlineSearch}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-selects">
          <select 
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="meeting">Meetings</option>
            <option value="benefits">Benefits</option>
            <option value="general">General</option>
            <option value="event">Events</option>
            <option value="security">Security</option>
          </select>
          <select 
            className="filter-select"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {(searchQuery || selectedCategory || selectedPriority) && (
            <button className="clear-filters-btn" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedPriority('');
              toast.success('Filters cleared.');
            }}>
              <HiOutlineX size={14} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Announcements List */}
      <div className="announcements-list">
        {filteredAnnouncements.length === 0 ? (
          <div className="announcements-empty-container">
            <HiOutlineSpeakerphone size={48} style={{ color: 'var(--color-gray-300)' }} />
            <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>No announcements found</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>Try clearing your filters or create a new announcement.</div>
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <div 
              key={ann.id} 
              className="announcement-card" 
              onClick={() => handleCardClick(ann)}
              title="Click to read full announcement"
            >
              <div className="announcement-card-header">
                <div className="announcement-title-group">
                  <span style={{ fontSize: 24 }}>{categoryIcons[ann.category] || '📌'}</span>
                  <h3 className="announcement-title">{ann.title}</h3>
                  <Badge variant={priorityColors[ann.priority]}>{ann.priority}</Badge>
                  <Badge variant="gray">{categoryLabels[ann.category] || ann.category}</Badge>
                </div>
                <div className="announcement-actions">
                  <button 
                    className="announcement-action-btn" 
                    onClick={(e) => handleOpenEdit(ann, e)}
                    title="Edit Announcement"
                  >
                    <HiOutlinePencil size={15} />
                  </button>
                  <button 
                    className="announcement-action-btn delete" 
                    onClick={(e) => handleDelete(ann.id, e)}
                    title="Delete Announcement"
                  >
                    <HiOutlineTrash size={15} />
                  </button>
                </div>
              </div>

              <p className="announcement-content-preview truncate" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
                {ann.content}
              </p>

              <div className="announcement-card-footer">
                <div className="announcement-author-info">
                  <Avatar name={ann.author} size="sm" />
                  <div className="announcement-author-details">
                    <span className="announcement-author-name">{ann.author}</span>
                    <span className="announcement-author-role">{ann.authorRole}</span>
                  </div>
                </div>
                <div>{formatDate(ann.date)}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New / Edit Announcement Modal */}
      <Modal 
        isOpen={showFormModal} 
        onClose={() => setShowFormModal(false)} 
        title={isEditMode ? 'Edit Announcement' : 'New Announcement'} 
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowFormModal(false)}>Cancel</Button>
            <Button onClick={handleFormSubmit}>{isEditMode ? 'Update' : 'Publish'}</Button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Input 
            label="Announcement Title" 
            required 
            placeholder="E.g., System Maintenance Schedule" 
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
          <Input 
            label="Content Details" 
            type="textarea" 
            required 
            placeholder="Write your announcement message here..." 
            rows={5}
            value={formContent}
            onChange={(e) => setFormContent(e.target.value)}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Select 
              label="Priority Level" 
              options={[
                { value: 'low', label: 'Low Priority' },
                { value: 'medium', label: 'Medium Priority' },
                { value: 'high', label: 'High Priority' }
              ]}
              value={formPriority}
              onChange={(e) => setFormPriority(e.target.value)}
            />
            <Select 
              label="Category" 
              options={[
                { value: 'general', label: 'General' },
                { value: 'meeting', label: 'Meeting' },
                { value: 'benefits', label: 'Benefits' },
                { value: 'event', label: 'Event' },
                { value: 'security', label: 'Security' }
              ]}
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* Reader / Detail View Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setActiveAnnouncement(null);
        }}
        title="Announcement Details"
        size="md"
        footer={
          <Button variant="secondary" onClick={() => {
            setShowDetailModal(false);
            setActiveAnnouncement(null);
          }}>Close Reader</Button>
        }
      >
        {activeAnnouncement && (
          <div className="reader-modal-content">
            <div className="reader-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 32 }}>{categoryIcons[activeAnnouncement.category] || '📌'}</span>
                <div>
                  <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, margin: 0, color: '#000000' }}>{activeAnnouncement.title}</h2>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <Badge variant={priorityColors[activeAnnouncement.priority]}>{activeAnnouncement.priority} Priority</Badge>
                    <Badge variant="gray">{categoryLabels[activeAnnouncement.category] || activeAnnouncement.category}</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="reader-modal-body">
              {activeAnnouncement.content}
            </div>

            <div className="announcement-card-footer" style={{ borderTop: '1px solid var(--border-color)', marginTop: 'var(--space-2)', paddingTop: 'var(--space-4)' }}>
              <div className="announcement-author-info">
                <Avatar name={activeAnnouncement.author} size="md" />
                <div className="announcement-author-details">
                  <span className="announcement-author-name" style={{ fontSize: 'var(--font-size-base)' }}>{activeAnnouncement.author}</span>
                  <span className="announcement-author-role" style={{ fontSize: 'var(--font-size-xs)' }}>{activeAnnouncement.authorRole}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 500, color: '#000000' }}>Published On</div>
                <div style={{ color: 'var(--text-secondary)' }}>{formatDate(activeAnnouncement.date)}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
