import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookings, cancelBookingApi, createBookingApi } from "../../api/bookingApi";

// Существующие функции
export const loadBookings = createAsyncThunk(
  "bookings/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBookings();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка загрузки бронирований");
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "bookings/cancel",
  async (bookingId, { rejectWithValue }) => {
    try {
      await cancelBookingApi(bookingId);
      return bookingId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка отмены бронирования");
    }
  }
);

export const createBooking = createAsyncThunk(
  "bookings/create",
  async ({ roomId, hotelId, payload }, { rejectWithValue }) => {
    try {
      const response = await createBookingApi(hotelId, roomId, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка создания бронирования");
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    status: "idle",
    createStatus: "idle",
    error: null,
  },
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(loadBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(cancelBooking.pending, (state) => {
        
        
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.list = state.list.filter((booking) => booking.id !== action.payload);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload); 
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload; 
      });
  },
});


export const { resetCreateStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
