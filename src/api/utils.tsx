import { showNotification } from '@mantine/notifications';
import { completeNavigationProgress, startNavigationProgress } from '@mantine/nprogress';
import {
    fetchBaseQuery as RtkFetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { IconX } from '@tabler/icons';

import { RootState } from '../store';

export const baseQuery = RtkFetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
        const state = getState() as RootState;
        if (endpoint !== 'login') {
            headers.set('Authorization', `Bearer ${state.user.token}`);
        }
    },
});

export const fetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    try {
        startNavigationProgress();
        const result = await baseQuery(args, api, extraOptions);
        completeNavigationProgress();

        if ('error' in result) {
            const argsMethod = typeof args !== 'string' ? args.method ?? '' : '';
            const argsUrl = typeof args !== 'string' ? args.url : '';

            const errorStatus = result.error?.status ?? 'FETCH_ERROR';

            showNotification({
                title: `Error ${errorStatus}.`,
                message: `Error while requesting ${argsMethod} "${argsUrl}"`,
                color: 'red',
                icon: <IconX />,
            });
        }
        return result;
    } catch (err) {
        const argsMethod = typeof args !== 'string' ? args.method ?? '' : '';
        const argsUrl = typeof args !== 'string' ? args.url : '';

        showNotification({
            title: `${api.endpoint}`,
            message: `Error while requesting ${argsMethod} "${argsUrl}"`,
            color: 'red',
            icon: <IconX />,
        });

        completeNavigationProgress();
        throw err;
    }
};
