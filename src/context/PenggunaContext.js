import React, { createContext, useContext, useEffect, useState } from "react";
import { coreApi } from "../api";
import { getPengguna } from "../api/models/pengguna";
import { useNavigate } from "react-router-dom";

export const defaultValue = {
  isAuthenticated: !!localStorage.getItem("token"),
  penggunaInfo: null,
  loggedIn: () => {},
  logout: () => {},
  fetchPengguna: () => {},
};

const PenggunaContext = createContext(defaultValue);

export const PenggunaWrapper = ({ children }) => {
  let navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultValue.isAuthenticated
  );
  const [penggunaInfo, setpenggunaInfo] = useState(defaultValue.penggunaInfo);

  const loggedIn = (datas) => {
    const token = datas.token;
    const firstLogin = datas.user.isFirstLogin;

    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setpenggunaInfo(defaultValue.penggunaInfo);

    if (firstLogin) {
      navigate("/auth/reset-password");
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setpenggunaInfo(null);
    setIsAuthenticated(false);
    coreApi.defaults.headers.common["Authorization"] = "";
  };

  const fetchPengguna = async () => {
    try {
      const res = await getPengguna();

      if (res.data.data) {
        setpenggunaInfo(res.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPengguna();
    }
  }, [isAuthenticated]);

  return (
    <PenggunaContext.Provider
      value={{
        isAuthenticated,
        loggedIn,
        logout,
        penggunaInfo,
        fetchPengguna,
      }}
    >
      {children}
    </PenggunaContext.Provider>
  );
};

export const usePenggunaContext = () => useContext(PenggunaContext);
