"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getProducts, getProductById } from "../../network/lib/product";

function Detail() {
  const id = useSearchParams().get("id");

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        console.log(res);
        setProduct(res);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-gray-700 mb-4">Price: {product.price}</p>
      <img src={product.image} alt={product.name} className="w-full mb-4" />
    </div>
  );
}

export default Detail;
