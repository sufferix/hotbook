import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOwnerHotels = createAsyncThunk(
  'ownerHotels/fetchOwnerHotels',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://deployem-production.up.railway.app/users/my-hotels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.hotelList;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки списка отелей');
    }
  }
);

export const deleteOwnerHotel = createAsyncThunk(
  'ownerHotels/deleteOwnerHotel',
  async (hotelId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://deployem-production.up.railway.app/hotels/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return hotelId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления отеля');
    }
  }
);

export const createHotel = createAsyncThunk(
  'ownerHotels/createHotel',
  async (hotelData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8082/hotels', hotelData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка добавления отеля');
    }
  }
);

export const createRoom = createAsyncThunk(
  'ownerHotels/createRoom',
  async ({ hotelId, roomData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8082/hotels/${hotelId}/rooms`, roomData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка добавления номера');
    }
  }
);

export const updateHotel = createAsyncThunk(
  'ownerHotels/updateHotel',
  async ({ hotelId, hotelData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8082/hotels/${hotelId}`, hotelData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка обновления отеля');
    }
  }
);

export const updateRoom = createAsyncThunk(
  'ownerHotels/updateRoom',
  async ({ hotelId, roomId, roomData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8082/hotels/${hotelId}/rooms/${roomId}`, roomData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка обновления номера');
    }
  }
);

export const uploadHotelImage = createAsyncThunk(
  'ownerHotels/uploadHotelImage',
  async ({ hotelId, imageFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('photo', imageFile);
      const response = await axios.post(`http://localhost:8082/hotels/${hotelId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки фотографии отеля');
    }
  }
);

export const uploadRoomImage = createAsyncThunk(
  'ownerHotels/uploadRoomImage',
  async ({ hotelId, roomId, imageFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('photo', imageFile);
      const response = await axios.post(`http://localhost:8082/hotels/${hotelId}/rooms/${roomId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки фотографии номера');
    }
  }
);

export const deleteHotelPhoto = createAsyncThunk(
  'ownerHotels/deleteHotelPhoto',
  async ({ hotelId, photoId }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8082/hotels/${hotelId}/photos/${photoId}`);
      return { hotelId, photoId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления фотографии отеля');
    }
  }
);

export const deleteRoomPhoto = createAsyncThunk(
  'ownerHotels/deleteRoomPhoto',
  async ({ hotelId, roomId, photoId }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8082/hotels/${hotelId}/rooms/${roomId}/photos/${photoId}`);
      return { hotelId, roomId, photoId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления фотографии номера');
    }
  }
);

const ownerHotelSlice = createSlice({
  name: 'ownerHotels',
  initialState: {
    hotels: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerHotels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOwnerHotels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hotels = action.payload;
      })
      .addCase(fetchOwnerHotels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteOwnerHotel.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter((hotel) => hotel.id !== action.payload);
      })
      .addCase(deleteOwnerHotel.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createHotel.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hotels.push(action.payload);
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createRoom.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const hotelIndex = state.hotels.findIndex((hotel) => hotel.id === action.payload.hotelId);
        if (hotelIndex !== -1) {
          state.hotels[hotelIndex].rooms.push(action.payload);
        }
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateHotel.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.hotels.findIndex((hotel) => hotel.id === action.payload.id);
        if (index !== -1) {
          state.hotels[index] = action.payload;
        }
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateRoom.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { hotelId, id } = action.payload;
        const hotelIndex = state.hotels.findIndex((hotel) => hotel.id === hotelId);
        if (hotelIndex !== -1) {
          const roomIndex = state.hotels[hotelIndex].rooms.findIndex((room) => room.id === id);
          if (roomIndex !== -1) {
            state.hotels[hotelIndex].rooms[roomIndex] = action.payload;
          }
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(uploadHotelImage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadHotelImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { hotelId, photo } = action.payload;
        const hotel = state.hotels.find((hotel) => hotel.id === hotelId);
        if (hotel) {
          hotel.photos.push(photo);
        }
      })
      .addCase(uploadHotelImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(uploadRoomImage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadRoomImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { hotelId, roomId, photo } = action.payload;
        const hotel = state.hotels.find((hotel) => hotel.id === hotelId);
        if (hotel) {
          const room = hotel.rooms.find((room) => room.id === roomId);
          if (room) {
            room.photos.push(photo);
          }
        }
      })
      .addCase(uploadRoomImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteHotelPhoto.fulfilled, (state, action) => {
        const { hotelId, photoId } = action.payload;
        const hotel = state.hotels.find((hotel) => hotel.id === hotelId);
        if (hotel) {
          hotel.photos = hotel.photos.filter((photo) => photo.id !== photoId);
        }
      })
      .addCase(deleteHotelPhoto.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteRoomPhoto.fulfilled, (state, action) => {
        const { hotelId, roomId, photoId } = action.payload;
        const hotel = state.hotels.find((hotel) => hotel.id === hotelId);
        if (hotel) {
          const room = hotel.rooms.find((room) => room.id === roomId);
          if (room) {
            room.photos = room.photos.filter((photo) => photo.id !== photoId);
          }
        }
      })
      .addCase(deleteRoomPhoto.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default ownerHotelSlice.reducer;
