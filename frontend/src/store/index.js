import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';
import communityReducer from './slices/communitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    users: userReducer,
    communities: communityReducer,
  },
});

export default store;
