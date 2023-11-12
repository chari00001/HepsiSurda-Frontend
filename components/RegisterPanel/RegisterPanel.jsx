import React, { useState } from "react";
import { register } from "../../network/lib/auth";

function RegisterPanel() {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [telno, setTelno] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (surname && email && password && telno && name) {
      register({ surname, email, password, telno, name })
        .then((res) => {
          console.log(res);
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
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[10rem] text-black"
          />
        </label>
      </div>
      <div className="w-[10rem]">
        <label className="text-black">
          Surname:
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-[10rem] text-black"
          />
        </label>
      </div>
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
      <div className="w-[10rem]">
        <label className="text-black">
          Telefon numarası:
          <input
            type="number"
            value={telno}
            onChange={(e) => setTelno(e.target.value)}
            className="w-[10rem] text-black"
          />
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-500 rounded-md p-2 px-6"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterPanel;
