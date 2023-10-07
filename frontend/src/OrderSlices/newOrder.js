import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: null,
    loading: false,
    error: null,
};

const newOrderSlice = createSlice({
    name: 'newOrder',
    initialState,
    reducers: {
        newOrderRequest: (state) => {
            state.loading = true;
        },
        newOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = null;
        },
        newOrderFail: (state, action) => {
            state.loading = false;
            state.order = null;
            state.error = action.payload;
        },
    },
});

export const { newOrderRequest, newOrderSuccess, newOrderFail } = newOrderSlice.actions;

export default newOrderSlice.reducer;
