"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Orders from "../../components/Orders/Orders";
import SavedComparisons from "../../components/SavedComparisons/SavedComparisons";
import { getUserById, updateUser } from "../../network/lib/user";
import { resetPassword } from "../../network/lib/auth";

const ProfilePage = () => {
  const userId = localStorage.getItem("user_id");

  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telno, setTelno] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUserById(userId)
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
        setSurname(res.data.surname);
        setTelno(res.data.telno);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const resetPasswordHandler = (event) => {
    event.preventDefault();
    resetPassword({ id: userId, newPassword })
      .then((res) => {
        console.log(res);
        alert("Password reset successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Password reset failed");
      });
  };

  const updateUserHandler = (event) => {
    event.preventDefault();
    updateUser(userId, {
      name,
      surname,
      email,
      telno,
    })
      .then((res) => {
        alert("User updated successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("User update failed");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-center mx-auto">
        <div className="w-[30rem] ml-auto">
          <main className="py-8">
            <div className="max-w-md ml-auto mr-4 bg-white rounded-lg shadow-lg">
              <div className="p-4">
                <div className="flex items-center justify-center text-black">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"
                    alt="Profile Picture"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-black">
                    Kullanıcı Bilgileri
                  </h2>
                  <div className="mt-4">
                    <label className="text-md text-gray-600">İsim</label>
                    <div className="flex items-center mt-1">
                      <input
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        placeholder="İsim"
                        value={name}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-md text-gray-600">Soyisim</label>
                    <div className="flex items-center mt-1">
                      <input
                        onChange={(e) => {
                          setSurname(e.target.value);
                        }}
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        placeholder="Soyisim"
                        value={surname}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-md text-gray-600">E-posta</label>
                    <div className="flex items-center mt-1">
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        placeholder="E-posta"
                        value={email}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-md text-gray-600">
                      Telefon Numarası
                    </label>
                    <div className="flex items-center mt-1">
                      <input
                        onChange={(e) => {
                          setTelno(e.target.value);
                        }}
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                        placeholder="Telefon Numarası"
                        value={telno}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 focus:bg-green-400 focus:outline-none"
                    onClick={updateUserHandler}
                  >
                    Bilgileri Güncelle
                  </button>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-black">
                    Şifreyi Değiştir
                  </h2>
                  <form>
                    <div className="mt-4">
                      <label className="text-md text-gray-600">
                        Yeni Şifre
                      </label>
                      <div className="flex items-center mt-1">
                        <input
                          type="password"
                          className="border-2 border-slate-300 rounded-md p-2
            mr-4 text-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-all duration-300 ease-in-out transform hover:scale-y-105 hover:shadow-xl shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50 max-h-12"
                          placeholder="Yeni Şifre"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 focus:bg-green-400 focus:outline-none"
                        onClick={resetPasswordHandler}
                      >
                        Şifreyi Değiştir
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
          <footer className="py-4">{/* Additional content or links */}</footer>
        </div>
        <div className="mr-8">
          <Orders />
        </div>
        <div className="mr-auto">
          <SavedComparisons />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
