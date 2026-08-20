import React from 'react';
import { X, BookOpen, User, Tag, ShieldCheck, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Requirement 9: Book Details Modal Component
 */
const BookDetailsModal = ({ book, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen || !book) return null;

  const handleBorrowClick = () => {
    onClose();
    // Navigate to borrow page passing book title via router state or query
    navigate('/borrow', { state: { prefilledBookTitle: book.title } });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--accent)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Book Specification Details</h3>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '4px' }} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: '1.25rem' }}>
            <span className="badge-pill" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)', marginBottom: '8px' }}>
              <Tag size={12} /> {book.category || 'General Academic'}
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>
              {book.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', marginTop: '6px', fontWeight: 600 }}>
              <User size={16} /> Authored by {book.author}
            </div>
          </div>

          <div style={{ background: 'var(--surface-alt)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>ISBN Code</span>
                <strong style={{ fontFamily: 'monospace' }}>{book.isbn || '978-0132350884'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>Availability Status</span>
                {book.available ? (
                  <span style={{ color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={15} /> Available in Library
                  </span>
                ) : (
                  <span style={{ color: 'var(--danger)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <XCircle size={15} /> Currently Issued
                  </span>
                )}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Official textbook entry registered in the campus digital library index. Verified reference material for undergraduate & postgraduate coursework.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
            {book.available && (
              <button onClick={handleBorrowClick} className="btn btn-primary">
                Proceed to Borrow <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
