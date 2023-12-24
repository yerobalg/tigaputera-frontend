import { useState, useCallback, useEffect } from "react";
import Popup from "../../Popup";
import { addProyekIncome } from "../../../api/models/proyek";
import { getNamaProyek } from "../../../api/models/proyek";
import DropDown from "../../DropDown";

const TambahPemasukan = ({ handleClick, setAlerts, setErrors, setMessage }) => {
  const [forms, setForms] = useState({
    ref: "Direktur",
    amount: 0,
    receiptImage: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [proyek, setProyek] = useState([]);
  const [idProyek, setIdProyek] = useState(0);

  const fetchNamaProyek = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getNamaProyek();
      const data = response?.data?.data;
      setProyek(data);
    } catch (error) {
      setErrors(true);
      setAlerts(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNamaProyek();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "amount") {
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

  const handleChangeDD = (_, value) => {
    setIdProyek(value);
  };

  const formatCurrency = (value) => {
    return value.replace(/,/g, ".");
  };

  const createIncome = async (e) => {
    e.preventDefault();

    if (idProyek === 0) {
      setErrors(true);
      setMessage("Harap pilih proyek");
      setAlerts(true);
      return;
    }
    try {
      setIsLoading(true);
      const response = await addProyekIncome(forms, idProyek);
      handleClick();
      setAlerts(true);
      setErrors(false);
      setMessage(response.data.message.description);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrors(true);
      setMessage(error?.response?.data?.message?.description);
      setAlerts(true);
    }

    setIsLoading(false);
  };

  const handleFileChange = (event) => {
    setForms((prevState) => ({
      ...prevState,
      receiptImage: event.target.files[0],
    }));
  };

  return (
    <>
      <Popup handleClick={handleClick}>
        <form
          onSubmit={(e) => createIncome(e)}
          className="w-[70vw] md:w-[25vw] flex flex-col gap-5 justify-center items-center"
        >
          <div className="flex flex-col w-full gap-3">
            <h2 className="text-black text-3xl font-semibold">
              Tambah Pemasukan
            </h2>
            <h3 className="text-gray-400 text-base font-normal">
              Isi formulir di bawah ini untuk menambah pemasukan.{" "}
            </h3>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="amount"
              className="text-gray-400 text-xs font-normal"
            >
              Nominal<span className="text-red-500">*</span>
            </label>
            <input
              name="amount"
              placeholder="Masukkan nominal"
              id="amount"
              value={formatCurrency(forms.amount.toLocaleString())}
              onChange={(e) => handleChange(e)}
              className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
              type="text"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="ref" className="text-gray-400 text-xs font-normal">
              Sumber<span className="text-red-500">*</span>
            </label>
            <input
              name="ref"
              placeholder="Masukkan sumber"
              id="ref"
              value={forms.ref}
              onChange={(e) => handleChange(e)}
              className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
              type="text"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="username"
              className="text-gray-400 text-xs font-normal"
            >
              Proyek<span className="text-red-500">*</span>
            </label>
            <DropDown
              name="type"
              handleChange={handleChangeDD}
              data={proyek}
              initial="Pilih proyek"
              classname="flex justify-between items-center text-slate-900 text-sm font-normal px-3 py-[10px] bg-neutral-100 rounded-sm w-full border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602] focus:ring-[#F9A602]"
              dropdown="max-h-[100px] overflow-auto"
              color="capitalize text-slate-900 bg-neutral-100"
              databases="id"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="price"
              className="text-gray-400 text-xs font-normal"
            >
              Bukti<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              class="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-sm file:text-sm file:bg-[#FFCC68] file:text-white text-gray-700 bg-neutral-100 file:cursor-pointer file:font-semibold hover:file:bg-[#F9A602] file:border-0"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => handleFileChange(e)}
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              Upload bukti transfer atau kwitansi
            </p>
          </div>

          <button
            type="submit"
            className="whitespace-nowrap px-6 py-2 bg-[#FFCC68] rounded shadow-lg justify-center items-center text-center text-white text-opacity-90 text-base font-normal hover:bg-[#F9A602]"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                <p className="text-white">Loading...</p>
              </div>
            ) : (
              "Tambah Pemasukan"
            )}
          </button>
        </form>
      </Popup>
    </>
  );
};

export default TambahPemasukan;
