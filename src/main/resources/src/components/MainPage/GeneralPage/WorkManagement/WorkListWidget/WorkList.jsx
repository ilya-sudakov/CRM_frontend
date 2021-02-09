import React from "react";
import "./WorkListWidget.scss";
import {
  numberToString,
  roundUpWorkHours,
} from "../../../../../utils/functions.jsx";
import { filterEmployeesObject, sortEmployeesObject } from "./functions.js";

const WorkList = ({ workshops, employees, employeesMap, userContext }) => {
  return (
    <div className="work-list-widget__list">
      {workshops.map((workshop) => {
        const filteredEmployees = filterEmployeesObject(
          Object.entries(employees),
          workshop
        );
        if (
          userContext.userHasAccess(workshop.visibility) &&
          filteredEmployees.filter((item) => employeesMap[item[1].id]).length >
            0
        ) {
          return (
            <>
              <div className="work-list-widget__workshop-item">
                {workshop.name}
              </div>
              {sortEmployeesObject(filteredEmployees).map((employee) => {
                const item = employee[1];
                return <ListItem item={item} employeesMap={employeesMap} />;
              })}
            </>
          );
        }
      })}
    </div>
  );
};

export default WorkList;

const ListItem = ({ item, employeesMap }) => {
  return employeesMap[item.id] ||
    (new Date().getDay() !== 0 && new Date().getDay() !== 1) ? (
    <div
      index={item.id}
      className={`work-list-widget__item ${
        employeesMap[item.id] ? "" : "work-list-widget__item--no-data"
      }`}
    >
      <div>{item.lastName + " " + item.name + " " + item.middleName}</div>
      <div>
        {employeesMap[item.id] !== undefined && employeesMap !== undefined ? (
          roundUpWorkHours(employeesMap[item.id]?.hours) +
          " " +
          numberToString(
            Number.parseInt(roundUpWorkHours(employeesMap[item.id]?.hours)),
            ["час", "часа", "часов"]
          )
        ) : (
          <span className="work-list-widget__info-message">Нет записи</span>
        )}
      </div>
    </div>
  ) : null;
};
