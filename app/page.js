"use client";

import React from "react";
import { useState, useEffect } from "react";
import ProductList from "../components/ProductList/ProductList";
import Navbar from "../components/Navbar/Navbar";
import { fetchImages } from "../network/lib/upload";

const page = () => {
  const [images, setImages] = useState([]);

  

  return (
    <div className="flex flex-col items-center justify-center space-y-16">
      <Navbar />
      <ProductList />
    </div>
  );
};

export default page;
