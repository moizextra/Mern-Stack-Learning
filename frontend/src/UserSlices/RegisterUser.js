import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const RegisterUser = createAsyncThunk('RegisterUser', async ({name,email,password,avatar}) => {
  const options = {
    method: "POST",
  
    headers: {
      "Content-Type": "application/json" ,
    },
    body: JSON.stringify({name,email,password,avatar}),
  };

  const response = await fetch(`http://localhost:3000/api/v1/register`, options);
if(!response){
  throw new Error('Failed To Add User');
}
  return response.json();
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
      state.message = action.payload;
      state.isAutheticated=true;
      state.userData=action.payload.user
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
