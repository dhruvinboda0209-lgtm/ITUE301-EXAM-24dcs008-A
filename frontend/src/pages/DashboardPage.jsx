import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BookmarkCheck, Clock, AlertTriangle, ArrowRight, User, PlusCircle } from 'lucide-react';

/**
 * Task 11 Requirement: DashboardPage Component
 * Provides student portal view with greeting, statistics cards, and activity overview.
 */
const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.4rem' }}>
            Good morning, Reader 👋
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            Welcome to your Libraria academic portal overview.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/books" className="btn btn-secondary">
            <BookOpen size={16} /> Explore Catalog
          </Link>
          <Link to="/borrow" className="btn btn-primary">
            <PlusCircle size={16} /> New Borrow Request
          </Link>
        </div>
      </div>

      {/* Dashboard Statistics */}
      <div className="dashboard-grid-stats">
        <div className="stat-box-card">
          <div className="stat-icon-container">
            <BookOpen size={24} />
          </div>
          <div>
            <div className="stat-number">1,250</div>
            <div className="stat-text">Books Available</div>
          </div>
        </div>

        <div className="stat-box-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
            <BookmarkCheck size={24} />
          </div>
          <div>
            <div className="stat-number">3</div>
            <div className="stat-text">Currently Borrowed</div>
          </div>
        </div>

        <div className="stat-box-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#ffe4e6', color: '#e11d48' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="stat-number">0</div>
            <div className="stat-text">Overdue Books</div>
          </div>
        </div>

        <div className="stat-box-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-number">14 Days</div>
            <div className="stat-text">Next Return Due</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>Recent Borrowing Activity</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Book Title</th>
                <th style={{ padding: '0.75rem 1rem' }}>Borrow Date</th>
                <th style={{ padding: '0.75rem 1rem' }}>Return Due</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontWeight: 700 }}>Clean Code: A Handbook of Agile Software Craftsmanship</td>
                <td style={{ padding: '1rem', color: 'var(--muted)' }}>20 Aug 2026</td>
                <td style={{ padding: '1rem', color: 'var(--muted)' }}>03 Sep 2026</td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge-pill badge-available">Active Borrowed</span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontWeight: 700 }}>Designing Data-Intensive Applications</td>
                <td style={{ padding: '1rem', color: 'var(--muted)' }}>05 Aug 2026</td>
                <td style={{ padding: '1rem', color: 'var(--muted)' }}>19 Aug 2026</td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge-pill badge-category-tag">Returned</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
