import api from './axiosConfig';

export const submitApplication = async (applicationData) => {
  const response = await api.post('/applications/submit', applicationData);
  return response.data;
};