import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', background: '#0D1220' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '15px', fontWeight: '500' }}>₿</div>
          <span style={{ fontSize: '17px', fontWeight: '500', color: '#fff' }}>CryptoTracker</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', color: '#94A3B8', border: '0.5px solid rgba(255,255,255,0.15)', padding: '8px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>Sign in</button>
          <button onClick={() => navigate('/register')} style={{ background: '#3B82F6', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(59,130,246,0.12)', color: '#60A5FA', fontSize: '12px', padding: '5px 14px', borderRadius: '20px', border: '0.5px solid rgba(59,130,246,0.25)', marginBottom: '28px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3B82F6' }}></div>
          Live • updated every 5 minutes
        </div>

        <h1 style={{ fontSize: '52px', fontWeight: '500', color: '#fff', lineHeight: '1.15', marginBottom: '20px', maxWidth: '640px' }}>
          Track any crypto.<br />
          <span style={{ color: '#3B82F6' }}>Get alerted instantly.</span>
        </h1>

        <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '460px', lineHeight: '1.7', marginBottom: '40px' }}>
          Add the cryptocurrencies you care about, set your target price, and we'll notify you the moment it hits.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '56px' }}>
          <button onClick={() => navigate('/register')} style={{ background: '#3B82F6', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' }}>
            Start tracking for free
          </button>
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', color: '#E2E8F0', border: '0.5px solid rgba(255,255,255,0.15)', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' }}>
            Sign in
          </button>
        </div>

        {/* Price cards */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { symbol: 'BTC', price: '$64,182', change: '+0.3%', up: true },
            { symbol: 'ETH', price: '$3,481', change: '+1.2%', up: true },
            { symbol: 'SOL', price: '$148.50', change: '-0.8%', up: false },
          ].map(coin => (
            <div key={coin.symbol} style={{ background: '#111827', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px 20px', minWidth: '160px', textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981' }}></div>
                {coin.symbol} / USD
              </div>
              <div style={{ fontSize: '18px', fontWeight: '500', color: '#fff', marginBottom: '4px' }}>{coin.price}</div>
              <div style={{ fontSize: '12px', color: coin.up ? '#10B981' : '#EF4444' }}>
                {coin.up ? '↑' : '↓'} {coin.change} today
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '0.5px solid rgba(255,255,255,0.08)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        {[
          { val: '3,000+', label: 'Cryptocurrencies tracked' },
          { val: '5 min', label: 'Price update frequency' },
          { val: 'Free', label: 'No credit card required' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '24px 32px', borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.08)' : 'none' }}>
            <div style={{ fontSize: '24px', fontWeight: '500', color: '#fff', marginBottom: '4px' }}>{s.val}</div>
            <div style={{ fontSize: '13px', color: '#64748B' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            ),
            title: 'Real-time prices',
            desc: 'Prices updated every 5 minutes from live market data across 100+ exchanges worldwide.'
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            ),
            title: 'Instant alerts',
            desc: 'Get notified via email the moment your target price is hit. Never miss a trading opportunity.'
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            ),
            title: 'Price history',
            desc: 'Visualize price trends with interactive charts. Track how your coins have performed over time.'
          },
        ].map((f, i) => (
          <div key={i} style={{ padding: '32px 28px', borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.08)' : 'none', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', border: '0.5px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              {f.icon}
            </div>
            <div style={{ fontSize: '15px', fontWeight: '500', color: '#E2E8F0', marginBottom: '8px' }}>{f.title}</div>
            <div style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)', padding: '16px 32px', textAlign: 'center', fontSize: '13px', color: '#334155', background: '#0D1220' }}>
        Developed by{' '}
        <a href="https://linkedin.com/in/mahammadali-abaszada-60998220a" target="_blank" rel="noreferrer" style={{ color: '#3B82F6', textDecoration: 'none' }}>
          Mahammadali Abaszada
        </a>
      </div>
    </div>
  );
}