import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  formatDateString,
  addSpaceDelimiter,
} from "../../../../../utils/functions.jsx";
import "./TableView.scss";
import editSVG from "../../../../../../../../../assets/tableview/edit.svg";
import deleteSVG from "../../../../../../../../../assets/tableview/delete.svg";
import PlaceholderLoading from "../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";

const TableView = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.data.length > 0 && setIsLoading(false);
  }, [props.data]);

  return (
    <div className="tableview_transportation">
      <div className="main-window__list main-window__list--full">
        <div className="main-window__list-item main-window__list-item--header">
          <span>Дата</span>
          <span>Товар</span>
          <span>Кол-во</span>
          <span>Откуда</span>
          <span>Куда</span>
          <span>Водитель</span>
          <div className="main-window__actions">Действия</div>
        </div>
        {props.isLoading && (
          <PlaceholderLoading
            itemClassName="main-window__list-item"
            minHeight="35px"
            items={15}
          />
        )}
        {props.data.map((transportation, transportation_id) => (
          <div key={transportation_id} className="main-window__list-item">
            <span>
              <div className="main-window__mobile-text">Дата:</div>
              {formatDateString(transportation.date)}
            </span>
            <span>
              <div className="main-window__mobile-text">Товар:</div>
              {transportation.cargo}
            </span>
            <span>
              <div className="main-window__mobile-text">Кол-во:</div>
              {addSpaceDelimiter(transportation.quantity)}
            </span>
            <span>
              <div className="main-window__mobile-text">Откуда:</div>
              {transportation.sender}
            </span>
            <span>
              <div className="main-window__mobile-text">Куда:</div>
              {transportation.recipient}
            </span>
            <span>
              <div className="main-window__mobile-text">Водитель:</div>
              {transportation.driver}
            </span>
            <div className="main-window__actions">
              <Link
                to={"/dispatcher/transportation/edit/" + transportation.id}
                className="main-window__action"
                title="Редактировать запись"
              >
                {/* Редактировать */}
                <img className="main-window__img" src={editSVG} />
              </Link>
              {props.userHasAccess(["ROLE_ADMIN"]) && (
                <div
                  className="main-window__action"
                  onClick={() => props.deleteItem(transportation.id)}
                  title="Удалить запись"
                >
                  {/* Удалить */}
                  <img className="main-window__img" src={deleteSVG} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableView;
