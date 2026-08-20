import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Cpu, Database, Award, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem auto' }}>
        <span className="hero-badge">
          <Award size={14} /> ITUE301 PRACTICAL PROJECT
        </span>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
          About Libraria System
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Libraria is an intelligent campus library management framework engineered to streamline textbook indexing, borrowing transactions, and academic collection monitoring.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--accent-subtle)', color: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <BookOpen size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Our Core Mission</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
            Making academic knowledge easier to discover and access for students, researchers, and faculty members across university departments.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Cpu size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Full Stack Architecture</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
            Built using standard React 18, React Router 6, Express REST APIs, and Mongoose MongoDB schema models for structured viva evaluation.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--sky-light)', color: 'var(--sky-accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Database size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Controlled Validation</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
            Demonstrates global custom error handling middleware, logging middleware, and Mongoose schema validation failure responses.
          </p>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', color: 'white', padding: '3.5rem 2.5rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          Ready to explore the campus collection?
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '560px', margin: '0 auto 2rem auto' }}>
          Browse available textbooks or record a borrowing request directly through the portal.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/books" className="btn btn-primary">
            Browse Collection <ArrowRight size={18} />
          </Link>
          <Link to="/borrow" className="btn btn-secondary">
            Borrow a Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
