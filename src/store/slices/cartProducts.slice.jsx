import { createSlice } from '@reduxjs/toolkit';
import getConfig from "../../../getConfig"
import { setIsLoading } from './isLoading.slice';
import axios from "axios"

export const cartProducts = createSlice({
    name: 'cartProducts',
    initialState: {},
    reducers: {
        setProducts: (state, action) => {
            const product = action.payload
            return product;
        }
    }
})

export const getCartProducts = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`,getConfig())
        .then((res) => dispatch(setProducts(res.data.data.cart)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const buyCar = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`,{}, getConfig())
        .then(() => dispatch(setProducts([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteProduct = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(setProducts()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts } = cartProducts.actions;

export default cartProducts.reducer;
