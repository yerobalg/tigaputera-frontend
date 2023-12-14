import React from "react";

const ProgressBar = ({ nama, ukuran, color1, color2, total }) => {
  const numericUkuran =
    typeof ukuran === "string" ? parseInt(ukuran, 10) : ukuran;

  return (
    <div>
      <div className="flex w-full justify-between">
        <h3 className="text-gray-400 text-lg font-normal">{nama}</h3>
        <h3>{total}</h3>
      </div>
      <div className={`w-full ${color1} bg-opacity-20 rounded-full h-1.5 mb-4`}>
        <div
          className={`${color2} h-1.5 rounded-full`}
          style={{ width: `${numericUkuran}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
