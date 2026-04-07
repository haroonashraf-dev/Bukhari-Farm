import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const goatsApi = createApi({
  reducerPath: 'goatsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Goat'],
  endpoints: (builder) => ({
    getGoats: builder.query({
      query: (params) => ({
        url: '/goats',
        params,
      }),
      providesTags: ['Goat'],
    }),
    getGoatById: builder.query({
      query: (id) => `/goats/${id}`,
      providesTags: (result, error, id) => [{ type: 'Goat', id }],
    }),
    createGoat: builder.mutation({
      query: (newGoat) => ({
        url: '/goats',
        method: 'POST',
        body: newGoat,
      }),
      invalidatesTags: ['Goat'],
    }),
    updateGoat: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/goats/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Goat', id }, 'Goat'],
    }),
    deleteGoat: builder.mutation({
      query: (id) => ({
        url: `/goats/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Goat'],
    }),
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetGoatsQuery,
  useGetGoatByIdQuery,
  useCreateGoatMutation,
  useUpdateGoatMutation,
  useDeleteGoatMutation,
  useUploadImageMutation,
} = goatsApi;
