import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const RegisterUser = createAsyncThunk('RegisterUser', async (userdata) => {
    const options={
        method:"POST",
        headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify(userdata),
    }
  try {
    const response = await fetch(`http://localhost:3000/api/v1/register`,options);
    if (!response.ok) {
      throw new Error('Failed To Register  User');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
});

const userslice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    message: "",
    userData:{},
    isAutheticated:false,
    error: null, // Add an error field to your initial state
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.isLoading = false; // Set isLoading to false on success
      state.message = "User Register Successfully";
      state.isAutheticated=true;
      state.userData=action.payload
      state.error = null; // Clear any previous errors
    });
    builder.addCase(RegisterUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null; // Clear any previous errors
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.isLoading = false; // Set isLoading to false on error
      state.error = action.error.message; // Store the error message
    });
  }
});

export default userslice.reducer;
