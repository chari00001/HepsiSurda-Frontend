"use client";

import React, { useState } from "react";
import { register } from "../../network/lib/auth";
import Swal from "sweetalert2";

function RegisterPanel() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telno, setTelno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, surname, telno, email, password);
    if (name && surname && telno && email && password) {
      register({ name, surname, telno, email, password })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Kayıt başarılı",
            text: "Giriş yapabilirsiniz",
            confirmButtonText: "Tamam",
          });
          window.location.href = "/login";
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
            İsim:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-slate-300 rounded-md p-2
            mr-4 text-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-all duration-300 ease-in-out transform hover:scale-y-105 hover:shadow-xl shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50 max-h-12"
            />
          </label>
        </div>
        <div className="w-[10rem]">
          <label className="text-black">
            Soyisim:
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="border-2 border-slate-300 rounded-md p-2
            mr-4 text-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-all duration-300 ease-in-out transform hover:scale-y-105 hover:shadow-xl shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50 max-h-12"
            />
          </label>
        </div>
        <div className="w-[10rem]">
          <label className="text-black">
            Telefon Numarası:
            <input
              type="text"
              value={telno}
              onChange={(e) => setTelno(e.target.value)}
              className="border-2 border-slate-300 rounded-md p-2
            mr-4 text-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-all duration-300 ease-in-out transform hover:scale-y-105 hover:shadow-xl shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50 max-h-12"
            />
          </label>
        </div>
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

        <button
          type="submit"
          className="text-white bg-blue-500 rounded-md p-2 px-6 transition-colors duration-200 hover:bg-blue-700 my-4"
        >
          Kaydol
        </button>
      </form>
    </div>
  );
}

export default RegisterPanel;
