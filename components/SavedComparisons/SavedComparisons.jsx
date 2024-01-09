import React, { useState, useEffect } from "react";
import { getComparisonsByUserId } from "../../network/lib/comparison";
import { getProductById } from "../../network/lib/product";
import Link from "next/link";

const SavedComparisons = () => {
  const [comparisons, setComparisons] = useState([]);
  const userId = localStorage.getItem("user_id"); // Get the user ID from localStorage

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const response = await getComparisonsByUserId(userId);
        const inactiveComparisons = response.data.filter(
          (comp) => !comp.isactive
        );
        for (const comparison of inactiveComparisons) {
          const product1Details = await getProductById(comparison.productid_1);
          const product2Details = await getProductById(comparison.productid_2);
          comparison.product1Details = product1Details;
          comparison.product2Details = product2Details;
        }
        console.log("Inactive Comparisons:", inactiveComparisons);
        setComparisons(inactiveComparisons);
      } catch (error) {
        console.error("Error fetching comparisons:", error);
      }
    };

    fetchComparisons();
  }, [userId]);

  if (comparisons.length === 0) {
    return <div>Geçmiş karşılaştırma bulunamadı.</div>;
  }

  return (
    <main className="w-[30rem] max-h-[48.33rem] w-full py-8 mt-8 overflow-auto rounded-lg shadow-lg">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-center text-black">
            <h2 className="text-2xl font-bold mb-6">Geçmiş Karşılaştırmalar</h2>
          </div>
          {comparisons.map((comparison) => (
            <div
              key={comparison.comparison_id}
              className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-black mb-4">
                Karşılaştırma No: {comparison.comparison_id}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductCard details={comparison.product1Details} />
                <ProductCard details={comparison.product2Details} />
              </div>
              {/* <div className="text-center mt-6">
                <Link href={`/compare/${comparison.comparison_id}`} passHref>
                  <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Karşıl
                  </div>
                </Link>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

const ProductCard = ({ details }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-black mb-2">{details.name}</h3>
      <img
        src={`http://localhost:8080/${details.image}`}
        alt={details.name}
        className="w-32 h-32 object-cover rounded mb-4"
      />
      {/* Other product details can go here */}
      <div className="text-center">
        <p className="text-gray-700 mb-2">Fiyat: {details.price} TL</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default SavedComparisons;
