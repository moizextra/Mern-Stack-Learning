import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk('getProducts', async ( keyword="", page=1 ) => {

  try {
    const response = await fetch(`http://localhost:3000/api/v1/products?keyword=${keyword}&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
});

const productslice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    Productdata: null,
    message: "",
    ProductCount: 0,
    error: null, // Add an error field to your initial state
    resultPerPage:0
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false; // Set isLoading to false on success
      state.Productdata = action.payload.products;
      state.ProductCount = action.payload.ProductCount;
      state.message = action.payload.message;
      state.resultPerPage = action.payload.resultperpage;
      state.error = null; // Clear any previous errors
    });
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null; // Clear any previous errors
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false; // Set isLoading to false on error
      state.error = action.error.message; // Store the error message
    });
  }
});

export default productslice.reducer;
