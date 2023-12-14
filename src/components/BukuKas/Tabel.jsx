import React from "react";

import { EyeIcon } from "../icons";

const Tabel = ({ data, isAll }) => {
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  const openReceipt = (receiptUrl) => {
    window.open(receiptUrl, "_blank");
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
              Tanggal
            </th>
            {isAll && (
              <th
                scope="col"
                className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center"
              >
                Nama pengawas
              </th>
            )}
            <th
              scope="col"
              className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center "
            >
              Jenis
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center"
            >
              Sumber
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider text-center"
            >
              Jumlah
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
          {data?.map((item, index) => (
            <tr
              key={index}
              className={index % 2 !== 0 ? "bg-slate-100" : "bg-white"}
            >
              <th scope="row" className="px-2 py-3 whitespace-nowrap w-[2rem]">
                {index + 1}
              </th>
              <td className="px-6 py-3 whitespace-nowrap">
                {formatTimestamp(item.timestamp)}
              </td>
              {isAll && (
                <td className="px-6 py-3 whitespace-nowrap">
                  {item.inspectorName}
                </td>
              )}
              <td className="px-6 py-3 whitespace-nowrap flex justify-center">
                <div
                  className={`text-center text-white text-[15px] font-bold px-2 py-1rounded-[18px] w-fit ${
                    item.type === "Pemasukan" ? "bg-green-600" : " bg-red-700 "
                  }`}
                >
                  {item.type}
                </div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">{item.refName}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.amount}</td>
              <td className="px-6 py-3 whitespace-nowrap flex justify-center">
                <button
                  onClick={() => openReceipt(item.receiptUrl)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium flex gap-2 justify-center items-center "
                >
                  <EyeIcon />
                  Lihat Bukti
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabel;
