import React, { useState, useEffect } from "react";
import {
  getAllComparisons,
  deleteComparisonById,
  updateComparison,
} from "../../network/lib/comparison"; // Update the path accordingly
import { getProductById } from "../../network/lib/product";
import Link from "next/link";

const Comparisons = () => {
  const [activeComparison, setActiveComparison] = useState(null);
  const [productNames, setProductNames] = useState({
    product1: "",
    product2: "",
  });

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const response = await getAllComparisons();
        const userActiveComparison = response.data.find(
          (comparison) => comparison.isactive && comparison.user_id == userId
        );

        if (userActiveComparison) {
          const product1 = await getProductById(
            userActiveComparison.productid_1
          );
          const product2 = await getProductById(
            userActiveComparison.productid_2
          );
          setProductNames({ product1: product1.name, product2: product2.name });
          setActiveComparison(userActiveComparison);
        }
      } catch (error) {
        console.log("Error fetching comparisons:", error);
      }
    };

    fetchComparisons();
  }, [userId]);

  const handleDelete = async () => {
    try {
      if (activeComparison) {
        await deleteComparisonById(activeComparison.comparison_id);
        setActiveComparison(null);
      }
    } catch (error) {
      console.log("Error deleting comparison:", error);
    }
  };

  const handleSave = () => {
    try {
      if (activeComparison) {
        updateComparison(activeComparison.comparison_id, {
          ...activeComparison,
          isactive: false,
        });
        setActiveComparison(null);
      }
    } catch (error) {
      console.log("Error updating comparison:", error);
    }
  };

  if (!activeComparison) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg p-4">
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg border-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Aktif Karşılaştırma
          </h3>
          <p className="text-black">Ürün 1: {productNames.product1}</p>
          <p className="text-black">Ürün 2: {productNames.product2}</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Kaydet
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
          >
            Sil
          </button>
          {/* Karşılaştır Button */}
          <Link href="/compare">
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Karşılaştır
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Comparisons;
