import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, IdCard, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

/**
 * Task 6 Requirement: RegisterPage Component
 * Features registration form with client-side validation.
 */
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    department: 'Computer Science & Engineering',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'College Email is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '520px', margin: '2rem auto' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="brand-icon-box" style={{ margin: '0 auto 1rem auto', width: '48px', height: '48px' }}>
            <BookOpen size={26} />
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.4rem' }}>
            Create Student Account
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
            Register your campus ID to borrow physical & digital library books.
          </p>
        </div>

        {submitted && (
          <div style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} /> Account created successfully! Redirecting to sign in...
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="input-label" htmlFor="fullName">Full Name *</label>
            <div className="input-with-icon">
              <User className="input-icon" size={18} />
              <input
                id="fullName"
                type="text"
                name="fullName"
                className="custom-input"
                placeholder="Aarav Sharma"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && <span className="input-error-msg">{errors.fullName}</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="input-label" htmlFor="email">College Email *</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={18} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="custom-input"
                  placeholder="student@itue301.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="input-error-msg">{errors.email}</span>}
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="input-label" htmlFor="studentId">Student Roll No *</label>
              <div className="input-with-icon">
                <IdCard className="input-icon" size={18} />
                <input
                  id="studentId"
                  type="text"
                  name="studentId"
                  className="custom-input"
                  placeholder="2026-CSE-101"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </div>
              {errors.studentId && <span className="input-error-msg">{errors.studentId}</span>}
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="input-label" htmlFor="department">Academic Department</label>
            <div className="input-with-icon">
              <Building className="input-icon" size={18} />
              <select
                id="department"
                name="department"
                className="custom-input"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="input-label" htmlFor="password">Password *</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="custom-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <span className="input-error-msg">{errors.password}</span>}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="input-label" htmlFor="confirmPassword">Confirm Password *</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  className="custom-input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && <span className="input-error-msg">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
            Create Student Account <ArrowRight size={18} />
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
