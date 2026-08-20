import React from 'react';
import { Link } from 'react-router-dom';
import { BookX, ArrowLeft } from 'lucide-react';

/**
 * Task 22 Requirement: NotFoundPage Component (404 Error UI)
 */
const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1.5rem', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ width: '80px', height: '80px', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
        <BookX size={42} />
      </div>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.75rem 0' }}>Page Not Found</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
        The requested library URL does not exist or has been relocated to another section.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={18} /> Back to Library Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
