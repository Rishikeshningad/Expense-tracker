import {createSlice} from '@reduxjs/toolkit';

const initialCart = { cartIsVisible: false };

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialCart,
    reducers: {
       toggle(state) {
        state.cartIsVisible = !state.cartIsVisible;
       }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;