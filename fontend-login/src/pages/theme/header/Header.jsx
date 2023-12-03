import React, { useEffect, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    console.log("toggleMobileMenu: " + isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <nav className="bg-yellow-200 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src={require("../../../assets/logo/logo.png")}
              alt="react logo"
              className="h-20"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              KLTN
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <div className="xl:block lg:block md:hidden sm:hidden xs:hidden custom-btn flex">
              <div className="ml-2 flex">
                <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                      3
                    </span>
                  </div>
                  <span className="text-sm font-medium">Cart</span>
                </div>

                <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border-none py-2 px-4 hover:bg-gray-100">
                  <span className="text-sm font-medium">Log in</span>
                </div>
              </div>
            </div>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg xl:hidden lg:hidden md:block sm:block xs:block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <FaBars />
            </button>
          </div>
          <div
            className={`hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${
              isMobileMenuOpen ? "md:block sm:block xs:block mobile-menu" : ""
            }`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li className="lg:hidden xl:hidden">
                <div className="flex cursor-pointer items-center gap-x-1 rounded-md border-none py-2 px-4 hover:bg-gray-100">
                  <span className="text-sm font-medium">Log in</span>
                </div>
                <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                      3
                    </span>
                  </div>
                  <span className="text-sm font-medium">Cart</span>
                </div>
              </li>
              <li>
                <div
                  className={`${
                    window.innerWidth >= 1024
                      ? "block flex-1 justify-center items-center"
                      : "hidden"
                  }`}
                >
                  <input
                    type="text"
                    className="custom-input h-1/2 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter your search item"
                  />
                  <button className="bg-slate-600 h-1/2 py-2 px-3 rounded-md">
                    <FaSearch />
                  </button>
                </div>
                <div
                  className={`${
                    window.innerWidth < 1024
                      ? "block flex-1 items-center"
                      : "hidden"
                  }`}
                >
                  <a
                    href="#"
                    className="flex items-center block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    <span>Search</span>
                    <FaSearch className="mx-3" />
                  </a>
                </div>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Company
                </a>
              </li>{" "} */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
