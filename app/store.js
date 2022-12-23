import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
