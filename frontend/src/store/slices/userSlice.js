import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/users');
    return response.data.users;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const getUser = createAsyncThunk('users/getUser', async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const followUser = createAsyncThunk('users/followUser', async (userId, { rejectWithValue }) => {
  try {
    await api.post(`/users/${userId}/follow`);
    return userId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        const user = state.users.find(u => u._id === action.payload);
        if (user) {
          user.followers.push(action.meta.arg);
        }
      });
  },
});

export default userSlice.reducer;
