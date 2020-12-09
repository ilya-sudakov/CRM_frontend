import React from "react";
import { Link } from "react-router-dom";
import {
  addSpaceDelimiter,
  formatDateString,
} from "../../../../../utils/functions.jsx";
import { getPageByRequest } from "../../../Requests/functions.js";
import "./RequestsList.scss";

const RequestsList = ({
  data = [],
  sortBy = { name: ["id"], type: "ASC" },
  title = "",
}) => {
  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a[sortBy.name] < b[sortBy.name]) {
        return sortBy.type === "DESC" ? 1 : -1;
      }
      if (a[sortBy.name] > b[sortBy.name]) {
        return sortBy.type === "DESC" ? -1 : 1;
      }
      return 0;
    });
  };

  return (
    <div className="requests-list">
      <div className="main-window__title">{title}</div>
      {data.length > 0 ? (
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>ID</span>
            <span>Дата создания</span>
            <span>Продукция</span>
            <span>Клиент</span>
            <span>Статус</span>
            <span>Дата отгрузки</span>
            <span>Сумма</span>
          </div>
          {sortData(data).map((request) => (
            <Link
              className="main-window__list-item"
              key={request.id}
              to={`/requests/${getPageByRequest(request)}#${request.id}`}
            >
              <span>
                <div className="main-window__mobile-text">ID</div>
                {request.id}
              </span>
              <span>
                <div className="main-window__mobile-text">Дата создания</div>
                {formatDateString(request.date)}
              </span>
              <span>
                <div className="main-window__mobile-text">Продукция</div>
                {request.requestProducts.map((product) => (
                  <div>{`${product.name} | ${product.quantity} шт`}</div>
                ))}
              </span>
              <span>
                <div className="main-window__mobile-text">Клиент</div>
                {request?.client ? (
                  <Link
                    to={`/clients/edit/${request.client.id}`}
                    className="main-window__link"
                  >
                    {request.client.name}
                  </Link>
                ) : (
                  "Не указано"
                )}
              </span>
              <span>
                <div className="main-window__mobile-text">Статус</div>
                {request.status}
              </span>
              <span>
                <div className="main-window__mobile-text">Дата отгрузки</div>
                {formatDateString(request.shippingDate)}
              </span>
              <span>
                <div className="main-window__mobile-text">Сумма</div>
                {`${addSpaceDelimiter(
                  Number.parseFloat(request.sum === null ? 0 : request.sum)
                )} руб`}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="main-window__info-text">
          Нет заявок за выбранный период
        </div>
      )}
    </div>
  );
};

export default RequestsList;
