import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MedicalRecords from './pages/MedicalRecords';
import Reminders from './pages/Reminders';
import HealthTools from './pages/HealthTools';
import Chatbot from './pages/Chatbot';
import Profile from './pages/Profile';
import EmergencyInfo from './pages/EmergencyInfo';

import SplashScreen from './components/SplashScreen';
import ExternalEmbed from './components/ExternalEmbed';
import './App.css';

function Layout() {
  const { isLoading } = useAuth();
  if (isLoading) return <SplashScreen />;

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/medical-records" element={<PrivateRoute><MedicalRecords /></PrivateRoute>} />
          <Route path="/reminders" element={<PrivateRoute><Reminders /></PrivateRoute>} />
          <Route path="/health-tools" element={<PrivateRoute><HealthTools /></PrivateRoute>} />
          <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/emergency-info" element={<PrivateRoute><EmergencyInfo /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <ExternalEmbed />
    </>
  );
}

export default function App() {
  return (
    <Router> {/* ✅ Router moved here */}
      <ThemeProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </ThemeProvider>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
