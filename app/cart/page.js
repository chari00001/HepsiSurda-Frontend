"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const CartPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 20 },
    { id: 3, name: "Item 3", price: 30 },
    // Add more items as needed
  ]);

  const removeItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-4 mt-8 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">{item.price}</p>
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
        </div>
      </div>
    </div>
  );
};

export default CartPage;
