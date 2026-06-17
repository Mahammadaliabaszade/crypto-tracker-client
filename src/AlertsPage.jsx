import { useEffect, useState } from 'react';
import { getAlerts, addAlert, deleteAlert } from './api';
import axios from 'axios';

const API_URL = 'https://cryptotracker-pg3h.onrender.com/api';
const getToken = () => localStorage.getItem('token');
const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState('below');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await getAlerts();
      setAlerts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (query.length < 2) return;
    setSearching(true);
    try {
      const res = await axios.get(`${API_URL}/Coins/search?query=${query}`, authHeader());
      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
    }
    setSearching(false);
  };

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    setQuery(coin.name);
    setSearchResults([]);
  };

  const handleAdd = async () => {
    if (!selectedCoin || !targetPrice || !email) return;
    setLoading(true);
    try {
      await addAlert({
        coinId: selectedCoin.id,
        targetPrice: parseFloat(targetPrice),
        condition,
        email
      });
      setSelectedCoin(null);
      setQuery('');
      setTargetPrice('');
      setEmail('');
      fetchAlerts();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteAlert(id);
    fetchAlerts();
  };

  const waiting = alerts.filter(a => !a.isTriggered);
  const triggered = alerts.filter(a => a.isTriggered);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 28px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#0F172A', marginBottom: '6px' }}>Alerts</h1>
        <p style={{ fontSize: '14px', color: '#94A3B8' }}>Set price alerts and get notified via email when triggered.</p>
      </div>

      {/* Add form */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#64748B', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Create alert</div>

        {/* Coin search */}
        <div style={{ marginBottom: '12px', position: 'relative' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>Coin</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              placeholder="Search for a coin..."
              value={query}
              onChange={e => { setQuery(e.target.value); setSelectedCoin(null); }}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn-primary" onClick={handleSearch} disabled={searching} style={{ whiteSpace: 'nowrap' }}>
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>
          {searchResults.length > 0 && (
            <div style={{ marginTop: '4px', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', overflow: 'hidden', position: 'absolute', width: '100%', zIndex: 10, background: '#fff' }}>
              {searchResults.map(coin => (
                <div
                  key={coin.id}
                  onClick={() => handleSelectCoin(coin)}
                  style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <span className="coin-tag">{coin.symbol?.toUpperCase()}</span>
                  <span style={{ fontSize: '14px', color: '#0F172A' }}>{coin.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>Target price ($)</div>
            <input placeholder="60000" value={targetPrice} onChange={e => setTargetPrice(e.target.value)} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>Condition</div>
            <select value={condition} onChange={e => setCondition(e.target.value)}>
              <option value="below">Goes below</option>
              <option value="above">Goes above</option>
            </select>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>Email</div>
            <input placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={handleAdd} disabled={loading || !selectedCoin}>
            {loading ? 'Adding...' : 'Add Alert'}
          </button>
        </div>
      </div>

      {/* Waiting alerts */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#94A3B8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Waiting ({waiting.length})
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {waiting.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '32px', color: '#94A3B8' }}>
              No active alerts. Create one above.
            </div>
          )}
          {waiting.map(alert => (
            <div key={alert.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="coin-tag">{alert.coinId}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>
                    Price goes {alert.condition} ${alert.targetPrice.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{alert.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="badge-waiting">Waiting</span>
                <button className="btn-danger" onClick={() => handleDelete(alert.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Triggered alerts */}
      {triggered.length > 0 && (
        <div>
          <div style={{ fontSize: '13px', fontWeight: '500', color: '#94A3B8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Triggered ({triggered.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {triggered.map(alert => (
              <div key={alert.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: '0.7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="coin-tag">{alert.coinId}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>
                      Price goes {alert.condition} ${alert.targetPrice.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>{alert.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge-triggered">Triggered</span>
                  <button className="btn-danger" onClick={() => handleDelete(alert.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}