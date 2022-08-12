import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./slices/isLoading.slice"
import homeSlice from "./slices/home.slice";
import filterSlice from "./slices/filter.slice";
import searchPriceSlice from "./slices/searchPrice.slice";
import categorySlice from "./slices/category.slice";
import purchaseSlice from "./slices/purchase.slice";
import register from "./slices/register";
import cartSlice from "./slices/cart.slice";
import cartProductsSlice from "./slices/cartProducts.slice";

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        home: homeSlice,
        filter: filterSlice,
        togglePrice: searchPriceSlice,
        toggleCategory: categorySlice,
        purchases: purchaseSlice,
        register: register,
        cart: cartSlice,
        cartProducts: cartProductsSlice
    }
})