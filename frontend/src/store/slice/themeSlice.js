import { createSlice } from '@reduxjs/toolkit';

// Check if user has a theme preference saved
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('linkbridge-theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const initialState = {
  mode: getInitialTheme(),
  reducedMotion: typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('linkbridge-theme', state.mode);
        document.documentElement.setAttribute('data-theme', state.mode);
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('linkbridge-theme', state.mode);
        document.documentElement.setAttribute('data-theme', state.mode);
      }
    },
    setReducedMotion: (state, action) => {
      state.reducedMotion = action.payload;
    },
  },
});

export const { 
  toggleTheme, 
  setTheme, 
  setReducedMotion
} = themeSlice.actions;
export default themeSlice.reducer;
