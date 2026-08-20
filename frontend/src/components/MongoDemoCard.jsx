import React, { useState } from 'react';
import { Database, AlertTriangle, CheckCircle, Play } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Interactive MongoDemoCard Component
 * Fulfills Task 5, 8, & 9 Viva Requirements:
 * Allows one-click testing of MongoDB Operations (Seed/Read) and Mongoose Validation Failures.
 */
const MongoDemoCard = () => {
  const [responseLog, setResponseLog] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);

  const handleTestMongoSeed = async () => {
    setLoadingAction('seed');
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/demo/seed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setResponseLog({
        type: res.ok ? 'success' : 'error',
        status: res.status,
        data
      });
    } catch (err) {
      setResponseLog({
        type: 'error',
        status: 'NETWORK_ERROR',
        data: { success: false, message: 'Could not connect to backend server', error: err.message }
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleTestValidationFailure = async () => {
    setLoadingAction('validation');
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/demo/test-validation`);
      const data = await res.json();
      setResponseLog({
        type: 'validation-demo',
        status: res.status,
        data
      });
    } catch (err) {
      setResponseLog({
        type: 'error',
        status: 'NETWORK_ERROR',
        data: { success: false, message: 'Could not connect to backend server', error: err.message }
      });
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="mongo-demo-container">
      <div className="mongo-demo-header">
        <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '10px' }}>
          <Database size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Task 5 — MongoDB & Mongoose Schema Demonstration</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Interactive viva buttons to demonstrate MongoDB operation and structured Mongoose validation failure (Task 8 & 9).
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1.25rem 0' }}>
        <button 
          onClick={handleTestMongoSeed} 
          disabled={loadingAction !== null}
          className="btn btn-emerald"
        >
          <Play size={16} />
          {loadingAction === 'seed' ? 'Connecting Mongo...' : 'Run MongoDB Seed Operation (Task 8)'}
        </button>

        <button 
          onClick={handleTestValidationFailure} 
          disabled={loadingAction !== null}
          className="btn btn-secondary"
          style={{ borderColor: 'var(--rose-500)', color: 'var(--rose-600)' }}
        >
          <AlertTriangle size={16} />
          {loadingAction === 'validation' ? 'Testing...' : 'Demonstrate Mongoose Validation Error (Task 9)'}
        </button>
      </div>

      {responseLog && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
            {responseLog.status === 200 || responseLog.status === 201 ? (
              <span style={{ color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={16} /> HTTP Status {responseLog.status} OK
              </span>
            ) : (
              <span style={{ color: 'var(--amber-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertTriangle size={16} /> HTTP Status {responseLog.status} (Structured Response)
              </span>
            )}
          </div>
          <pre className="code-response-block">
            {JSON.stringify(responseLog.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MongoDemoCard;
