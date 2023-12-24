import { coreApi } from "../index";

// --------------- GET || GET ---------------
const getProyek = (page, keyword, limit) => {
  const queryParams = new URLSearchParams();

  if (limit !== undefined) queryParams.set("limit", limit);
  if (page !== undefined) queryParams.set("page", page);
  if (keyword !== undefined && keyword !== "")
    queryParams.set("keyword", keyword);

  const queryString = queryParams.toString();
  const url = `/project${queryString ? `?${queryString}` : ""}`;

  return coreApi.get(url);
};

const getProyekById = (id) => {
  return coreApi.get(`/project/${id}/detail`);
};

const getRincianProyek = (id_proyek, id) => {
  return coreApi.get(`/project/${id_proyek}/expenditure/${id}/transaction`);
};

const getNamaProyek = () => {
  return coreApi.get(`/project/name`);
};

const getBukuKasProyek = (proyek_id, page, limit, interval_month) => {
  const queryParams = new URLSearchParams();

  if (limit !== undefined) queryParams.set("limit", limit);
  if (page !== undefined) queryParams.set("page", page);
  if (interval_month !== undefined)
    queryParams.set("interval_month", interval_month);

  const queryString = queryParams.toString();
  const url = `/project/${proyek_id}/ledger${
    queryString ? `?${queryString}` : ""
  }`;

  return coreApi.get(url);
};

// --------------- POST || ADD  ---------------

const addProyek = (data) => {
  return coreApi.post("/project", data);
};

const addKategoriProyek = (id_proyek, data) => {
  return coreApi.post(`/project/${id_proyek}/expenditure`, data);
};

const addExpenditureProyek = (id_proyek, id, data) => {
  const { name, price, amount, receiptImage } = data;

  const body = new FormData();
  body.append("name", name);
  body.append("price", price);
  body.append("amount", amount);
  body.append("receiptImage", receiptImage);

  return coreApi.post(
    `/project/${id_proyek}/expenditure/${id}/transaction`,
    body,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const addProyekIncome = (data, idProyek) => {
  const { amount, ref, receiptImage } = data;

  const body = new FormData();
  body.append("amount", amount);
  body.append("ref", ref);
  body.append("receiptImage", receiptImage);

  return coreApi.post(`/project/${idProyek}/income`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// --------------- PATCH || UPDATE  ---------------

const updateStatusProyek = (id, data) => {
  return coreApi.patch(`/project/${id}/status`, data);
};

const updateAnggaranProyek = (id, data) => {
  return coreApi.patch(`/project/${id}/budget`, data);
};

// --------------- DELETE || DELETE  ---------------

const deleteExpenditureProyek = (id_proyek, id, id_detail) => {
  return coreApi.delete(
    `/project/${id_proyek}/expenditure/${id}/detail/${id_detail}`
  );
};

export {
  getProyek,
  getNamaProyek,
  getProyekById,
  getRincianProyek,
  getBukuKasProyek,
  addProyek,
  addKategoriProyek,
  addExpenditureProyek,
  updateStatusProyek,
  updateAnggaranProyek,
  deleteExpenditureProyek,
  addProyekIncome,
};
