import { createSlice } from '@reduxjs/toolkit';



export const cart = createSlice({
    name: "cart",
    initialState: false,
    reducers: {
        cartToggle: (state, actions) => {
            return !state
        }
    }
})

export const { cartToggle } = cart.actions;

export default cart.reducer;
