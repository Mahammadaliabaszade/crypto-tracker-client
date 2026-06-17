import { BrowserRouter, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';

import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import CoinsPage from './CoinsPage';
import AlertsPage from './AlertsPage';
import DashboardPage from './DashboardPage';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <nav className="nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className="logo-icon">₿</div>
        <span style={{ fontSize: '17px', fontWeight: '500' }}>CryptoTracker</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {[['/dashboard', 'Dashboard'], ['/coins', 'Coins'], ['/alerts', 'Alerts']].map(([path, label]) => (
          <Link
            key={path}
            to={path}
            style={{
              fontSize: '14px',
              color: location.pathname === path ? '#2563EB' : '#64748B',
              fontWeight: location.pathname === path ? '500' : '400',
              textDecoration: 'none'
            }}
          >
            {label}
          </Link>
        ))}
        <span style={{ fontSize: '13px', color: '#94A3B8' }}>{email}</span>
        <button className="btn-secondary" onClick={handleLogout} style={{ padding: '6px 14px', fontSize: '13px' }}>Logout</button>
      </div>
    </nav>
  );
}

function AppLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <footer>
        Developed by{' '}
        <a href="https://linkedin.com/in/mahammadali-abaszada-60998220a" target="_blank" rel="noreferrer">
          Mahammadali Abaszada
        </a>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute><AppLayout><DashboardPage /></AppLayout></PrivateRoute>} />
        <Route path="/coins" element={<PrivateRoute><AppLayout><CoinsPage /></AppLayout></PrivateRoute>} />
        <Route path="/alerts" element={<PrivateRoute><AppLayout><AlertsPage /></AppLayout></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}