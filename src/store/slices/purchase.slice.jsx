import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../../getConfig';
import { setIsLoading } from './isLoading.slice';

export const purchase = createSlice({
    name: 'purchase',
    initialState: [],
    reducers: {
        setPurchase: (state, action) => {
            const purchase = action.payload;
            return purchase;
        }
    }
})


export const getPurchaseThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`, getConfig())
        .then((res) => dispatch(setPurchase(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProductsThunk = car => (dispatch) => {
    dispatch (setIsLoading(true))
    return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, car, getConfig())
        .then((res) => dispatch(getPurchaseThunk()))
        .catch(error=>console.log(error))
        .finally(() => dispatch(setIsLoading(false)));
}



export const { setPurchase } = purchase.actions;

export default purchase.reducer;
