import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    amount: 0,
    total: 0,
    isLoading: true,
  };
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
     addtoCart(state, action) {
        const {name,Price,quantity,image,product} = action.payload; //product is actually id
        const existingItem = state.cartItems.find(item => item.product === product);
        if(existingItem){
            existingItem.quantity += quantity;
       }else{
        state.cartItems.push({name,Price,quantity,image,product});  
       }
       localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
     },
     removeFromCart(state, action) {
      const index = state.cartItems.findIndex(item => item.product === action.payload);
      state.cartItems.splice(index, 1);  // at particular index and only one Element
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); 
    }

    }
  });
  console.log(cartSlice);
  export const { addtoCart} = cartSlice.actions;
export default cartSlice.reducer;