import React from "react";
import { sortByField } from "../../../../../../utils/sorting/sorting.js";

const TableView = ({
  isLoadingEmployees,
  workshops,
  employeesNotes,
  searchQuery,
  curDay,
  onInputChange,
}) => {
  const filterEmployees = (employees, searchQuery) => {
    const query = searchQuery.toLowerCase();
    return employees.filter((employee) =>
      employee.employee.lastName.toLowerCase().includes(query)
    );
  };

  return (
    <div className="notes-journal__list">
      {isLoadingEmployees
        ? null
        : workshops.map((workshop) => {
            const filteredEmployees = sortByField(
              filterEmployees(employeesNotes, searchQuery).filter(
                (employee) => employee.employee.workshop === workshop
              ),
              { fieldName: "lastName", direction: "desc" }
            );
            if (filteredEmployees.length === 0) return null;
            return (
              <div className="notes-journal__list-item">
                <span>{workshop}</span>
                <div className="notes-journal__employees">
                  {filteredEmployees.map((employee, index) => {
                    const prevDay = new Date(
                      new Date(curDay).setDate(curDay.getDate() - 1)
                    );
                    return (
                      <div
                        className={`employees__row ${
                          index % 2 === 0 ? "employees__row--even" : ""
                        }`}
                      >
                        <span>
                          {`${employee.employee.lastName} ${employee.employee.name} ${employee.employee.middleName}`}
                          <div>{employee.employee.position}</div>
                        </span>
                        <div className="employees__days-wrapper">
                          <span
                            className={
                              prevDay.getDay() === 0 || prevDay.getDay() === 6
                                ? "employees__weekend"
                                : ""
                            }
                          >
                            <div>Вчера</div>
                            <textarea
                              onChange={({ target }) =>
                                onInputChange(
                                  target.value,
                                  "yesterday",
                                  employee.employee.id
                                )
                              }
                              value={employee.workCommentYesterday}
                              placeholder={
                                prevDay.getDay() === 0 || prevDay.getDay() === 6
                                  ? "Выходной"
                                  : "Введите текст..."
                              }
                            />
                          </span>
                          <span
                            className={
                              curDay.getDay() === 0 || curDay.getDay() === 6
                                ? "employees__weekend"
                                : ""
                            }
                          >
                            <div>Сегодня</div>
                            <textarea
                              onChange={({ target }) =>
                                onInputChange(
                                  target.value,
                                  "today",
                                  employee.employee.id
                                )
                              }
                              value={employee.workCommentToday}
                              placeholder={
                                curDay.getDay() === 0 || curDay.getDay() === 6
                                  ? "Выходной"
                                  : "Введите текст..."
                              }
                            />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default TableView;
