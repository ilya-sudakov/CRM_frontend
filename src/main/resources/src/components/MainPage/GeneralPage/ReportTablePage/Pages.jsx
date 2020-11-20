import React, { useEffect, useState } from 'react'
import { getWorkReportByEmployee } from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import SelectEmployee from '../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx'
import SelectEmployeeNew from '../../Dispatcher/Employees/SelectEmployee/SelectEmployeeNew.jsx'
import {
  numberToString,
  addSpaceDelimiter,
  formatDateString,
  formatDateStringNoYear,
} from '../../../../utils/functions.jsx'
import editIcon from '../../../../../../../../assets/tableview/edit.svg'
import { Link } from 'react-router-dom'

export const EmployeePage = ({ userContext, workList, isLoading }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  useEffect(() => {
    console.log(workList)
    if (selectedEmployee === null) return
  }, [selectedEmployee, workList])

  return (
    <div className="employee-page">
      <SelectEmployee
        userHasAccess={userContext.userHasAccess}
        inputName="Выбор сотрудника"
        name="employee"
        handleEmployeeChange={(value, name, employee) => {
          setSelectedEmployee({
            ...employee,
          })
          setSelectedInfo({
            // workList[SelectEmployee.id]
            employeeId: value,
            employeeName: name,
            employee: employee,
            worksId: workList[value]?.workArray
              ? workList[value]?.workArray.map((item) => {
                  return item.workList.id
                })
              : [],
            works: workList[value]?.workArray ?? [],
          })
        }}
      />
      {selectedEmployee && !isLoading ? (
        <EmployeeInfo selectedInfo={selectedInfo} />
      ) : null}
    </div>
  )
}

//Окно для вывода информации о сотруднике и его работе за неделю
const EmployeeInfo = ({ selectedInfo }) => {
  const getWeekDays = (curDate) => {
    let week = []

    for (let i = 1; i <= 7; i++) {
      const first = curDate.getDate() - curDate.getDay() + i
      const day = new Date(curDate.setDate(first))
      week.push(day)
    }

    console.log(week)
    return week
  }

  const [dates, setDates] = useState([])

  useEffect(() => {
    setDates(getWeekDays(new Date()))
  }, [selectedInfo])

  return (
    <div className="report-table-page__employee-info">
      <div className="report-table-page__employee-wrapper">
        {/* <div className="report-table-page__employee-date">
          {formatDateString(
            new Date(
              selectedInfo?.year,
              selectedInfo?.month - 1,
              selectedInfo?.day,
            ),
          )}
        </div> */}
        <div className="report-table-page__employee-title">
          Данные сотрудника
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
            dates.map((date) => {
              return (
                <>
                  {selectedInfo?.works?.filter(
                    (item) => item.day === date.getDate(),
                  ).length > 0 && (
                    <div className="report-table-page__employee-title report-table-page__employee-title--date">
                      {formatDateStringNoYear(date)}
                    </div>
                  )}
                  {selectedInfo?.works
                    ?.filter((item) => item.day === date.getDate())
                    ?.map((item) => {
                      {
                        /* console.log(item) */
                      }
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
                            <Link
                              to={`/work-management/record-time/edit/${item.workId}`}
                            >
                              {item.workList.work}
                              <img
                                className="report-table-page__img"
                                src={editIcon}
                                alt=""
                              />
                            </Link>
                          </span>
                          <span className="report-table-page__employee-hours">
                            {item.hours +
                              ' ' +
                              numberToString(
                                Number.parseInt(
                                  Math.floor(item.hours * 100) / 100,
                                ),
                                ['час', 'часа', 'часов'],
                              )}
                          </span>
                          {(item.workControlProduct.length > 0 ||
                            item?.partsWorks.length > 0) && (
                            <div className="main-window__list">
                              <div className="main-window__list-item main-window__list-item--header">
                                <span>Название</span>
                                <span>Кол-во</span>
                              </div>
                              {item.workControlProduct.map((product) => {
                                return (
                                  <div className="main-window__list-item">
                                    <span>
                                      <div className="main-window__mobile-text">
                                        Название:
                                      </div>
                                      {product.product.name}
                                    </span>
                                    <span>
                                      <div className="main-window__mobile-text">
                                        Кол-во:
                                      </div>
                                      {addSpaceDelimiter(product.quantity)}
                                    </span>
                                  </div>
                                )
                              })}
                              {item.partsWorks.map((draft) => {
                                return (
                                  <div className="main-window__list-item">
                                    <span>
                                      <div className="main-window__mobile-text">
                                        Название:
                                      </div>
                                      {draft.name}
                                    </span>
                                    <span>
                                      <div className="main-window__mobile-text">
                                        Кол-во:
                                      </div>
                                      {addSpaceDelimiter(draft.quantity)}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                </>
              )
            })
          )}
        </div>
        <div className="report-table-page__employee-title">
          Всего:{' '}
          {selectedInfo?.works?.length > 0
            ? selectedInfo?.works?.reduce(
                (sum, cur) =>
                  dates.find((date) => date.getDate() === cur.day) !== undefined
                    ? sum + cur.hours
                    : sum,
                0,
              ) +
              ' ' +
              numberToString(
                Number.parseInt(
                  Math.floor(
                    selectedInfo?.works?.reduce(
                      (sum, cur) =>
                        dates.find((date) => date.getDate() === cur.day) !==
                        undefined
                          ? sum + cur.hours
                          : sum,
                      0,
                    ) * 100,
                  ) / 100,
                ),
                ['час', 'часа', 'часов'],
              )
            : 0}
        </div>
      </div>
    </div>
  )
}
