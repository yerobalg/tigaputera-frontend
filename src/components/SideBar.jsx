import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BukuKas, Pengawas, Proyek, Statistik } from "./icons";
import { usePenggunaContext } from "../context/PenggunaContext";

const MenuList = [
  {
    icon: <Proyek />,
    nama: "Proyek",
    path: "/proyek",
  },
  {
    icon: <Statistik />,
    nama: "Statistik",
    path: "/statistik",
  },
  {
    icon: <Pengawas />,
    nama: "Pengawas",
    path: "/pengawas",
  },
  {
    icon: <BukuKas />,
    nama: "Buku Kas",
    path: "/buku-kas",
  },
];

const SideBar = ({ Open }) => {
  const pathName = "/" + useLocation().pathname.split("/")[1];
  const { penggunaInfo } = usePenggunaContext();

  useEffect(() => {}, [penggunaInfo]);
  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-30 w-48 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0  ${
          !Open && "-translate-x-full sm:translate-x-0 sm:w-20"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white gap-1.5 flex flex-col">
          {!Open ? (
            <h3 className="text-gray-400 text-xs font-semibold text-center py-1.5 min-h-[25px]">
              {" "}
            </h3>
          ) : (
            <h3 className="text-gray-400 text-xs font-semibold text-center py-1.5">
              TIGA PUTERA NISCALA
            </h3>
          )}
          <ul className="space-y-2 font-medium w-full">
            {MenuList.map((item, index) => {
              if (
                index === 2 &&
                penggunaInfo &&
                penggunaInfo?.role === "Pengawas"
              ) {
                return null;
              } else {
                return (
                  <li key={index} className="w-full">
                    <a
                      href={item.path}
                      className={`w-full h-[33px] flex px-[18px] py-1.5 ${
                        item.path === pathName
                          ? "bg-amber-500 rounded-[3px] shadow-lg justify-start items-center text-white text-xs font-normal"
                          : "bg-transparent text-gray-400 text-xs font-normal"
                      }`}
                    >
                      {item.icon}
                      <span className={`ms-3 ${!Open && "sm:hidden"}`}>
                        {item.nama}
                      </span>
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
