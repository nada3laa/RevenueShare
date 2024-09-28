import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EntityObj } from '../types';

type CurrentScopeState = EntityObj;

const initialState: CurrentScopeState = {
    name: '',
    id: '',
};

export const currentScopeSlice = createSlice({
    name: 'currentScope',
    initialState,
    reducers: {
        setCurrentScope(state: CurrentScopeState, action: PayloadAction<EntityObj>) {
            return action.payload;
        },
    },
});

export const { setCurrentScope } = currentScopeSlice.actions;

export default currentScopeSlice.reducer;
