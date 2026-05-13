import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import './Pagination.css';

export default function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }
  return (
    <div className="pagination">
      <div className="pagination-info">Showing {start}–{end} of {totalItems}</div>
      <div className="pagination-buttons">
        <button className="page-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}><HiChevronLeft size={16} /></button>
        {pages.map((p, i) => p === '...' ? <span key={i} style={{ padding: '0 4px', color: 'var(--text-tertiary)' }}>…</span> : (
          <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => onPageChange(p)}>{p}</button>
        ))}
        <button className="page-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}><HiChevronRight size={16} /></button>
      </div>
    </div>
  );
}
