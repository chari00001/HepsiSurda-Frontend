import React, { useState } from "react";
import { login } from "../../network/lib/auth";

function LoginPanel() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      login({ email, password })
        .then((res) => {
          // set token to local storage
          localStorage.setItem("token", res.data.token);
        })
        .catch((err) => {
          console.log(err);
          alert("Kayıt başarısız");
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-gray-100 rounded-md w-1/2 h-[40rem]"
    >
      <div className="w-[10rem]">
        <label className="text-black">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[10rem] text-black"
          />
        </label>
      </div>
      <div className="w-[10rem]">
        <label className="text-black">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[10rem] text-black"
          />
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-500 rounded-md p-2 px-6"
      >
        Login
      </button>
    </form>
  );
}

export default LoginPanel;
