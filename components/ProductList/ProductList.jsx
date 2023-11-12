import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Product from "../Product/Product";
import { getProducts } from "../../network/lib/product";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        console.log(res);
        setProducts(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product, i) => (
        <Link
          href={{
            pathname: "/product/",
            query: { id: product.product_id },
          }}
          key={i}
        >
          <div>
            <Product product={product} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
