import React from 'react';
import { Link } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">LinkBridge</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">
                Dashboard
              </Link>
            )}
            <div className="text-white/80 hover:text-white transition-colors cursor-pointer">
              Features
            </div>
            <div className="text-white/80 hover:text-white transition-colors cursor-pointer">
              Pricing
            </div>
          </div>
          
          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white text-sm hidden sm:block">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="btn-primary text-white px-6 py-2 rounded-lg text-sm font-medium"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;