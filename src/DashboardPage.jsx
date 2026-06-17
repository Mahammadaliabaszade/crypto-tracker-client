import { useEffect, useState } from 'react';
import { getCoins, getPriceHistory } from './api';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    const res = await getCoins();
    setCoins(res.data);
    if (res.data.length > 0) {
      setSelectedCoin(res.data[0].coinId);
      fetchPriceHistory(res.data[0].coinId);
    }
  };

  const fetchPriceHistory = async (coinId) => {
    const res = await getPriceHistory(coinId);
    const formatted = res.data.map(p => ({
      time: new Date(p.fetchedAt).toLocaleTimeString(),
      price: parseFloat(p.price.toFixed(2))
    }));
    setPriceHistory(formatted);
  };

  const handleCoinChange = (coinId) => {
    setSelectedCoin(coinId);
    fetchPriceHistory(coinId);
  };

  const latestPrice = priceHistory.length > 0 ? priceHistory[priceHistory.length - 1].price : null;
  const firstPrice = priceHistory.length > 0 ? priceHistory[0].price : null;
  const priceChange = latestPrice && firstPrice ? (latestPrice - firstPrice).toFixed(2) : null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 28px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '48px', padding: '48px 0 40px', background: 'linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 100%)', borderRadius: '16px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EEF2FF', color: '#3B82F6', fontSize: '12px', padding: '5px 14px', borderRadius: '20px', border: '0.5px solid rgba(59,130,246,0.2)', marginBottom: '20px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6' }}></div>
          Live price tracking
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '500', color: '#0F172A', marginBottom: '12px' }}>
          Track any crypto.<br />
          <span style={{ color: '#2563EB' }}>Get alerted instantly.</span>
        </h1>
        <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '400px', margin: '0 auto', lineHeight: '1.7' }}>
          Add the cryptocurrencies you care about, set your target price, and we'll notify you the moment it hits.
        </p>
      </div>

      {/* Coin tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {coins.map(coin => (
          <button
            key={coin.coinId}
            onClick={() => handleCoinChange(coin.coinId)}
            style={{
              padding: '7px 18px',
              borderRadius: '8px',
              border: selectedCoin === coin.coinId ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
              background: selectedCoin === coin.coinId ? '#2563EB' : '#fff',
              color: selectedCoin === coin.coinId ? '#fff' : '#64748B',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: selectedCoin === coin.coinId ? '500' : '400'
            }}
          >
            {coin.name}
          </button>
        ))}
      </div>

      {/* Chart card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="coin-tag">{coins.find(c => c.coinId === selectedCoin)?.symbol || ''}</span>
            <span style={{ fontSize: '13px', color: '#94A3B8' }}>{coins.find(c => c.coinId === selectedCoin)?.name || ''}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '22px', fontWeight: '500', color: '#0F172A' }}>
              {latestPrice ? `$${latestPrice.toLocaleString()}` : '—'}
            </div>
            {priceChange && (
              <div style={{ fontSize: '12px', color: priceChange >= 0 ? '#16A34A' : '#DC2626' }}>
                {priceChange >= 0 ? '↑' : '↓'} ${Math.abs(priceChange)} since start
              </div>
            )}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94A3B8' }} />
            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#94A3B8' }} width={80} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', fontSize: '13px' }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
            />
            <Line type="monotone" dataKey="price" stroke="#2563EB" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div className="card">
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Latest price</div>
          <div style={{ fontSize: '20px', fontWeight: '500', color: '#0F172A' }}>{latestPrice ? `$${latestPrice.toLocaleString()}` : '—'}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Data points</div>
          <div style={{ fontSize: '20px', fontWeight: '500', color: '#0F172A' }}>{priceHistory.length}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Tracked coins</div>
          <div style={{ fontSize: '20px', fontWeight: '500', color: '#0F172A' }}>{coins.length}</div>
        </div>
      </div>
    </div>
  );
}