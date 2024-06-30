import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../utils/constants';

export type TLoginRequest = {
  username: string;
  password: string;
};

export type TLoginResponse = {
  token: string;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TLoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
