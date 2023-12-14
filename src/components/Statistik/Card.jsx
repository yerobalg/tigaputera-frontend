import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const Card = ({ img, item, index, label }) => {
  return (
    <div
      className={`p-2 lg:p-4 opacity-90 bg-white rounded-lg shadow justify-between items-center gap-2 flex w-full md:w-[300px] xl:w-full lg:min-w-[35%]`}
    >
      <img src={img} alt={label} />
      <div className={`lg:mr-0 mr-2 flex flex-col`}>
        <h3
          className={`text-${
            index === 0 ? "green-600" : "amber-500"
          } text-lg lg:text-2xl font-bold whitespace-nowrap text-right`}
        >
          {item ? item : <Skeleton />}
        </h3>
        <h3 className="text-right text-slate-800 text-base lg:text-xl font-medium text-right">
          {label}
        </h3>
      </div>
    </div>
  );
};

export default Card;
