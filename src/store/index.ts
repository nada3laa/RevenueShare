import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { loginApi, mallApi, stakeholderApi } from '../api';

import { currentScopeSlice } from './currentScope';
import { userSlice } from './user.slice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        currentScope: currentScopeSlice.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [mallApi.reducerPath]: mallApi.reducer,
        [stakeholderApi.reducerPath]: stakeholderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginApi.middleware, mallApi.middleware, stakeholderApi.middleware),
    devTools: import.meta.env.MODE !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
