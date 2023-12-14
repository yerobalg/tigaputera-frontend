import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// pages
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Loading from "./components/Loading";
import { PenggunaWrapper } from "./context/PenggunaContext";
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

const RouteList = [
  {
    path: "/proyek",
    Element: lazy(() => import("./pages/Proyek/Index")),
  },
  {
    path: "/proyek/:id",
    Element: lazy(() => import("./pages/Proyek/Detail")),
  },
  {
    path: "/proyek/:id_proyek/rincian/:id",
    Element: lazy(() => import("./pages/Proyek/Rincian")),
  },
  {
    path: "/statistik",
    Element: lazy(() => import("./pages/Statistik")),
  },
  {
    path: "/pengawas",
    Element: lazy(() => import("./pages/Pengawas")),
  },
  {
    path: "/buku-kas",
    Element: lazy(() => import("./pages/BukuKas")),
  },
];

function App() {
  return (
    <PenggunaWrapper>
      <Routes>
        <Route path="/" element={<Navigate to="/proyek" />} />
        <Route path="*" element={<Navigate to="/proyek" />} />

        <Route path="/auth" element={<AuthRoute />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          {RouteList.map(({ path, Element }, index) => {
            return (
              <Route
                key={index}
                path={path}
                exact
                element={
                  <Suspense fallback={<Loading />}>
                    <Element />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </PenggunaWrapper>
  );
}

export default App;
