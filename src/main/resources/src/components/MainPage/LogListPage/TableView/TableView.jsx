import React from "react";
import {
  formatDateStringNoYear,
  formatDateStringToTime,
} from "../../../../utils/functions.jsx";
import "./TableView.scss";

const TableView = (props) => {
  return (
    <div className="log-list-page__table">
      <div className="main-window__list main-window__list--full">
        <div className="main-window__list-item main-window__list-item--header">
          <span>Время</span>
          <span>Пользователь</span>
          <span>Действие</span>
          <span>Описание</span>
        </div>
        {props.data.map((work, work_id) => (
          <div key={work_id} className="main-window__list-item">
            <span>
              <div className="main-window__mobile-text">Время</div>
              {`${formatDateStringNoYear(work.date)} ${formatDateStringToTime(
                work.date
              )} `}
            </span>
            <span>
              <div className="main-window__mobile-text">Пользователь</div>
              {work.author}
            </span>
            <span>
              <div className="main-window__mobile-text">Действие</div>
              {work.action}
            </span>
            <span>
              <div className="main-window__mobile-text">Описание</div>
              {work.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableView;
