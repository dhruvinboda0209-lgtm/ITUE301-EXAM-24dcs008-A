import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, BookmarkCheck, Award, ArrowRight, Sparkles, Shield, Compass, Layers, CheckCircle2 } from 'lucide-react';
import BookCard from '../components/BookCard';
import MongoDemoCard from '../components/MongoDemoCard';

const featuredBooksSample = [
  {
    id: "f1",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Software Engineering",
    isbn: "978-0132350884",
    available: true
  },
  {
    id: "f2",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Distributed Systems",
    isbn: "978-1449373320",
    available: true
  },
  {
    id: "f3",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    category: "Web Development",
    isbn: "978-0596517748",
    available: false
  }
];

const HomePage = () => {
  return (
    <div className="home-page">
      {/* 1. Hero Split Section (Task 7 Requirement) */}
      <section className="hero-split-container">
        <div>
          <span className="hero-badge">
            <Sparkles size={14} /> CAMPUS LIBRARY PLATFORM
          </span>
          <h1 className="hero-heading-main">
            Discover your next <br />
            <span style={{ color: 'var(--accent)' }}>great read.</span>
          </h1>
          <p className="hero-description">
            Explore the campus collection, find textbooks faster, and manage your borrowing experience from one unified academic portal.
          </p>
          <div className="hero-button-group">
            <Link to="/books" className="btn btn-primary">
              Explore Collection <ArrowRight size={18} />
            </Link>
            <Link to="/borrow" className="btn btn-secondary">
              Borrow a Book
            </Link>
          </div>
        </div>

        {/* Hero Visual Card Composition */}
        <div className="hero-illustration-composition">
          <div className="hero-glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '42px', height: '42px', background: 'var(--accent-subtle)', color: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Featured Reference Title</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>CSE Department Standard Syllabus</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--primary)' }}>
              Designing Data-Intensive Applications
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
              The definitive guide to system architecture, distributed storage, and modern data processing engines.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge-pill badge-available">
                <CheckCircle2 size={13} /> Available in Stacks
              </span>
              <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--muted)' }}>ISBN 978-1449373320</span>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="floating-stat-badge">
            <Award size={24} color="#38bdf8" />
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800 }}>100% Digital Index</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Verified Catalog Records</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Horizontal Responsive Statistics Cards (Task 7 Requirement) */}
      <section className="stats-horizontal-grid">
        <div className="stat-box-card">
          <div className="stat-icon-container">
            <BookOpen size={24} />
          </div>
          <div>
            <div className="stat-number">1,250+</div>
            <div className="stat-text">Books Cataloged</div>
          </div>
        </div>

        <div className="stat-box-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="stat-number">850+</div>
            <div className="stat-text">Active Members</div>
          </div>
        </div>

        <div className="stat-box-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
            <BookmarkCheck size={24} />
          </div>
          <div>
            <div className="stat-number">42</div>
            <div className="stat-text">Books Borrowed</div>
          </div>
        </div>

        <div className="stat-box-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
            <Shield size={24} />
          </div>
          <div>
            <div className="stat-number">98%</div>
            <div className="stat-text">Reader Satisfaction</div>
          </div>
        </div>
      </section>

      {/* 3. Feature Section: Why Libraria */}
      <section style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Why Choose Libraria?</h2>
          <p style={{ color: 'var(--muted)' }}>Engineered for modern university campuses to simplify reference book access.</p>
        </div>

        <div className="features-grid">
          <div className="feature-item-card">
            <div style={{ width: '44px', height: '44px', background: 'var(--accent-subtle)', color: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Compass size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Discover</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--muted)' }}>Find books across engineering categories with an intuitive searchable collection.</p>
          </div>

          <div className="feature-item-card">
            <div style={{ width: '44px', height: '44px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Layers size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Organize</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--muted)' }}>Keep track of your active borrowing records, return due dates, and hold status effortlessly.</p>
          </div>

          <div className="feature-item-card">
            <div style={{ width: '44px', height: '44px', background: 'var(--sky-light)', color: 'var(--sky-accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <BookmarkCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Borrow</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--muted)' }}>Submit official book borrowing requests directly through a simple online form.</p>
          </div>

          <div className="feature-item-card">
            <div style={{ width: '44px', height: '44px', background: 'var(--warning-bg)', color: 'var(--warning)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Explore</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--muted)' }}>Discover new academic subjects, research authors, and system architecture manuals.</p>
          </div>
        </div>
      </section>

      {/* 4. Featured Books Collection Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.75rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Featured from Collection</h2>
            <p style={{ color: 'var(--muted)' }}>Recommended core textbooks for B.Tech Computer Science coursework</p>
          </div>
          <Link to="/books" className="btn btn-secondary">
            View Full Catalog <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {featuredBooksSample.map(book => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
              isbn={book.isbn}
            />
          ))}
        </div>
      </section>

      {/* 5. Task 5 MongoDB Interactive Demo Card Preserved for Viva */}
      <MongoDemoCard />
    </div>
  );
};

export default HomePage;
