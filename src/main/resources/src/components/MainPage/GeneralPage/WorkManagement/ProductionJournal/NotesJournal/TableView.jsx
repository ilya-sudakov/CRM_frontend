import React from "react";
import PlaceholderLoading from "../../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";

const TableView = ({
  isLoading,
  workshops,
  employeesNotes,
  searchQuery,
  curDay,
  onInputChange,
}) => {
  const filterEmployees = (employees, searchQuery) => {
    const query = searchQuery.toLowerCase();
    return employees.filter((employee) =>
      employee.employee?.lastName?.toLowerCase()?.includes(query)
    );
  };

  const sortEmployees = (employees) => {
    return employees.sort((a, b) => {
      if (a.employee.lastName < b.employee.lastName) {
        return -1;
      }
      if (a.employee.lastName > b.employee.lastName) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <div className="notes-journal__list">
      {workshops.map((workshop) => {
        const filteredEmployees = sortEmployees(
          filterEmployees(employeesNotes, searchQuery).filter(
            (employee) => employee.employee.workshop === workshop
          )
        );
        if (filteredEmployees.length === 0) return null;
        return (
          <div className="notes-journal__list-item">
            <span>{workshop}</span>
            <div className="notes-journal__employees">
              {isLoading ? (
                <PlaceholderLoading itemClassName="employees__row" />
              ) : (
                filteredEmployees.map((employee) => {
                  const prevDay = new Date(
                    new Date(curDay).setDate(curDay.getDate() - 1)
                  );
                  return (
                    <div className="employees__row">
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
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableView;
