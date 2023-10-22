import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  amount: 0,
  total: 0,
  isLoading: true,
  ShippingInfo: JSON.parse(localStorage.getItem('ShippingInfo')) || {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart(state, action) {
      const { name, price, quantity, image, product } = action.payload;
      const existingItem = state.cartItems.find(item => item.product === product);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ name, price, quantity, image, product });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      state.total = state.cartItems.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.quantity);
      }, 0);
      localStorage.setItem('Total', JSON.stringify(state.total));
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const index = state.cartItems.findIndex(item => item.product === productId);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
      state.total = state.cartItems.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.quantity);
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
          const index = state.cartItems.findIndex(item => item.product === productId);
          if (index !== -1) {
            state.cartItems.splice(index, 1);
          }
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      state.total = state.cartItems.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.quantity);
      }, 0);
      localStorage.setItem('Total', JSON.stringify(state.total));
    },
    SaveCartInfo(state, action) {
      localStorage.setItem('ShippingInfo', JSON.stringify(action.payload));
      state.ShippingInfo = JSON.parse(localStorage.getItem('ShippingInfo'));
    },
  },
});

export const { addtoCart, decrementQuantity, removeFromCart, SaveCartInfo } = cartSlice.actions;
export default cartSlice.reducer;
