import React from "react";

const Product = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer">
      <img
        src={product?.imageUrl || "https://via.placeholder.com/150"}
        alt={name}
        className="w-full h-64 object-cover"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-700">{product.price}</p>
    </div>
  );
};

export default Product;
