import { useCallback, useEffect, useState } from "react";
import { addProyek } from "../../../../api/models/proyek";
import DropDown from "../../../DropDown";
import Popup from "../../../Popup";
import { getPengawas } from "../../../../api/models/pengguna";

const ProyekTypes = [
  { name: "Drainase" },
  { name: "Beton" },
  { name: "Hotmix" },
  { name: "Bangunan" },
];

const TambahProyek = ({ handleClick, setAlerts, setErrors, setMessage }) => {
  const today = new Date().toISOString().split("T")[0];
  const [pengawas, setPengawas] = useState([]);
  const [startDate, setStartDate] = useState(today);
  const [finalDate, setFinalDate] = useState(today);
  const [forms, setForms] = useState({
    companyName: "",
    deptName: "",
    description: "",
    inspectorId: 0,
    length: 0,
    name: "",
    type: "",
    volume: 0,
    width: 0,
    starDate: 0,
    finalDate: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const numericValue = parseFloat(value);
    const newValue = isNaN(numericValue) ? value : numericValue;

    setForms((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleStartDate = (event) => {
    const dateString = event.target.value;
    setStartDate(dateString);
    setFinalDate(dateString);
    const dateEpoch = new Date(dateString).getTime() / 1000;
    console.log(dateString, dateEpoch);

    setForms((prevState) => ({
      ...prevState,
      starDate: dateEpoch,
    }));
  };

  const handleFinalDate = (event) => {
    const dateString = event.target.value;
    setFinalDate(dateString);
    const dateEpoch = new Date(dateString).getTime() / 1000;
    console.log(dateString, dateEpoch);

    setForms((prevState) => ({
      ...prevState,
      finalDate: dateEpoch,
    }));
  };

  const handleChangeDD = (name, value) => {
    setForms((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createProyek = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await addProyek(forms);
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
    setIsLoading(false);
  };

  const getAllPengawas = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getPengawas();
      if (response?.data?.data)
        setPengawas(response?.data?.data);
    } catch (error) {
      setErrors(true);
      setAlerts(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getAllPengawas();
  }, []);

  return (
    <Popup handleClick={handleClick}>
      <form
        onSubmit={createProyek}
        className=" w-[70vw] flex flex-col gap-5 justify-center items-center"
      >
        <div className="flex flex-col w-full gap-3">
          <h2 className="text-black text-3xl font-semibold">Tambah Proyek</h2>
          <h3 className="text-gray-400 text-base font-normal">
            Isi formulir di bawah ini untuk menambah proyek.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-10 py-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="name"
                className="text-gray-400 text-xs font-normal"
              >
                Nama Proyek<span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                placeholder="Jalan Flamboyan"
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
                htmlFor="description"
                className="text-gray-400 text-xs font-normal"
              >
                Nama Pekerjaan<span className="text-red-500">*</span>
              </label>
              <input
                name="description"
                placeholder="Perbaikan Jalan Flamboyan"
                id="description"
                value={forms.description}
                onChange={(e) => handleChange(e)}
                className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="deptName"
                className="text-gray-400 text-xs font-normal"
              >
                Nama Dinas<span className="text-red-500">*</span>
              </label>
              <input
                name="deptName"
                placeholder="PUPR"
                id="deptName"
                value={forms.deptName}
                onChange={(e) => handleChange(e)}
                className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="inspectorId"
                className="text-gray-400 text-xs font-normal"
              >
                Nama Pengawas<span className="text-red-500">*</span>
              </label>
              <DropDown
                data={pengawas}
                name="inspectorId"
                handleChange={handleChangeDD}
                initial="Pilih nama pengawas"
                classname="flex justify-between items-center text-slate-900 text-sm font-normal px-3 py-[10px] bg-neutral-100 rounded-sm w-full border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602] focus:ring-[#F9A602]"
                dropdown="max-h-[100px] overflow-auto"
                color="capitalize text-slate-900 bg-neutral-100"
                databases="id"
                isDisabled={pengawas.length === 0}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="username"
                className="text-gray-400 text-xs font-normal"
              >
                Kategori Proyek<span className="text-red-500">*</span>
              </label>
              <DropDown
                name="type"
                handleChange={handleChangeDD}
                data={ProyekTypes}
                initial="Pilih kategori proyek"
                classname="flex justify-between items-center text-slate-900 text-sm font-normal px-3 py-[10px] bg-neutral-100 rounded-sm w-full border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602] focus:ring-[#F9A602]"
                dropdown="max-h-[100px] overflow-auto"
                color="capitalize text-slate-900 bg-neutral-100"
                databases="name"
              />
            </div>

            {forms.type === "Drainase" && (
              <div className="flex gap-5">
                <div className="flex flex-col gap-1.5 w-full">
                  <label
                    htmlFor="volume"
                    className="text-gray-400 text-xs font-normal"
                  >
                    Volume<span className="text-red-500">*</span>
                  </label>
                  <div className="px-3 py-[10px] bg-neutral-100 rounded-sm items-start w-full text-black text-sm md:text-md font-normal flex justify-between focus:outline-none focus:ring-1 focus:ring-[#F9A602] focus-within:ring-1 focus-within:ring-[#F9A602]">
                    <input
                      name="volume"
                      className="bg-transparent border-none focus:border-none hover:border-none focus:outline-none w-full"
                      value={forms.volume}
                      onChange={(e) => handleChange(e)}
                      type="number"
                      required
                      id="volume"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label
                    htmlFor="length"
                    className="text-gray-400 text-xs font-normal"
                  >
                    Jenis U-ditch<span className="text-red-500">*</span>
                  </label>
                  <div className="flex md:flex-row flex-col gap-2 md:gap-5 items-center">
                    <div className="px-3 py-[10px] bg-neutral-100 rounded-sm items-start w-full text-black text-sm md:text-md font-normal flex justify-between focus:outline-none focus:ring-1 focus:ring-[#F9A602] focus-within:ring-1 focus-within:ring-[#F9A602]">
                      <input
                        name="length"
                        className="bg-transparent border-none focus:border-none hover:border-none focus:outline-none w-full"
                        value={forms.length}
                        onChange={(e) => handleChange(e)}
                        type="number"
                        required
                        id="length"
                        placeholder="0"
                      ></input>
                      cm{" "}
                    </div>
                    x
                    <div className="px-3 py-[10px] bg-neutral-100 rounded-sm items-start w-full text-black text-sm md:text-md font-normal flex justify-between focus:outline-none focus:ring-1 focus:ring-[#F9A602] focus-within:ring-1 focus-within:ring-[#F9A602]">
                      <input
                        name="width"
                        className="bg-transparent border-none focus:border-none hover:border-none focus:outline-none w-full"
                        value={forms.width}
                        onChange={(e) => handleChange(e)}
                        type="number"
                        required
                        id="width"
                        placeholder="0"
                      ></input>
                      cm{" "}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="companyName"
                className="text-gray-400 text-xs font-normal"
              >
                Perusahaan<span className="text-red-500">*</span>
              </label>
              <input
                name="companyName"
                placeholder="CV TPB"
                id="companyName"
                value={forms.companyName}
                onChange={(e) => handleChange(e)}
                className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
                type="text"
                required
              />
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="estimatedFinished"
                  className="text-gray-400 text-xs font-normal"
                >
                  Tanggal Mulai<span className="text-red-500">*</span>
                </label>
                <input
                  name="estimatedFinished"
                  placeholder="Masukkan tanggal perkiraan selesai"
                  id="estimatedFinished"
                  onChange={handleStartDate}
                  className="px-3 py-[10px] bg-neutral-100 rounded-sm w-full justify-start items-start text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
                  type="date"
                  min={today}
                  required
                />
                
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="estimatedFinished"
                  className="text-gray-400 text-xs font-normal"
                >
                  Tanggal Selesai<span className="text-red-500">*</span>
                </label>
                <input
                  name="estimatedFinished"
                  placeholder="Masukkan tanggal perkiraan selesai"
                  id="estimatedFinished"
                  onChange={handleFinalDate}
                  className="px-3 py-[10px] bg-neutral-100 rounded-sm w-full justify-start items-start text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
                  type="date"
                  min={startDate}
                  value={finalDate}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="whitespace-nowrap px-10 py-2 bg-[#FFCC68] rounded shadow-lg justify-center items-center text-center text-white text-opacity-90 text-base font-normal w-auto hover:bg-[#F9A602]"
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
              <p className="text-white">Loading...</p>
            </div>
          ) : (
            "Tambah Proyek"
          )}
        </button>
      </form>
    </Popup>
  );
};

export default TambahProyek;
