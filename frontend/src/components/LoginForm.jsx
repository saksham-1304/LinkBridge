import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('sarkaranurag104@gmail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

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
    <div className="glass-card rounded-2xl p-8 bounce-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 pulse-animation">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-balance" style={{ color: 'var(--text-primary)' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-muted)' }}>Sign in to your LinkBridge account</p>
      </div>

      {error && (
        <div className="alert alert-error rounded-xl p-4 mb-6 slide-in-up">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm" style={{ color: 'var(--accent-error)' }}>{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group slide-in-left">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <input
            className="form-input glass-input"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ color: 'var(--text-primary)' }}
          />
        </div>

        <div className="form-group slide-in-right">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="form-input glass-input pr-12"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ color: 'var(--text-primary)' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors duration-300"
              style={{ color: 'var(--text-muted)' }}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          className="btn-primary w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed slide-in-up stagger-2 group"
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
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center slide-in-up stagger-3">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <button
            onClick={() => state(false)}
            className="font-medium transition-colors duration-300 hover:underline"
            style={{ color: 'var(--accent-primary)' }}
          >
            Create one now
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;