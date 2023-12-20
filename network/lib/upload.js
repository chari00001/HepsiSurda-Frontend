import api from "../api";

export const fetchImages = async () => {
  try {
    const response = await api.get(`/uploads/images`);
    return response.data;   
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
