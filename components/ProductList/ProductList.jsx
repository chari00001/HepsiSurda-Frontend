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
    <div className="grid grid-cols-3 gap-6">
      {products?.map((product, i) => (
        <Link
          href={{
            pathname: "/product/",
            query: { id: product.product_id },
          }}
          key={i}
        >
          <div>
            {" "}
            {/* Make sure to use <a> tag to enable the navigation */}
            <Product product={product} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
