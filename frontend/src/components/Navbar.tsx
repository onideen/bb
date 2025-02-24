import React from "react";

import NavElement from "./NavElement";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  /*
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
*/

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-20" alt="Bærum Birøkterlag logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Bærum Birøkterlag
          </span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Åpne menyen</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="justify-between hidden w-full lg:flex lg:w-auto"
          id="navbar-sticky"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <NavElement title="Om Oss" to="/om-oss" />
            <NavElement title="Kurs" to="/kurs" />
            <NavElement title="Svermfangere" to="/svermfangere" />
            <NavElement title="Kontakt" to="/kontakt" />
            <NavElement title="Bli Medlem" to="/bli-medlem" />
          </ul>
        </div>
      </div>
    </nav>
  );
}
