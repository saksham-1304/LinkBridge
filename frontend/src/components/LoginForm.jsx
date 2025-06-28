import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('sarkaranurag104@gmail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(password, email);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-white/70">Sign in to your LinkBridge account</p>
      </div>

      {error && (
        <div className="glass-card border-red-400/50 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/50"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/50"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="btn-primary w-full py-3 px-6 rounded-xl text-white font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-white/70 text-sm">
          Don't have an account?{' '}
          <button
            onClick={() => state(false)}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Create one now
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;