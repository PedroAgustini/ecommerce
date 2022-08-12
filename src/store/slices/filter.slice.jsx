import { createSlice } from '@reduxjs/toolkit';

export const filter = createSlice({
    name: "filter",
    initialState: false,
    reducers: {
        toggle: (state, action) => {
            if(state === true) {
                return false
            } else {
                return true
            }
        }
    }
})

export const { toggle } = filter.actions;

export default filter.reducer;
