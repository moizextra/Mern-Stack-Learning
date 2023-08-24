import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from "./Productslices/ProductSlice"
export const store = configureStore({
  reducer: {
    product:ProductReducer
  },
});