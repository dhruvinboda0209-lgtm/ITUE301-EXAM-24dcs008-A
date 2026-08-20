import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bookmark, Calendar, User, BookOpen, CheckCircle, AlertCircle, Sparkles, Send, ShieldCheck } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Task 2 & Task 10 Requirement: BorrowPage Component
 * 
 * Features:
 * - Desktop two-column layout (Left: Form, Right: Live Summary Card)
 * - Single state object: formData = { memberName, bookTitle, borrowDate, returnDate }
 * - Controlled input components (value + onChange)
 * - Live dynamic display of entered inputs (e.g., "Borrow request for: [memberName]")
 * - Client validation & POST submission to Express REST API /api/v1/borrowings
 */
const BorrowPage = () => {
  const location = useLocation();

  // Task 2 Requirement: Form state object with single useState
  const [formData, setFormData] = useState({
    memberName: '',
    bookTitle: '',
    borrowDate: new Date().toISOString().split('T')[0],
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // Auto pre-fill book title if passed from BookDetailsModal router state
  useEffect(() => {
    if (location.state && location.state.prefilledBookTitle) {
      setFormData(prev => ({
        ...prev,
        bookTitle: location.state.prefilledBookTitle
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.memberName.trim()) {
      newErrors.memberName = 'Member name is required';
    }

    if (!formData.bookTitle.trim()) {
      newErrors.bookTitle = 'Book title is required';
    }

    if (!formData.borrowDate) {
      newErrors.borrowDate = 'Borrow date is required';
    }

    if (!formData.returnDate) {
      newErrors.returnDate = 'Return date is required';
    } else if (formData.borrowDate && new Date(formData.returnDate) < new Date(formData.borrowDate)) {
      newErrors.returnDate = 'Return date cannot be earlier than borrow date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiResponse(null);

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/borrowings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setApiResponse({
          type: 'success',
          message: `Success! Borrowing request registered for ${data.data.memberName} (Record ID: ${data.data.id}).`
        });
        setFormData({
          memberName: '',
          bookTitle: '',
          borrowDate: new Date().toISOString().split('T')[0],
          returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
      } else {
        setApiResponse({
          type: 'error',
          message: data.message || 'Failed to record borrowing request.'
        });
      }
    } catch (err) {
      setApiResponse({
        type: 'error',
        message: 'Could not connect to Express REST API server.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="borrow-page">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.4rem' }}>
          Borrow a Book
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
          Complete the form below to record your official book borrowing request in the system.
        </p>
      </div>

      {apiResponse && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: apiResponse.type === 'success' ? 'var(--success-bg)' : 'var(--danger-bg)',
          color: apiResponse.type === 'success' ? 'var(--success)' : 'var(--danger)',
          border: `1px solid ${apiResponse.type === 'success' ? 'rgba(5,150,105,0.3)' : 'rgba(225,29,72,0.3)'}`
        }}>
          {apiResponse.type === 'success' ? <CheckCircle size={22} /> : <AlertCircle size={22} />}
          <div>
            <strong style={{ display: 'block', fontSize: '0.95rem' }}>{apiResponse.type === 'success' ? 'Request Registered' : 'Submission Error'}</strong>
            <span style={{ fontSize: '0.9rem' }}>{apiResponse.message}</span>
          </div>
        </div>
      )}

      {/* Task 10 Requirement: Two-Column Desktop Layout */}
      <div className="borrow-layout-grid">
        {/* Left Column: Form */}
        <div className="borrow-form-box">
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bookmark size={22} color="var(--accent)" />
            Borrowing Issue Form
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Field 1: Member Name */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="input-label" htmlFor="memberName">Member Full Name *</label>
              <div className="input-with-icon">
                <User className="input-icon" size={18} />
                <input
                  id="memberName"
                  type="text"
                  name="memberName"
                  className="custom-input"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.memberName}
                  onChange={handleChange}
                />
              </div>
              {errors.memberName && <span className="input-error-msg">{errors.memberName}</span>}
            </div>

            {/* Field 2: Book Title */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="input-label" htmlFor="bookTitle">Book Title *</label>
              <div className="input-with-icon">
                <BookOpen className="input-icon" size={18} />
                <input
                  id="bookTitle"
                  type="text"
                  name="bookTitle"
                  className="custom-input"
                  placeholder="e.g. Clean Code: A Handbook of Agile Software Craftsmanship"
                  value={formData.bookTitle}
                  onChange={handleChange}
                />
              </div>
              {errors.bookTitle && <span className="input-error-msg">{errors.bookTitle}</span>}
            </div>

            {/* Dates Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label className="input-label" htmlFor="borrowDate">Borrow Date *</label>
                <div className="input-with-icon">
                  <Calendar className="input-icon" size={18} />
                  <input
                    id="borrowDate"
                    type="date"
                    name="borrowDate"
                    className="custom-input"
                    value={formData.borrowDate}
                    onChange={handleChange}
                  />
                </div>
                {errors.borrowDate && <span className="input-error-msg">{errors.borrowDate}</span>}
              </div>

              <div>
                <label className="input-label" htmlFor="returnDate">Return Due Date *</label>
                <div className="input-with-icon">
                  <Calendar className="input-icon" size={18} />
                  <input
                    id="returnDate"
                    type="date"
                    name="returnDate"
                    className="custom-input"
                    value={formData.returnDate}
                    onChange={handleChange}
                  />
                </div>
                {errors.returnDate && <span className="input-error-msg">{errors.returnDate}</span>}
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={submitting}>
              <Send size={16} />
              {submitting ? 'Submitting Request...' : 'Confirm Borrowing (POST /api/v1/borrowings)'}
            </button>
          </form>
        </div>

        {/* Right Column: Live Summary Card */}
        <div className="live-summary-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <Sparkles size={22} color="var(--accent)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>LIVE BORROW SUMMARY</h2>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              MEMBER NAME
            </span>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
              {formData.memberName.trim() ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={18} color="var(--accent)" /> {formData.memberName}
                </span>
              ) : (
                <span style={{ color: '#94a3b8', fontStyle: 'italic', fontWeight: 400 }}>Type member name in form...</span>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              SELECTED BOOK
            </span>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
              {formData.bookTitle.trim() ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} color="var(--success)" /> {formData.bookTitle}
                </span>
              ) : (
                <span style={{ color: '#94a3b8', fontStyle: 'italic', fontWeight: 400 }}>Type book title in form...</span>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                BORROW DATE
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>
                {formData.borrowDate || 'N/A'}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                RETURN DATE
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--success)' }}>
                {formData.returnDate || 'N/A'}
              </div>
            </div>
          </div>

          {/* Task 2 Dynamic Text Display Badge */}
          <div style={{ background: 'var(--accent-subtle)', color: 'var(--accent)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} />
            <span>
              Borrow request for: <strong>{formData.memberName.trim() ? formData.memberName : '[member name]'}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowPage;
