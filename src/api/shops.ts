import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from './utils';

import type { GetById } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
type GetShopResponse = {};

export const shopsApi = createApi({
    reducerPath: 'shops',
    baseQuery: fetchBaseQuery,
    endpoints: (builder) => ({
        getShop: builder.query<GetShopResponse, GetById>({
            query: ({ id }) => ({
                method: 'GET',
                url: `/shop/${id}`,
            }),
        }),
    }),
});
export const { useGetShopQuery } = shopsApi;
