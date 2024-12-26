import api from './axiosConfig';

export const getCities = async () => {
  const response = await api.get('/hotels/cities');
  return response.data.cities;
};
