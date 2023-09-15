import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import Axios

export const adduser = createAsyncThunk('adduser', async (userdata) => {
  const url = 'http://localhost:3000/api/v1/login';
  try {
    const response = await axios.post(url, userdata, {
      withCredentials: true, // Set credentials to true
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed To Add User');
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const loadUser = createAsyncThunk('loadUser', async () => {
  const url = 'http://localhost:3000/api/v1/me';
  try {
    const response = await axios.get(url ,{
      withCredentials: true, // Set credentials to true
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed To Load the User');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
});

const userslice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    message: '',
    userData: {},
    isAutheticated: false,
    error: null, // Add an error field to your initial state
  },
  extraReducers: (builder) => {
    builder.addCase(adduser.fulfilled, (state, action) => {
      state.isLoading = false; // Set isLoading to false on success
      state.message = 'Logged In Successfully!';
      state.isAutheticated = true;
      state.userData = action.payload;
      state.error = null; // Clear any previous errors
      state.token = action.payload.token;
    });
    builder.addCase(adduser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null; // Clear any previous errors
    });
    builder.addCase(adduser.rejected, (state, action) => {
      state.isLoading = false; // Set isLoading to false on error
      state.error = action.error.message; // Store the error message
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isLoading = false; // Set isLoading to false on success
      state.message = 'Loaded User Successfully!';
      state.isAutheticated = true;
      state.userData = action.payload;
      state.error = null; // Clear any previous errors
    });
    
  },
});

export default userslice.reducer;
