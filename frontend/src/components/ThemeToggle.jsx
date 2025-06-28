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
      className={`relative w-12 h-12 rounded-full border border-white/20 bg-glass backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 group ${className}`}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-all duration-500" />
      
      {/* Icon container */}
      <div className="relative text-xl transition-all duration-300 z-10">
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          mode === 'light' 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-50 rotate-180'
        }`}>
          ☀️
        </span>
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          mode === 'dark' 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-50 -rotate-180'
        }`}>
          🌙
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
