import { useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "../../../Popup";
import { addExpenditureProyek } from "../../../../api/models/proyek";

const TambahPengeluaran = ({
  handleClick,
  setAlerts,
  setErrors,
  setMessage,
}) => {
  const { id_proyek, id } = useParams();

  const [forms, setForms] = useState({
    name: "",
    amount: 0,
    price: 0,
    receiptImage: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "price") {
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setForms((prevState) => ({
      ...prevState,
      receiptImage: file,
    }));
  };

  const createPengawas = async (e) => {
    e.preventDefault();

    if (forms.receiptImage === null) {
      setErrors(true);
      setMessage("Bukti harus diisi");
      setAlerts(true);
      return;
    }

    try {
      setIsLoading(true);
      const response = await addExpenditureProyek(id_proyek, id, forms);
      handleClick();
      setAlerts(true);
      setErrors(false);
      setMessage(response.data.message.description);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrors(true);
      setMessage(error.response.data.message.description || "Error");
      setAlerts(true);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Popup handleClick={handleClick}>
        <form
          onSubmit={(e) => createPengawas(e)}
          className="w-[70vw] md:w-[25vw] flex flex-col gap-5 justify-center items-center"
        >
          <div className="flex flex-col w-full gap-3">
            <h2 className="text-black text-3xl font-semibold">
              Tambah Pengeluaran{" "}
            </h2>
            <h3 className="text-gray-400 text-base font-normal">
              Isi formulir di bawah ini untuk menambah pengeluaran proyek.{" "}
            </h3>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="name" className="text-gray-400 text-xs font-normal">
              Uraian<span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Masukkan nama pengeluaran"
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
              htmlFor="amount"
              className="text-gray-400 text-xs font-normal"
            >
              Jumlah<span className="text-red-500">*</span>
            </label>
            <input
              name="amount"
              placeholder="Masukkan volume"
              id="amount"
              value={forms.amount}
              onChange={(e) => handleChange(e)}
              className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
              type="number"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="price"
              className="text-gray-400 text-xs font-normal"
            >
              Harga Per Satuan<span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              placeholder="Masukkan harga per satuan"
              id="price"
              value={formatCurrency(forms.price.toLocaleString())}
              onChange={(e) => handleChange(e)}
              className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
              type="text"
              required
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
              "Tambah Pengeluaran"
            )}
          </button>
        </form>
      </Popup>
    </>
  );
};

export default TambahPengeluaran;
