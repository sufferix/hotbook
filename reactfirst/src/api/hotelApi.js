import axios from "axios";

export const fetchHotelDetail = async (hotelId) => {
  const response = await axios.get(`/hotels/${hotelId}`);
  return response.data.hotelDetail;
};

export const updateHotel = async (hotelId, updatedData) => {
  const response = await axios.put(`/hotels/${hotelId}`, updatedData);
  return response.data;
};

export const updateRoom = async (hotelId, roomId, updatedData) => {
  const response = await axios.put(`/hotels/${hotelId}/rooms/${roomId}`, updatedData);
  return response.data;
};

export const deleteHotelPhoto = async (hotelId, photoId) => {
  const response = await axios.delete(`/hotels/${hotelId}/photos/${photoId}`);
  return response.data;
};

export const addHotelPhoto = async (hotelId, photoData) => {
  const response = await axios.post(`/hotels/${hotelId}/photos`, photoData);
  return response.data;
};

export const deleteRoomPhoto = async (hotelId, roomId, photoId) => {
  const response = await axios.delete(`/hotels/${hotelId}/rooms/${roomId}/photos/${photoId}`);
  return response.data;
};

export const addRoomPhoto = async (hotelId, roomId, photoData) => {
  const response = await axios.post(`/hotels/${hotelId}/rooms/${roomId}/photos`, photoData);
  return response.data;
};
export const addHotel = async (hotelData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/hotels', hotelData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addRoom = async (hotelId, roomData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`/hotels/${hotelId}/rooms`, roomData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const uploadHotelPhoto = async (hotelId, formData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`/hotels/${hotelId}/photos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const uploadRoomPhoto = async (hotelId, roomId, formData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`/hotels/${hotelId}/rooms/${roomId}/photos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};