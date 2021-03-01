import { request } from "../../utilsAPI.jsx";

export function getLogsList(
  size = 20,
  page = 0,
  sort = { curSort: "date", date: "DESC" }
) {
  return request({
    url: `${
      process.env.API_BASE_URL
    }/api/v1/log/?size=${size}&page=${page}&sort=${sort.curSort},${
      sort[sort.curSort]
    }`,
    method: "GET",
  });
}

export function getLogsListByType(
  type = "request",
  size = 20,
  page = 0,
  sort = { curSort: "date", date: "DESC" }
) {
  return request({
    url: `${
      process.env.API_BASE_URL
    }/api/v1/log/${type}/?size=${size}&page=${page}&sort=${sort.curSort},${
      sort[sort.curSort]
    }`,
    method: "GET",
  });
}
