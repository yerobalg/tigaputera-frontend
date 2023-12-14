import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { usePenggunaContext } from "../context/PenggunaContext";

const AuthRoute = () => {
  const { isAuthenticated } = usePenggunaContext();
  
  if (isAuthenticated) {
    return <Navigate to="/proyek" />;
  }
  return <Outlet />;
};

export default AuthRoute;
