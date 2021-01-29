import { request } from "../../utilsAPI.jsx";

export function getLogsList(size = 20, page = 0) {
  return request({
    url: `${process.env.API_BASE_URL}/api/v1/log/?size=${size}&page=${page}`,
    method: "GET",
  });
}
