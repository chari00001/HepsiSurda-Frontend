"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
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
        console.log(res);
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
      <div className="container mx-auto">
        <header className="py-4">{/* Navigation bar or back button */}</header>
        <main className="py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-center text-black">
                <img
                  src="https://i.redd.it/utn1pj33lbe91.jpg"
                  alt="Profile Picture"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-black">
                  User Credentials
                </h2>
                <div className="mt-4">
                  <label className="text-md text-gray-600">Name</label>
                  <div className="flex items-center mt-1">
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                      placeholder="Name"
                      value={name}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-md text-gray-600">Surname</label>
                  <div className="flex items-center mt-1">
                    <input
                      onChange={(e) => {
                        setSurname(e.target.value);
                      }}
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                      placeholder="Surname"
                      value={surname}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-md text-gray-600">Email</label>
                  <div className="flex items-center mt-1">
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                      placeholder="Email"
                      value={email}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-md text-gray-600">Phone</label>
                  <div className="flex items-center mt-1">
                    <input
                      onChange={(e) => {
                        setTelno(e.target.value);
                      }}
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                      placeholder="Phone"
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
                  Update User
                </button>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-black">
                  Update Password
                </h2>
                <form>
                  <div className="mt-4">
                    <label className="text-md text-gray-600">
                      New Password
                    </label>
                    <div className="flex items-center mt-1">
                      <input
                        type="password"
                        className="border-2 border-slate-300 rounded-md p-2
            mr-4 text-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-all duration-300 ease-in-out transform hover:scale-y-105 hover:shadow-xl shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50 max-h-12"
                        placeholder="New Password"
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
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        <footer className="py-4">{/* Additional content or links */}</footer>
      </div>
    </div>
  );
};

export default ProfilePage;
