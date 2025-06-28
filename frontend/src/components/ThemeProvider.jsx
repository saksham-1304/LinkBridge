import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setReducedMotion } from '../store/slice/themeSlice';

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    // Set the initial theme attribute
    document.documentElement.setAttribute('data-theme', mode);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if no theme is saved in localStorage
      if (!localStorage.getItem('linkbridge-theme')) {
        dispatch(setTheme(e.matches ? 'dark' : 'light'));
      }
    };

    // Listen for reduced motion preference changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotionChange = (e) => {
      dispatch(setReducedMotion(e.matches));
    };

    mediaQuery.addEventListener('change', handleChange);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    
    // Set initial reduced motion state
    dispatch(setReducedMotion(reducedMotionQuery.matches));

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, [dispatch]);

  useEffect(() => {
    // Update theme attribute when mode changes
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return children;
};

export default ThemeProvider;
