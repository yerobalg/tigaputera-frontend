import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlash } from "../../components/icons";
import { login } from "../../api/models/pengguna";
import { usePenggunaContext } from "../../context/PenggunaContext";

const Login = () => {
  const [Errors, setErrors] = useState("");
  const [Shown, setShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForms((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { loggedIn } = usePenggunaContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await login(forms);
      const datas = response.data.data;
      loggedIn(datas);
    } catch (error) {
      setErrors(error.response?.data?.message?.description);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-auth bg-cover bg-center h-screen flex items-center justify-center px-7">
      <div className="flex px-8 py-10 md:px-11 md:py-16 bg-white rounded-xl flex-col justify-center items-center gap-5 md:w-auto w-full">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-black text-[25px] font-semibold">Masuk</h1>
          <h3 className="text-gray-400 text-xs font-normal">
            Silakan masuk untuk mengakses akun Anda
          </h3>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-8 md:gap-11 w-full xl:min-w-[330px] justify-center items-center"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="username"
                className="text-gray-400 text-xs font-normal"
              >
                Username<span className="text-red-500">*</span>
              </label>
              <input
                name="username"
                placeholder="Masukkan username anda"
                id="username"
                value={forms.username}
                onChange={(e) => handleChange(e)}
                autoComplete="current-email"
                className="px-3 py-[10px] bg-neutral-100 rounded-sm justify-start items-start w-full text-black text-sm md:text-md font-normal border-none focus:border-none hover:border-none focus:ring-1 focus:outline-[#F9A602]"
                type="text"
                required
              />
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
                  placeholder="Masukkan kata sandi anda"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    appearance: "none",
                  }}
                ></input>
                {forms.password !== "" && (
                  <div
                    className="cursor-pointer"
                    onClick={() => setShown(!Shown)}
                  >
                    {Shown ? <EyeSlash /> : <EyeIcon />}
                  </div>
                )}
              </div>
            </div>
            {Errors && <h3 className="text-sm text-red-500">{Errors}</h3>}
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-[#FFCC68] rounded shadow-lg justify-center items-center text-center text-white text-opacity-90 text-base font-normal w-[156px] hover:bg-[#F9A602]"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                <p className="text-white">Loading...</p>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
