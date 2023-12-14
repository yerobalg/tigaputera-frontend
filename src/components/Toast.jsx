import React, { useEffect, useState } from "react";

const Toast = ({ type, message, setAlert }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setAlert(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const getBackgroundColorClass = () => {
    switch (type) {
      case "green":
        return "bg-emerald-100 text-green-800";
      case "red":
        return "bg-rose-200 text-red-900";
      default:
        return "";
    }
  };

  const getBorderColorClass = () => {
    switch (type) {
      case "green":
        return "border-green-600";
      case "red":
        return "border-red-700";
      default:
        return "";
    }
  };

  return (
    <>
      {visible && (
        <div
          className={`w-[87vw] md:w-inherit fixed z-50 top-[3vh] flex justify-center md:justify-end items-center`}
        >
          <div className={`md:top-4 md:fixed md:right-7 px-4 py-3 rounded-md flex gap-2 md:justify-start justify-center items-center ${getBackgroundColorClass()} border-2 ${getBorderColorClass()} min-w-[25vw] transform animate-bounce max-w-[80vw]`}>
            {type === "green" ? <CheckIcon /> : <XIcon />}
            <div className="text-center md:text-left">{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;

const XIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};
