import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPendingApplications, processApplication } from '../../api/applicationsApi';

export const loadApplications = createAsyncThunk(
  'applications/fetchPending',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPendingApplications();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки заявок');
    }
  }
);

export const handleApplication = createAsyncThunk(
  'applications/process',
  async ({ applicationId, accept }, { rejectWithValue }) => {
    try {
      await processApplication(applicationId, accept);
      return applicationId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка обработки заявки');
    }
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadApplications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadApplications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applications = action.payload;
      })
      .addCase(loadApplications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(handleApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter((app) => app.id !== action.payload);
      });
  },
});

export default applicationsSlice.reducer;
