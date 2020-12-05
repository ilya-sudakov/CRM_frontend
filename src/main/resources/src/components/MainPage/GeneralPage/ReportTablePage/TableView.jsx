//Таблица с табелем
import React, { useEffect, useState } from "react";
import { months } from "../../../../utils/dataObjects.js"; //Список месяцев
import PlaceholderLoading from "../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";
import { formatDateStringNoYear } from "../../../../utils/functions.jsx";
import ChevronSVG from "../../../../../../../../assets/tableview/chevron-down.svg";

const TableView = (props) => {
  const [workshops, setWorkshops] = useState([
    {
      name: "ЦехЛЭМЗ",
      active: true,
      minimized: true,
      allowedRoles: ["ROLE_ADMIN", "ROLE_LEMZ", "ROLE_DISPATCHER"],
    },
    {
      name: "ЦехЛепсари",
      active: true,
      minimized: true,
      allowedRoles: ["ROLE_ADMIN", "ROLE_LEPSARI", "ROLE_DISPATCHER"],
    },
    {
      name: "ЦехЛиговский",
      active: true,
      minimized: true,
      allowedRoles: ["ROLE_ADMIN", "ROLE_LIGOVSKIY", "ROLE_DISPATCHER"],
    },
    {
      name: "Офис",
      active: true,
      minimized: true,
      allowedRoles: [
        "ROLE_ADMIN",
        "ROLE_DISPATCHER",
        "ROLE_MANAGER",
        "ROLE_ENGINEER",
      ],
    },
  ]);

  useEffect(() => {}, [props.date]);

  return (
    <div className="report-table-page__tableview">
      {/* //1-ая половина месяца(1-15) */}
      <div className="main-window__title">
        <img
          className="main-window__img"
          style={{ transform: "rotate(90deg)" }}
          onClick={() => {
            const newDate = new Date(
              new Date(props.date).setMonth(props.date.getMonth() - 1)
            );
            props.setDate(newDate);
          }}
          src={ChevronSVG}
        />
        <div>
          1/2 {months[props.date.getMonth()]}.{props.date.getFullYear()}
        </div>
        <img
          className="main-window__img"
          style={{ transform: "rotate(-90deg)" }}
          onClick={() => {
            const newDate = new Date(
              new Date(props.date).setMonth(props.date.getMonth() + 1)
            );
            props.setDate(newDate);
          }}
          src={ChevronSVG}
        />
      </div>
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>ФИО сотрудника</span>
          {props.dates.map((date) => {
            if (date < 16) {
              return <span>{date}</span>;
            } else return;
          })}
          <span>Сумма</span>
        </div>
        {workshops
          .filter((workshop) =>
            props.userContext.userHasAccess(workshop.allowedRoles)
          )
          .map((workshop) => {
            return (
              <>
                <div className="main-window__list-item main-window__list-item--divider">
                  <span>{workshop.name}</span>
                </div>
                {props.isLoading ? (
                  <PlaceholderLoading
                    itemClassName="main-window__list-item"
                    minHeight="45px"
                    items={3}
                  />
                ) : (
                  Object.values(props.workData)
                    .filter((item) => {
                      return (
                        (item.employee.lastName
                          .toLowerCase()
                          .includes(props.searchQuery.toLowerCase()) ||
                          item.employee.name
                            .toLowerCase()
                            .includes(props.searchQuery.toLowerCase()) ||
                          item.employee.middleName
                            .toLowerCase()
                            .includes(props.searchQuery.toLowerCase())) &&
                        item.employee.workshop === workshop.name
                      );
                    })
                    .sort((a, b) => {
                      if (a.employee.lastName < b.employee.lastName) {
                        return -1;
                      }
                      if (a.employee.lastName > b.employee.lastName) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((work) => {
                      return (
                        <div className="main-window__list-item">
                          <span>
                            {work.employee.lastName +
                              " " +
                              work.employee.name +
                              " " +
                              work.employee.middleName}
                          </span>
                          {Object.values(work.works).map(
                            (workItem, workItemIndex) => {
                              if (workItemIndex < 15) {
                                return (
                                  <span
                                    onClick={() => {
                                      // console.log(workItem)
                                      if (workItem.length > 0) {
                                        props.setSelectedInfo({
                                          employeeId: work.employee.id,
                                          employee: work.employee,
                                          day: workItem[0].day,
                                          year: props.date.getFullYear(),
                                          month: props.date.getMonth() + 1,
                                          worksId: workItem.map((item) => {
                                            return item.workList.id;
                                          }),
                                          works: workItem,
                                        });
                                      } else {
                                        props.setSelectedInfo({
                                          employeeId: work.employee.id,
                                          employee: work.employee,
                                          day: workItem.day,
                                          month: props.date.getMonth() + 1,
                                          year: props.date.getFullYear(),
                                          worksId: null,
                                          works: workItem,
                                        });
                                      }
                                      props.setShowWindow(true);
                                    }}
                                  >
                                    <div className="report-table-report__date-hint">
                                      {formatDateStringNoYear(
                                        new Date(
                                          props.date.getFullYear(),
                                          props.date.getMonth(),
                                          workItem.length > 0
                                            ? workItem[0].day
                                            : workItem.day
                                        )
                                      )}
                                    </div>
                                    {workItem.hours === 0
                                      ? " "
                                      : workItem.reduce(
                                          (sum, cur) => sum + cur.hours,
                                          0
                                        )}
                                  </span>
                                );
                              }
                            }
                          )}
                          <span>
                            {Object.values(work.works).reduce(
                              (sum, item, index) => {
                                if (item.length > 0 && index < 15) {
                                  return (
                                    sum +
                                    item.reduce((sum, cur) => {
                                      return sum + cur.hours;
                                    }, 0)
                                  );
                                } else return sum;
                              },
                              0
                            )}
                          </span>
                        </div>
                      );
                    })
                )}
              </>
            );
          })}
      </div>
      {/* //2-ая половина месяца(15-конец месяца) */}
      <div className="main-window__title">
        2/2 {months[props.date.getMonth()]}.{props.date.getFullYear()}
      </div>
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>ФИО сотрудника</span>
          {props.dates.map((date) => {
            if (date > 15) {
              return <span>{date}</span>;
            } else return;
          })}
          <span>Сумма</span>
        </div>
        {workshops
          .filter((workshop) =>
            props.userContext.userHasAccess(workshop.allowedRoles)
          )
          .map((workshop) => {
            return (
              <>
                <div className="main-window__list-item main-window__list-item--divider">
                  <span>{workshop.name}</span>
                </div>
                {props.isLoading ? (
                  <PlaceholderLoading
                    itemClassName="main-window__list-item"
                    minHeight="45px"
                    items={3}
                  />
                ) : (
                  Object.values(props.workData)
                    .filter((item) => {
                      return (
                        (item.employee.lastName
                          .toLowerCase()
                          .includes(props.searchQuery.toLowerCase()) ||
                          item.employee.name
                            .toLowerCase()
                            .includes(props.searchQuery.toLowerCase()) ||
                          item.employee.middleName
                            .toLowerCase()
                            .includes(props.searchQuery.toLowerCase())) &&
                        item.employee.workshop === workshop.name
                      );
                    })
                    .sort((a, b) => {
                      if (a.employee.lastName < b.employee.lastName) {
                        return -1;
                      }
                      if (a.employee.lastName > b.employee.lastName) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((work) => {
                      return (
                        <div className="main-window__list-item">
                          <span>
                            {work.employee.lastName +
                              " " +
                              work.employee.name +
                              " " +
                              work.employee.middleName}
                          </span>
                          {Object.values(work.works).map(
                            (workItem, workItemIndex) => {
                              if (workItemIndex > 14) {
                                return (
                                  <span
                                    onClick={() => {
                                      if (workItem.length > 0) {
                                        props.setSelectedInfo({
                                          employeeId: work.employee.id,
                                          employee: work.employee,
                                          day: workItem[0].day,
                                          month: props.date.getMonth() + 1,
                                          year: props.date.getFullYear(),
                                          worksId: workItem.map((item) => {
                                            return item.workList.id;
                                          }),
                                          works: workItem,
                                        });
                                      } else {
                                        console.log("no works");
                                        props.setSelectedInfo({
                                          employeeId: work.employee.id,
                                          employee: work.employee,
                                          day: workItem.day,
                                          month: props.date.getMonth() + 1,
                                          year: props.date.getFullYear(),
                                          worksId: null,
                                          works: workItem,
                                        });
                                      }
                                      props.setShowWindow(true);
                                    }}
                                  >
                                    <div className="report-table-report__date-hint">
                                      {formatDateStringNoYear(
                                        new Date(
                                          props.date.getFullYear(),
                                          props.date.getMonth(),
                                          workItem.length > 0
                                            ? workItem[0].day
                                            : workItem.day
                                        )
                                      )}
                                    </div>
                                    {workItem.hours === 0
                                      ? " "
                                      : workItem.reduce(
                                          (sum, cur) => sum + cur.hours,
                                          0
                                        )}
                                  </span>
                                );
                              }
                            }
                          )}
                          <span>
                            {Object.values(work.works).reduce(
                              (sum, item, index) => {
                                if (item.length > 0 && index > 14) {
                                  return (
                                    sum +
                                    item.reduce((sum, cur) => {
                                      return sum + cur.hours;
                                    }, 0)
                                  );
                                } else return sum;
                              },
                              0
                            )}
                          </span>
                        </div>
                      );
                    })
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default TableView;
