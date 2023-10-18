import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const myOrders = createAsyncThunk('myOrders', async (myOrders) => {

  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/order/myOrders`, myOrders,{
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState: {
    myOrders: [],
    isLoading: false, 
    orderData: null,
    error: null

  },
  extraReducers: (builder) => {
    builder.addCase(myOrders.fulfilled, (state, action) => {
      state.myOrders = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(myOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(myOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export default myOrdersSlice.reducer;