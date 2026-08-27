import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/posts');
    return response.data.posts;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const createPost = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data.post;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const likePost = createAsyncThunk('posts/likePost', async (postId, { rejectWithValue }) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return postId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
  try {
    await api.delete(`/posts/${postId}`);
    return postId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p._id === action.payload);
        if (post) {
          post.likes.push(action.meta.arg);
        }
      });
  },
});

export default postSlice.reducer;
