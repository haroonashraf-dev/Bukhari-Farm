import { configureStore } from '@reduxjs/toolkit';
import { goatsApi } from '../features/goats/goatsApi';

export const store = configureStore({
  reducer: {
    [goatsApi.reducerPath]: goatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goatsApi.middleware),
});
