import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const RegisterUser = createAsyncThunk('RegisterUser', async ({ name, email, password ,avatar}) => {

  const requestData = {
    name, 
    email,
    password  ,
    avatar
  };

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/register`, requestData);

  return response.data; 

});



const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    message: "",
    userData:{},
    isAuthenticated: false, 
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.userData = action.payload.user;
      state.error = null; 
    });
    builder.addCase(RegisterUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null; 
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.isLoading = false; 
      state.error = action.error.message;
    });
  }
});

export default userSlice.reducer;