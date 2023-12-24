import { coreApi } from "../index";

// ----------- auth ------------

const login = (data) => {
  return coreApi.post("/auth/login", data);
};

const resetPassword = (data) => {
  return coreApi.patch("/user/reset-password", data);
};

const getPengguna = () => {
  return coreApi.get("/user/profile");
};

// ---------- PENGAWAS ------------

const getPengawas = () => {
  return coreApi.get("/user/inspector");
};

const addPengawas = (data) => {
  return coreApi.post("/user/inspector", data);
};

const deactivePengawas = (id) => {
  return coreApi.delete(`/user/inspector/${id}`);
};

// ---------- OTHER ------------

const getStatistic = () => {
  return coreApi.get("/user/statistics");
};

const getDetailStatistic = (interval_month, user_id) => {
  const queryParams = new URLSearchParams();

  if (interval_month !== undefined)
    queryParams.set("interval_month", interval_month);
  if (user_id !== undefined) queryParams.set("user_id", user_id);

  const queryString = queryParams.toString();
  const url = `/user/statistics/detail${queryString ? `?${queryString}` : ""}`;

  return coreApi.get(url);
};

export {
  login,
  getPengguna,
  resetPassword,
  getPengawas,
  addPengawas,
  deactivePengawas,
  getStatistic,
  getDetailStatistic,
};
