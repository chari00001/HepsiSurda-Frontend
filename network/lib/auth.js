import api from "../api";

const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const register = async (credentials) => {
  try {
    const response = await api.post("/auth/register", credentials);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (credentials) => {
  try {
    const response = await api.post("/auth/resetPassword", credentials);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  register,
  resetPassword,
};
