import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchCommunities = createAsyncThunk('communities/fetchCommunities', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/communities');
    return response.data.communities;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const createCommunity = createAsyncThunk('communities/createCommunity', async (communityData, { rejectWithValue }) => {
  try {
    const response = await api.post('/communities', communityData);
    return response.data.community;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const joinCommunity = createAsyncThunk('communities/joinCommunity', async (communityId, { rejectWithValue }) => {
  try {
    await api.post(`/communities/${communityId}/join`);
    return communityId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

const communitySlice = createSlice({
  name: 'communities',
  initialState: {
    communities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCommunity.fulfilled, (state, action) => {
        state.communities.push(action.payload);
      })
      .addCase(joinCommunity.fulfilled, (state, action) => {
        const community = state.communities.find(c => c._id === action.payload);
        if (community) {
          community.memberCount += 1;
        }
      });
  },
});

export default communitySlice.reducer;
