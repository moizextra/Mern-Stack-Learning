import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const newOrder = createAsyncThunk('newOrder', async (neworder) => {

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/order/new`, neworder);

  return response.data; 

});



const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState: {
    isLoading: false,
 
  },
  extraReducers: (builder) => {
    builder.addCase(newOrder.fulfilled, (state, action) => {
      
    });
    builder.addCase(newOrder.pending, (state, action) => {
    
    });
    builder.addCase(newOrder.rejected, (state, action) => {
    
    });
  }
});

export default newOrderSlice.reducer;