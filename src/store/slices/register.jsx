import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createSlice({
    name: 'register',
    initialState: {},
    reducers: {
        user: (state, action) => {
            const registerUser = action.payload
            return registerUser;
        }
    }
})

export const generateUser = (data) => (dispatch) => {
        return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/users`, data)
    }

export const { user } = register.actions;

export default register.reducer;
