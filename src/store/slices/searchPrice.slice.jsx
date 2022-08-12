import { createSlice } from '@reduxjs/toolkit';

export const price = createSlice({
    name: "price",
    initialState: true,
    reducers: {
        togglePrice: (state, action) => {
            return !state
        }
    }
})

export const { togglePrice } = price.actions;

export default price.reducer;
