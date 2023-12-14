import { useState } from "react";
import { addPengawas } from "../../../api/models/pengguna";
import { EyeIcon, EyeSlash } from "../../icons";
import Popup from "../../Popup";

const TambahPengawas = ({ handleClick, setAlerts, setErrors, setMessage }) => {
  const [Shown, setShown] = useState(false);
  const [forms, setForms] = useState({
    name: "",
    password: "",
    username: "",
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForms((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createPengawas = async (e) => {
    e.preventDefault();

    try {
      const response = await addPengawas(forms);
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
              Tambah Pengawas
            </h2>
            <h3 className="text-gray-400 text-base font-normal">
              Isi formulir di bawah ini untuk menambah pengawas.{" "}
            </h3>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="name" className="text-gray-400 text-xs font-normal">
              Nama Pengawas<span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Masukkan nama pengawas"
              id="name"
              value={forms.nama}
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
              Username<span className="text-red-500">*</span>
            </label>
            <input
              name="username"
              placeholder="Minimal 8 karakter"
              id="username"
              value={forms.username}
              onChange={(e) => handleChange(e)}
              className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
              type="text"
              required
            />
            {forms.username && forms.username.length < 8 && (
              <h3 className="text-sm text-red-500 text-left w-full">
                Username minimal 8 karakter
              </h3>
            )}
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="password"
              className="text-gray-400 text-xs font-normal"
            >
              Kata Sandi<span className="text-red-500">*</span>
            </label>
            <div className="px-3 py-[10px] bg-neutral-100 rounded-sm items-start w-full text-black text-sm md:text-md font-normal flex justify-between focus:outline-none focus:ring-1 focus:ring-[#F9A602] focus-within:ring-1 focus-within:ring-[#F9A602]">
              <input
                name="password"
                className="bg-transparent border-none focus:border-none hover:border-none focus:outline-none w-full"
                value={forms.password}
                onChange={(e) => handleChange(e)}
                type={Shown ? "text" : "password"}
                required
                autoComplete="current-password"
                id="password"
                placeholder="Minimal 8 karakter"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "textfield",
                  appearance: "none",
                }}
              ></input>
              {forms.password !== "" && (
                <div className="cursor-pointer" onClick={() => setShown(!Shown)}>
                  {Shown ? <EyeSlash /> : <EyeIcon />}
                </div>
              )}
            </div>
            {forms.password && forms.password.length < 8 && (
              <h3 className="text-sm text-red-500">
                Kata sandi minimal 8 karakter
              </h3>
            )}
          </div>
          <button
            type="submit"
            className="whitespace-nowrap px-6 py-2 bg-[#FFCC68] rounded shadow-lg justify-center items-center text-center text-white text-opacity-90 text-base font-normal hover:bg-[#F9A602]"
          >
            Tambah Pengawas
          </button>
        </form>
      </Popup>
      
    </>
  );
};

export default TambahPengawas;
