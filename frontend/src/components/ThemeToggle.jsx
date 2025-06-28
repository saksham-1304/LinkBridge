import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slice/themeSlice';

const ThemeToggle = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative w-14 h-14 rounded-full border border-white/20 bg-glass backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 group ${className}`}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-all duration-500" />
      
      {/* Icon container with enhanced animations */}
      <div className="relative text-2xl transition-all duration-500 z-10">
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          mode === 'light' 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-50 rotate-180'
        }`}>
          ☀️
        </span>
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          mode === 'dark' 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-50 -rotate-180'
        }`}>
          🌙
        </span>
      </div>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-active:scale-100 transition-transform duration-300" />
      </div>
    </button>
  );
};

export default ThemeToggle;