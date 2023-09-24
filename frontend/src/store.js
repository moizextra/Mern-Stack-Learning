import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from "./Productslices/Products"
import FilteredProductsReducer from "./Productslices/FilteredProducts"
import ProductDetailReducer from "./Productslices/ProductDetail"
import adduserReducer from "./UserSlices/User"
import registerUserReducer from "./UserSlices/RegisterUser"
import CartReducer from './CartSlices';
export const store = configureStore({
  reducer: {
    product:ProductReducer,
    FilteredProducts:FilteredProductsReducer,
    productDetail:ProductDetailReducer,
    User:adduserReducer,  // User Login
    UserSignup:registerUserReducer,
    cart: CartReducer,
  },
});