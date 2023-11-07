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

const page = () => {
  useEffect(() => {
    getUsers().then((users) => console.log(users));
  }, []);

  useEffect(() => {
    getProducts().then((products) => console.log(products));
  }, []);

  return (
    <div>
      <CreateProduct />
    </div>
  );
};

export default page;
