import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, RefreshCw, BookX, Filter, CheckCircle2, BookOpen } from 'lucide-react';
import BookCard from '../components/BookCard';
import BookDetailsModal from '../components/BookDetailsModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Task 4 Requirement: REST API Consumption in React
 * 
 * Consumes GET /api/v1/books via fetch() in useEffect().
 * Manages 3 separate states: data, loading, error.
 * Features modal integration, availability filters, and search.
 */
const BooksPage = () => {
  // Task 4 Requirement: 3 separate states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  // Modal State
  const [selectedBookModal, setSelectedBookModal] = useState(null);

  // Task 4 Requirement: fetch inside useEffect on mount
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/books`);
      
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setData(result.data);
      } else {
        throw new Error(result.message || 'Invalid API response format');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      // Task 4 Requirement: Error state update
      setError('Unable to connect to the library service. Please ensure Express server is running on http://localhost:5000.');
    } finally {
      // Task 4 Requirement: Loading state update
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books based on search query, category, and availability status
  const filteredBooks = data.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || book.category === selectedCategory;

    const matchesAvailability = 
      availabilityFilter === 'All' || 
      (availabilityFilter === 'Available' && book.available) ||
      (availabilityFilter === 'Unavailable' && !book.available);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const categories = ['All', ...new Set(data.map(b => b.category).filter(Boolean))];

  return (
    <div className="books-page">
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.4rem' }}>
              Explore the Collection
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
              Find something worth reading across our indexed engineering & computer science stacks.
            </p>
          </div>

          <div style={{ background: 'var(--accent-subtle)', color: 'var(--accent)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={16} /> Total Books: {data.length}
          </div>
        </div>
      </div>

      {/* Control Bar: Search + Category + Availability Filters */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-xs)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', alignItems: 'center' }}>
          <div className="input-with-icon">
            <Search className="input-icon" size={18} />
            <input
              type="text"
              className="custom-input"
              placeholder="Search by book title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Availability Toggle */}
          <div style={{ display: 'flex', gap: '4px', background: 'var(--surface-alt)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
            {['All', 'Available', 'Unavailable'].map((opt) => (
              <button
                key={opt}
                onClick={() => setAvailabilityFilter(opt)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: availabilityFilter === opt ? 'var(--primary)' : 'var(--muted)',
                  backgroundColor: availabilityFilter === opt ? 'var(--surface)' : 'transparent',
                  boxShadow: availabilityFilter === opt ? 'var(--shadow-xs)' : 'none',
                  transition: 'var(--transition)'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 700, paddingRight: '6px' }}>
            <Filter size={14} /> Categories:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Task 4 Requirement: 1. Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border)' }}>
          <div className="spinner"></div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Loading library collection...</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>Executing GET /api/v1/books asynchronous fetch request</p>
        </div>
      )}

      {/* Task 4 Requirement: 2. Error State with Retry button */}
      {!loading && error && (
        <div style={{ textAlign: 'center', padding: '3.5rem 2rem', background: 'var(--danger-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(225,29,72,0.3)', color: 'var(--danger)' }}>
          <AlertCircle size={44} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>Unable to load collection</h3>
          <p style={{ color: 'var(--danger)', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
            {error}
          </p>
          <button onClick={fetchBooks} className="btn btn-primary" style={{ backgroundColor: 'var(--danger)' }}>
            <RefreshCw size={16} /> Retry API Connection
          </button>
        </div>
      )}

      {/* Task 4 Requirement: 3. Empty State */}
      {!loading && !error && filteredBooks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border)' }}>
          <BookX size={44} color="var(--muted)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No books found</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Try adjusting your search keywords or switching category filters.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setAvailabilityFilter('All'); }} 
            className="btn btn-secondary"
          >
            Clear Active Filters
          </button>
        </div>
      )}

      {/* Task 4 Requirement: 4. Data State (Renders BookCard components with props) */}
      {!loading && !error && filteredBooks.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id || book._id}
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
              isbn={book.isbn}
              onSelect={(selected) => setSelectedBookModal(selected)}
            />
          ))}
        </div>
      )}

      {/* Book Details Modal */}
      <BookDetailsModal
        book={selectedBookModal}
        isOpen={Boolean(selectedBookModal)}
        onClose={() => setSelectedBookModal(null)}
      />
    </div>
  );
};

export default BooksPage;
