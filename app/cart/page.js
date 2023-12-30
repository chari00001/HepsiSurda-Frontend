"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  getAllCartItemsByUserId,
  deleteCartItemById,
  deleteAllCartItemsByUserId,
  updateCartItemQuantity,
} from "../../network/lib/cart";
import { getProductById } from "../../network/lib/product";
import { makeOrder } from "../../network/lib/order";
import { getAllCoupons, getCouponByCode } from "../../network/lib/coupon";
import Swal from "sweetalert2";

const CartPage = () => {
  const userId = localStorage.getItem("user_id");

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItemsRes = await getAllCartItemsByUserId(userId);
        const cartItemsWithDetails = await Promise.all(
          cartItemsRes.map(async (item) => {
            try {
              const productDetails = await getProductById(item.product_id);
              console.log(productDetails);
              return {
                ...item,
                name: productDetails.name,
                price: productDetails.price,
                image: productDetails.image,
                description: productDetails.description,
              };
            } catch (err) {
              console.error("Error fetching product details", err);
              return item;
            }
          })
        );
        console.log(cartItemsWithDetails);
        setItems(cartItemsWithDetails);
      } catch (err) {
        console.error("Error fetching cart items", err);
      }
    };

    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    if (items) {
      let total = 0;
      items.map((item) => {
        total += item.amount * item.quantity;
      });
      console.log(total);
      setTotal(total);
    }
  }, [items]);

  const completeOrder = () => {
    makeOrder({
      user_id: userId,
      products: items,
      total_price: quantity * total,
      delivery_address: "123 Main St",
      payment_method: "Credit Card",
      order_state: "Pending",
    })
      .then((res) => {
        if (res.status === "OK") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Order completed",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (itemId) => {
    deleteCartItemById(itemId)
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Item deleted",
          });
          setTimeout(() => {
            window.location.href = "/cart";
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEmptyCart = () => {
    deleteAllCartItemsByUserId(userId)
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Cart emptied",
          });
          setTimeout(() => {
            window.location.href = "/cart";
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQuantity = (itemId, quantity) => {
    updateCartItemQuantity(itemId, quantity)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Item quantity updated",
          });
          setTimeout(() => {
            window.location.href = "/cart";
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModal = () => {
    setOrderModalOpen(true);
  };

  const closeModal = () => {
    setOrderModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-6xl p-4 mt-8 bg-white rounded shadow">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4 text-black">Your Cart</h1>
            <div>
              <button onClick={handleEmptyCart} className="text-red-500">
                Empty Cart
              </button>
              <p className="text-black">Total: {total}</p>
            </div>
          </div>
          <ul className="divide-y divide-gray-200">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between items-center p-2">
                <div className="flex flex-row justify-between w-full px-4">
                  <p className="text-black">Amount: {item.amount}</p>
                  <div className="text-black">
                    <span>Quantity:</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.quantity === 1) {
                          deleteItem(item.cart_id);
                        }
                        updateQuantity(item.cart_id, item.quantity - 1);
                      }}
                      className="mr-2 ml-2 bg-red-500 rounded px-2 py-1 text-black hover:bg-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        updateQuantity(item.cart_id, item.quantity + 1);
                      }}
                      className="mr-2 ml-2 bg-green-500 rounded px-2 py-1 text-black hover:bg-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {item.features &&
                      Object.entries(item.features).map(
                        ([key, value], index) => (
                          <p key={index} className="text-gray-600">
                            {key}: {value}
                          </p>
                        )
                      )}
                  </div>
                  <p className="text-black w-[15rem]">
                    Product Name: {item.name}
                  </p>
                </div>
                <div>
                  <button
                    className="bg-red-500 text-white rounded px-2 py-1"
                    onClick={() => deleteItem(item.cart_id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="bg-green-500 text-white rounded px-2 py-1 mt-4"
            onClick={openModal}
          >
            Complete Order
          </button>
          <OrderCompletionModal
            isOpen={orderModalOpen}
            onClose={closeModal}
            cartItems={items}
            userId={userId}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

const OrderCompletionModal = ({
  isOpen,
  onClose,
  cartItems,
  userId,
  total,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponUsed, setCouponUsed] = useState(false);

  useEffect(() => {
    if (total) {
      setTotalPrice(total);
    }
  }, [total]);

  const renderOrderSummary = () => {
    return cartItems.map((item, index) => (
      <div key={index} className="flex justify-between mb-2">
        <span className="text-black">Product ID: {item.product_id}</span>
        <span className="text-black">Quantity: {item.quantity}</span>
        <span className="text-black">Amount: ${item.amount}</span>
      </div>
    ));
  };

  const applyCoupon = () => {
    getCouponByCode(couponCode)
      .then((res) => {
        if (res.status === 200) {
          const isExpired = new Date(res.data.enddate) < new Date();
          if (isExpired) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Kuponun süresi dolmuş",
            });
          } else {
            console.log(res.data);
            if (res.data.coupontype === "price") {
              setTotalPrice(totalPrice - parseInt(res.data.pricediscount));
            } else if (res.data.coupontype === "percent") {
              setTotalPrice(
                totalPrice -
                  (totalPrice * parseInt(res.data.percentdiscount)) / 100
              );
            }
            setCouponUsed(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeOrder = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        makeOrder({
          user_id: userId,
          products: cartItems,
          total_price: totalPrice,
          delivery_method: deliveryMethod,
          delivery_address: deliveryAddress,
          payment_method: paymentMethod,
          order_state: "Pending",
        })
          .then((res) => {
            if (res.status === "OK") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Order completed",
              });
              setTimeout(() => {
                window.location.href = "/";
              }, 1500);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-1/3 space-y-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
        <div>{renderOrderSummary()}</div>

        <div className="flex flex-col space-y-3">
          <div>
            <label className="block text-gray-700">Delivery Address</label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Delivery Method</label>
            <select
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            >
              <option value="">Select Delivery Method</option>
              <option value="Standard">Standard Shipping</option>
              <option value="Express">Express Shipping</option>
              <option value="Overnight">Overnight Shipping</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Coupon Code</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                // Assuming you have a state variable for the coupon code
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md text-gray-700"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (couponUsed) {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "You already used a coupon",
                    });
                  } else {
                    applyCoupon();
                  }
                }} // Assuming you have an applyCoupon function
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-semibold text-gray-800">
              Total Price:
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${totalPrice} {/* Replace with your total price state variable */}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
            <button
              onClick={completeOrder}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
