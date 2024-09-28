import { useLocalStorage } from '@mantine/hooks';
import { createContext, useContext, useEffect } from 'react';

import { LoginResponse } from '../api/types';
import { SCOPE_KEY, USER_STORAGE_KEY } from '../constants';
import { setCurrentScope } from '../store/currentScope';
import { useAppDispatch } from '../store/hooks';
import { initialUserState, initUser, setUser, UserState } from '../store/user.slice';
import { EntityObj } from '../types';

import type { ReactNode } from 'react';

export const AuthContext = createContext<UserState>(initialUserState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const state = useContext(AuthContext);
    const appDispatch = useAppDispatch();
    const [storedUser] = useLocalStorage<LoginResponse>({
        key: USER_STORAGE_KEY,
        getInitialValueInEffect: false,
    });
    const [savedScope] = useLocalStorage<EntityObj>({
        key: SCOPE_KEY,
        getInitialValueInEffect: false,
    });

    useEffect(() => {
        if (storedUser) {
            const { scope } = storedUser;
            const defaultScope = savedScope ? savedScope : scope[0];

            appDispatch(setCurrentScope({ id: defaultScope.id, name: defaultScope.name }));
        }
    }, [savedScope, storedUser, appDispatch]);

    useEffect(() => {
        if (storedUser) {
            appDispatch(setUser({ ...storedUser, isInitialized: true }));
        } else {
            appDispatch(initUser());
        }
    }, [storedUser, appDispatch]);

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
