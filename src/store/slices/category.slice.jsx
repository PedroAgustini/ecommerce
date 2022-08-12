import { createSlice } from '@reduxjs/toolkit';

export const category = createSlice({
    name: "category",
    initialState: true,
    reducers: {
        toggleCategory: (state, action) => {
            return !state
        }
    }
})

export const { toggleCategory } = category.actions;

export default category.reducer;
