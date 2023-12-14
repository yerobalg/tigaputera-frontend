import { coreApi } from "../index";

const getBukuKas = (page, limit, interval_month, inspector_id) => {
  const queryParams = new URLSearchParams();

  if (limit !== undefined) queryParams.set("limit", limit);
  if (page !== undefined) queryParams.set("page", page);
  if (interval_month !== undefined)
    queryParams.set("interval_month", interval_month);
  if (inspector_id !== undefined) queryParams.set("inspector_id", inspector_id);

  const queryString = queryParams.toString();
  const url = `/user/inspector/ledger${queryString ? `?${queryString}` : ""}`;

  return coreApi.get(url);
};

export { getBukuKas };
