import React, { useState } from "react";
import DropDown from "../../../DropDown";
import Popup from "../../../Popup";
import { updateStatusProyek } from "../../../../api/models/proyek";

const ProyekStatus = [
  { name: "Sedang Berjalan" },
  { name: "Ditunda" },
  { name: "Selesai" },
  { name: "Dibatalkan" },
];

const UbahStatus = ({
  id,
  status,
  handleClick,
  setAlerts,
  setErrors,
  setMessage,
}) => {
  const [forms, setForms] = useState({
    status,
  });

  const handleChangeDD = (name, value) => {
    setForms((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editStatusProyek = async (e) => {
    e.preventDefault();

    try {
      const response = await updateStatusProyek(id, forms);
      handleClick();
      setErrors(false);
      setMessage(response.data.message.description);
      setAlerts(true);
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
    <Popup handleClick={handleClick}>
      <form
        onSubmit={(e) => editStatusProyek(e)}
        className="w-[70vw] md:w-[25vw] flex flex-col gap-8 justify-center items-center"
      >
        <div className="flex flex-col w-full gap-3">
          <h2 className="text-black text-2xl md:text-3xl font-semibold">
            Ubah Status Proyek
          </h2>
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="username"
            className="text-gray-400 text-xs font-normal"
          >
            Status Proyek<span className="text-red-500">*</span>
          </label>
          <DropDown
            data={ProyekStatus}
            name="status"
            handleChange={handleChangeDD}
            initial={status}
            classname="flex justify-between items-center text-slate-900 text-sm font-normal px-3 py-[10px] bg-neutral-100 rounded-sm w-full border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602] focus:ring-[#F9A602]"
            dropdown="max-h-[100px] overflow-auto"
            color="capitalize text-slate-900 bg-neutral-100"
            databases="name"
            base_id="0"
          />
        </div>
        <button
          type="submit"
          className="whitespace-nowrap px-10 py-2 bg-[#FFCC68] rounded shadow-lg justify-center items-center text-center text-white text-opacity-90 text-base font-normal w-auto hover:bg-[#F9A602]"
        >
          Ubah
        </button>
      </form>
    </Popup>
  );
};

export default UbahStatus;
