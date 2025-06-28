import React from 'react';
import UrlForm from '../components/UrlForm';
import { Link } from '@tanstack/react-router';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Bridge Your
            <span className="block gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Digital Links
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform long, complex URLs into beautiful, shareable links. 
            Track performance, customize your brand, and connect with your audience.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/auth"
                className="btn-primary text-white px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center justify-center"
              >
                Start Free Trial
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button className="btn-secondary text-white px-8 py-4 rounded-xl text-lg font-semibold">
                Watch Demo
              </button>
            </div>
          )}
        </div>

        {/* URL Shortener Form */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Try LinkBridge Now
            </h2>
            <UrlForm />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="stats-card rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-white/70">
              Generate short links instantly with our optimized infrastructure
            </p>
          </div>

          <div className="stats-card rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics</h3>
            <p className="text-white/70">
              Track clicks, locations, and user behavior with detailed insights
            </p>
          </div>

          <div className="stats-card rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure & Reliable</h3>
            <p className="text-white/70">
              Enterprise-grade security with 99.9% uptime guarantee
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="glass-card rounded-2xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10M+</div>
              <div className="text-white/70">Links Created</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-white/70">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/70">Uptime</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;