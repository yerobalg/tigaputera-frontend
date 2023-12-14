import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlash } from "../../components/icons";
import { resetPassword } from "../../api/models/pengguna";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import { usePenggunaContext } from "../../context/PenggunaContext";

const ResetPassword = () => {
  const [Errors, setErrors] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState({
    password: "",
    confirm_password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForms((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  const navigate = useNavigate();
  const { penggunaInfo, logout } = usePenggunaContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forms.password !== forms.confirm_password) {
      setErrors("Kata sandi dan konfirmasi kata sandi tidak identik.");
      return;
    } else if (forms.password.length < 8) {
      setErrors("Kata sandi minimal 8 karakter");
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword({
        newPassword: forms.password,
      });

      setIsAlertShown(true);
      navigate("/");
    } catch (error) {
      logout();
      setIsAlertShown(true);
      setErrors(error.response?.data?.message?.description);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-auth bg-cover bg-center h-screen flex items-center justify-center px-7">
      <div className="flex px-8 py-10 md:px-11 md:py-16 bg-white rounded-xl flex-col justify-center items-center gap-5 md:w-auto w-full">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-black text-[25px] font-semibold">
            Buat Kata Sandi
          </h1>
          <h3 className="text-gray-400 text-xs font-normal">
            Selamat datang {penggunaInfo && penggunaInfo?.name}! Buat kata sandi
            untuk melanjutkan{" "}
          </h3>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-8 md:gap-11 w-full xl:min-w-[330px] justify-center items-center"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="password"
                className="text-gray-400 text-xs font-normal"
              >
                Kata Sandi<span className="text-red-500">*</span>
              </label>
              <div
                tabIndex="0"
                className="px-3 py-[10px] bg-neutral-100 rounded-sm items-start w-full text-black text-sm md:text-md font-normal flex justify-between focus:outline-none focus:ring-1 focus:ring-[#F9A602] focus-within:ring-2 focus-within:ring-[#F9A602]"
              >
                <input
                  name="password"
                  className="bg-transparent border-none focus:border-none hover:border-none focus:outline-none w-full"
                  value={forms.password}
                  onChange={(e) => handleChange(e)}
                  type={isPasswordShown ? "text" : "password"}
                  required
                  id="password"
                  placeholder="Minimal 8 karakter"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    appearance: "none",
                  }}
                ></input>
                {forms.password !== "" && (
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsPasswordShown(!isPasswordShown)}
                  >
                    {isPasswordShown ? <EyeSlash /> : <EyeIcon />}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="confirm_password"
                className="text-gray-400 text-xs font-normal"
              >
                Masukkan ulang kata sandi
                <span className="text-red-500">*</span>
              </label>
              <div
                tabIndex="0"
                className="px-3 py-[10px] bg-neutral-100 rounded-sm items-start w-full text-black text-sm md:text-md font-normal flex justify-between focus:outline-none focus:ring-1 focus:ring-[#F9A602] focus-within:ring-2 focus-within:ring-[#F9A602]"
              >
                <input
                  name="confirm_password"
                  className="bg-transparent border-none focus:border-none hover:border-none focus:outline-none w-full"
                  value={forms.confirm_password}
                  onChange={(e) => handleChange(e)}
                  type={isPasswordShown ? "text" : "password"}
                  required
                  id="confirm_password"
                  placeholder="Minimal 8 karakter"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    appearance: "none",
                  }}
                ></input>
                {forms.confirm_password !== "" && (
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsPasswordShown(!isPasswordShown)}
                  >
                    {isPasswordShown ? <EyeSlash /> : <EyeIcon />}
                  </div>
                )}
              </div>
            </div>
            {Errors && <h3 className="text-sm text-red-500">{Errors}</h3>}
          </div>

          <button
            type="submit"
            className="whitespace-nowrap px-6 py-2 bg-[#FFCC68] rounded shadow-lg justify-center items-center text-center text-white text-opacity-90 text-base font-normal w-auto hover:bg-[#F9A602]"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                <p className="text-white">Loading...</p>
              </div>
            ) : (
              "Buat Kata Sandi"
            )}
          </button>
        </form>
        {isAlertShown && (
          <Toast
            setAlert={setIsAlertShown}
            type={Errors !== "" ? "red" : "green"}
            message={Errors !== "" ? Errors : "Kata sandi berhasil dibuat!"}
          />
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
