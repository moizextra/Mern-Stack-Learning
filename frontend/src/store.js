import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from "./Productslices/Products"
import ProductDetailReducer from "./Productslices/ProductDetail"
export const store = configureStore({
  reducer: {
    product:ProductReducer,
    productDetail:ProductDetailReducer
  },
});