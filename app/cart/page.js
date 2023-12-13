"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  getAllCartItemsByUserId,
  deleteCartItemById,
  deleteAllCartItemsByUserId,
  updateCartItemQuantity,
} from "../../network/lib/cart";
import { makeOrder } from "../../network/lib/order";
import Swal from "sweetalert2";

const CartPage = () => {
  const userId = localStorage.getItem("user_id");

  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getAllCartItemsByUserId(userId);
      setItems(cartItems);
      console.log(cartItems);
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    if (items) {
      items.map((item) => {
        setQuantity((prev) => prev + item.quantity);
        setTotal((prev) => prev + item.quantity * item.amount);
      });
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-4 mt-8 bg-white rounded shadow">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4 text-black">Your Cart</h1>
            <div>
              <button onClick={handleEmptyCart} className="text-red-500">
                Empty Cart
              </button>
              <p className="text-black">Total: {quantity * total}</p>
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
                  <p className="text-black">Product ID: {item.product_id}</p>
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
            onClick={completeOrder}
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
