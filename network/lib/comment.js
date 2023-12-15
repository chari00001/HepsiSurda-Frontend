import api from "../api";

const makeComment = async (comment) => {
  try {
    const response = await api.post("/comments", comment);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getComments = async () => {
  try {
    const response = await api.get("/comments");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getProductComments = async (productId) => {
  try {
    const response = await api.get(`/comments/product/${productId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getComment = async (userId) => {
  try {
    const response = await api.get(`/comments/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const rateComment = async (id, rating) => {
  try {
    const response = await api.patch(`/comments/${id}`, { rating });
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  makeComment,
  getComments,
  getComment,
  getProductComments,
  rateComment,
};
