import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    amount: 0,
    total: JSON.parse(localStorage.getItem('Total')) || 0,
    isLoading: true,
    ShippingInfo:JSON.parse(localStorage.getItem("ShippingInfo")) || {}
  };
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
     addtoCart(state, action) {
        const {name,Price,quantity,image,product} = action.payload; //product is actually id
        const existingItem = state.cartItems.find(item => item.product === product);
        if(existingItem){
            existingItem.quantity += 1;
       } else{
        state.cartItems.push({name,Price,quantity,image,product});  
       }
       localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
       state.total = state.cartItems.reduce((total, item) => {
        return total + item.Price * item.quantity;  
      }, 0);
      localStorage.setItem('Total', JSON.stringify(state.total));
     },
     removeFromCart(state, action) {
      const index = state.cartItems.findIndex(item => item.product === action.payload); // getting the id of the product
      state.cartItems.splice(index, 1);  // at particular index and only one Element
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); 
      state.total = state.cartItems.reduce((total, item) => {
        return total + item.Price * item.quantity;
      }, 0);
      localStorage.setItem('Total', JSON.stringify(state.total));
    },
    decrementQuantity(state, action) {
      const productId = action.payload;
      const existingItem = state.cartItems.find(item => item.product === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // If quantity becomes 0 or negative, remove the item from the cart
          const index = state.cartItems.findIndex(item => item.product === productId);
          if (index !== -1) {
            state.cartItems.splice(index, 1);
          }
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      state.total = state.cartItems.reduce((total, item) => {
        return total + item.Price * item.quantity;
      }, 0);
      localStorage.setItem('Total', JSON.stringify(state.total));
    },
    SaveCartInfo(state,action) {
localStorage.setItem("ShippingInfo",JSON.stringify(action.payload));
state.ShippingInfo=JSON.parse(localStorage.getItem("ShippingInfo"));
    }

    }
  });
  console.log(cartSlice);
  export const { addtoCart,decrementQuantity,removeFromCart,SaveCartInfo} = cartSlice.actions;
export default cartSlice.reducer;