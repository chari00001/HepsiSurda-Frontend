import React, { useState, useEffect } from "react";
import Link from "next/link";
import Product from "../Product/Product";
import { getProducts } from "../../network/lib/product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name"); // default sort by name
  const [filterType, setFilterType] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortKey(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredProducts = products
    .filter((product) => {
      // Apply search filter
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((product) => {
      return filterType
        ? product.campaign === (filterType === "campaign")
        : true;
    })

    .sort((a, b) => {
      // Sort by name
      if (sortKey === "name") {
        return a.name.localeCompare(b.name);
      }

      // Sort by price
      if (sortKey === "price") {
        return parseFloat(a.price) - parseFloat(b.price);
      }
    });

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
    <div className="container mx-auto px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Ara..."
              className="w-full p-2 border rounded-md text-black"
            />
            <div className="flex gap-4">
              <select
                value={sortKey}
                onChange={handleSortChange}
                className="p-2 border rounded-md text-black"
              >
                <option value="name">İsim</option>
                <option value="price">Fiyat</option>
                {/* Add more sorting options as needed */}
              </select>
              <select
                value={filterType}
                onChange={handleFilterChange}
                className="p-2 border rounded-md text-black"
              >
                <option value="">Hepsini göster</option>
                <option value="campaign">Kampanya</option>
                {/* Add more filter options as needed */}
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((product, i) => (
            <div key={i}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
