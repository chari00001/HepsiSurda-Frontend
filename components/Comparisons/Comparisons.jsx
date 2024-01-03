import React, { useState, useEffect } from "react";
import {
  getAllComparisons,
  deleteComparisonById,
} from "../../network/lib/comparison"; // Update the path accordingly

const Comparisons = () => {
  const [activeComparison, setActiveComparison] = useState(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const response = await getAllComparisons();
        console.log("All Comparisons:", response.data);
        console.log("User ID:", userId);
        const userActiveComparison = response.data.find(
          (comparison) => comparison.isactive && comparison.user_id == userId
        );
        console.log("User Active Comparison:", userActiveComparison);
        setActiveComparison(userActiveComparison);
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
    // Implement save logic
  };

  if (!activeComparison) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg p-4 flex justify-between items-center">
      <div>
        <p className="text-black">
          Product 1 ID: {activeComparison.productid_1}
        </p>
        <p className="text-black">
          Product 2 ID: {activeComparison.productid_2}
        </p>
      </div>
      <div>
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Comparisons;
