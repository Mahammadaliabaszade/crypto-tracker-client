import { useEffect, useState } from 'react';
import { getCoins, addCoin, deleteCoin } from './api';
import axios from 'axios';

const API_URL = 'http://localhost:5259/api';
const getToken = () => localStorage.getItem('token');
const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export default function CoinsPage() {
  const [coins, setCoins] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const res = await getCoins();
      setCoins(res.data);
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

  const handleSelect = async (coin) => {
    setLoading(true);
    try {
      await addCoin({ coinId: coin.id, name: coin.name, symbol: coin.symbol });
      setQuery('');
      setSearchResults([]);
      fetchCoins();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteCoin(id);
    fetchCoins();
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 28px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#0F172A', marginBottom: '6px' }}>Coins</h1>
        <p style={{ fontSize: '14px', color: '#94A3B8' }}>Search and add cryptocurrencies to track in real-time.</p>
      </div>

      {/* Search */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#64748B', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Search coin</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            placeholder="Search for a coin (e.g. Bitcoin, Ethereum...)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn-primary" onClick={handleSearch} disabled={searching} style={{ whiteSpace: 'nowrap' }}>
            {searching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchResults.length > 0 && (
          <div style={{ marginTop: '8px', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
            {searchResults.map(coin => (
              <div
                key={coin.id}
                onClick={() => handleSelect(coin)}
                style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(0,0,0,0.06)', background: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="coin-tag">{coin.symbol?.toUpperCase()}</span>
                  <span style={{ fontSize: '14px', color: '#0F172A' }}>{coin.name}</span>
                </div>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>+ Add</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coins list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {coins.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
            No coins added yet. Search and add your first coin above.
          </div>
        )}
        {coins.map(coin => (
          <div key={coin.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="coin-tag">{coin.symbol}</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>{coin.name}</div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>{coin.coinId}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: coin.isActive ? '#16A34A' : '#94A3B8', background: coin.isActive ? '#DCFCE7' : '#F1F5F9', padding: '3px 10px', borderRadius: '20px' }}>
                {coin.isActive ? 'Active' : 'Inactive'}
              </span>
              <button className="btn-danger" onClick={() => handleDelete(coin.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}