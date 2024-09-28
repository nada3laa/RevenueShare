import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from './utils';

import type { GetStakeholderMallRequest, GetStakeholderMallResponse } from './types';

export const stakeholderApi = createApi({
    reducerPath: 'stakeholder',
    baseQuery: fetchBaseQuery,
    endpoints: (builder) => ({
        getStakeholderMall: builder.query<GetStakeholderMallResponse, GetStakeholderMallRequest>({
            query: ({ id, from, to }) => ({
                method: 'GET',
                url: `/stakeholder/${id}/invoicesFilter`,
                params: {
                    from,
                    to,
                },
            }),
        }),
    }),
});
export const { useGetStakeholderMallQuery } = stakeholderApi;
