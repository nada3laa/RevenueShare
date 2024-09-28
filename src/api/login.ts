import { createApi } from '@reduxjs/toolkit/query/react';

import { type LoginRequest, type LoginResponse } from './types';
import { fetchBaseQuery } from './utils';

export const loginApi = createApi({
    reducerPath: 'login',
    baseQuery: fetchBaseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                method: 'POST',
                url: '/Login',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;
