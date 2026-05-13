import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Confirm', message, confirmText = 'Confirm', variant = 'danger', loading = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" footer={
      <>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant={variant} onClick={onConfirm} loading={loading}>{confirmText}</Button>
      </>
    }>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{message}</p>
    </Modal>
  );
}
