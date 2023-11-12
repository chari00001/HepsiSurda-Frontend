"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../network/lib/user";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../network/lib/product";
import CreateProduct from "../components/CreateProduct/CreateProduct";
import ProductList from "../components/ProductList/ProductList";
import RegisterPanel from "../components/RegisterPanel/RegisterPanel";
import LoginPanel from "../components/LoginPanel/LoginPanel";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-16">
      <CreateProduct />
      <ProductList />
      <RegisterPanel />
      <LoginPanel />
    </div>
  );
};

export default page;
