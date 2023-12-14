import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { usePenggunaContext } from "../context/PenggunaContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = usePenggunaContext();

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
