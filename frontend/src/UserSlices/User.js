import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const adduser = createAsyncThunk('adduser', async (userdata) => {

  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/login`;
  try {
    const response = await axios.post(url, userdata, {
      withCredentials: true,
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
  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/me`;
  try {
    const response = await axios.get(url, {
      withCredentials: true,
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

export const LogoutUser = createAsyncThunk('LogoutUser', async () => {
  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/logout`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed To Logout User');
    }

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk('updateUser', async (userData) => {
  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/me/update`;
  try {
    const response = await axios.put(url, userData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed To Update User');
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
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(adduser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = 'Logged In Successfully!';
      state.isAutheticated = true;
      state.userData = action.payload;
      state.error = null;
      state.token = action.payload.token;
    });
    builder.addCase(adduser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(adduser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = 'Loaded User Successfully!';
      state.isAutheticated = true;
      state.userData = action.payload;
      state.error = null;
    });
    builder.addCase(LogoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = 'Logout Successfully';
      state.isAutheticated = false;
      state.userData = {};
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = 'User Updated Successfully!';
      state.userData = action.payload;
      state.error = null;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
      state.userData = action.payload;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.error = action.error.message;
    });
  },
});

export default userslice.reducer;
