import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios"

export const homeSlice = createSlice({
    name: "home",
    initialState: [],
    reducers: {
        setHome: (state, action) => {
            const home = action.payload
            return home
        }

    }
})

export const getHomeThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
        .then(res => dispatch(setHome(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const inputSearchThunk = (inputValue) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${inputValue}`)
        .then((res) => dispatch(setHome(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterCategory = (categoryID) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${categoryID}`)
        .then((res) => dispatch(setHome((res.data.data.products))))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setHome } = homeSlice.actions;
export default homeSlice.reducer;