import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from './utils';

import type {
    GetById,
    GetMallBrandsResponse,
    GetMallResponse,
    GetMallShopInvoicesRequest,
    GetMallShopInvoicesResponse,
    GetMallShopRequest,
    GetMallShopResponse,
} from './types';

export const mallApi = createApi({
    reducerPath: 'mall',
    baseQuery: fetchBaseQuery,
    endpoints: (builder) => ({
        getMall: builder.query<GetMallResponse, GetById>({
            query: ({ id }) => ({
                method: 'GET',
                url: `/Mall/${id}`,
            }),
        }),
        getMallShops: builder.query<GetMallShopResponse[], GetById>({
            query: ({ id }) => ({
                method: 'GET',
                url: `/Mall/${id}/shops`,
            }),
        }),
        getMallShop: builder.query<GetMallShopResponse, GetMallShopRequest>({
            query: ({ mallId, shopId }) => ({
                method: 'GET',
                url: `/Mall/${mallId}/shop/${shopId}`,
            }),
        }),
        getMallShopInvoicesWithFilter: builder.query<GetMallShopInvoicesResponse, GetMallShopInvoicesRequest>({
            query: ({ mallId, shopId, from, to }) => ({
                method: 'GET',
                url: `/Mall/${mallId}/shops/${shopId}/invoicesFilter`,
                params: {
                    from,
                    to,
                },
            }),
        }),
        getMallBrands: builder.query<GetMallBrandsResponse, GetById>({
            query: ({ id }) => ({
                method: 'GET',
                url: `/Mall/${id}/brands`,
            }),
        }),
    }),
});
export const {
    useGetMallQuery,
    useGetMallShopInvoicesWithFilterQuery,
    useGetMallShopsQuery,
    useGetMallShopQuery,
    useGetMallBrandsQuery,
} = mallApi;
