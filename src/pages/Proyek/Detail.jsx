import React, { Fragment, useCallback, useEffect, useState } from "react";
import Layout from "../Layout";
import TabelAnggaran from "../../components/Proyek/Detail/TabelAnggaran";
import TabelRincian from "../../components/Proyek/Detail/TabelRincian";
import UbahStatus from "../../components/Proyek/Detail/Popup/UbahStatus";
import UbahAnggaran from "../../components/Proyek/Detail/Popup/UbahAnggaran";
import { getProyekById } from "../../api/models/proyek";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { usePenggunaContext } from "../../context/PenggunaContext";
import TambahKategori from "../../components/Proyek/Detail/Popup/TambahKategori";
import { UpdateIcon, BukuKas } from "../../components/icons";

const Detail = () => {
  const [proyekDetail, setProyekDetail] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [alerts, setAlerts] = useState(false);
  const [Errors, setErrors] = useState();
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const { penggunaInfo } = usePenggunaContext();

  const [isOpenState, setIsOpenState] = useState({
    isOpen1: false,
    isOpen2: false,
    isOpen3: false,
  });

  const navigate = useNavigate();

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

    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  const getTheProyek = useCallback(async () => {
    try {
      const response = await getProyekById(id);
      const { data: proyekDetail } = response.data;
      proyekDetail.startDate = formatTimestamp(proyekDetail.startDate);
      proyekDetail.finalDate = formatTimestamp(proyekDetail.finalDate);
      setProyekDetail(proyekDetail);
      setErrors(false);
      setisLoading(false);
    } catch (error) {
      setErrors(true);
      setMessage(error?.response?.data?.message?.description);
      setAlerts(true);
    }
  }, []);

  const handleClick = (element) => {
    setIsOpenState((prevState) => ({
      ...prevState,
      [element]: !prevState[element],
    }));
  };

  console.log(proyekDetail);

  useEffect(() => {
    getTheProyek();
  }, [id]);

  return (
    <Layout>
      <div className="w-full flex flex-col gap-2">
        {/* BOX 1 */}
        {isLoading ? (
          <Skeleton height={340} />
        ) : (
          <div className="bg-white rounded-md shadow w-full px-5 py-3 flex flex-col gap-5">
            <div className="flex md:flex-row flex-wrap justify-between items-center gap-3 md:gap-0">
              <div className="flex flex-col gap-2.5">
                <h3 className="text-zinc-950 text-xl md:text-2xl font-bold">
                  {proyekDetail.name}
                </h3>
                <h3 className="text-zinc-950 text-lg md:text-[21px] font-semibold ">
                  {proyekDetail.description}
                </h3>
                <h3 className="text-gray-500 text-lg md:text-xl font-bold">
                  Pendapatan:{" "}
                  <span className="text-orange-500">
                    {proyekDetail?.projectStatistics?.totalIncome}
                  </span>
                  <span className="text-gray-500">
                    {` (${proyekDetail?.projectStatistics?.PercentageFromBudget}% dari anggaran)`}
                  </span>
                </h3>
              </div>
              <div
                className={`md:w-[151px] w-fit h-10 px-4 py-1 md:px-1.5 md:py-1 rounded-[18px] justify-center items-center text-center text-sm md:text-[21px] font-bold flex`}
                style={{
                  backgroundColor: `#${proyekDetail["type"]?.bgColorHex}`,
                  color: `#${proyekDetail["type"]?.textColorHex}`,
                }}
              >
                {proyekDetail && proyekDetail?.type?.name}
              </div>
            </div>

            <hr />

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-12 text-zinc-950 text-md md:text-lg gap-3">
                {proyekDetail
                  ? formItems(proyekDetail["type"]?.name, proyekDetail)
                  : ""}
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <div className="flex flex-col md:flex-row gap-4">
                {penggunaInfo?.role !== "Pengawas" && (
                  <button
                    type="submit"
                    onClick={() => handleClick("isOpen1")}
                    className="whitespace-nowrap px-10 py-2 bg-amber-500 rounded shadow-lg justify-center items-center text-center text-white text-opacity-90 text-base font-normal w-auto hover:bg-[#F9A602]"
                  >
                    <div className="flex items-center gap-2">
                      <UpdateIcon />
                      Ubah Status Proyek
                    </div>
                  </button>
                )}
                <button
                  type="submit"
                  onClick={() => {
                    navigate(`/proyek/${id}/buku-kas`);
                  }}
                  className="whitespace-nowrap px-10 py-2 bg-amber-500 rounded shadow-lg justify-center items-center text-center text-white text-opacity-90 text-base font-normal w-auto hover:bg-[#F9A602]"
                >
                  <div className="flex items-center gap-2">
                    <BukuKas />
                    Lihat Buku Kas Proyek
                  </div>
                </button>
              </div>

              {/* POPUP  */}
              {isOpenState["isOpen1"] && (
                <UbahStatus
                  id={id}
                  handleClick={() => handleClick("isOpen1")}
                  status={proyekDetail["status"]?.name}
                  setAlerts={setAlerts}
                  setErrors={setErrors}
                  setMessage={setMessage}
                />
              )}
            </div>
          </div>
        )}

        <div className="mt-8 w-full">
          <div className="w-[210px] md:w-[259px] h-[68px] bg-white rounded-tl-xl rounded-tr-xl flex items-center justify-center">
            <h3 className="text-slate-800 text-xl md:text-2xl font-semibold text-center">
              Laporan Keuangan
            </h3>
          </div>

          {/* BOX 2 */}
          <div className="bg-white w-full px-2 md:px-9 py-3 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-zinc-950 text-lg md:text-[21px] font-semibold">
                Anggaran Pencairan
              </h3>
              {penggunaInfo?.role === "Direktur" && (
                <>
                  <button
                    onClick={() => handleClick("isOpen2")}
                    className="px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium hidden md:flex"
                  >
                    <div className="flex items-center gap-2">
                      <UpdateIcon />
                      Ubah Anggaran
                    </div>
                  </button>
                  <button
                    onClick={() => handleClick("isOpen2")}
                    className="px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium flex md:hidden"
                  >
                    Ubah
                  </button>
                </>
              )}

              {/* POPUP  */}
              {isOpenState["isOpen2"] && (
                <UbahAnggaran
                  handleClick={() => handleClick("isOpen2")}
                  data={proyekDetail?.["projectBudget"]?.budgets}
                  setAlerts={setAlerts}
                  setErrors={setErrors}
                  setMessage={setMessage}
                />
              )}
            </div>

            {/* TABEL 1  */}
            <TabelAnggaran data={proyekDetail?.["projectBudget"]} />

            {/* CATATAN 1 */}
            <div className="flex bg-slate-100 justify-center items-center w-full md:w-fit h-fit px-3 md:px-7 py-3 gap-7 my-6">
              <h3 className="text-slate-900 text-sm md:text-lg font-medium ">
                Catatan
              </h3>
              <div className="text-slate-900 text-sm md:text-lg font-medium ">
                <h3>{`PPN = ${proyekDetail["projectBudget"]?.ppnPercentage}% Pagu Pekerjaan`}</h3>
                <h3>{`PPh = ${proyekDetail["projectBudget"]?.pphPercentage}% Pagu Pekerjaan`}</h3>
              </div>
            </div>

            {/* TABEL 2 */}
            <TabelRincian
              id={id}
              data={proyekDetail?.["projectExpenditure"]}
              margin={proyekDetail?.margin}
              handleClick={() => handleClick("isOpen3")}
            />

            {isOpenState["isOpen3"] && (
              <TambahKategori
                id={id}
                setAlerts={setAlerts}
                setErrors={setErrors}
                setMessage={setMessage}
                handleClick={() => handleClick("isOpen3")}
              />
            )}

            {/* CATATAN  2*/}
            <div className="flex bg-slate-100 justify-center items-center w-full md:w-fit h-fit px-3 md:px-7 py-3 gap-7 my-6 text-slate-900 text-sm md:text-lg font-medium">
              <h3>Keterangan</h3>
              <h3>
                <span className="text-red-500">*</span>= Variable Cost
              </h3>
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

export default Detail;

const formItems = (type, proyekDetail) => {
  return (
    <>
      <div className="col-span-12 md:col-span-2 font-semibold">
        Status Proyek
      </div>
      <div className="col-span-12 md:col-span-10 font-medium flex gap-1">
        <span className="md:flex hidden">:</span>
        <label
          className={`px-1.5 py-[2px] rounded-md text-[13px]`}
          style={{
            backgroundColor: `#${proyekDetail["status"]?.bgColorHex}`,
            color: `#${proyekDetail["status"]?.textColorHex}`,
          }}
        >
          {proyekDetail["status"]?.name}
        </label>
      </div>

      <div className="col-span-12 md:col-span-2 font-semibold">Nama Dinas</div>
      <div className="col-span-12 md:col-span-10 font-medium flex gap-1">
        <span className="md:flex hidden">:</span>
        <>{proyekDetail.deptName}</>
      </div>

      <div className="col-span-12 md:col-span-2 font-semibold">
        Nama Pengawas
      </div>
      <div className="capitalize col-span-12 md:col-span-10 font-medium flex gap-1">
        <span className="md:flex hidden">:</span>
        <>{proyekDetail.inspectorName}</>
      </div>

      {type === "Drainase" && (
        <>
          <div className="col-span-12 md:col-span-2 font-semibold">Volume</div>
          <div className="col-span-12 md:col-span-10 font-medium flex gap-1">
            <span className="md:flex hidden">:</span>
            <>{proyekDetail.volume}m</>
          </div>
          <div className="col-span-12 md:col-span-2 font-semibold">
            Jenis U-ditch
          </div>
          <div className="col-span-12 md:col-span-10 font-medium flex gap-1">
            <span className="md:flex hidden">:</span>
            <>
              {proyekDetail.length}cm x {proyekDetail.width}cm
            </>
          </div>
        </>
      )}

      <div className="col-span-12 md:col-span-2 font-semibold">Perusahaan</div>
      <div className="col-span-12 md:col-span-10 font-medium flex gap-1">
        <span className="md:flex hidden">:</span>
        <>{proyekDetail.companyName}</>
      </div>

      <div className="col-span-12 md:col-span-2 font-semibold">
        Tanggal Mulai
      </div>
      <div className="col-span-12 md:col-span-10 font-medium flex gap-1">
        <span className="md:flex hidden">:</span>
        <>{proyekDetail.startDate}</>
      </div>

      <div className="col-span-12 md:col-span-2 font-semibold">
        Tanggal Berakhir
      </div>
      <div className="col-span-12 md:col-span-10 font-medium flex gap-1">
        <span className="md:flex hidden">:</span>
        <>{proyekDetail.finalDate}</>
      </div>
    </>
  );
};
