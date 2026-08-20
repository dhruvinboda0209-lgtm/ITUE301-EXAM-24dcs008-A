import React from 'react';
import { User, BookOpen, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

/**
 * Task 1 & Redesign Requirement: BookCard Component
 * 
 * Props (Passed from parent component):
 * - title
 * - author
 * - category
 * - available
 * - isbn (optional)
 * - onSelect (optional detail handler)
 */
const BookCard = ({ title, author, category, available, isbn, onSelect }) => {
  return (
    <div className="book-card-redesign">
      {/* Cover Decorative Visual Header */}
      <div className="book-cover-placeholder">
        <div className="book-cover-pattern"></div>
        <BookOpen size={48} className="book-cover-icon" />
        
        {/* Category Badge */}
        <div className="book-badge-overlay">
          <span className="badge-category-tag">
            {category || 'Academic'}
          </span>
        </div>
      </div>

      <div className="book-card-content">
        {/* Title Requirement */}
        <h3 className="book-card-title">{title}</h3>

        {/* Author Requirement */}
        <div className="book-card-author">
          <User size={15} />
          <span>{author}</span>
        </div>

        {/* Card Footer */}
        <div className="book-card-footer">
          {/* Availability Badge Requirement with 2 distinct visual states */}
          {available ? (
            <span className="badge-pill badge-available">
              <CheckCircle2 size={13} />
              Available
            </span>
          ) : (
            <span className="badge-pill badge-unavailable">
              <XCircle size={13} />
              Not Available
            </span>
          )}

          {/* View Details Action Button */}
          <button 
            onClick={() => onSelect && onSelect({ title, author, category, available, isbn })}
            className="btn-ghost"
            style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px' }}
          >
            Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
