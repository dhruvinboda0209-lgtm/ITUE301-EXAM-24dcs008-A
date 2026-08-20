import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, Eye, EyeOff, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

/**
 * Task 5 Requirement: LoginPage Component
 * Features desktop split layout, controlled form inputs, eye toggle password,
 * frontend validation demo, and clear feedback.
 */
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = 'Email or Student ID is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccessMsg('Authentication successful! Redirecting to campus dashboard...');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="auth-split-layout">
      {/* LEFT SIDE: Beautiful Library Visual & Brand Section */}
      <div className="auth-sidebar-visual">
        <div className="auth-sidebar-glow"></div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <BookOpen size={24} />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>LIBRARIA</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '1rem' }}>
            Your gateway to academic knowledge.
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '420px' }}>
            Access your university library collection, discover research text material, and manage borrowing records from a single unified portal.
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', padding: '1.25rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
            <ShieldCheck size={18} /> Student & Faculty Single Sign-On
          </div>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            ITUE301 Examination Frontend Authentication Demo Interface.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form Card */}
      <div className="auth-form-side">
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
              Sign in with your campus credentials to continue.
            </p>
          </div>

          {successMsg && (
            <div style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="input-label" htmlFor="email">Email or Student ID</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={18} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="custom-input"
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="input-error-msg">{errors.email}</span>}
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="input-label" htmlFor="password">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset requested'); }} style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600 }}>Forgot password?</a>
              </div>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="custom-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', color: 'var(--muted)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="input-error-msg">{errors.password}</span>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--muted)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  style={{ accentColor: 'var(--accent)', width: '16px', height: '16px' }}
                />
                Remember me on this browser
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              Sign In to Libraria <ArrowRight size={18} />
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
            New to Libraria?{' '}
            <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 700 }}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
