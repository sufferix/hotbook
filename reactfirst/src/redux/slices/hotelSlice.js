import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";
import { format } from "date-fns";

export const fetchFilteredHotels = createAsyncThunk(
  "hotels/fetchFilteredHotels",
  async ({ city, checkInDate, checkOutDate, stars = [], amenities = [] }, { rejectWithValue }) => {
    try {
      const formattedCheckInDate = format(new Date(checkInDate), "yyyy-MM-dd");
      const formattedCheckOutDate = format(new Date(checkOutDate), "yyyy-MM-dd");

      const response = await api.get("/hotels/filter", {
        params: {
          city,
          checkInDate: formattedCheckInDate,
          checkOutDate: formattedCheckOutDate,
          stars: stars.join(","),
          amenities: amenities.join(","),
        },
      });

      return response.data.hotelList;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка фильтрации отелей");
    }
  }
);

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearHotels: (state) => {
      state.list = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredHotels.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFilteredHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchFilteredHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
