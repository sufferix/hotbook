import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAmenities } from "../../api/amenitiesApi";

export const fetchAmenities = createAsyncThunk(
  "amenities/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAmenities();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка загрузки удобств");
    }
  }
);

const amenitiesSlice = createSlice({
  name: "amenities",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmenities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAmenities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAmenities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default amenitiesSlice.reducer;
