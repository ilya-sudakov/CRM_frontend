import React from "react";
import { Link } from "react-router-dom";
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
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>ID</span>
          <span>Клиент</span>
          <span>Статус</span>
          <span>Сумма</span>
        </div>
        {sortData(data).map((request) => (
          <Link
            className="main-window__list-item"
            key={request.id}
            to={`/requests/${getPageByRequest(request)}#${request.id}`}
          >
            <span>{request.id}</span>
            <span>{request?.client?.name ?? "Не указано"}</span>
            <span>{request.status}</span>
            <span>{request.sum}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RequestsList;
