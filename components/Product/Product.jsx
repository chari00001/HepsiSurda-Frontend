import React from "react";
import {
  addComparison,
  getAllComparisons,
  updateComparison,
} from "../../network/lib/comparison";
import Link from "next/link";

const Product = ({ product }) => {
  const userId = localStorage.getItem("user_id");

  const originalPrice = parseFloat(product.price);
  const discountPercent = product.discountpercent;
  const discountedPrice = product.campaign
    ? (originalPrice - (originalPrice * discountPercent) / 100).toFixed(2)
    : originalPrice;

  const handleAddToActiveComparison = async () => {
    try {
      const allComparisonsResponse = await getAllComparisons();
      console.log("All Comparisons:", allComparisonsResponse.data);

      const activeComparison = allComparisonsResponse.data.find(
        (comparison) => comparison.isactive && comparison.user_id == userId
      );
      console.log("Active Comparison:", activeComparison);

      if (activeComparison?.productid_1 && activeComparison?.productid_2) {
        alert("You already have 2 products in your active comparison!");
        return;
      }

      if (activeComparison) {
        console.log(product.product_id, activeComparison.productid_1);
        const updateResponse = await updateComparison(
          activeComparison.comparison_id,
          {
            productid_1: activeComparison.productid_1,
            productid_2: product.product_id,
            user_id: userId,
            isactive: true,
          }
        );
        console.log("Update Response:", updateResponse);
      } else {
        const addResponse = await addComparison({
          productid_1: product.product_id,
          productid_2: null,
          user_id: userId,
          isactive: true,
        });
        console.log("Add Response:", addResponse);
      }
    } catch (error) {
      console.error("Error in handleAddToActiveComparison:", error);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-1 hover:scale-105 cursor-pointer relative bg-white">
      <Link
        href={{
          pathname: "/product/",
          query: { id: product.product_id },
        }}
      >
        {product.campaign && (
          <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-sm font-bold">
            %{discountPercent} indirim
          </div>
        )}

        <img
          src={product?.imageUrl || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-black">{product.name}</h2>
          <div className="flex items-baseline mt-1">
            {product.campaign && (
              <p className="text-lg text-red-600 font-semibold mr-2">
                {discountedPrice} TL
              </p>
            )}
            <p
              className={`text-gray-700 ${
                product.campaign ? "line-through" : ""
              }`}
            >
              {originalPrice} TL
            </p>
          </div>
        </div>
      </Link>
      <button
        onClick={handleAddToActiveComparison}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-xs w-full text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-auto mb-2"
      >
        Karşılaştır
      </button>
    </div>
  );
};

export default Product;
