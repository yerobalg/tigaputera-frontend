import React, { useCallback, useEffect, useState } from "react";
import Layout from "./Layout";
import DropDown from "../components/DropDown";
import Tabel from "../components/BukuKas/Tabel";
import Pagination from "../components/Proyek/Index/Pagination";
import { useSearchParams } from "react-router-dom";
import { getBukuKas } from "../api/models/bukuKas";
import { getPengawas } from "../api/models/pengguna";
import Toast from "../components/Toast";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { usePenggunaContext } from "../context/PenggunaContext";
import TambahPemasukan from "../components/BukuKas/Popup/TambahPemasukan";

const DataTime = [
  {
    name: "3 Bulan Terakhir",
    value: 3,
  },
  {
    name: "6 Bulan Terakhir",
    value: 6,
  },
  {
    name: "1 Tahun Terakhir",
    value: 12,
  },
];

const BukuKas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setisOpen] = useState(false);
  const [bukuKas, setBukuKas] = useState([]);
  const [pengawas, setPengawas] = useState([]);
  const [alerts, setAlerts] = useState(false);
  const [Errors, setErrors] = useState();
  const [message, setMessage] = useState("");
  const page = searchParams.get("page") || "1";
  const interval_month = searchParams.get("interval_month") || undefined;
  const { penggunaInfo } = usePenggunaContext();
  const inspector_id =
    penggunaInfo?.role !== "Pengawas"
      ? searchParams.get("inspector_id") || undefined
      : penggunaInfo?.id;
  const limit = searchParams.get("limit") || "6";
  const [paginations, setPaginations] = useState({
    limit: limit,
    currentPage: 1,
    totalPage: 0,
    currentElement: 0,
    totalElement: 0,
  });

  const updateSearchParams = (name, value) => {
    const currentParams = new URLSearchParams(searchParams);

    if (value !== undefined) {
      currentParams.set(name, value);
    }

    setSearchParams(currentParams);
  };

  const getAllBukuKas = useCallback(async () => {
    try {
      const response = await getBukuKas(
        page,
        limit,
        interval_month,
        inspector_id
      );
      setBukuKas(response.data.data);
      setPaginations(response.data.pagination);
    } catch (error) {
      setErrors(true);
      setMessage(error.response.data.message.description);
      setAlerts(true);
    }
  }, [page, interval_month, inspector_id]);

  const getAllPengawas = useCallback(async () => {
    if (penggunaInfo && penggunaInfo?.role !== "Pengawas") {
      try {
        const response = await getPengawas();
        setPengawas(response.data.data);
      } catch (error) {
        setErrors(true);
        setAlerts(true);
      }
    }
  }, [penggunaInfo]);

  const changeQueryParam = (paramName, newValue) => {
    setSearchParams((params) => {
      params.set(paramName, newValue);
      return params;
    });
  };

  const handlePagination = useCallback(async (page, limit) => {
    try {
      changeQueryParam("page", page);
      changeQueryParam("limit", limit);
    } catch (error) {}
  }, []);

  const handleChangeDD = (name, value) => {
    updateSearchParams(name, value);
  };

  const handleClick = () => {
    setisOpen(!isOpen);
  };

  useEffect(() => {
    getAllPengawas();
  }, [penggunaInfo]);

  const arrDepedency = [page, interval_month];
  if (penggunaInfo && penggunaInfo?.role !== "Pengawas") {
    arrDepedency.push(inspector_id);
  }
  useEffect(() => {
    getAllBukuKas();
  }, arrDepedency);

  return (
    <Layout>
      <div className="px-6 pt-6 pb-[30px] bg-white rounded-md flex-col justify-center items-center gap-6 flex">
        {/* TITLE  */}
        <div className="flex md:justify-between items-start md:items-center w-full md:flex-row flex-col gap-2">
          <div className="flex flex-col gap-1 md:gap-3 ">
            {bukuKas.account ? (
              <>
                <h3 className="md:text-slate-900 text-xl md:text-2xl font-bold">
                  Buku Kas{" "}
                  <span className="capitalize">
                    {bukuKas?.account?.inspectorName}
                  </span>
                </h3>
                <h3 className="text-gray-500 text-lg md:text-xl font-bold">
                  Saldo :{" "}
                  <span className="text-orange-500">
                    {bukuKas ? bukuKas?.account?.currentBalance : <Skeleton />}
                  </span>
                </h3>
              </>
            ) : (
              <Skeleton width={250} count={2} height={30} />
            )}
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="flex gap-2">
              {penggunaInfo && penggunaInfo?.role !== "Pengawas" && (
                <DropDown
                  handleChange={handleChangeDD}
                  data={pengawas}
                  classname="flex justify-between items-center text-slate-900 text-sm font-normal px-3 py-[10px] bg-neutral-100 rounded-sm w-full border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602] focus:ring-[#F9A602] min-w-[100px] md:min-w-[180px] capitalize"
                  dropdown="max-h-[100px] overflow-auto"
                  color="capitalize text-slate-900 bg-neutral-100"
                  initial="Pilih Pengawas"
                  name="inspector_id"
                  databases="id"
                  base_id="0"
                />
              )}

              <DropDown
                handleChange={handleChangeDD}
                data={DataTime}
                name="interval_month"
                classname="flex justify-between items-center text-slate-900 text-sm font-normal px-3 py-[10px] bg-neutral-100 rounded-sm w-full border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602] focus:ring-[#F9A602] min-w-[100px] md:min-w-[180px] capitalize"
                dropdown="max-h-[100px] overflow-auto"
                color="capitalize text-slate-900 bg-neutral-100"
                initial="1 Bulan Terakhir"
                databases="value"
                base_id="1"
              />
            </div>
            <div>
              {penggunaInfo && penggunaInfo?.role === "Pengawas" && (
                <>
                  <button
                    onClick={handleClick}
                    className="whitespace-nowrap px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium flex md:mt-0 mt-3 md:w-fit w-full justify-center"
                  >
                    Tambah Pemasukan
                  </button>
                </>
              )}
              {isOpen && (
                <TambahPemasukan
                  handleClick={handleClick}
                  setAlerts={setAlerts}
                  setErrors={setErrors}
                  setMessage={setMessage}
                />
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          {/* TABEL  */}
          {bukuKas.transactions ? (
            bukuKas?.transactions?.length > 0 ? (
              <Tabel
                data={bukuKas?.transactions}
                isAll={bukuKas?.account?.inspectorName === "Semua Pengawas"}
              />
            ) : (
              <div className="text-left w-full">Belum ada data buku kas</div>
            )
          ) : (
            <Skeleton height={50} count={3} />
          )}
        </div>

        {/* PAGINATION  */}
        <Pagination
          currentPage={page}
          totalPages={paginations.totalPage}
          onChangePage={handlePagination}
        />
      </div>

      {alerts &&
        (Errors ? (
          <Toast setAlert={setAlerts} type="red" message={message} />
        ) : (
          <Toast setAlert={setAlerts} type="green" message={message} />
        ))}
    </Layout>
  );
};

export default BukuKas;
