import React, { useCallback, useEffect, useState } from "react";
import Layout from "./Layout";
import ProgressBar from "../components/ProgressBar";
import DropDown from "../components/DropDown";
import Card from "../components/Statistik/Card";
import { getDetailStatistic, getPengawas } from "../api/models/pengguna";
import { useSearchParams } from "react-router-dom";
import Toast from "../components/Toast";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { usePenggunaContext } from "../context/PenggunaContext";

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

const progressBars = [
  {
    nama: "Drainase",
    ukuran: "40",
    color1: "bg-blue-600 bg-opacity-20",
    color2: "bg-blue-600",
    database: "drainage",
  },
  {
    nama: "Beton",
    ukuran: "25",
    color1: "bg-neutral-400",
    color2: "bg-slate-900",
    database: "concrete",
  },
  {
    nama: "Hotmix",
    ukuran: "10",
    color1: "bg-neutral-100",
    color2: "bg-zinc-300",
    database: "ashpalt",
  },
  {
    nama: "Bangunan",
    ukuran: "70",
    color1: "bg-orange-200",
    color2: "bg-orange-600",
    database: "building",
  },
];

const Statistik = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [Statistik, setStatistik] = useState([]);
  const [alerts, setAlerts] = useState(false);
  const [Errors, setErrors] = useState();
  const [message, setMessage] = useState("");
  const [pengawas, setPengawas] = useState([]);
  const { penggunaInfo } = usePenggunaContext();

  const interval_month = searchParams.get("interval_month") || "1";
  const user_id =
    penggunaInfo?.role !== "Pengawas"
      ? searchParams.get("user_id") || undefined
      : penggunaInfo?.id;

  const getAllStatistic = useCallback(async () => {
    try {
      const response = await getDetailStatistic(interval_month, user_id);
      setStatistik(response.data.data);
    } catch (error) {
      setErrors(true);
      setMessage(error.response.data.message.title);
      setAlerts(true);
    }
  }, [interval_month, user_id]);

  const getAllPengawas = useCallback(async () => {
    if (penggunaInfo && penggunaInfo?.role !== "Pengawas") {
      try {
        const response = await getPengawas();
        setPengawas(response.data.data);
      } catch (error) {
        setErrors(true);
        setMessage(error?.response?.data?.message?.description);
        setAlerts(true);
      }
    }
  }, [penggunaInfo]);

  const updateSearchParams = (name, value) => {
    const currentParams = new URLSearchParams(searchParams);

    if (value !== undefined) {
      currentParams.set(name, value);
    }

    setSearchParams(currentParams);
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);

    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni ",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayNames = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu ",
    ];

    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    // const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = {
      tanggal: `${dayNames[date.getDay()]}, ${day} ${
        monthNames[date.getMonth()]
      } ${year}`,
      waktu: `${hours}:${minutes}`,
    };

    return formattedDate;
  }

  const handleChangeDD = (name, value) => {
    updateSearchParams(name, value);
  };

  useEffect(() => {
    getAllStatistic();
  }, [interval_month, user_id]);

  useEffect(() => {
    getAllPengawas();
  }, [penggunaInfo]);

  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-col gap-8 w-full">
          {/* TITLE  */}
          <div className="flex lg:flex-row flex-col gap-8 lg:gap-0 justify-between items-center mt-2 md:mt-10">
            <h3 className="text-slate-800 text-xl font-semibold bg-white rounded-lg p-[18px] w-full lg:w-fit lg:min-w-[35%]">
              Statistik Proyek
            </h3>
            <div className="flex gap-4 w-full md:w-fit">
              {penggunaInfo && penggunaInfo?.role !== "Pengawas" && (
                <DropDown
                  handleChange={handleChangeDD}
                  data={pengawas}
                  classname="flex justify-between items-center text-slate-900 text-sm font-normal px-3 py-[10px] bg-neutral-100 rounded-sm w-full border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602] focus:ring-[#F9A602] md:min-w-[180px] min-w-[100px]"
                  dropdown="max-h-[100px] overflow-auto"
                  color="capitalize text-slate-900 bg-neutral-100"
                  initial="Semua Pengawas"
                  name="inspector_id"
                  databases="id"
                  base_id="0"
                />
              )}

              <DropDown
                handleChange={handleChangeDD}
                data={DataTime}
                name="interval_month"
                classname="h-full flex justify-between items-center text-slate-900 text-sm font-normal px-3 py-[10px] bg-neutral-100 rounded-sm w-full border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602] focus:ring-[#F9A602] md:min-w-[180px] min-w-[100px]"
                dropdown="max-h-[100px] overflow-auto"
                color="capitalize text-slate-900 bg-neutral-100"
                initial="1 Bulan Terakhir"
                databases="value"
                base_id="1"
              />
            </div>
          </div>

          {/* BOX GROUP  */}
          <div className="w-full overflow-auto">
            <div className="inline-flex lg:flex gap-5 md:flex-row flex-col w-full">
              <Card
                label="Total Pendapatan"
                item={Statistik.income}
                index={0}
                img="../components/assets/img/total-proyek.png"
              />
              <Card
                label="Margin"
                item={Statistik.margin}
                index={1}
                img="../components/assets/img/total-pengeluaran.png"
              />
              <div className="p-2 lg:p-4 opacity-90 bg-white rounded-lg shadow justify-between gap-1 flex flex-col w-full md:w-fit lg:w-full text-sm lg:text-lg font-semibold text-right">
                <h3 className=" text-slate-800 text-right">
                  Terakhir diperbarui pada
                </h3>
                <h3 className=" text-orange-500 text-right">
                  {Statistik?.lastUpdated ? (
                    formatTimestamp(Statistik?.lastUpdated).tanggal
                  ) : (
                    <Skeleton count={2} />
                  )}
                </h3>
                <h3 className=" text-green-600 text-right flex justify-end w-full">
                  {Statistik?.lastUpdated &&
                    `${formatTimestamp(Statistik?.lastUpdated).waktu} WIB`}{" "}
                </h3>
              </div>
            </div>
          </div>

          {/* BOX GROUP 2 */}
          <div className="w-full gap-5 flex flex-col lg:flex-row">
            {/* BOX 1 */}
            <div className="w-full lg:w-[50%] p-4 bg-white rounded-[7px] shadow">
              <div className="flex flex-col justify-center items-center">
                <img
                  src="../components/assets/img/total-proyek.png"
                  alt="Total Proyek"
                />
                <div>
                  <h3
                    className={`text-center text-teal-600 text-[33px] font-semibold`}
                  >
                    {Statistik.projectCount ? (
                      Statistik?.projectCount?.totalProject
                    ) : (
                      <Skeleton />
                    )}
                  </h3>
                  <h3 className=" text-center text-slate-800 text-[21px] font-medium">
                    Total Proyek
                  </h3>
                </div>
              </div>
              <div>
                {/* PROGRESS BAR  */}
                {Statistik?.projectCount ? (
                  progressBars.map((bar, index) => (
                    <ProgressBar
                      key={index}
                      nama={bar.nama}
                      ukuran={
                        Statistik &&
                        Statistik?.projectCount?.[`${bar.database}`]?.percentage
                      }
                      total={
                        Statistik &&
                        Statistik?.projectCount?.[`${bar.database}`]?.total
                      }
                      color1={bar.color1}
                      color2={bar.color2}
                    />
                  ))
                ) : (
                  <Skeleton height={200} />
                )}
              </div>
            </div>

            {/* BOX 2  */}
            <div className="w-full lg:w-[50%] p-4 bg-white rounded-[7px] shadow">
              <div className="flex flex-col justify-center items-center">
                <img
                  src="../components/assets/img/total-pengeluaran.png"
                  alt="Total Pengeluaran"
                />
                <div>
                  <h3
                    className={`text-center text-red-700 text-[33px] font-semibold`}
                  >
                    {Statistik?.expenditure?.totalExpenditure || <Skeleton />}
                  </h3>
                  <h3 className=" text-center text-slate-800 text-[21px] font-medium">
                    Total Pengeluaran
                  </h3>
                </div>
              </div>
              <div>
                {/* PROGRESS BAR  */}
                {Statistik?.expenditure ? (
                  progressBars.map((bar, index) => (
                    <ProgressBar
                      key={index}
                      nama={bar.nama}
                      ukuran={
                        Statistik &&
                        Statistik?.expenditure?.[`${bar.database}`]?.percentage
                      }
                      total={
                        Statistik &&
                        Statistik?.expenditure?.[`${bar.database}`]?.total
                      }
                      color1={bar.color1}
                      color2={bar.color2}
                    />
                  ))
                ) : (
                  <Skeleton height={200} />
                )}
              </div>
            </div>
          </div>
        </div>
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

export default Statistik;
