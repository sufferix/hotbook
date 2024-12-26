import api from './axiosConfig';

export const fetchPendingApplications = async () => {
  const response = await api.get('/applications/pending');
  return response.data;
};

export const processApplication = async (applicationId, accept) => {
  const response = await api.post(`/applications/process/${applicationId}`, null, { params: { accept } });
  return response.data.message;
};
