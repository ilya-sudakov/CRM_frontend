import React from "react";
import { Link } from "react-router-dom";
import {
  formatDateString,
  dateDiffInDays,
  addSpaceDelimiter,
} from "../../../../utils/functions.jsx";
import { productsStatuses, requestStatuses } from "../workshopVariables.js";
import downloadSVG from "../../../../../../../../assets/download.svg";

export const renderIdColumn = (request = { id: 0 }, workshopName = "") => {
  return (
    <span className="requests__column--id">{`${
      workshopName === "requests" ? "Заявка" : "Очередь производства"
    } #${request.id}`}</span>
  );
};

export const renderDateCreatedColumn = ({ date }) => {
  return (
    <span className="requests__column--date">
      <div className="main-window__mobile-text">Дата:</div>
      {formatDateString(date)}
    </span>
  );
};

export const renderClientColumn = ({ client, codeWord }) => {
  return (
    <span className="requests__column--client">
      <div className="main-window__mobile-text">Кодовое слово:</div>
      {client ? (
        <Link
          target="_blank"
          className="main-window__link"
          to={`/clients/edit/${client.id}`}
        >
          {client.name}
        </Link>
      ) : (
        codeWord
      )}
    </span>
  );
};

export const renderResponsibleColumn = ({ responsible }) => {
  return (
    <span className="requests__column--responsible">
      <div className="main-window__mobile-text">Ответственный:</div>
      {responsible}
    </span>
  );
};

export const renderDateShippedColumn = (request) => {
  return (
    <span className="requests__column--date-shipping">
      <div className="main-window__mobile-text">Отгрузка:</div>
      {request.status === "Отгружено" || request.status === "Завершено" ? (
        <div
          className={`main-window__reminder ${
            Math.abs(
              dateDiffInDays(
                new Date(request.date),
                new Date(request.shippingDate)
              )
            ) > 7
              ? ""
              : "main-window__reminder--positive"
          }`}
        >
          {Math.abs(
            dateDiffInDays(
              new Date(request.date),
              new Date(request.shippingDate)
            )
          ) > 7 ? (
            <div>&#x2713;</div>
          ) : (
            <div>&#x2713;</div>
          )}
          <div>
            {formatDateString(
              request.shippingDate === null ||
                request.shippingDate === undefined
                ? new Date()
                : request.shippingDate
            )}
          </div>
        </div>
      ) : new Date(request.shippingDate) < new Date() ? (
        <div className="main-window__reminder main-window__reminder--info">
          <div>!</div>
          <div>
            {formatDateString(
              request.shippingDate === null ||
                request.shippingDate === undefined
                ? new Date()
                : request.shippingDate
            )}
          </div>
        </div>
      ) : (
        <div className="main-window__date">
          {formatDateString(
            request.shippingDate === null || request.shippingDate === undefined
              ? new Date()
              : request.shippingDate
          )}
        </div>
      )}
    </span>
  );
};

export const renderCommentColumn = ({ comment }) => {
  return (
    <span title={comment} className="requests__column--comment">
      <div className="main-window__mobile-text">Комментарий:</div>
      {comment}
    </span>
  );
};

export const renderPriceColumn = ({ sum }) => {
  return (
    <span className="requests__column--price">
      {`${sum ? addSpaceDelimiter(sum) : 0} руб.`}
    </span>
  );
};

export const renderRequestStatusColumn = (
  request,
  userContext,
  handleStatusChange
) => {
  return (
    <span
      className={
        "main-window__list-item--" +
        requestStatuses.find(
          (item) =>
            item.name === request.status || item.oldName === request.status
        )?.className +
        " requests__column--status"
      }
    >
      <div className="main-window__mobile-text">Статус заявки:</div>
      <select
        id={request.id}
        index={request.id}
        sum={request.sum}
        className="main-window__status_select"
        value={request.status}
        onChange={handleStatusChange}
      >
        {requestStatuses.map((status) => {
          if (userContext.userHasAccess(status.access)) {
            return (
              <option
                value={
                  status.oldName === request.status
                    ? status.oldName
                    : status.name
                }
              >
                {status.name}
              </option>
            );
          } else {
            return <option style={{ display: `none` }}>{status.name}</option>;
          }
        })}
      </select>
    </span>
  );
};

export const renderProductsMinimizedColumn = ({ requestProducts = [] }) => {
  return (
    <span className="requests__column--products">
      <div>
        {addSpaceDelimiter(
          requestProducts.reduce(
            (prev, cur) => prev + Number.parseFloat(cur.quantity),
            0
          )
        )}
      </div>
      ед. продукции
    </span>
  );
};

export const renderProductsColumn = (
  request,
  downloadImage,
  createLabelForProduct,
  handleProductStatusChange
) => {
  return (
    <div className="main-window__list-col">
      <div className="main-window__list-col-row main-window__list-col-row--header">
        <span>Название</span>
        <span>Упаковка</span>
        <span>Кол-во</span>
        <span>Статус</span>
      </div>
      {request?.requestProducts
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
        .map((product) => {
          return (
            <div
              className={`main-window__list-col-row main-window__list-item--${
                productsStatuses.find(
                  (item) =>
                    item.className === product.status ||
                    item.oldName === product.status
                )?.className
              }`}
            >
              <span onClick={() => createLabelForProduct(product)}>
                <div className="main-window__mobile-text">Название:</div>
                {product.name}
              </span>
              <span>
                <div className="main-window__mobile-text">Упаковка:</div>
                {product.packaging}
              </span>
              <span>
                <div className="main-window__mobile-text">Кол-во:</div>
                {`${addSpaceDelimiter(product.quantity)} шт.`}
              </span>
              <span
                className={
                  "main-window__list-item--" +
                  productsStatuses.find(
                    (item) =>
                      item.className === product.status ||
                      item.oldName === product.status
                  )?.className
                }
              >
                <div className="main-window__mobile-text">Статус:</div>
                <select
                  // id={product.id}
                  className="main-window__status_select"
                  value={product.status}
                  onChange={({ target }) =>
                    handleProductStatusChange(product.id, target.value)
                  }
                >
                  {productsStatuses.map((status) => (
                    <option
                      value={
                        status.oldName === product.status
                          ? status.oldName
                          : status.className
                      }
                    >
                      {status.name}
                    </option>
                  ))}
                </select>
              </span>
              <span
                onClick={() => downloadImage(product, request.factory)}
                title="Скачать этикетку"
              >
                <div className="main-window__mobile-text">Скачать этикетку</div>
                <img className="main-window__img" src={downloadSVG} />
              </span>
            </div>
          );
        })}
    </div>
  );
};
