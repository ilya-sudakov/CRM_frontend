import React, { useState, useEffect } from "react";
import "./TableView.scss";
import "../../../../../../utils/MainWindow/MainWindow.scss";
import { formatDateString } from "../../../../../../utils/functions.jsx";
import okSVG from "../../../../../../../assets/tableview/ok.svg";
import PlaceholderLoading from "../../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";

const TableView = (props) => {
  useEffect(() => {
    props.setShowWindow && props.setShowWindow(false);
  }, [props.closeWindow]);

  return (
    <div className="tableview-select-employees">
      <div className="main-window">
        <div className="main-window__list main-window__list--full">
          <div className="main-window__list-item main-window__list-item--header">
            <span>ФИО</span>
            <span>Дата рождения</span>
            <span>Подразделение</span>
            <span>Должность</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {props.isLoading ? (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="35px"
              items={10}
            />
          ) : (
            props.data.map(
              (employee, employee_id) =>
                employee.relevance !== "Уволен" && (
                  <div
                    className="main-window__list-item"
                    key={employee_id}
                    onClick={() => {
                      props.selectEmployee(
                        employee?.lastName +
                          " " +
                          employee?.name +
                          " " +
                          employee?.middleName,
                        employee?.id,
                        employee
                      );
                      props.setCloseWindow(!props.closeWindow);
                    }}
                  >
                    <span>
                      <div className="main-window__mobile-text">ФИО:</div>
                      {employee?.lastName +
                        " " +
                        employee?.name +
                        " " +
                        employee?.middleName}
                    </span>
                    <span>
                      <div className="main-window__mobile-text">
                        Дата рождения:
                      </div>
                      {formatDateString(
                        employee?.dateOfBirth ?? employee?.yearOfBirth
                      )}
                    </span>
                    <span>
                      <div className="main-window__mobile-text">
                        Подразделение:
                      </div>
                      {employee?.workshop}
                    </span>
                    <span>
                      <div className="main-window__mobile-text">Должность:</div>
                      {employee?.position}
                    </span>
                    <div className="main-window__actions">
                      <div
                        className="main-window__action"
                        title="Выбрать сотрудника"
                        onClick={() => {
                          props.selectEmployee(
                            employee?.lastName +
                              " " +
                              employee?.name +
                              " " +
                              employee?.middleName,
                            employee?.id,
                            employee
                          );
                          props.setCloseWindow(!props.closeWindow);
                        }}
                      >
                        <img className="main-window__img" src={okSVG} />
                      </div>
                    </div>
                  </div>
                )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TableView;
