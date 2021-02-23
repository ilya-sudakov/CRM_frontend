import React, { useContext, useState } from "react";
import PlaceholderLoading from "../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";
import {
  formatDateString,
  addSpaceDelimiter,
} from "../../../../utils/functions.jsx";

import editSVG from "../../../../../../../../assets/tableview/edit.svg";
import deleteSVG from "../../../../../../../../assets/tableview/delete.svg";
import viewSVG from "../../../../../../../../assets/tableview/view.svg";

const Tableview = ({
  data,
  isLoading,
  statuses,
  history,
  deleteItem,
  userHasAccess,
  link,
}) => {
  return (
    <div className="main-window__list main-window__list--full">
      <div className="main-window__list-item main-window__list-item--header">
        <span>Дата создания</span>
        <span>Название</span>
        <span>Продукция</span>
        <span>Комплектация</span>
        <span>Статус</span>
        <span>Дата поставки</span>
        <div className="main-window__actions">Действие</div>
      </div>
      {isLoading && (
        <PlaceholderLoading
          itemClassName="main-window__list-item"
          minHeight="35px"
          items={3}
        />
      )}
      {data.map((order, orderIndex) => {
        return (
          <div
            className={
              "main-window__list-item main-window__list-item--" + order.status
            }
          >
            <span>
              <div className="main-window__mobile-text">Дата создания: </div>
              {formatDateString(order.date)}
            </span>
            <span>
              <div className="main-window__mobile-text">Название: </div>
              {order.name}
            </span>
            <span>
              <div className="main-window__mobile-text">Продукция: </div>
              <div className="main-window__list-col">
                {order.products.map((product) => {
                  return (
                    <div className="workshop-orders__products">
                      <div>{product.name}</div>
                      <div> ({addSpaceDelimiter(product.quantity)} шт.)</div>
                    </div>
                  );
                })}
              </div>
            </span>
            <span>
              <div className="main-window__mobile-text">Назначение: </div>
              {order.assembly}
            </span>
            <span className={"main-window__list-item--" + order.status}>
              <div className="main-window__mobile-text">Статус: </div>
              {statuses.find((item) => item.className === order.status)?.name}
            </span>
            <span>
              <div className="main-window__mobile-text">Дата поставки: </div>
              {new Date(order.deliverBy) < new Date() &&
              order.status !== "completed" ? (
                <div className="main-window__reminder">
                  <div>!</div>
                  <div>{formatDateString(order.deliverBy)}</div>
                </div>
              ) : (
                formatDateString(order.deliverBy)
              )}
            </span>
            <div className="main-window__actions">
              <div
                className="main-window__action"
                title="Просмотр заказа"
                onClick={() => history.push(`${link}/view/${order.id}`)}
              >
                <img className="main-window__img" src={viewSVG} />
              </div>
              <div
                className="main-window__action"
                title="Редактирование заказа"
                onClick={() => history.push(`${link}/edit/${order.id}`)}
              >
                <img className="main-window__img" src={editSVG} />
              </div>
              {userHasAccess(["ROLE_ADMIN"]) && (
                <div
                  className="main-window__action"
                  title="Удаление заказа"
                  onClick={() => deleteItem(orderIndex)}
                >
                  <img className="main-window__img" src={deleteSVG} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tableview;
