"use client";

import React from "react";
import LoginPanel from "../../components/LoginPanel/LoginPanel";
import Navbar from "../../components/Navbar/Navbar";

const page = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <LoginPanel />
    </div>
  );
};

export default page;
