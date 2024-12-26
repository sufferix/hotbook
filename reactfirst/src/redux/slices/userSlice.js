import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile, updateUserProfile, fetchAllUsers, deleteUser, blockUser } from '../../api/userApi';

export const loadAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllUsers();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки списка пользователей');
    }
  }
);

export const removeUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления пользователя');
    }
  }
);

export const toggleUserBlock = createAsyncThunk(
  'user/blockUser',
  async ({ userId, enable }, { rejectWithValue }) => {
    try {
      await blockUser(userId, enable);
      return { userId, enable };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка блокировки пользователя');
    }
  }
);

export const loadUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUserProfile();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки профиля');
    }
  }
);

export const saveUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      return await updateUserProfile(profileData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка сохранения профиля');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(loadUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(saveUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(saveUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loadAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(loadAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(toggleUserBlock.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.payload.userId);
        if (user) {
          user.enabled = action.payload.enable;
        }
      });
  },
});

export default userSlice.reducer;
