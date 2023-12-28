import api from "../api";

const makeOrder = async (order) => {
  try {
    const response = await api.post("/orders", order);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async () => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getOrdersByUserId = async (userId) => {
  try {
    const response = await api.get(`/orders/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async (userId) => {
  try {
    const response = await api.get(`/orders/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  makeOrder,
  getOrders,
  getOrder,
  getOrdersByUserId,
};
