import axios from 'axios';

const API_URL = 'https://cryptotracker-pg3h.onrender.com/api';
const getToken = () => localStorage.getItem('token');

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const getCoins = () => axios.get(`${API_URL}/Coins`, authHeader());
export const addCoin = (coin) => axios.post(`${API_URL}/Coins`, coin, authHeader());
export const deleteCoin = (id) => axios.delete(`${API_URL}/Coins/${id}`, authHeader());

export const getAlerts = () => axios.get(`${API_URL}/Alerts`, authHeader());
export const addAlert = (alert) => axios.post(`${API_URL}/Alerts`, alert, authHeader());
export const deleteAlert = (id) => axios.delete(`${API_URL}/Alerts/${id}`, authHeader());

export const getPriceHistory = (coinId) => axios.get(`${API_URL}/PriceHistory/${coinId}`, authHeader());
export const getLatestPrice = (coinId) => axios.get(`${API_URL}/PriceHistory/${coinId}/latest`, authHeader());