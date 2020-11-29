import React, { useEffect } from 'react'
import {
  numberToString,
  addSpaceDelimiter,
  formatDateStringNoYear,
  roundUpWorkHours,
} from '../../../../utils/functions.jsx'
import editIcon from '../../../../../../../../assets/tableview/edit.svg'
import { Link } from 'react-router-dom'
import { days } from '../../../../utils/dataObjects.js'

//Окно для вывода информации о сотруднике и его работе за неделю
const EmployeeInfo = ({ selectedInfo, date }) => {
  useEffect(() => {
    console.log(selectedInfo)
  }, [selectedInfo])

  const getWeekDays = (date) => {
    let week = []
    let curDate = new Date(date)

    for (let i = 1; i <= 7; i++) {
      const first = curDate.getDate() - curDate.getDay() + i
      const day = new Date(curDate.setDate(first))
      week.push(day)
    }

    // console.log(curDate, week)
    return week
  }

  // return getWeekDays1(date).map((date) => formatDateStringNoYear(date))
  return (
    <div className="report-table-page__employee-info">
      <div className="report-table-page__employee-wrapper">
        <div className="report-table-page__employee-title">
          {`Данные сотрудника за рабочую неделю (${formatDateStringNoYear(
            getWeekDays(date)[0],
          )} - ${formatDateStringNoYear(getWeekDays(date)[6])})`}
        </div>
        <div className="report-table-page__employee-general">
          <div className="report-table-page__full-name">
            {selectedInfo?.employeeName}
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
            getWeekDays(date).map((date) => {
              return (
                <>
                  {selectedInfo?.works?.filter(
                    (item) =>
                      item.day === date.getDate() &&
                      item.month === date.getMonth() + 1 &&
                      item.year === date.getFullYear(),
                  ).length > 0 && (
                    <div className="report-table-page__employee-title report-table-page__employee-title--date">
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
                        item.year === date.getFullYear(),
                    )
                    ?.map((item) => (
                      <WorksItem item={item} />
                    ))}
                </>
              )
            })
          )}
        </div>
        <WeekSummary selectedInfo={selectedInfo} dates={getWeekDays(date)} />
      </div>
    </div>
  )
}

export default EmployeeInfo

const WorksItem = ({ item }) => {
  return (
    <div
      className="report-table-page__employee-works-item"
      style={{
        marginBottom: '15px',
        marginTop: '5px',
        marginLeft: '15px',
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
  )
}

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
  )
}

const WeekSummary = ({ selectedInfo, dates }) => {
  return (
    <div className="report-table-page__employee-title">
      Всего:{` `}
      {selectedInfo?.works?.length > 0
        ? selectedInfo?.works?.reduce(
            (sum, cur) =>
              dates.find(
                (date) =>
                  cur.day === date.getDate() &&
                  cur.month === date.getMonth() + 1 &&
                  cur.year === date.getFullYear(),
              ) !== undefined
                ? sum + cur.hours
                : sum,
            0,
          ) +
          ' ' +
          numberToString(
            Number.parseInt(
              roundUpWorkHours(
                selectedInfo?.works?.reduce(
                  (sum, cur) =>
                    dates.find(
                      (date) =>
                        cur.day === date.getDate() &&
                        cur.month === date.getMonth() + 1 &&
                        cur.year === date.getFullYear(),
                    ) !== undefined
                      ? sum + cur.hours
                      : sum,
                  0,
                ),
              ),
            ),
            ['час', 'часа', 'часов'],
          )
        : 0}
    </div>
  )
}
