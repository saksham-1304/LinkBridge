import React, { useEffect, useState } from 'react';
import UrlForm from '../components/UrlForm';
import { Link } from '@tanstack/react-router';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Dynamic cursor effect */}
      <div 
        className="fixed w-6 h-6 pointer-events-none z-30 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
          borderRadius: '50%',
          transition: 'transform 0.1s ease'
        }}
      />

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation variant-1"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation variant-2"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 floating-animation stagger-4"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center py-20">
          <div className="slide-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Bridge Your
              <span className="block gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Digital Links
              </span>
            </h1>
          </div>
          
          <div className="slide-in-up stagger-1">
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Transform long, complex URLs into beautiful, shareable links. 
              Track performance, customize your brand, and connect with your audience.
            </p>
          </div>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 slide-in-up stagger-2">
              <Link
                to="/auth"
                className="btn-primary px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center justify-center group"
              >
                <span>Start Free Trial</span>
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button className="btn-secondary px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center justify-center group">
                <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Watch Demo</span>
              </button>
            </div>
          )}
        </div>

        {/* URL Shortener Form */}
        <div className="max-w-2xl mx-auto mb-20 slide-in-up stagger-3">
          <div className="glass-card rounded-2xl p-8 bounce-in">
            <h2 className="text-2xl font-bold text-center mb-6" style={{ color: 'var(--text-primary)' }}>
              Try LinkBridge Now
            </h2>
            <UrlForm />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="stats-card rounded-2xl p-8 text-center slide-in-left">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 pulse-animation">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Lightning Fast</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Generate short links instantly with our optimized infrastructure
            </p>
          </div>

          <div className="stats-card rounded-2xl p-8 text-center slide-in-up stagger-1">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 pulse-animation stagger-1">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Advanced Analytics</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Track clicks, locations, and user behavior with detailed insights
            </p>
          </div>

          <div className="stats-card rounded-2xl p-8 text-center slide-in-right">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 pulse-animation stagger-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Secure & Reliable</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Enterprise-grade security with 99.9% uptime guarantee
            </p>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="glass-card rounded-2xl p-8 mb-20 slide-in-up stagger-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 group-hover:scale-110" style={{ color: 'var(--text-primary)' }}>
                10M+
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Links Created</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 group-hover:scale-110" style={{ color: 'var(--text-primary)' }}>
                500K+
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Active Users</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 group-hover:scale-110" style={{ color: 'var(--text-primary)' }}>
                99.9%
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Uptime</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 group-hover:scale-110" style={{ color: 'var(--text-primary)' }}>
                24/7
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;