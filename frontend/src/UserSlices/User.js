import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const adduser = createAsyncThunk('adduser', async (userdata) => {
    const options={
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userdata),
    }
  try {
    const response = await fetch(`http://localhost:3000/api/v1/login`,options);
    if (!response.ok) {
      throw new Error('Failed To Add User');
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
    builder.addCase(adduser.fulfilled, (state, action) => {
      state.isLoading = false; // Set isLoading to false on success
      state.message = "Logged In Successfully!";
      state.isAutheticated=true;
      state.userData=action.payload
      state.error = null; // Clear any previous errors
    });
    builder.addCase(adduser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null; // Clear any previous errors
    });
    builder.addCase(adduser.rejected, (state, action) => {
      state.isLoading = false; // Set isLoading to false on error
      state.error = action.error.message; // Store the error message
    });
  }
});

export default userslice.reducer;
