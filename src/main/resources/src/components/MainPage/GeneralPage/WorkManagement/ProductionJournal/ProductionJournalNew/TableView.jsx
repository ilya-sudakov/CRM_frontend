import React, { useState } from "react";
import PlaceholderLoading from "../../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";
import ChevronSVG from "../../../../../../../../../../assets/tableview/chevron-down.inline.svg";
import EditSVG from "../../../../../../../../../../assets/tableview/edit.inline.svg";
import AddToButton from "../../../../../../utils/Form/AddToButton/AddToButton.jsx";

const TableView = ({
  isLoading,
  employeesNotes,
  searchQuery,
  curDay,
  todaysWork,
  yesterdaysWork,
  handleOpenWorkForm,
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
      employee?.lastName?.toLowerCase()?.includes(query)
    );
  };

  const sortEmployees = (employees) => {
    return employees.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
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
            (employee) => employee.workshop === workshop.name
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
                        {`${employee.lastName} ${employee.name} ${employee.middleName}`}
                        <div>{employee.position}</div>
                      </span>
                      <div className="employees__days-wrapper">
                        <span
                          className={
                            prevDay.getDay() === 0 || prevDay.getDay() === 6
                              ? "employees__day employees__weekend"
                              : "employees__day "
                          }
                        >
                          <div className="employees__day-header">
                            <AddToButton
                              text="Добавить работу"
                              onClick={() =>
                                handleOpenWorkForm(
                                  "yesterday",
                                  "new",
                                  workshop.engName,
                                  employee,
                                  yesterdaysWork[workshop.engName][employee.id]
                                    ?.works
                                )
                              }
                            />
                            <span>Вчера</span>
                            {yesterdaysWork[workshop.engName][employee.id]
                              ?.works?.length > 0 ? (
                              <span>
                                {`${yesterdaysWork[workshop.engName][
                                  employee.id
                                ]?.works?.reduce(
                                  (sum, cur) => cur.hours + sum,
                                  0
                                )} ч`}
                              </span>
                            ) : null}
                          </div>
                          {yesterdaysWork[workshop.engName][
                            employee.id
                          ]?.works.map((work) => (
                            <WorkItem
                              work={work}
                              onClick={() =>
                                handleOpenWorkForm(
                                  "yesterday",
                                  "edit",
                                  workshop.engName,
                                  employee,
                                  yesterdaysWork[workshop.engName][employee.id]
                                    ?.works,
                                  work.id
                                )
                              }
                            />
                          ))}
                        </span>
                        <span
                          className={
                            prevDay.getDay() === 0 || prevDay.getDay() === 6
                              ? "employees__day employees__weekend"
                              : "employees__day "
                          }
                        >
                          <div className="employees__day-header">
                            <AddToButton
                              text="Добавить работу"
                              onClick={() =>
                                handleOpenWorkForm(
                                  "today",
                                  "new",
                                  workshop.engName,
                                  employee,
                                  todaysWork[workshop.engName][employee.id]
                                    ?.works
                                )
                              }
                            />
                            <span>Сегодня</span>
                            {todaysWork[workshop.engName][employee.id]?.works
                              ?.length > 0 ? (
                              <span>
                                {`${todaysWork[workshop.engName][
                                  employee.id
                                ]?.works?.reduce(
                                  (sum, cur) => cur.hours + sum,
                                  0
                                )} ч`}
                              </span>
                            ) : null}
                          </div>
                          {todaysWork[workshop.engName][employee.id]?.works.map(
                            (work) => (
                              <WorkItem
                                work={work}
                                onClick={() =>
                                  handleOpenWorkForm(
                                    "today",
                                    "edit",
                                    workshop.engName,
                                    employee,
                                    todaysWork[workshop.engName][employee.id]
                                      ?.works,
                                    work.id
                                  )
                                }
                              />
                            )
                          )}
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

const WorkItem = ({ work, onClick }) => {
  return (
    <div className="employees__work-item" onClick={onClick}>
      <EditSVG className="employees__img" />
      <div className="employees__work-header">
        <span>{work.workName}</span>
        <span>{`${work.hours} ч`}</span>
      </div>
      {work.product.length > 0 ? (
        <div className="employees__item-list">
          {work.product.map((product) => (
            <span>{`${product.name} - ${product.quantity} шт`}</span>
          ))}
        </div>
      ) : null}
      {work.draft.length > 0 ? (
        <div className="employees__item-list">
          {work.draft.map((draft) => (
            <span>{`${draft.name} - ${draft.quantity} шт`}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
};
