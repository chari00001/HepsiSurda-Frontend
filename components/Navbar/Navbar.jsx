import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserById } from "../../network/lib/user";
import { FaShoppingBasket } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);

      getUserById(localStorage.getItem("user_id"))
        .then((res) => {
          setIsAdmin(res.data.isadmin);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-orange-500 p-6 w-screen">
      <Link href="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            HepsiSurda
          </span>
        </div>
      </Link>

      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <Link href="/profile">
              <div className="block lg:inline-block hover:text-white mr-4">
                <VscAccount className="inline-block h-6 w-6 fill-current" />
              </div>
            </Link>
            <Link href="/cart">
              <div className="block lg:inline-block  hover:text-white mr-4">
                <FaShoppingBasket className="inline-block h-6 w-6 fill-current" />
              </div>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <div className="block lg:inline-block  hover:text-white mr-4">
              Login/Register
            </div>
          </Link>
        )}
        {isAdmin && (
          <Link href="/admin">
            <div className="block mt-4 lg:inline-block lg:mt-0  hover:text-white">
              Admin
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
