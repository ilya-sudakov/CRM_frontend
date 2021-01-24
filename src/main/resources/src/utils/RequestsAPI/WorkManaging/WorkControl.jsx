import { request } from "../../utilsAPI.jsx";

export function getRecordedWorks() {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/work_control/",
    method: "GET",
  });
}

export function getRecordedWorkById(id) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/work_control/" + id,
    method: "GET",
  });
}

export function getRecordedWorkByMonth(month, year, signal) {
  return request({
    url: `${process.env.API_BASE_URL}/api/v1/work_control/month/${month}&${year}`,
    method: "GET",
    signal: signal,
  });
}

export function getRecordedWorkByDay(
  month,
  day,
  year = new Date().getFullYear(),
  signal
) {
  return request({
    url: `${process.env.API_BASE_URL}/api/v1/work_control/day/${day}&${month}&${year}`,
    method: "GET",
    signal: signal,
  });
}

export function getRecordedWorkByDateRange(dF, mF, yF, dL, mL, yL, signal) {
  return request({
    url: `${process.env.API_BASE_URL}/api/v1/work_control/range/${dF}&${mF}${yF}&${dL}&${mL}&${yL}`,
    method: "GET",
    signal: signal,
  });
}

export function getWorkReportByEmployee(id, month, signal) {
  return request({
    url:
      process.env.API_BASE_URL +
      "/api/v1/work_control/report/" +
      id +
      "&" +
      month,
    method: "GET",
    signal: signal,
  });
}

export function addProductToRecordedWork(
  id,
  productId,
  productQuantity,
  productName
) {
  return request({
    url:
      process.env.API_BASE_URL +
      "/api/v1/work_control/product/" +
      id +
      "&" +
      productId +
      "&" +
      productQuantity,
    method: "POST",
    body: JSON.stringify(productName),
  });
}

export function deleteProductFromRecordedWork(id, productId) {
  return request({
    url:
      process.env.API_BASE_URL +
      "/api/v1/work_control/product/" +
      id +
      "&" +
      productId,
    method: "DELETE",
  });
}

export function addDraftToRecordedWork(id, draftId, draftType, quantity, name) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/work_control/part/",
    method: "POST",
    body: JSON.stringify({
      workControl: id,
      partId: draftId,
      quantity: quantity,
      partType: draftType,
      name: name,
    }),
  });
}

export function deleteDraftFromRecordedWork(id, draftId, draftType) {
  return request({
    url:
      process.env.API_BASE_URL +
      "/api/v1/work_control/part/" +
      id +
      "&" +
      draftId +
      "&" +
      draftType,
    method: "DELETE",
  });
}

export function deleteRecordedWork(id) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/work_control/" + id,
    method: "DELETE",
  });
}

export function addRecordedWork(newWork) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/work_control/",
    method: "POST",
    body: JSON.stringify(newWork),
  });
}

export function editRecordedWork(newWork, id) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/work_control/" + id,
    method: "PUT",
    body: JSON.stringify(newWork),
  });
}
