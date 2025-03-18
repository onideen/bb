import NavElement from "./NavElement";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

interface Page {
  id: number;
  title: string;
  path: string;
}

interface Navbar {
  id: number;
  title: string;
  order: number;
  pages: Page[];

}


export default function Navbar() {

  const [menu, setMenu] = useState<Navbar | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/navbars`, {
        params: {
          filter: {
            name: { $eq: "Hovedmeny" }
          },
          populate: {
            pages: { fields: ["title", "path"]}
          }
        },
      })
      .then((res) => setMenu(res.data.data[0]))
      .catch((err) => console.error("Error fetching data:", err));
    }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
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
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
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
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menu?.pages.map((item) => {
              return <NavElement key={item.id} title={item.title} to={item.path} />
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
