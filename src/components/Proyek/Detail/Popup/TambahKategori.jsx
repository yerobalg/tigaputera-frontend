import React, { useState } from "react";
import DropDown from "../../../DropDown";
import Popup from "../../../Popup";
import { addKategoriProyek } from "../../../../api/models/proyek";

const ProyekKategori = [
  { name: "Fixed Cost", value: true },
  { name: "Variable Cost", value: false },
];

const TambahKategori = ({
  id,
  handleClick,
  setAlerts,
  setErrors,
  setMessage,
}) => {
  const [forms, setForms] = useState({
    isFixedCost: false,
    name: "",
  });

  const handleChangeDD = (name, value) => {
    setForms((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForms((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createKategoriProyek = async (e) => {
    e.preventDefault();
    try {
      const response = await addKategoriProyek(id, forms);
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
        onSubmit={(e) => createKategoriProyek(e)}
        className="w-[70vw] md:w-[25vw] flex flex-col gap-8 justify-center items-center"
      >
        <div className="flex flex-col w-full gap-3">
          <h2 className="text-black text-2xl md:text-3xl font-semibold">
            Tambah Kategori Anggaran
          </h2>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="name" className="text-gray-400 text-xs font-normal">
              Nama Anggaran<span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Masukkan nama anggaran"
              id="name"
              value={forms.name}
              onChange={(e) => handleChange(e)}
              className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="isFixedCost"
              className="text-gray-400 text-xs font-normal"
            >
              Jenis <span className="text-red-500">*</span>
            </label>
            <DropDown
              data={ProyekKategori}
              name="isFixedCost"
              handleChange={handleChangeDD}
              initial="Pilih jenis"
              classname="flex justify-between items-center text-slate-900 text-sm font-normal px-3 py-[10px] bg-neutral-100 rounded-sm w-full border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602] focus:ring-[#F9A602]"
              dropdown="max-h-[100px] overflow-auto"
              color="capitalize text-slate-900 bg-neutral-100"
              databases="value"
              base_id="0"
            />
          </div>
        </div>
        <button
          type="submit"
          className="whitespace-nowrap px-10 py-2 bg-[#FFCC68] rounded shadow-lg justify-center items-center text-center text-white text-opacity-90 text-base font-normal w-auto hover:bg-[#F9A602]"
        >
          Tambah
        </button>
      </form>
    </Popup>
  );
};

export default TambahKategori;
