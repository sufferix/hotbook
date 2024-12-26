import api from './axiosConfig';

export const fetchBookings = async () => {
  const response = await api.get('/bookings');
  return response.data.bookingList;
};

export const cancelBookingApi = async (bookingId) => {
  const response = await api.delete(`/bookings/${bookingId}`);
  return response.data.message;
};

export const createBookingApi = async (hotelId, roomId, payload) => {
  const url = `/bookings/hotels/${hotelId}/rooms/${roomId}/book`;
  const response = await api.post(url, payload);
  return response;
};