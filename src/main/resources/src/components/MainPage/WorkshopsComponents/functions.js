import pdfMake from "pdfmake";
import { formatDateString } from "../../../utils/functions.jsx";
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

export const filterRequestsByStatuses = (data, statuses) => {
  return data.filter((item) => {
    let check = false;
    let noActiveStatuses = true;
    statuses.map((status) => {
      statuses.map((status) => {
        if (status.visible) {
          noActiveStatuses = false;
        }
      });
      if (
        noActiveStatuses === true ||
        (status.visible &&
          (status.name === item.status || status.oldName === item.status))
      ) {
        check = true;
        return;
      }
    });
    return check;
  });
};

export const filterRequestsBySearchQuery = (data, searchQuery) => {
  const query = searchQuery.toLowerCase();
  return data.filter((item) =>
    item.requestProducts.length !== 0 && item.requestProducts[0].name !== null
      ? item.requestProducts[0].name.toLowerCase().includes(query) ||
        item.id.toString().includes(query) ||
        formatDateString(item.date).includes(query) ||
        (item.codeWord || "").toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.responsible.toLowerCase().includes(query) ||
        formatDateString(item.shippingDate).includes(query)
      : item.status.toLowerCase().includes(query)
  );
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
