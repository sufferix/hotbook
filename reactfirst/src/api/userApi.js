import api from './axiosConfig';

export const fetchUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data.user;
};

export const updateUserProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data.user;
};

export const fetchAllUsers = async () => {
  const response = await api.get('/users');
  return response.data.userList;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data.message;
};

export const blockUser = async (userId, enable) => {
  const response = await api.put(`/users/${userId}/block`, null, { params: { enable } });
  return response.data.message;
};

