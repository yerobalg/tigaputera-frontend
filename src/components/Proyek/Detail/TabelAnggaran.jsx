import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TabelAnggaran = ({ data }) => {
  const budgets = data?.budgets;

  return (
    <div className="w-full overflow-auto">
      {data ? (
        <table className="min-w-full overflow-auto divide-y divide-gray-200 text-center">
          <thead className="bg-slate-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-[2rem]"
              >
                NO
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
              >
                URAIAN
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
              >
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            {budgets &&
              budgets.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 !== 0 ? "bg-slate-100" : "bg-white"}
                >
                  <th
                    scope="row"
                    className="px-6 py-3 whitespace-nowrap w-[2rem] font-normal"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-3 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-3 whitespace-nowrap">{item.price}</td>
                </tr>
              ))}
            <tr className={budgets?.length % 2 !== 0 ? "bg-slate-100" : ""}>
              <td
                colSpan="2"
                className="px-4 py-2 whitespace-nowrap text-center font-bold text-gray-400 text-base md:text-xl uppercase "
              >
                Total Biaya
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-left font-bold text-gray-400">
                {data && data?.total}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <Skeleton count={5} height={40}/>
      )}
    </div>
  );
};

export default TabelAnggaran;
