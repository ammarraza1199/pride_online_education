import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  // CHANGE THIS TO YOUR ACTUAL ADMIN GOOGLE EMAIL
  const ALLOWED_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@example.com";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      
      if (email.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase() && ALLOWED_ADMIN_EMAIL !== "admin@example.com") {
        throw new Error(`Access denied. ${email} is not authorized.`);
      }
      
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      const result = await loginWithGoogle();
      
      // Check if the Google email matches the allowed admin email
      if (result.user.email !== ALLOWED_ADMIN_EMAIL && ALLOWED_ADMIN_EMAIL !== "admin@example.com") {
        await logout(); // Instantly sign them out
        throw new Error(`Access denied. ${result.user.email} is not authorized.`);
      }
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to log in with Google: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-blue">Admin Login</h2>
          <p className="text-gray-500 mt-2">Sign in to access the dashboard</p>
        </div>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-blue"
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-blue"
              required 
            />
          </div>
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-primary-red text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors disabled:opacity-50 mb-4"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="relative flex items-center justify-center mb-4">
            <span className="absolute bg-white px-2 text-sm text-gray-500">OR</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          
          <button 
            disabled={loading}
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>
      </motion.div>
    </div>
  );
}
