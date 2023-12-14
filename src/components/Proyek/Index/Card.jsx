import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Card = ({ item, Statistik, isLoading }) => {
  return (
    <div className="flex gap-1 lg:gap-3 bg-white rounded-lg shadow p-1 lg:p-3 justify-between items-center min-h-[70px] lg:mih-w-0 min-w-[250px] w-auto">
      <img src={`../components/assets/img/${item.img}.png`} alt={item.img} />
      <div className="text-right mr-3">
        <h2 className="text-gray-400 text-sm lg:text-base font-normal whitespace-nowrap">
          {item.nama}
        </h2>
        <h3
          className={`text-slate-800 text-base lg:text-xl font-medium text-[${item.color}] whitespace-nowrap`}
        >
          {isLoading ? <Skeleton /> : Statistik[`${item.value}`]}
        </h3>
      </div>
    </div>
  );
};

export default Card;
