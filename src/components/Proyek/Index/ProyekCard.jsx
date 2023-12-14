import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProyekCard = ({ data, index }) => {
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

  const navigate = useNavigate();
  return (
    <div className="w-full md:w-[358px] px-3 md:px-6 py-4 h-fit rounded-md shadow bg-slate-100">
      <div className="flex flex-col justify-center w-full gap-[18px]">
        <div className="flex justify-between">
          <h3 className="text-black text-[17px] font-medium">{data.name}</h3>
          <button
            className={`text-center text-xs font-bold px-2 py-1 rounded-[18px]`}
            style={{
              color: `#${data.type.textColorHex}`,
              backgroundColor: `#${data.type.bgColorHex}`,
            }}
          >
            {data.type.name || <Skeleton />}
          </button>
        </div>
        <div className="text-slate-800 text-xs font-normal flex flex-col gap-1 justify-center my-2 mx-auto w-[90%]">
          <div className="flex gap-6">
            <h3 className="w-[40%]">Pengawas</h3>
            <h3 className="font-bold capitalize">{data.inspectorName || <Skeleton />}</h3>
          </div>
          <div className="flex gap-6">
            <h3 className="w-[40%] flex items-center">Status</h3>
            <h3
              className={`px-1.5 py-[3px] rounded-[3px]`}
              style={{
                backgroundColor: `#${data.status.bgColorHex}`,
                color: `#${data.status.textColorHex}`,
              }}
            >
              {data.status.name}
            </h3>
          </div>
          <div className="flex gap-6 text-slate-800 text-xs font-normal">
            <h3 className="w-[40%]">Terakhir diperbarui</h3>
            <h3 className="">{formatTimestamp(data.updatedAt) || <Skeleton />}</h3>
          </div>
        </div>
        <button
          className="mx-auto uppercase w-fit px-5 py-2 bg-amber-500 rounded-md hover:bg-[#F9A602] text-center text-white text-xs font-medium shadow-lg"
          onClick={() => navigate(`/proyek/${data.id}`) || <Skeleton />}
        >
          Lihat detail
        </button>
      </div>
    </div>
  );
};

export default ProyekCard;
