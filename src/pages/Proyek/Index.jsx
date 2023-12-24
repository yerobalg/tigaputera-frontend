import React, { useCallback, useEffect, useState } from "react";
import Layout from "../Layout";
import Card from "../../components/Proyek/Index/Card";
import ProyekCard from "../../components/Proyek/Index/ProyekCard";
import Pagination from "../../components/Proyek/Index/Pagination";
import TambahProyek from "../../components/Proyek/Index/Popup/TambahProyek";
import { getProyek } from "../../api/models/proyek";
import { useSearchParams } from "react-router-dom";
import { getStatistic } from "../../api/models/pengguna";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Toast from "../../components/Toast";
import { usePenggunaContext } from "../../context/PenggunaContext";

const cardList = [
  {
    nama: "Total Proyek",
    img: "total-proyek",
    color: "#068B92",
    value: "totalProject",
  },
  {
    nama: "Total Pendapatan",
    img: "total-pencairan",
    color: "#1AA053",
    value: "totalIncome",
  },
  {
    nama: "Total Pengeluaran",
    img: "total-pengeluaran",
    color: "#AD2D1E",
    value: "totalExpenditure",
  },
  {
    nama: "Saldo",
    img: "total-margin",
    color: "#F16A1B",
    value: "margin",
  },
];

const Proyek = () => {
  const [isOpen, setisOpen] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [Errors, setErrors] = useState(false);
  const [message, setMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setisLoading] = useState(true);
  const [proyek, setProyek] = useState([]);
  const [Statistik, setStatistik] = useState([]);
  const [paginations, setPaginations] = useState({
    limit: 6,
    currentPage: 1,
    totalPage: 0,
    currentElement: 0,
    totalElement: 0,
  });
  const page = searchParams.get("page") || "1";
  const keyword = searchParams.get("keyword") || "";
  const limit = searchParams.get("limit") || "6";
  const { penggunaInfo } = usePenggunaContext();

  const handleClick = () => {
    setisOpen(!isOpen);
  };

  const getAllStatistic = useCallback(async () => {
    try {
      const response = await getStatistic(page, keyword, limit);
      setStatistik(response.data.data);
      if (response.data.data) {
        setisLoading(false);
      }
    } catch (error) {
      setErrors(true);
      setMessage(error?.response?.data?.message?.description);
      setAlerts(true);
    }
  }, []);

  const getAllProyek = useCallback(async () => {
    try {
      const response = await getProyek(page, keyword, limit);
      setProyek(response.data.data);
      setPaginations(response.data.pagination);
    } catch (error) {
      setErrors(true);
      setMessage(error?.response?.data?.message?.description);
      setAlerts(true);
    }
  }, []);

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

  useEffect(() => {
    getAllProyek();
  }, [page, keyword]);

  useEffect(() => {
    setStatistik([]);
    if (penggunaInfo) {
      getAllStatistic();
    }
  }, [penggunaInfo]);

  return (
    <Layout>
      {/* GROUP CARD 1 */}
      <div className="flex flex-col gap-10 w-full">
        <div className="w-full flex justify-between my-3 max-w-full overflow-auto gap-4 md:flex-row flex-col">
          {cardList.map((item, index) => {
            return (
              <Card
                item={item}
                key={index}
                Statistik={Statistik}
                isLoading={isLoading}
                size={250}
              />
            );
          })}
        </div>

        {/* BOX */}
        <div className="bg-white rounded-xl py-4 px-3 md:px-9 flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <h3 className="text-zinc-950 text-lg md:text-[21px] font-semibold">
              Proyek Anda
            </h3>
            {penggunaInfo && penggunaInfo.role !== "Pengawas" && (
              <>
                <button
                  onClick={handleClick}
                  className="px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium hidden md:flex"
                >
                  Tambahkan Proyek
                </button>
                <button
                  onClick={handleClick}
                  className="px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium flex md:hidden"
                >
                  Tambah
                </button>
              </>
            )}

            {/* POPUP  */}
            {isOpen && (
              <TambahProyek
                handleClick={handleClick}
                setAlerts={setAlerts}
                setErrors={setErrors}
                setMessage={setMessage}
              />
            )}
          </div>

          {/* GROUP CARD 2 */}
          {!isLoading ? (
            proyek.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6 ">
                {Object.keys(proyek).map((data, index) => {
                  const datas = proyek[data];
                  return (
                    <ProyekCard data={datas} key={index} index={index} /> || (
                      <Skeleton />
                    )
                  );
                })}
              </div>
            ) : (
              <h3>Belum ada data yang tersedia</h3>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-5 md:px-[5vw]">
              <Skeleton height={200} />
              <Skeleton height={200} />
              <Skeleton height={200} />
            </div>
          )}

          {/* PAGINATION */}
          {paginations?.totalPage > 0 && (
            <Pagination
              currentPage={page}
              totalPages={paginations.totalPage}
              onChangePage={handlePagination}
            />
          )}
        </div>
      </div>

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

export default Proyek;
