import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig"; 

export const fetchHotelDetail = createAsyncThunk(
    "hotelDetail/fetchHotelDetail",
    async (
      { id, city, checkInDate, checkOutDate, stars, amenities,numOfAdults, numOfChildren },
      { rejectWithValue }
    ) => {
      try {
        const params = new URLSearchParams();
        if (city) params.append("city", city);
        if (checkInDate) params.append("checkInDate", checkInDate);
        if (checkOutDate) params.append("checkOutDate", checkOutDate);
        if (stars) params.append("stars", stars);
        if (amenities) params.append("amenities", amenities);
        params.append("numOfAdults", numOfAdults);
        params.append("numOfChildren", numOfChildren);
        
        const response = await api.get(`/hotels/${id}?${params.toString()}`);
        return response.data.hotelDetail;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Ошибка при загрузке информации об отеле"
        );
      }
    }
  );

export const fetchHotelReviews = createAsyncThunk(
  "hotelDetail/fetchHotelReviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/hotels/${id}/reviews`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка при загрузке отзывов"
      );
    }
  }
);

export const postHotelReview = createAsyncThunk(
  "hotelDetail/postHotelReview",
  async ({ id, rating, content }, { rejectWithValue, getState }) => {
    try {
      const response = await api.post(`/hotels/${id}/reviews`, {
        rating,
        content,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка при добавлении отзыва"
      );
    }
  }
);

const hotelDetailSlice = createSlice({
  name: "hotelDetail",
  initialState: {
    hotel: null,    
    reviews: [],        
    statusHotel: "idle", 
    statusReviews: "idle",
    error: null,           
  },
  reducers: {
    clearHotelDetail: (state) => {
      state.hotel = null;
      state.reviews = [];
      state.statusHotel = "idle";
      state.statusReviews = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelDetail.pending, (state) => {
        state.statusHotel = "loading";
        state.error = null;
      })
      .addCase(fetchHotelDetail.fulfilled, (state, action) => {
        state.statusHotel = "succeeded";
        state.hotel = action.payload; 
      })
      .addCase(fetchHotelDetail.rejected, (state, action) => {
        state.statusHotel = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchHotelReviews.pending, (state) => {
        state.statusReviews = "loading";
        state.error = null;
      })
      .addCase(fetchHotelReviews.fulfilled, (state, action) => {
        state.statusReviews = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchHotelReviews.rejected, (state, action) => {
        state.statusReviews = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(postHotelReview.pending, (state) => {
      })
      .addCase(postHotelReview.fulfilled, (state) => {
      })
      .addCase(postHotelReview.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearHotelDetail } = hotelDetailSlice.actions;
export default hotelDetailSlice.reducer;
