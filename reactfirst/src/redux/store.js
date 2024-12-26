import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import ownershipReducer from "./slices/ownershipSlice";
import applicationsReducer from "./slices/applicationsSlice";
import bookingReducer from "./slices/bookingSlice";
import cityReducer from "./slices/citySlice";
import amenitiesReducer from "./slices/amenitiesSlice";
import hotelReducer from './slices/hotelSlice';
import hotelDetailReducer from './slices/hotelDetailSlice';
import ownerHotelReducer from './slices/ownerHotelSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    ownership: ownershipReducer,
    applications: applicationsReducer,
    bookings: bookingReducer,
    city: cityReducer,
    amenities: amenitiesReducer,
    hotels: hotelReducer,
    hotelDetail: hotelDetailReducer,
    ownerHotels: ownerHotelReducer,
  },
});

export default store;
