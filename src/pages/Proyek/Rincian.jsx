import React, { useCallback, useEffect, useState } from "react";
import Layout from "../Layout";
import Tabel from "../../components/Proyek/Rincian/Tabel";
import { useParams } from "react-router-dom";
import { getRincianProyek } from "../../api/models/proyek";
import Toast from "../../components/Toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { usePenggunaContext } from "../../context/PenggunaContext";
import TambahPengeluaran from "../../components/Proyek/Rincian/Popup/TambahPengeluaran";
import { ArrowLeft } from "../../components/icons";

const Rincian = () => {
  const [alerts, setAlerts] = useState(false);
  const [Errors, setErrors] = useState();
  const [message, setMessage] = useState("");
  const [rincian, setRincian] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const { id_proyek, id } = useParams();
  const { penggunaInfo } = usePenggunaContext();
  const [isOpen, setisOpen] = useState(false);

  const handleClick = () => {
    setisOpen(!isOpen);
  };

  const getRincian = useCallback(async () => {
    try {
      const response = await getRincianProyek(id_proyek, id);
      setRincian(response.data.data);
      setErrors(false);
      setisLoading(false);
    } catch (error) {
      setErrors(true);
      setMessage(error?.response?.data?.message?.description);
      setAlerts(true);
    }
  }, [id_proyek, id]);

  useEffect(() => {
    getRincian();
  }, [id_proyek, id]);

  return (
    <Layout>
      <div className="px-6 pt-6 pb-[30px] bg-white rounded-md flex-col gap-6 flex w-full">
        <div className="flex flex-col items-start w-full md:mt-0 md:w-fit">
          <button
            onClick={() => window.history.back()}
            className="whitespace-nowrap px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium flex md:mt-0 mt-3"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft />
              Kembali
            </div>
          </button>
        </div>
        {/* TITLE  */}
        <div className="flex justify-start md:justify-between items-start md:items-center w-full md:flex-row flex-col gap-2">
          <div className="flex flex-col gap-3 w-full">
            {!isLoading ? (
              <div className="flex md:flex-row flex-col items-center gap-2 md:items-start">
                <h3 className="md:text-slate-900 text-xl md:text-2xl font-bold">
                  Rincian {rincian?.expenditureName}
                </h3>
                <h3 className="text-white text-sm md:text-base font-medium  px-4 py-2 bg-orange-500 rounded-[30px]">
                  Proyek {rincian?.projectName}
                </h3>
              </div>
            ) : (
              <Skeleton height={30} />
            )}
            {!isLoading ? (
              <h3 className="text-slate-900 text-base font-medium text-center md:text-left">
                Pengawas:{" "}
                <span className="px-3 py-1.5 ml-1 bg-orange-200 rounded-[30px] shadow text-slate-900 text-sm font-medium">
                  {rincian?.inspectorName}
                </span>
              </h3>
            ) : (
              <Skeleton />
            )}
          </div>

          {penggunaInfo && penggunaInfo?.role === "Pengawas" && (
            // center in smalll device
            <div className="flex flex-col items-center w-full mt-10 md:mt-0 md:w-fit">
              <button
                onClick={handleClick}
                className="whitespace-nowrap px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium flex md:mt-0 mt-3"
              >
                Tambah Pengeluaran
              </button>
            </div>
          )}

          {isOpen && (
            <TambahPengeluaran
              handleClick={handleClick}
              setAlerts={setAlerts}
              setErrors={setErrors}
              setMessage={setMessage}
            />
          )}
        </div>

        {/* TABEL  */}
        {rincian?.details && (
          <Tabel
            data={rincian}
            setAlerts={setAlerts}
            setErrors={setErrors}
            setMessage={setMessage}
          />
        )}
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

export default Rincian;
