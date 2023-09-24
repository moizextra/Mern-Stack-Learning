import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
  };
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
     addtoCart(state, action) {
        const {name,price,quantity,image,product} = action.payload; //product is actually id
        const existingItem = state.cartItems.find(item => item.product === product);
        if(existingItem){
            existingItem.quantity += quantity;
       }else{
        state.cartItems.push({name,price,quantity,image,product});  
       }
     },

    }
  });
  console.log(cartSlice);
  export const { addtoCart} = cartSlice.actions;
export default cartSlice.reducer;