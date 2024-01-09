"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getProductById } from "../../network/lib/product";
import { getComparisonsByUserId } from "../../network/lib/comparison";
import Navbar from "../../components/Navbar/Navbar";

const ComparisonPage = () => {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [comparisonReady, setComparisonReady] = useState(false);

  const [comparisonData, setComparisonData] = useState([]);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    try {
      const activeComparison = getComparisonsByUserId(userId)
        .then((response) => {
          const comparisons = response.data;
          const activeComparison = comparisons.find(
            (comparison) => comparison.isactive
          );
          setProduct1(activeComparison.productid_1);
          setProduct2(activeComparison.productid_2);

          setComparisonReady(true);
          return activeComparison;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (comparisonReady) {
      const fetchComparisonData = async () => {
        try {
          // Fetch product details
          const res1 = await getProductById(product1);
          const res2 = await getProductById(product2);

          // Assuming res1 and res2 contain the product details
          const prod1Features = res1.features;
          const prod2Features = res2.features;

          // Combine and group features by key
          const combinedFeatures = [...prod1Features, ...prod2Features];
          const featureMap = combinedFeatures.reduce((map, feature) => {
            if (!map[feature.key]) {
              map[feature.key] = { value1: "-", value2: "-" };
            }
            if (prod1Features.includes(feature)) {
              map[feature.key].value1 = feature.value;
            }
            if (prod2Features.includes(feature)) {
              map[feature.key].value2 = feature.value;
            }
            return map;
          }, {});

          // Convert the map into an array for rendering
          const data = Object.keys(featureMap).map((key) => ({
            feature: key,
            ...featureMap[key],
          }));

          setComparisonData(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchComparisonData();
    }
  }, [comparisonReady, product1, product2]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Ürün Karşılaştırması
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Özellik
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {product1?.name || "Ürün 1"}
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {product2?.name || "Ürün 2"}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.feature}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {typeof item.value1 === "object"
                        ? JSON.stringify(item.value1)
                        : item.value1}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {typeof item.value2 === "object"
                        ? JSON.stringify(item.value2)
                        : item.value2}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
