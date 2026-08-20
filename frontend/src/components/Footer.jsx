import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, MapPin, ExternalLink } from 'lucide-react';

/**
 * Task 13 Requirement: Professional Footer Component
 */
const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--primary)', color: '#94a3b8', paddingTop: '4rem', paddingBottom: '2.5rem', marginTop: 'auto', borderTop: '1px solid #1e293b' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', background: 'var(--accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={20} />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.5px' }}>LIBRARIA</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#94a3b8' }}>
              Smart campus library management application designed for seamless book catalog indexing and borrowing request workflows.
            </p>
          </div>

          {/* Nav Links Col */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: '#cbd5e1' }}>Home Dashboard</Link></li>
              <li><Link to="/books" style={{ color: '#cbd5e1' }}>Books Collection</Link></li>
              <li><Link to="/borrow" style={{ color: '#cbd5e1' }}>Borrow Request Form</Link></li>
              <li><Link to="/about" style={{ color: '#cbd5e1' }}>About Platform</Link></li>
            </ul>
          </div>

          {/* Library Services Col */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Library Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li style={{ color: '#cbd5e1' }}>Digital Textbook Catalog</li>
              <li style={{ color: '#cbd5e1' }}>Student Membership Index</li>
              <li style={{ color: '#cbd5e1' }}>Express REST API Integration</li>
              <li style={{ color: '#cbd5e1' }}>Mongoose Mongo Validation</li>
            </ul>
          </div>

          {/* Contact & Support Col */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Campus Portal</h4>
            <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <Mail size={16} color="var(--accent)" /> library@college.edu
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <MapPin size={16} color="var(--accent)" /> CSE Department, Campus Library
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', fontSize: '0.85rem' }}>
          <span>&copy; 2026 Libraria Academic System. All rights reserved.</span>
          <span>ITUE301 Set B Practical Examination Project</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
