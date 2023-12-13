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
    const response = await api.get("/carts");
    return response.data;
  } catch (error) {
    throw new Error("Failed to get all cart items");
  }
}

async function getCartItemById(itemId) {
  try {
    const response = await api.get(`/carts/${itemId}`);
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

async function deleteCartItemById(itemId) {
  try {
    const response = await api.delete(`/carts/${itemId}`);
    return response;
  } catch (error) {
    throw new Error("Failed to delete cart item by ID");
  }
}

async function deleteAllCartItemsByUserId(userId) {
  try {
    const response = await api.delete(`/carts/all/${userId}`);
    return response;
  } catch (error) {
    throw new Error("Failed to delete all cart items by user ID");
  }
}

async function updateCartItemQuantity(itemId, quantity) {
  try {
    const response = await api.patch(`/carts/quantity/${itemId}`, { quantity });
    return response;
  } catch (error) {
    throw new Error("Failed to update cart item quantity");
  }
}

module.exports = {
  addToCart,
  getAllCartItems,
  getCartItemById,
  getAllCartItemsByUserId,
  deleteCartItemById,
  deleteAllCartItemsByUserId,
  updateCartItemQuantity,
};
