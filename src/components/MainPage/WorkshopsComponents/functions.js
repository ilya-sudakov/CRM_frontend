import pdfMake from "pdfmake";
import { formatDateString } from "../../../utils/functions.jsx";
import { getRequestPdfText } from "../../../utils/pdfFunctions.js";
import {
  deleteProductsToRequest,
  getRequestById,
  deleteRequest,
  connectClientToRequest,
  addProductsToRequest,
  addRequest,
} from "../../../utils/RequestsAPI/Requests.jsx";
import { workshops } from "./workshopVariables.js";
import { getProductsFromRequestsListPdfText } from "../../../utils/pdfFunctions.js";
import { getCategories } from "../../../utils/RequestsAPI/Products/Categories.js";

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
  getRequestPdfText(
    request.date,
    request.requestProducts,
    request.client?.name ?? request.codeWord,
    workshops[request.factory].name,
    request.id
  );
};

export const deleteItem = (id, loadRequests) => {
  getRequestById(id)
    .then((res) => res.json())
    .then((res) =>
      Promise.all(
        res.requestProducts.map((product) =>
          deleteProductsToRequest(product.id)
        )
      )
    )
    .then(() => deleteRequest(id))
    .then(() => loadRequests())
    .catch((error) => {
      console.log(error);
    });
};

export const printRequestsList = (
  setIsLoading,
  productsQuantities,
  fullName
) => {
  let categories = {};
  setIsLoading(true);
  getCategories()
    .then((res) => res.json())
    .then((res) => {
      res.map((category) => {
        if (categories[category.category] === undefined) {
          categories = { ...categories, [category.category]: {} };
        }
        Object.entries(productsQuantities).map((product) => {
          category.products.map((categoryProduct) => {
            if (product[0] === categoryProduct.name) {
              categories = {
                ...categories,
                [category.category]: {
                  ...categories[category.category],
                  [product[0]]: product[1],
                },
              };
            }
          });
        });
      });
    })
    .then(() => {
      setIsLoading(false);
      getProductsFromRequestsListPdfText(categories, fullName);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
};

export //Копировать заявку
const copySelectedRequest = (id, requests, setIsLoading, loadData) => {
  setIsLoading(true);
  const requestToBeCopied = requests.find((item) => item.id === id);
  let newId = 0;
  addRequest({
    date: requestToBeCopied.date,
    products: requestToBeCopied.requestProducts,
    quantity: requestToBeCopied.quantity,
    clientId: requestToBeCopied.client?.id,
    sum: requestToBeCopied.sum,
    responsible: requestToBeCopied.responsible,
    status: requestToBeCopied.status,
    shippingDate: requestToBeCopied.shippingDate ?? new Date(),
    comment: requestToBeCopied.comment,
    factory: requestToBeCopied.factory,
  })
    .then((res) => res.json())
    .then((res) => {
      newId = res.id;
      return Promise.all(
        requestToBeCopied.requestProducts.map((item) =>
          addProductsToRequest({
            requestId: res.id,
            quantity: item.quantity,
            packaging: item.packaging,
            status: item.status,
            name: item.name,
          })
        )
      );
    })
    .then(() => connectClientToRequest(newId, requestToBeCopied.client?.id))
    .then(() => {
      setIsLoading(false);
      loadData();
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};

export const getRequestsDefaultInputs = (username, type) => {
  return [
    { name: "date", defaultValue: new Date(), isRequired: true, isValid: true },
    {
      name: "responsible",
      defaultValue: username,
      isRequired: true,
      isValid: true,
    },
    {
      name: "status",
      defaultValue: "Ожидание",
      isRequired: true,
      isValid: true,
    },
    { name: "requestProducts", defaultValue: [], isRequired: true },
    {
      name: "shippingDate",
      defaultValue: new Date(new Date().setDate(new Date().getDate() + 7)),
      isRequired: true,
      isValid: true,
    },
    { name: "comment", defaultValue: "" },
    { name: "factory", defaultValue: type },
    { name: "sum", defaultValue: 0 },
    { name: "clientId", defaultValue: 0, isRequired: true },
  ];
};
