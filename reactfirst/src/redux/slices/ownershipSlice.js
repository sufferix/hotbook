import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

export const sendApplication = createAsyncThunk(
  "ownership/sendApplication",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/applications/submit", formData);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка сервера");
    }
  }
);

const ownershipSlice = createSlice({
  name: "ownership",
  initialState: {
    status: "idle",
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendApplication.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(sendApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(sendApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ownershipSlice.reducer;
