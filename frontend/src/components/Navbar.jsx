import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Home, Library, PlusCircle, LogIn, Menu, X, Info, LayoutDashboard } from 'lucide-react';

/**
 * Task 2 & Redesign Requirement: Professional Navbar
 * Features sticky position, LIBRARIA brand logo with subtitle,
 * active route indicators, Login action button, and responsive mobile menu.
 */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="navbar-sticky">
      <div className="navbar-container">
        {/* Brand Treatment: LIBRARIA */}
        <Link to="/" className="brand-wrapper" onClick={closeMobileMenu}>
          <div className="brand-icon-box">
            <BookOpen size={22} />
          </div>
          <div className="brand-text-block">
            <span className="brand-title">LIBRARIA</span>
            <span className="brand-subtitle">Smart Library Management</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu-desktop">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          >
            <Home size={17} />
            <span>Home</span>
          </NavLink>

          <NavLink 
            to="/books" 
            className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          >
            <Library size={17} />
            <span>Books</span>
          </NavLink>

          <NavLink 
            to="/borrow" 
            className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          >
            <PlusCircle size={17} />
            <span>Borrow</span>
          </NavLink>

          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          >
            <Info size={17} />
            <span>About</span>
          </NavLink>

          <button 
            onClick={() => navigate('/login')}
            className="nav-login-btn"
          >
            <LogIn size={16} />
            <span>Login</span>
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-toggle-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-menu-drawer ${mobileOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li>
            <NavLink to="/" end className="nav-item-link" onClick={closeMobileMenu}>
              <Home size={18} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/books" className="nav-item-link" onClick={closeMobileMenu}>
              <Library size={18} /> Books Catalog
            </NavLink>
          </li>
          <li>
            <NavLink to="/borrow" className="nav-item-link" onClick={closeMobileMenu}>
              <PlusCircle size={18} /> Borrow Book
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="nav-item-link" onClick={closeMobileMenu}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-item-link" onClick={closeMobileMenu}>
              <Info size={18} /> About Libraria
            </NavLink>
          </li>
          <li style={{ marginTop: '0.5rem' }}>
            <button 
              onClick={() => { closeMobileMenu(); navigate('/login'); }} 
              className="btn btn-primary" 
              style={{ width: '100%' }}
            >
              <LogIn size={18} /> Member Sign In
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
