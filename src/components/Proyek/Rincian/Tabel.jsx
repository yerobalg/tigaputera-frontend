import React from "react";
import { EyeIcon, NonAktifkan } from "../../icons";
import { deleteExpenditureProyek } from "../../../api/models/proyek";
import { useParams } from "react-router-dom";

const Tabel = ({ data, setAlerts, setErrors, setMessage }) => {
  const rincian = data?.details;
  const { id, id_proyek } = useParams();

  const openImage = (receiptUrl) => {
    window.open(receiptUrl, "_blank");
  };

  const deleteExpenditureDetail = async (e, id_detail) => {
    e.preventDefault();

    if (!window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      return;
    }

    try {
      const response = await deleteExpenditureProyek(id_proyek, id, id_detail);
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
              uraian
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center"
            >
              Jumlah
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center "
            >
              Harga
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center"
            >
              Total harga
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {rincian &&
            rincian?.map((item, index) => (
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
                <td className="px-6 py-3 whitespace-nowrap">{item.amount}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-3 whitespace-nowrap">
                  {item.totalPrice}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={(e) => deleteExpenditureDetail(e, item.id)}
                      className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md text-sm font-medium flex gap-2 justify-center items-center "
                    >
                      <NonAktifkan />
                      Hapus
                    </button>
                    <button
                      onClick={() => openImage(item.receiptUrl)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium flex gap-2 justify-center items-center "
                    >
                      <EyeIcon />
                      Lihat Bukti
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          <tr className={rincian?.length % 2 !== 0 && "bg-slate-100"}>
            <td
              colSpan="5"
              className="px-4 py-2 whitespace-nowrap text-center font-bold text-gray-400 text-base md:text-xl uppercase "
            >
              Total
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-left font-bold">
              {data?.sumTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tabel;
