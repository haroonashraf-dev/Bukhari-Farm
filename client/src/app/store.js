import { configureStore } from '@reduxjs/toolkit';
import { goatsApi } from '../features/goats/goatsApi';
import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [goatsApi.reducerPath]: goatsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goatsApi.middleware, authApi.middleware),
});
