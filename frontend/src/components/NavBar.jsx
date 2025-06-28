import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/10 slide-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
              <svg className="w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="text-xl font-bold transition-colors duration-300 text-balance" style={{ color: 'var(--text-primary)' }}>
              LinkBridge
            </span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="nav-link transition-all duration-300 hover:scale-105 focus-ring rounded-lg px-3 py-2 font-medium" 
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="nav-link transition-all duration-300 hover:scale-105 focus-ring rounded-lg px-3 py-2 font-medium"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                Dashboard
              </Link>
            )}
            <button 
              className="nav-link transition-all duration-300 hover:scale-105 focus-ring rounded-lg px-3 py-2 cursor-pointer font-medium"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              Features
            </button>
            <button 
              className="nav-link transition-all duration-300 hover:scale-105 focus-ring rounded-lg px-3 py-2 cursor-pointer font-medium"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              Pricing
            </button>
          </div>
          
          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 glass-card px-3 py-2 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-md">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="btn-primary px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle className="scale-90" />
            <button
              onClick={toggleMenu}
              className="glass-card p-2 rounded-lg transition-all duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 slide-in-up">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="nav-link px-3 py-2 rounded-lg font-medium transition-all duration-300"
                style={{ color: 'var(--text-muted)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/dashboard" 
                  className="nav-link px-3 py-2 rounded-lg font-medium transition-all duration-300"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <button 
                className="nav-link text-left px-3 py-2 rounded-lg font-medium transition-all duration-300"
                style={{ color: 'var(--text-muted)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </button>
              <button 
                className="nav-link text-left px-3 py-2 rounded-lg font-medium transition-all duration-300"
                style={{ color: 'var(--text-muted)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </button>
              
              {isAuthenticated ? (
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary w-full py-2 rounded-xl text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-white/10">
                  <Link
                    to="/auth"
                    className="btn-primary w-full py-2 rounded-xl text-sm font-medium text-center block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;