import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from "./Productslices/Products"
import FilteredProductsReducer from "./Productslices/FilteredProducts"
import ProductDetailReducer from "./Productslices/ProductDetail"
import adduserReducer from "./UserSlices/User"
import { adduser } from './UserSlices/User';
export const store = configureStore({
  reducer: {
    product:ProductReducer,
    FilteredProducts:FilteredProductsReducer,
    productDetail:ProductDetailReducer,
    User:adduserReducer
  },
});