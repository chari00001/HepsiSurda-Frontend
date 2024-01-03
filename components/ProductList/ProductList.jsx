import React, { useState, useEffect } from "react";
import Link from "next/link";
import Product from "../Product/Product";
import { getProducts } from "../../network/lib/product";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const productsWithImages = res.map((product) => {
          return {
            ...product,
            imageUrl: product.image
              ? `http://localhost:8080/${product.image}`
              : null,
          };
        });

        console.log(productsWithImages);
        setProducts(productsWithImages);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:w-2/3 w-10/12">
      {products?.map((product, i) => (
        <div key={i}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
