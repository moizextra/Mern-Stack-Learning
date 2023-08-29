import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProductsDetails = createAsyncThunk('getProducts', async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/product/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
});


const productDetailslice = createSlice({
  name: 'productDetail',
  initialState: {
    isLoading:false,
    ProductDetailData: null,
    message: "",
    error: null, // Add an error field to your initial state
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsDetails.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.ProductDetailData = action.payload;
      state.message = "Success";
      state.error = null; 
      
    });
    builder.addCase(getProductsDetails.pending, (state, action) => {
      state.isLoading = true;
      state.error = null; 
    });
    builder.addCase(getProductsDetails.rejected, (state, action) => {
      state.isLoading = false; // 
      state.error = action.error.message; 
    });
  }
});

export default productDetailslice.reducer;
