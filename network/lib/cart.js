import api from "../api";

async function addToCart(data) {
  try {
    const response = await api.post("/carts", data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add item to cart");
  }
}

async function getAllCartItems() {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    throw new Error("Failed to get all cart items");
  }
}

async function getCartItemById(itemId) {
  try {
    const response = await api.get(`/cart/${itemId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get cart item by ID");
  }
}

async function getAllCartItemsByUserId(userId) {
  try {
    const response = await api.get(`/carts/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get all cart items by user ID");
  }
}

module.exports = {
  addToCart,
  getAllCartItems,
  getCartItemById,
  getAllCartItemsByUserId,
};
