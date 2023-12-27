import api from "../api";

const createRating = async (rating) => {
  try {
    const response = await api.post("/ratings", rating);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getProductRatings = async (id) => {
  try {
    const response = await api.get(`/ratings/product/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserRating = async (id) => {
  try {
    const response = await api.get(`/ratings/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateRating = async (id, rating) => {
  try {
    const response = await api.put(`/ratings/${id}`, rating);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteRating = async (id) => {
  try {
    const response = await api.delete(`/ratings/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRating,
  getProductRatings,
  getUserRating,
  updateRating,
  deleteRating,
};
