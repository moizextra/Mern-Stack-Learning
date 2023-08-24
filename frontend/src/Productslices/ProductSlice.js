import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 // creating a function that fetched data from api and then return it
 export const getProducts = createAsyncThunk('getProducts', async() => {

return fetch("http://localhost:3000/api/v1/products")
.then((resp) => resp.json())
.catch((err) => console.log(err));
  });

const initialState = {
isLoading:false,
products:null,
productCount:0,
};

const cartSlice = createSlice({
  name: 'product',
  initialState,
 extraReducers:{
    // fetched data will go in the main store and then we get it from store via action and state
[getProducts.fulfilled]:(state,action)=>{
    state.isLoading=false
    console.log(action);            // These three lines upading the state and sending it to store for globally updating the state and sending it 
    state.products=action.payload   // our all rquired data will come in payload
    state.productCount=action.payload.ProductCount
},
[getProducts.pending]:(state,action)=>{
    state.isLoading=true
    console.log(action);
},
[getProducts.rejected]:(state,action)=>{
    state.isLoading=false
    console.log(action);
},
 }
});

console.log(cartSlice);

export default cartSlice.reducer;