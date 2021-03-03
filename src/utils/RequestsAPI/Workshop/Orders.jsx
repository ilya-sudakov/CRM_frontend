import { request } from "../../utilsAPI.jsx";

export function getOrdersByName(orderName, signal) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/equipment/name/",
    method: "POST",
    body: JSON.stringify({
      ...orderName,
      signal: signal,
    }),
  });
}

export function getOrderById(id) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/equipment/" + id,
    method: "GET",
  });
}

export function deleteOrder(id) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/equipment/" + id,
    method: "DELETE",
  });
}

export function addOrder(order) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/equipment/",
    method: "POST",
    body: JSON.stringify(order),
  });
}

export function editOrder(order, id) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/equipment/" + id,
    method: "PUT",
    body: JSON.stringify(order),
  });
}

export function addProductToOrder(product) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/equipment_product/",
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function editProductInOrder(product, id) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/equipment_product/" + id,
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export function deleteProductFromOrder(id) {
  return request({
    url: process.env.API_BASE_URL + "/api/v1/equipment_product/" + id,
    method: "DELETE",
  });
}
