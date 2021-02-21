import React, { useState } from "react";
import PlaceholderLoading from "../../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";
import ChevronSVG from "../../../../../../../../../../assets/tableview/chevron-down.inline.svg";
import EditSVG from "../../../../../../../../../../assets/tableview/edit.inline.svg";

const TableView = ({
  isLoading,
  employeesNotes,
  searchQuery,
  curDay,
  onInputChange,
  todaysWork,
  yesterdaysWork,
}) => {
  const [workshops, setWorkshops] = useState({
    lemz: { active: true, name: "ЦехЛЭМЗ", engName: "lemz" },
    lepsari: { active: true, name: "ЦехЛепсари", engName: "lepsari" },
    ligovskiy: { active: true, name: "ЦехЛиговский", engName: "ligovskiy" },
    office: { active: true, name: "Офис", engName: "office" },
  });
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
      {Object.values(workshops).map((workshop) => {
        const filteredEmployees = sortEmployees(
          filterEmployees(employeesNotes, searchQuery).filter(
            (employee) => employee.employee.workshop === workshop.name
          )
        );
        if (filteredEmployees.length === 0) return null;
        return (
          <div className="notes-journal__list-item">
            <span
              onClick={() =>
                setWorkshops({
                  ...workshops,
                  [workshop.engName]: {
                    ...workshop,
                    active: !workshop.active,
                  },
                })
              }
            >
              {workshop.name}
              <ChevronSVG
                className={`main-window__img ${
                  !workshop.active ? "main-window__img--rotated" : ""
                }`}
              />
            </span>
            <div className="notes-journal__employees">
              {isLoading ? (
                <PlaceholderLoading itemClassName="employees__row" />
              ) : workshop.active ? (
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
                              ? "employees__day employees__weekend"
                              : "employees__day "
                          }
                        >
                          {todaysWork[workshop.engName][
                            employee.employee.id
                          ]?.works.map((work) => (
                            <div className="employees__work-item">
                              <EditSVG className="employees__img" />
                              <div className="employees__work-header">
                                <span>{work.workName}</span>
                                <span>{`${work.hours} ч`}</span>
                              </div>
                              {work.product ? (
                                <div className="employees__item-list">
                                  {work.product.map((product) => (
                                    <span>{`${product.name} - ${product.quantity} шт`}</span>
                                  ))}
                                </div>
                              ) : null}
                              {work.draft ? (
                                <div className="employees__item-list">
                                  {work.draft.map((draft) => (
                                    <span>{`${draft.name} - ${draft.quantity} шт`}</span>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </span>
                        <span
                          className={
                            prevDay.getDay() === 0 || prevDay.getDay() === 6
                              ? "employees__day employees__weekend"
                              : "employees__day "
                          }
                        >
                          {yesterdaysWork[workshop.engName][
                            employee.employee.id
                          ]?.works.map((work) => (
                            <div className="employees__work-item">
                              {work.workName}
                              <EditSVG className="employees__img" />
                            </div>
                          ))}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableView;
