import api from "../api";

const createCoupon = async (couponData) => {
  try {
    const response = await api.post("/coupons", couponData);
    return response;
  } catch (error) {
    console.log("Error creating coupon:", error);
  }
};

const getAllCoupons = async () => {
  try {
    const response = await api.get("/coupons");
    return response;
  } catch (error) {
    console.log("Error fetching coupons:", error);
  }
};

const getCouponByCode = async (code) => {
  try {
    const response = await api.get(`/coupons/${code}`);
    return response;
  } catch (error) {
    console.log("Error getting coupon:", error);
  }
};

const updateCoupon = async (code, updatedData) => {
  try {
    const response = await api.patch(`/coupons/${code}`, updatedData);
    return response;
  } catch (error) {
    console.log("Error updating coupon:", error);
  }
};

const deleteCoupon = async (code) => {
  try {
    const response = await api.delete(`/coupons/${code}`);
    return response;
  } catch (error) {
    console.log("Error deleting coupon:", error);
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
};
