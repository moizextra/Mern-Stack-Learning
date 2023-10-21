import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const myOrders = createAsyncThunk('myOrders', async () => {
  const url =`${import.meta.env.VITE_BASE_URL}/api/v1/myOrders`;
  try {
    const response = await axios.get(url, {
      withCredentials: true, 
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(response.status !== 200) {
      throw new Error('Failed to load orders'); 
    }

    return response.data;

  } catch(error) {
    throw error; 
  }
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
      state.myOrders = action.payload.orders;
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