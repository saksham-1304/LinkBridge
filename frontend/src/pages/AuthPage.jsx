import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useSelector } from 'react-redux';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { mode } = useSelector((state) => state.theme);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation stagger-2"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation stagger-3"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center mb-8 slide-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {isLogin ? 'Welcome Back' : 'Join LinkBridge'}
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-muted)' }}>
            {isLogin 
              ? 'Sign in to access your dashboard and manage your links' 
              : 'Create an account to start shortening and tracking your URLs'
            }
          </p>
        </div>

        <div className="w-full max-w-md slide-in-up stagger-1">
          {isLogin ? (
            <LoginForm state={setIsLogin} />
          ) : (
            <RegisterForm state={setIsLogin} />
          )}
        </div>

        {/* Enhanced Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="text-center slide-in-left">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 pulse-animation">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Lightning Fast</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Generate short links instantly</p>
          </div>

          <div className="text-center slide-in-up stagger-1">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 pulse-animation stagger-1">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Advanced Analytics</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Track clicks and performance</p>
          </div>

          <div className="text-center slide-in-right">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 pulse-animation stagger-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Secure & Reliable</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Enterprise-grade security</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;