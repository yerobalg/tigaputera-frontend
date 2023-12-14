import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { usePenggunaContext } from "../context/PenggunaContext";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const pathName = "/" + useLocation().pathname.split("/")[1];
  const [Open, setOpen] = useState(false);
  const { penggunaInfo } = usePenggunaContext();

  useEffect(() => {
    document.title = "Tiga Putera Niscala";
  }, []);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!Open);
  };

  return (
    <div className="bg-[#E9ECEF] min-h-screen relative z-0">
      <Navbar handleOpen={handleOpen} Open={Open} />
      <SideBar Open={Open} />

      <img
        alt="background"
        src="/components/assets/img/bg-layout.png"
        className={`absolute top-0 left-0 w-full h-[200px] object-cover object-bottom ${pathName === "/statistik" ? "sm:h-[180px]" : "sm:h-[230px]"}`}
      />

      <div
        className={`relative pt-20 pb-5 px-6 sm:px-8 ${
          Open ? "sm:ml-48" : "sm:ml-20"
        }`}
      >
        {/* TITLE  */}
        <div className="mb-3">
          <h3 className="text-white text-3xl font-bold capitalize">
            Halo {penggunaInfo && penggunaInfo.name}!
          </h3>
          <h3 className="text-white text-lg font-medium">
            Selamat bekerja, semoga harimu menyenangkan!
          </h3>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
