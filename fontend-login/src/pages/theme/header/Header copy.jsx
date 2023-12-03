import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="customer-header">
      <div class="bg-yellow-200">
        <div class="border py-3 px-6">
          <div class="flex justify-between items-center">
            <div
              class={`flex items-center cursor-pointer ${
                isMobileMenuOpen ? "hidden" : "block"
              }`}
            >
              <FaBars />
              <img
                src={require("../../../assets/logo/logo.png")}
                alt="react logo"
                className="h-20"
              />
              <span class="ml-2 font-semibold text-[#252C32]">KLTN</span>
            </div>

            <div class="ml-6 flex flex-1 justify-center items-center">
              <input
                type="text"
                class="w-2/3 h-1/2 rounded-md px-3 py-2 text-sm"
                placeholder="Enter your search item"
              />
              <button className="bg-slate-600 h-1/2 py-2 px-3 rounded-md">
                <FaSearch />
              </button>
            </div>

            <div class="ml-2 flex">
              <div class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
                <div class="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                    3
                  </span>
                </div>
                <span class="text-sm font-medium">Cart</span>
              </div>

              <div class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border-none py-2 px-4 hover:bg-gray-100">
                <span class="text-sm font-medium">Sign in</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="flex gap-x-8">
              <span class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
                item 1
              </span>
              <span class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
                item 2
              </span>
              <span class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
                item 3
              </span>
              <span class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
                item 4
              </span>
              <span class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
                item 5
              </span>
              <span class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
                item 6
              </span>
              <span class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
                item 7
              </span>
              <span class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
                item 8
              </span>
            </div>
          </div>
          {/* Hiển thị menu di động khi được mở */}
          {isMobileMenuOpen && (
            <div class="mt-2">
              <span class="cursor-pointer block py-2 px-4 text-sm font-medium hover:bg-gray-100">
                Mobile Item 1
              </span>
              <span class="cursor-pointer block py-2 px-4 text-sm font-medium hover:bg-gray-100">
                Mobile Item 2
              </span>
              {/* Thêm các mục menu khác tương tự */}
            </div>
          )}
        </div>
      </div>
      {/* Xử lý đóng menu di động khi nhấn bất kỳ nơi nào khác */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;
