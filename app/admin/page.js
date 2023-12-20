"use client";

import React from "react";
import CreateProduct from "../../components/CreateProduct/CreateProduct";
import Navbar from "../../components/Navbar/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <CreateProduct />
    </div>
  );
};

export default page;
