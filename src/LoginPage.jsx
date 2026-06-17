import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from './api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError('');
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.email);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', justifyContent: 'center' }}>
          <div className="logo-icon">₿</div>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>CryptoTracker</span>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#0F172A', marginBottom: '6px' }}>Welcome back</h2>
        <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '28px' }}>Sign in to your account</p>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>Email</div>
          <input placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>Password</div>
          <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <button className="btn-primary" onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '11px' }}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#94A3B8', marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563EB', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}