import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await api.get('/profile');
      setUser(res.data);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  useEffect(() => { loadProfile(); }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    await loadProfile();
  };

  const register = async (name, email, password) => {
    await api.post('/auth/register', { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loadProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
