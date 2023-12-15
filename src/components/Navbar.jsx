import React, { useState } from "react";
import { Search, HamburgerClosed, HamburgerOpened } from "./icons";
import { usePenggunaContext } from "../context/PenggunaContext";

const Navbar = ({ handleOpen, Open }) => {
  const [dropdown, setDropdown] = useState(false);
  const [Value, setValue] = useState("");
  const { penggunaInfo, logout } = usePenggunaContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.assign(`/proyek?keyword=${Value}`);
  };

  return (
    <nav className="fixed top-0 z-40 w-screen md:w-full bg-white border-b border-gray-200">
      <div className="px-6 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center justify-start rtl:justify-end ${
              Open ? "sm:pl-40" : "sm:pl-12"
            }`}
          >
            <button
              onClick={(e) => handleOpen(e)}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open sidebar</span>

              <span className="bg-[#F9A602] rounded-full p-1.5 w-fit h-fit">
                {Open ? <HamburgerOpened /> : <HamburgerClosed />}
              </span>
            </button>
            <div className="sm:flex ms-2 md:me-24 gap-5 justify-center items-center hidden">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className={`flex px-4 py-1 bg-white rounded border border-gray-300 justify-start items-center gap-2 ${
                  Value === "" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Search />
                <input
                  placeholder="Cari proyek..."
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                  className="bg-transparent border-none focus:border-none hover:border-none focus:outline-none w-full  text-gray-600 text-base font-normal"
                />
                <button type="submit" className="w-0 h-0"></button>
              </form>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  onClick={() => setDropdown(!dropdown)}
                  className="flex gap-3 justify-center items-center"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-10 h-10 rounded-full bg-red-300 focus:ring-4 focus:ring-gray-300"
                    src="/components/assets/img/profile.png"
                    alt="user"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="capitalize text-slate-800 text-xs font-normal">
                      {penggunaInfo?.name}
                    </h3>
                    <h3 className="text-gray-400 text-[9.75px] font-normal">
                      {penggunaInfo?.role}
                    </h3>
                  </div>
                </button>
              </div>
              <div
                className={`absolute z-60 top-16 text-base list-none bg-white divide-y divide-gray-100 rounded shadow ${
                  !dropdown && "hidden"
                }`}
                id="dropdown-user"
              >
                <ul className="py-1" role="none">
                  <li
                    onClick={() => logout()}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
