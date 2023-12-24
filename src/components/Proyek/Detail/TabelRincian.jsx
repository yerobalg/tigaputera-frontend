import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { usePenggunaContext } from "../../../context/PenggunaContext";
import { EyeIcon } from "../../icons";

const TabelRincian = ({
  id,
  data,
  margin,
  handleClick,
}) => {
  const allExpenditures = data && data["expenditures"];

  const navigate = useNavigate();
  const { penggunaInfo } = usePenggunaContext();

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-zinc-950 text-lg md:text-[21px] font-semibold">
          Rincian Penggunaan Anggaran
        </h3>
        {penggunaInfo?.role === "Direktur" && (
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleClick()}
              className="px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium hidden md:flex"
            >
              Tambah Kategori
            </button>
            <button
              onClick={() => handleClick()}
              className="px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-sm md:text-base font-medium flex md:hidden"
            >
              Tambah
            </button>
          </div>
        )}
      </div>
      <div className="w-full overflow-auto">
        {data ? (
          <table className="w-full divide-y divide-gray-200 text-center overflow-auto md:max-w-none max-w-full">
            <thead className="bg-slate-100 max-w-full overflow-auto">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-l font-bold text-gray-400 uppercase tracking-wider text-center w-4 md:w-[2rem]"
                >
                  NO
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-l font-bold text-gray-400 uppercase tracking-wider text-center"
                >
                  URAIAN
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-l font-bold text-gray-400 uppercase tracking-wider text-center "
                >
                  TOTAL BIAYA
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-l font-bold text-gray-400 uppercase tracking-wider text-center"
                >
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {allExpenditures &&
                allExpenditures.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 !== 0 ? "bg-slate-100" : "bg-white"}
                  >
                    <th
                      scope="row"
                      className="px-6 py-3 whitespace-nowrap w-[2rem] font-normal"
                    >
                      {item.sequence}
                    </th>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {item.name}
                      {!item.isFixedCost && (
                        <span className="text-red-500">*</span>
                      )}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {item.totalPrice}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <button
                        className="bg-amber-500 hover:bg-[#F9A602] text-white px-3 py-1 rounded-md text-sm font-medium"
                        onClick={() =>
                          navigate(`/proyek/${id}/rincian/${item.id}`)
                        }
                      >
                        <div className="flex items-center gap-2">
                          <EyeIcon />
                          Rincian
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              <tr
                className={
                  allExpenditures?.length % 2 !== 0 ? "bg-slate-100" : ""
                }
              >
                <td
                  colSpan="3"
                  className="px-4 py-2 whitespace-nowrap text-center font-bold text-gray-400 text-base md:text-xl uppercase "
                >
                  Total Biaya
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-left font-bold">
                  {data && data.sumTotal}
                </td>
              </tr>
              <tr
                className={
                  allExpenditures?.length % 2 === 0 ? "bg-slate-100" : ""
                }
              >
                <td
                  colSpan="3"
                  className="px-4 py-2 whitespace-nowrap text-center font-bold text-gray-400 text-base md:text-xl uppercase"
                >
                  Margin
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-left font-bold">
                  {margin && margin}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <Skeleton count={3} height={40} />
        )}
      </div>
    </>
  );
};

export default TabelRincian;
