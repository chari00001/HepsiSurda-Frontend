"use client";

import React, { useState } from "react";
import { login } from "../../network/lib/auth";
import Swal from "sweetalert2";
import Link from "next/link";

function LoginPanel() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      login({ email, password })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res.data.user.user_id);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.user.user_id);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Kayıt başarısız");
        });
    }
  };

  return (
    <div className="flex flex-row justify-center mt-80">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 md:rounded-2xl p-8 md:m-8 shadow-inner ring-1 ring-gray-300 transition duration-300 hover:ring-8 hover:ring-gray-300 w-[25rem]"
      >
        <div className="w-[10rem]">
          <label className="text-black">
            E-posta:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-slate-300 rounded-md p-2
            mr-4 text-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-all duration-300 ease-in-out transform hover:scale-y-105 hover:shadow-xl shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50 max-h-12"
            />
          </label>
        </div>
        <div className="w-[10rem]">
          <label className="text-black">
            Şifre:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-slate-300 rounded-md p-2
            mr-4 text-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-all duration-300 ease-in-out transform hover:scale-y-105 hover:shadow-xl shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50 max-h-12"
            />
          </label>
        </div>
        <div className="flex flex-row justify-start gap-4 items-center">
          <button
            type="submit"
            className="text-white bg-blue-500 rounded-md p-2 px-6 transition-colors duration-200 hover:bg-blue-700 my-4"
          >
            Giriş Yap
          </button>
          <Link href="/register">
            <div className="text-blue-500 hover:text-blue-700 transition-colors duration-200 border-2 border-blue-500 px-4 py-2 rounded-md">
              Kaydol
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPanel;
