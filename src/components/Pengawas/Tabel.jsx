import React from "react";
import { BukuKas, NonAktifkan } from "../icons";
import { deactivePengawas } from "../../api/models/pengguna";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const Tabel = ({ data, setAlerts, setErrors, setMessage, isLoading }) => {
  const navigate = useNavigate();

  const deactivatePengawas = async (e, id) => {
    e.preventDefault();

    try {
      const response = await deactivePengawas(id);
      setAlerts(true);
      setErrors(false);
      setMessage(response.data.message.description);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrors(true);
      setMessage(error?.response?.data?.message?.description);
      setAlerts(true);
    }
  };

  return (
    <div className="w-full overflow-auto">
      {!isLoading ? (
        data.length > 0 ? (
          <table className="w-full divide-y divide-gray-200 text-center overflow-auto md:max-w-none max-w-full">
            <thead className="bg-slate-100 max-w-full overflow-auto">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center w-4 md:w-[2rem]"
                >
                  NO
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  Nama pengawas
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center "
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 !== 0 ? "bg-slate-100" : "bg-white"}
                >
                  <th
                    scope="row"
                    className="px-2 py-3 whitespace-nowrap w-[2rem]"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-3 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item.username}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          navigate(`/buku-kas?inspector_id=${item.id}`)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium mx-2 flex gap-2 justify-center items-center"
                      >
                        <BukuKas />
                        Lihat Buku Kas
                      </button>
                      <button
                        onClick={(e) => deactivatePengawas(e, item.id)}
                        className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md text-sm font-medium mx-2 flex gap-2 justify-center items-center"
                      >
                        <NonAktifkan />
                        Nonaktifkan
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Belum ada data pengawas</div>
        )
      ) : (
        <Skeleton height={50} count={3}/>
      )}
    </div>
  );
};

export default Tabel;
