"use client";

import React, { useEffect, useState } from "react";
import { createContact, getAllContacts } from "../../network/lib/contact";
import { getUserById } from "../../network/lib/user";
import Navbar from "../../components/Navbar/Navbar";
import Swal from "sweetalert2";

const ContactPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [userNames, setUserNames] = useState({});

  const [isAdmin, setIsAdmin] = useState(false);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    getUserById(userId)
      .then((res) => {
        setIsAdmin(res.data.isadmin);
        if (res.data.isadmin) {
          fetchContacts();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await createContact({ user_id: userId, title, text });
      setTitle("");
      setText("");
      Swal.fire({
        title: "Success!",
        text: "Your contact request has been sent.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Failed to create contact", error);
      Swal.fire({
        title: "Error!",
        text: "Your contact request has not been sent.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    setIsSubmitting(false);
  };

  const fetchContacts = async () => {
    try {
      const response = await getAllContacts();
      setContacts(response.data);

      // Fetch usernames for each contact
      const userIds = new Set(response.data.map((contact) => contact.user_id));
      userIds.forEach(async (id) => {
        const user = await getUserById(id);
        setUserNames((prevUserNames) => ({
          ...prevUserNames,
          [id]: user.data.name,
        }));
      });
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  return (
    <div>
      <Navbar />
      {!isAdmin && (
        <div className="contact-page mx-auto max-w-4xl p-8">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Başlık
              </label>
              <input
                type="text"
                id="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Mesajınız
              </label>
              <textarea
                id="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                rows="4"
              />
            </div>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        </div>
      )}
      {isAdmin && (
        <div className="max-w-3xl mx-auto my-8 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Tüm mesajlar
          </h2>
          <div className="shadow overflow-hidden rounded border-b border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="px-4 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kullanıcı
                  </th>
                  <th className="px-4 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Başlık
                  </th>
                  <th className="px-4 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mesaj
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 border-b border-gray-200 text-black">
                      {userNames[contact.user_id] || "Loading..."}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-black">
                      {contact.title}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-black">
                      {contact.text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
