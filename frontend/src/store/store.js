import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice.js';
import themeReducer from './slice/themeSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;