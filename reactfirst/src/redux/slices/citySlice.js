import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';

export const fetchCities = createAsyncThunk(
  'city/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/hotels/cities');
      return response.data.cities; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки списка городов');
    }
  }
);

const citySlice = createSlice({
  name: 'city',
  initialState: {
    list: [], 
    status: 'idle', 
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default citySlice.reducer;
