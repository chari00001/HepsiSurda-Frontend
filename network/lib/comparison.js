import api from "../api";

const addComparison = async (comparisonData) => {
  try {
    const response = await api.post("/comparisons", comparisonData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllComparisons = async () => {
  try {
    const response = await api.get("/comparisons");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getComparisonById = async (id) => {
  try {
    const response = await api.get(`/comparisons/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getComparisonsByUserId = async (userId) => {
  try {
    const response = await api.get(`/comparisons/user/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateComparison = async (id, updatedData) => {
  try {
    console.log(updatedData);
    const response = await api.patch(`/comparisons/${id}`, { updatedData });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteComparisonById = async (id) => {
  try {
    const response = await api.delete(`/comparisons/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addComparison,
  getAllComparisons,
  getComparisonById,
  getComparisonsByUserId,
  updateComparison,
  deleteComparisonById,
};
