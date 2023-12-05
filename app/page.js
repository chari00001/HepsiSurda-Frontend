"use client";

import React from "react";
import { useState, useEffect } from "react";
import ProductList from "../components/ProductList/ProductList";
import Navbar from "../components/Navbar/Navbar";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-16">
      <Navbar />
      <ProductList />
    </div>
  );
};

export default page;
