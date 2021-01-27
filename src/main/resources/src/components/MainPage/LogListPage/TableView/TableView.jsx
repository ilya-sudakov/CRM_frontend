import React from "react";
import {
  formatDateStringNoYear,
  formatDateStringToTime,
} from "../../../../utils/functions.jsx";
import "./TableView.scss";

const TableView = (props) => {
  return (
    <div className="main-window__list main-window__list--full">
      <div className="main-window__list-item main-window__list-item--header">
        <span>Время</span>
        <span>Пользователь</span>
        <span>Действие</span>
        <div className="main-window__actions">Действия</div>
      </div>
      {props.data.map((work, work_id) => (
        <div key={work_id} className="main-window__list-item">
          <span>
            <div className="main-window__mobile-text">Время</div>
            {`${formatDateStringToTime(work.date)} ${formatDateStringNoYear(
              work.date
            )}`}
          </span>
          <span>
            <div className="main-window__mobile-text">Пользователь</div>
            {work.username}
          </span>
          <span>
            <div className="main-window__mobile-text">Действие</div>
            {work.action}
          </span>
          <div className="main-window__actions">
            <div
              data-id={work.id}
              className="main-window__action"
              onClick={props.deleteItem}
            >
              Удалить
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableView;
