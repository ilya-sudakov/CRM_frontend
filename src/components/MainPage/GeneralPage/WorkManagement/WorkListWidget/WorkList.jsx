import './WorkListWidget.scss';
import { numberToString, roundUpWorkHours } from 'Utils/functions.jsx';
import { filterEmployeesObject, sortEmployeesObject } from './functions.js';
import { Link } from 'react-router-dom';

const WorkList = ({
  workshops,
  employees,
  employeesMap,
  userContext,
  date = new Date(),
}) => {
  return (
    <div className="work-list-widget__list">
      {workshops.map((workshop) => {
        const filteredEmployees = filterEmployeesObject(
          Object.entries(employees),
          workshop,
        );
        if (
          userContext.userHasAccess(workshop.visibility) &&
          filteredEmployees.filter((item) => employeesMap[item[1].id]).length >
            0
        ) {
          return (
            <div className="work-list-widget__workshop-group">
              <div className="work-list-widget__workshop-item">
                {workshop.name}
              </div>
              {sortEmployeesObject(filteredEmployees).map((employee) => {
                const item = employee[1];
                console.log(item, employee);
                return (
                  <ListItem
                    date={date}
                    item={item}
                    key={employee.id}
                    employeesMap={employeesMap}
                  />
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
};

export default WorkList;

const ListItem = ({ item, employeesMap, date = new Date() }) => {
  return employeesMap[item.id] ||
    (new Date().getDay() !== 0 && new Date().getDay() !== 1) ? (
    <Link
      key={item.id}
      to={`/work-management/record-time?employee=${
        item.id
      }&date=${date.getFullYear()},${date.getMonth() + 1},${date.getDate()}`}
      className={`work-list-widget__item ${
        employeesMap[item.id] ? '' : 'work-list-widget__item--no-data'
      }`}
      target="_blank"
    >
      <div>{item.lastName + ' ' + item.name + ' ' + item.middleName}</div>
      <div>
        {employeesMap[item.id] !== undefined && employeesMap !== undefined ? (
          roundUpWorkHours(employeesMap[item.id]?.hours) +
          ' ' +
          numberToString(
            Number.parseInt(roundUpWorkHours(employeesMap[item.id]?.hours)),
            ['час', 'часа', 'часов'],
          )
        ) : (
          <span className="work-list-widget__info-message">Нет записи</span>
        )}
      </div>
    </Link>
  ) : null;
};
