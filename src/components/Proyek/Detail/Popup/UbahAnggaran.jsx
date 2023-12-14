import { useState } from "react";
import { updateAnggaranProyek } from "../../../../api/models/proyek";
import Popup from "../../../Popup";
import { useParams } from "react-router-dom";

const UbahAnggaran = ({
  handleClick,
  data,
  setAlerts,
  setErrors,
  setMessage,
}) => {
  const { id } = useParams();

  const [forms, setForms] = useState({
    budget: parseInt(data[0]?.price.replace(/\D/g, ""), 10),
    pph: parseInt(data[1]?.price.replace(/\D/g, ""), 10) || 1.5,
    ppn: parseInt(data[2]?.price.replace(/\D/g, ""), 10) || 11,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "budget") {
      const numericValue =
        value === "" ? "" : parseFloat(value.replace(/\D/g, ""));
      const formattedValue = isNaN(numericValue)
        ? ""
        : new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
            numericValue
          );
          
      setForms((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));

      event.target.value = formattedValue;
    } else {
      const numericValue = parseFloat(value);
      let newValue = isNaN(numericValue) ? value : numericValue;

      setForms((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  const formatCurrency = (value) => {
    return value.replace(/,/g, ".");
  };

  const editAnggaranProyek = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAnggaranProyek(id, {
        budget: forms.budget,
        pph: forms.pph / 100,
        ppn: forms.ppn / 100,
      });
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
        onSubmit={(e) => editAnggaranProyek(e)}
        className="w-[70vw] md:w-[25vw] flex flex-col gap-8 justify-center items-center"
      >
        <div className="flex flex-col w-full gap-3">
          <h2 className="text-black text-2xl md:text-3xl font-semibold">
            Ubah Pencairan Anggaran{" "}
          </h2>
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="budget" className="text-gray-400 text-xs font-normal">
            Pagu Pekerjaan<span className="text-red-500">*</span>
          </label>
          <input
            name="budget"
            placeholder="Enter a number"
            id="budget"
            value={formatCurrency(forms.budget.toLocaleString())}
            onChange={(e) => handleChange(e)}
            className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
            type="text"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="ppn" className="text-gray-400 text-xs font-normal">
              PPN<span className="text-red-500">*</span>
            </label>
            <div className="px-3 py-[10px] bg-neutral-100 rounded-sm items-start w-full text-black text-sm md:text-md font-normal flex justify-between focus:outline-none focus:ring-1 focus:ring-[#F9A602] focus-within:ring-1 focus-within:ring-[#F9A602]">
              <input
                name="ppn"
                className="bg-transparent border-none focus:border-none hover:border-none focus:outline-none w-full"
                value={forms.ppn !== 0 ? forms.ppn : 11}
                onChange={(e) => handleChange(e)}
                type="number"
                required
                id="ppn"
                placeholder="11"
              ></input>
              %{" "}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="pph" className="text-gray-400 text-xs font-normal">
              PPh<span className="text-red-500">*</span>
            </label>
            <div className="px-3 py-[10px] bg-neutral-100 rounded-sm items-start w-full text-black text-sm md:text-md font-normal flex justify-between focus:outline-none focus:ring-1 focus:ring-[#F9A602] focus-within:ring-1 focus-within:ring-[#F9A602]">
              <input
                name="pph"
                className="bg-transparent border-none focus:border-none hover:border-none focus:outline-none w-full"
                value={forms.pph !== 0 ? forms.pph : 1.5}
                onChange={(e) => handleChange(e)}
                type="number"
                required
                id="pph"
                placeholder="1.5"
              ></input>
              %{" "}
            </div>
          </div>
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

export default UbahAnggaran;
