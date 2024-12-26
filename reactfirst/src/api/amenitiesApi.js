import api from "./axiosConfig";

export const getAmenities = async () => {
  const response = await api.get("/amenities");
  return response.data;
};
