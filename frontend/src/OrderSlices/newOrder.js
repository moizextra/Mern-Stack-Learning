import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const newOrder = createAsyncThunk('newOrder', async (neworder) => {

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/order/new`, neworder,{
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState: {
    isLoading: false, 
    orderData: null,
    error: null

  },
  extraReducers: (builder) => {
    builder.addCase(newOrder.fulfilled, (state, action) => {
      state.orderData = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(newOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(newOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export default newOrderSlice.reducer;