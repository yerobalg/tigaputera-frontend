import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Tabel from "../components/Pengawas/Tabel";
import TambahPengawas from "../components/Pengawas/Popup/TambahPengawas";
import { getPengawas } from "../api/models/pengguna";
import Toast from "../components/Toast";

const Pengawas = () => {
  const [isOpen, setisOpen] = useState(false);
  const [pengawas, setPengawas] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [alerts, setAlerts] = useState(false);
  const [Errors, setErrors] = useState();
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setisOpen(!isOpen);
  };

  const getAllPengawas = async () => {
    try {
      const response = await getPengawas();
      setPengawas(response.data.data);
      setisLoading(false);
    } catch (error) {
      setErrors(true);
      setMessage(error.response.data.message.description);
      setAlerts(true);
    }
  };

  useEffect(() => {
    getAllPengawas();
  }, []);

  return (
    <Layout>
      <div className="px-6 pt-6 pb-[30px] bg-white rounded-md flex-col justify-center items-center gap-6 flex">
        {/* TITLE  */}
        <div className="flex justify-between items-center w-full">
          <h3 className="md:text-slate-900 text-xl md:text-2xl font-bold">
            Pengawas
          </h3>
          <button
            onClick={handleClick}
            className="px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium hidden md:flex"
          >
            Tambah Pengawas
          </button>
          <button
            onClick={handleClick}
            className="px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium flex md:hidden"
          >
            Tambah
          </button>
        </div>

        <Tabel
          isLoading={isLoading}
          data={pengawas}
          handleClick={handleClick}
          setAlerts={setAlerts}
          setErrors={setErrors}
          setMessage={setMessage}
        />
      </div>

      {/* POP UP  */}
      {isOpen && (
        <TambahPengawas
          handleClick={handleClick}
          setAlerts={setAlerts}
          setErrors={setErrors}
          setMessage={setMessage}
        />
      )}

      {/* SNACK BAR  */}
      {alerts &&
        (Errors ? (
          <Toast setAlert={setAlerts} type="red" message={message} />
        ) : (
          <Toast setAlert={setAlerts} type="green" message={message} />
        ))}
    </Layout>
  );
};

export default Pengawas;
