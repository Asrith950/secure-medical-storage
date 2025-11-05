import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// ✅ Detect backend automatically
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://secure-medical-storage-backend.onrender.com'
    : 'http://localhost:5000';

axios.defaults.baseURL = API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Set axios token when login
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // ✅ Auto-check logged-in state on refresh
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) return setIsLoading(false);

      try {
        const res = await axios.get('/api/auth/me');
        setUser(res.data.data);
      } catch (error) {
        localStorage.removeItem('token');
        setToken(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token]);

  // ✅ LOGIN ✓ Redirects to Dashboard
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token: newToken, data } = res.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(data);

      toast.success('Logged in successfully ✅');
      navigate('/dashboard'); // ✅ redirect works!

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed ❌');
    }
  };

  // ✅ REGISTER ✓ Redirects to Login Page
  const register = async (name, email, password) => {
    try {
      await axios.post('/api/auth/register', { name, email, password });
      toast.success('Registered ✅ Now login!');
      navigate('/login'); // ✅ correct redirect

    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed ❌');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.info('Logged out');
    navigate('/login'); // ✅ redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
