"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getAllCartItemsByUserId } from "../../network/lib/cart";
import { makeOrder } from "../../network/lib/order";
import Swal from "sweetalert2";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getAllCartItemsByUserId(60);
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

  const removeItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const completeOrder = () => {
    makeOrder({
      user_id: 60,
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-4 mt-8 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <ul className="divide-y divide-gray-200">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between items-center p-2">
                <div className="flex flex-row justify-between w-full px-4">
                  <p className="text-black">Amount: {item.amount}</p>
                  <p className="text-black">Quantity: {item.quantity}</p>
                  <p className="text-black">Product ID: {item.product_id}</p>
                </div>
                <div>
                  <button
                    className="bg-red-500 text-white rounded px-2 py-1"
                    onClick={() => removeItem(item.id)}
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
