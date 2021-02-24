import pdfMake from "pdfmake";
import { getRequestPdfText } from "../../../utils/pdfFunctions.jsx";
import { workshops } from "./workshopVariables.js";

export const getPageByRequest = (item) => {
  if (item.status === "Завершено") {
    return "completed";
  }
  if (item.status === "Отгружено" || item.status === "Частично отгружено") {
    return "shipped";
  }
  if (
    item.status !== "Завершено" &&
    item.status !== "Отгружено" &&
    item.status !== "Частично отгружено"
  ) {
    return "open";
  }
  return "open";
};

export const filterRequestsByPage = (data, page) => {
  return data.filter((item) => {
    if (page === "Завершено" && item.status === "Завершено") {
      return true;
    }
    if (
      page === "Отгружено" &&
      (item.status === "Отгружено" || item.status === "Частично отгружено")
    ) {
      return true;
    }
    if (
      page === "Открытые" &&
      item.status !== "Завершено" &&
      item.status !== "Отгружено" &&
      item.status !== "Частично отгружено"
    ) {
      return true;
    }
    return false;
  });
};

export const printRequest = (request) => {
  let dd = getRequestPdfText(
    request.date,
    request.requestProducts,
    request.client?.name ?? request.codeWord,
    workshops[request.factory].name,
    request.id
  );
  pdfMake.createPdf(dd).print();
};
