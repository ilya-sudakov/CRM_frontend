import React, { useEffect } from "react";
import {
  numberToString,
  addSpaceDelimiter,
  formatDateStringNoYear,
  roundUpWorkHours,
} from "../../../../utils/functions.jsx";
import editIcon from "../../../../../../../../assets/tableview/edit.svg";
import { Link } from "react-router-dom";
import { days } from "../../../../utils/dataObjects.js";

//Окно для вывода информации о сотруднике и его работе за неделю
const EmployeeInfoPanel = ({ selectedInfo, dates = [], header }) => {
  useEffect(() => {
    console.log(selectedInfo);
  }, [selectedInfo]);

  return (
    <div className="report-table-page__employee-info">
      <div className="report-table-page__employee-wrapper">
        <div className="report-table-page__employee-title">
          {header ??
            `Данные сотрудника (${formatDateStringNoYear(
              dates[0]
            )} - ${formatDateStringNoYear(dates[dates.length - 1])})`}
        </div>
        <div className="report-table-page__employee-general">
          <div className="report-table-page__full-name">
            {selectedInfo?.employeeName ??
              `${selectedInfo.employee?.lastName} ${selectedInfo.employee?.name} ${selectedInfo.employee?.middleName}`}
          </div>
          <div className="report-table-page__workshop">
            {selectedInfo?.employee?.workshop}
          </div>
          <div className="report-table-page__position">
            {selectedInfo?.employee?.position}
          </div>
        </div>
        {/* //Вывод работ сотрудника */}
        <div className="report-table-page__employee-title">Список работ</div>
        <div className="report-table-page__employee-works-wrapper">
          {selectedInfo?.works?.length === undefined ? (
            <div>Нет учтенной работы</div>
          ) : (
            dates.map((date) => {
              const filteredData = selectedInfo?.works?.filter((item) => {
                if (item.length > 0) {
                  return (
                    item[0].day === date.getDate() &&
                    item[0].month === date.getMonth() + 1 &&
                    item[0].year === date.getFullYear()
                  );
                }
                return (
                  item.day === date.getDate() &&
                  item.month === date.getMonth() + 1 &&
                  item.year === date.getFullYear()
                );
              });
              return filteredData.length > 0 ? (
                <div className="report-table-page__wrapper">
                  <div className="report-table-page__employee-title report-table-page__employee-title--date">
                    {`${formatDateStringNoYear(date)} - ${days[date.getDay()]}`}
                  </div>
                  {filteredData?.map((item) =>
                    item.length > 0 ? (
                      item.map((workItem) => <WorksItem item={workItem} />)
                    ) : (
                      <WorksItem item={item} />
                    )
                  )}
                </div>
              ) : null;
            })
          )}
        </div>
        <WeekSummary selectedInfo={selectedInfo} dates={dates} />
      </div>
    </div>
  );
};

export default EmployeeInfoPanel;

const WorksItem = ({ item }) => {
  return (
    <div
      className="report-table-page__employee-works-item"
      style={{
        marginBottom: "15px",
        marginTop: "5px",
        marginLeft: "15px",
      }}
    >
      <span>
        <Link to={`/work-management/record-time/edit/${item.workId}`}>
          {item.workList.work}
          <img className="report-table-page__img" src={editIcon} alt="" />
        </Link>
      </span>
      <span className="report-table-page__employee-hours">
        {`${item.hours} ч`}
      </span>
      {(item.workControlProduct.length > 0 || item?.partsWorks.length > 0) && (
        <div className="report-table-page__list">
          {item.workControlProduct.map((product) => (
            <ProductItem item={product} />
          ))}
          {item.partsWorks.map((draft) => (
            <ProductItem item={draft} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductItem = ({ item }) => {
  return (
    <div className="report-table-page__list-item">
      <span>
        <div className="main-window__mobile-text">Название:</div>
        {item.name ?? item.product.name}
      </span>
      <span>
        <div className="main-window__mobile-text">Кол-во:</div>
        {`${addSpaceDelimiter(item.quantity)} шт`}
      </span>
    </div>
  );
};

const WeekSummary = ({ selectedInfo, dates }) => {
  return (
    <div className="report-table-page__employee-title">
      Всего:{` `}
      {selectedInfo?.works?.length > 0
        ? selectedInfo?.works?.reduce(
            (sum, cur) =>
              dates.find((date) => {
                if (cur.length > 0) {
                  return (
                    cur[0].day === date.getDate() &&
                    cur[0].month === date.getMonth() + 1 &&
                    cur[0].year === date.getFullYear()
                  );
                }
                return (
                  cur.day === date.getDate() &&
                  cur.month === date.getMonth() + 1 &&
                  cur.year === date.getFullYear()
                );
              }) !== undefined
                ? sum +
                  (cur.length > 0
                    ? cur.reduce(
                        (sumInner, curInner) => sumInner + curInner.hours,
                        0
                      )
                    : cur.hours)
                : sum,
            0
          ) +
          " " +
          numberToString(
            Number.parseInt(
              roundUpWorkHours(
                selectedInfo?.works?.reduce(
                  (sum, cur) =>
                    dates.find((date) => {
                      if (cur.length > 0) {
                        return (
                          cur[0].day === date.getDate() &&
                          cur[0].month === date.getMonth() + 1 &&
                          cur[0].year === date.getFullYear()
                        );
                      }
                      return (
                        cur.day === date.getDate() &&
                        cur.month === date.getMonth() + 1 &&
                        cur.year === date.getFullYear()
                      );
                    }) !== undefined
                      ? sum +
                        (cur.length > 0
                          ? cur.reduce(
                              (sumInner, curInner) => sumInner + curInner.hours,
                              0
                            )
                          : cur.hours)
                      : sum,
                  0
                )
              )
            ),
            ["час", "часа", "часов"]
          )
        : 0}
    </div>
  );
};
