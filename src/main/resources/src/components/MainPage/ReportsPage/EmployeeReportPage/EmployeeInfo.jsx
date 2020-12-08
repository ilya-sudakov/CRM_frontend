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
const EmployeeInfoPanel = ({ selectedInfo, dates, header }) => {
  useEffect(() => {
    console.log(selectedInfo);
  }, [selectedInfo]);

  return (
    <div className="employee-page__employee-info">
      <div className="employee-page__employee-wrapper">
        <div className="employee-page__employee-title">
          {header ??
            `Данные сотрудника за период (${formatDateStringNoYear(
              dates[0]
            )} - ${formatDateStringNoYear(dates[dates.length - 1])})`}
        </div>
        <div className="employee-page__employee-general">
          <div className="employee-page__full-name">
            {selectedInfo?.employeeName ??
              `${selectedInfo.employee?.lastName} ${selectedInfo.employee?.name} ${selectedInfo.employee?.middleName}`}
          </div>
          <div className="employee-page__workshop">
            {selectedInfo?.employee?.workshop}
          </div>
          <div className="employee-page__position">
            {selectedInfo?.employee?.position}
          </div>
        </div>
        {/* //Вывод работ сотрудника */}
        <div className="employee-page__employee-title">Список работ</div>
        <div className="employee-page__employee-works-wrapper">
          {selectedInfo?.works?.length === undefined ? (
            <div>Нет учтенной работы</div>
          ) : (
            dates.map((date) => {
              return (
                <>
                  {selectedInfo?.works?.filter(
                    (item) =>
                      item.day === date.getDate() &&
                      item.month === date.getMonth() + 1 &&
                      item.year === date.getFullYear()
                  ).length > 0 && (
                    <div className="employee-page__employee-title employee-page__employee-title--date">
                      {`${formatDateStringNoYear(date)} - ${
                        days[date.getDay()]
                      }`}
                    </div>
                  )}
                  {selectedInfo?.works
                    ?.filter(
                      (item) =>
                        item.day === date.getDate() &&
                        item.month === date.getMonth() + 1 &&
                        item.year === date.getFullYear()
                    )
                    ?.map((item) => (
                      <WorksItem item={item} />
                    ))}
                </>
              );
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
      className="employee-page__employee-works-item"
      style={{
        marginBottom: "15px",
        marginTop: "5px",
        marginLeft: "15px",
      }}
    >
      <span>
        <Link to={`/work-management/record-time/edit/${item.id}`}>
          {item.workList.work}
          <img className="employee-page__img" src={editIcon} alt="" />
        </Link>
      </span>
      <span className="employee-page__employee-hours">{`${item.hours} ч`}</span>
      {(item.workControlProduct.length > 0 || item?.partsWorks.length > 0) && (
        <div className="employee-page__list">
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
    <div className="employee-page__list-item">
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
    <div className="employee-page__employee-title">
      Всего:{` `}
      {selectedInfo?.works?.length > 0
        ? selectedInfo?.works?.reduce(
            (sum, cur) =>
              dates.find(
                (date) =>
                  cur.day === date.getDate() &&
                  cur.month === date.getMonth() + 1 &&
                  cur.year === date.getFullYear()
              ) !== undefined
                ? sum + cur.hours
                : sum,
            0
          ) +
          " " +
          numberToString(
            Number.parseInt(
              roundUpWorkHours(
                selectedInfo?.works?.reduce(
                  (sum, cur) =>
                    dates.find(
                      (date) =>
                        cur.day === date.getDate() &&
                        cur.month === date.getMonth() + 1 &&
                        cur.year === date.getFullYear()
                    ) !== undefined
                      ? sum + cur.hours
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
