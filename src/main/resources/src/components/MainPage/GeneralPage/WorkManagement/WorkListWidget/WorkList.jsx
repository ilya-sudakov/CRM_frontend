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
        if (
          userContext.userHasAccess(workshop.visibility) &&
          filterEmployeesObject(Object.entries(employees), workshop).length > 0
        ) {
          return (
            <>
              <div className="work-list-widget__workshop-item">
                {workshop.name}
              </div>
              {sortEmployeesObject(
                filterEmployeesObject(Object.entries(employees), workshop)
              ).map((employee) => {
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
  return (
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
  );
};
