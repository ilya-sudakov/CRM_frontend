import React, { useEffect, useState, useContext } from 'react'
import { months } from '../../../../utils/dataObjects.js' //Список месяцев
import './ReportTablePage.scss'
import DownloadIcon from '../../../../../../../../assets/download.svg'
import { getEmployeesByWorkshop } from '../../../../utils/RequestsAPI/Employees.jsx'
import {
  getWorkReportByEmployee,
  getRecordedWorkByMonth,
} from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import TableLoading from '../../../../utils/TableView/TableLoading/TableLoading.jsx'
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx'
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx'
import {
  formatDateStringNoYear,
  numberToString,
  addSpaceDelimiter,
  formatDateString,
} from '../../../../utils/functions.jsx'
import SearchBar from '../../SearchBar/SearchBar.jsx'
import Button from '../../../../utils/Form/Button/Button.jsx'
import { exportReportTableExcel } from '../../../../utils/xlsxFunctions.jsx'
import { UserContext } from '../../../../App.js'

const ReportTablePage = (props) => {
  const [date, setDate] = useState(new Date())
  const [workshops, setWorkshops] = useState([
    { name: 'ЦехЛЭМЗ', allowedRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'] },
    { name: 'ЦехЛиговский', allowedRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY'] },
    { name: 'ЦехЛепсари', allowedRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'] },
    {
      name: 'Офис',
      allowedRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_MANAGER'],
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [workData, setWorkData] = useState([])
  const [dates, setDates] = useState([])
  const [workList, setWorkList] = useState({})
  const [showWindow, setShowWindow] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const userContext = useContext(UserContext)

  const getAllEmployeesWorkData = (date, signal) => {
    setIsLoading(true)
    //Получаем массив с датами месяца
    const dates = []
    for (
      let i = 1;
      i < new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() + 1;
      i++
    )
      dates.push(i)
    setDates([...dates])

    let employeesWorkList = {} //Массив работ для каждого сотрудника за месяц
    // let newWorkList = {}

    return getRecordedWorkByMonth(date.getMonth() + 1, signal)
      .then((res) => res.json())
      .then((res) => {
        //Создаем объект с работами сотрудников, в которых их id - поля объекта,
        //это помогает  для избегания излишних циклов
        res.map((workItem) => {
          if (employeesWorkList[workItem.employee.id] === undefined) {
            employeesWorkList = Object.assign({
              ...employeesWorkList,
              [workItem.employee.id]: {
                employee: workItem.employee,
                workArray: [
                  {
                    workControlProduct: workItem.workControlProduct,
                    partsWorks: workItem.partsWorks,
                    workList: workItem.workList,
                    day: workItem.day,
                    hours: workItem.hours,
                  },
                ],
              },
            })
          } else {
            employeesWorkList = Object.assign({
              ...employeesWorkList,
              [workItem.employee.id]: {
                ...employeesWorkList[workItem.employee.id],
                workArray: [
                  ...employeesWorkList[workItem.employee.id].workArray,
                  {
                    workControlProduct: workItem.workControlProduct,
                    partsWorks: workItem.partsWorks,
                    workList: workItem.workList,
                    day: workItem.day,
                    hours: workItem.hours,
                  },
                ],
              },
            })
          }
        })
        // console.log(employeesWorkList)
        // return setWorkList({ ...employeesWorkList })
      })
      .then(() => {
        //Объединяем работы за одни и те же дни
        let newWorkList = employeesWorkList
        Object.values(employeesWorkList).map((item) => {
          item.workArray.map((workItem) => {
            if (
              newWorkList[item.employee.id].works === undefined ||
              newWorkList[item.employee.id]?.works[workItem.day] === undefined
            ) {
              newWorkList = Object.assign({
                ...newWorkList,
                [item.employee.id]: {
                  ...newWorkList[item.employee.id],
                  works: {
                    ...newWorkList[item.employee.id].works,
                    [workItem.day]: [
                      {
                        workControlProduct: workItem.workControlProduct,
                        partsWorks: workItem.partsWorks,
                        workList: workItem.workList,
                        day: workItem.day,
                        hours: workItem.hours,
                      },
                    ],
                  },
                },
              })
            } else {
              newWorkList = Object.assign({
                ...newWorkList,
                [item.employee.id]: {
                  ...newWorkList[item.employee.id],
                  works: {
                    ...newWorkList[item.employee.id].works,
                    [workItem.day]: [
                      ...newWorkList[item.employee.id].works[workItem.day],
                      {
                        workControlProduct: workItem.workControlProduct,
                        partsWorks: workItem.partsWorks,
                        workList: workItem.workList,
                        day: workItem.day,
                        hours: workItem.hours,
                      },
                    ],
                  },
                },
              })
            }
          })
        })
        // console.log(newWorkList)
        employeesWorkList = newWorkList
      })
      .then(() => {
        //Заполняем дни, которых нет в сводке
        let newWorkList = employeesWorkList
        let sum = 0
        Object.values(employeesWorkList).map((item) => {
          dates.map((date) => {
            if (item.works[date] === undefined) {
              //Проверка, есть ли уже учтенная работа за этот день
              newWorkList = Object.assign({
                ...newWorkList,
                [item.employee.id]: {
                  ...newWorkList[item.employee.id],
                  works: {
                    ...newWorkList[item.employee.id].works,
                    [date]: { day: date, hours: 0 },
                  },
                },
              })
            }
          })
        })
        console.log(newWorkList)
        setIsLoading(false)
        return setWorkList({ ...newWorkList })
      })
  }

  useEffect(() => {
    let abortController = new AbortController()
    getAllEmployeesWorkData(date, abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [date])

  return (
    <div className="report-table-page">
      <div className="main-window">
        <div className="main-window__title">
          Табель
          <Button
            text="Скачать .xlsx"
            imgSrc={DownloadIcon}
            className="main-window__button main-window__button--inverted"
            inverted
            isLoading={isLoading}
            onClick={async () => {
              setIsLoading(true)
              const filteredWorkshops = [
                'ЦехЛЭМЗ',
                'ЦехЛепсари',
                'ЦехЛиговский',
                'Офис',
                'Уволенные',
              ]
              await exportReportTableExcel(new Date(date), filteredWorkshops)
              setIsLoading(false)
            }}
          />
        </div>
        <SearchBar
          title="Поиск по сотрудникам"
          placeholder="Введите запрос для поиска по сотрудникам..."
          setSearchQuery={setSearchQuery}
        />
        <div className="report-table-page__date">
          <InputDate
            selected={Date.parse(date)}
            inputName="Выбор месяца:"
            handleDateChange={(date) => {
              // console.log(value)
              setDate(date)
            }}
            showMonthYearPicker
          />
        </div>
        {/* //Окно для вывода информации о сотруднике и его работе за день */}
        <EmployeeInfo
          // dates={dates}
          // workData={workList}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          selectedInfo={selectedInfo}
          // date={date}
        />
        <TableLoading isLoading={isLoading} />
        <TableView
          dates={dates}
          workData={workList}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setSelectedInfo={setSelectedInfo}
          date={date}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  )
}

export default ReportTablePage

//Таблица с табелем
export const TableView = (props) => {
  const [workshops, setWorkshops] = useState([
    {
      name: 'ЦехЛЭМЗ',
      active: true,
      minimized: true,
    },
    {
      name: 'ЦехЛепсари',
      active: true,
      minimized: true,
    },
    {
      name: 'ЦехЛиговский',
      active: true,
      minimized: true,
    },
    {
      name: 'Офис',
      active: true,
      minimized: true,
    },
  ])

  useEffect(() => {}, [props.date])

  return (
    <div className="report-table-page__tableview">
      {/* //1-ая половина месяца(1-15) */}
      <div className="main-window__title">
        1/2 {months[props.date.getMonth()]}.{props.date.getFullYear()}
      </div>
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>ФИО сотрудника</span>
          {props.dates.map((date) => {
            if (date < 16) {
              return <span>{date}</span>
            } else return
          })}
          <span>Сумма</span>
        </div>
        {workshops.map((workshop) => {
          return (
            <>
              <div className="main-window__list-item main-window__list-item--divider">
                <span>{workshop.name}</span>
              </div>
              {Object.values(props.workData)
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
                  )
                })
                .sort((a, b) => {
                  if (a.employee.lastName < b.employee.lastName) {
                    return -1
                  }
                  if (a.employee.lastName > b.employee.lastName) {
                    return 1
                  }
                  return 0
                })
                .map((work) => {
                  return (
                    <div className="main-window__list-item">
                      <span>
                        {work.employee.lastName +
                          ' ' +
                          work.employee.name +
                          ' ' +
                          work.employee.middleName}
                      </span>
                      {Object.values(work.works).map(
                        (workItem, workItemIndex) => {
                          if (workItemIndex < 15) {
                            return (
                              <span
                                onClick={() => {
                                  if (workItem.length > 0) {
                                    props.setSelectedInfo({
                                      employeeId: work.employee.id,
                                      employee: work.employee,
                                      day: workItem[0].day,
                                      year: props.date.getFullYear(),
                                      month: props.date.getMonth() + 1,
                                      worksId: workItem.map((item) => {
                                        return item.workList.id
                                      }),
                                      works: workItem,
                                    })
                                  } else {
                                    props.setSelectedInfo({
                                      employeeId: work.employee.id,
                                      employee: work.employee,
                                      day: workItem.day,
                                      month: props.date.getMonth() + 1,
                                      year: props.date.getFullYear(),
                                      worksId: null,
                                      works: workItem,
                                    })
                                  }
                                  props.setShowWindow(true)
                                }}
                              >
                                <div className="report-table-report__date-hint">
                                  {formatDateStringNoYear(
                                    new Date(
                                      props.date.getFullYear(),
                                      props.date.getMonth(),
                                      workItem.length > 0
                                        ? workItem[0].day
                                        : workItem.day,
                                    ),
                                  )}
                                </div>
                                {workItem.hours === 0
                                  ? ' '
                                  : workItem.reduce(
                                      (sum, cur) => sum + cur.hours,
                                      0,
                                    )}
                              </span>
                            )
                          }
                        },
                      )}
                      <span>
                        {Object.values(work.works).reduce(
                          (sum, item, index) => {
                            if (item.length > 0 && index < 15) {
                              return (
                                sum +
                                item.reduce((sum, cur) => {
                                  return sum + cur.hours
                                }, 0)
                              )
                            } else return sum
                          },
                          0,
                        )}
                      </span>
                    </div>
                  )
                })}
            </>
          )
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
              return <span>{date}</span>
            } else return
          })}
          <span>Сумма</span>
        </div>
        {workshops.map((workshop) => {
          return (
            <>
              <div className="main-window__list-item main-window__list-item--divider">
                <span>{workshop.name}</span>
              </div>
              {Object.values(props.workData)
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
                  )
                })
                .sort((a, b) => {
                  if (a.employee.lastName < b.employee.lastName) {
                    return -1
                  }
                  if (a.employee.lastName > b.employee.lastName) {
                    return 1
                  }
                  return 0
                })
                .map((work) => {
                  return (
                    <div className="main-window__list-item">
                      <span>
                        {work.employee.lastName +
                          ' ' +
                          work.employee.name +
                          ' ' +
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
                                        return item.workList.id
                                      }),
                                      works: workItem,
                                    })
                                  } else {
                                    console.log('no works')
                                    props.setSelectedInfo({
                                      employeeId: work.employee.id,
                                      employee: work.employee,
                                      day: workItem.day,
                                      month: props.date.getMonth() + 1,
                                      year: props.date.getFullYear(),
                                      worksId: null,
                                      works: workItem,
                                    })
                                  }
                                  props.setShowWindow(true)
                                }}
                              >
                                <div className="report-table-report__date-hint">
                                  {formatDateStringNoYear(
                                    new Date(
                                      props.date.getFullYear(),
                                      props.date.getMonth(),
                                      workItem.length > 0
                                        ? workItem[0].day
                                        : workItem.day,
                                    ),
                                  )}
                                </div>
                                {workItem.hours === 0
                                  ? ' '
                                  : workItem.reduce(
                                      (sum, cur) => sum + cur.hours,
                                      0,
                                    )}
                              </span>
                            )
                          }
                        },
                      )}
                      <span>
                        {Object.values(work.works).reduce(
                          (sum, item, index) => {
                            if (item.length > 0 && index > 14) {
                              return (
                                sum +
                                item.reduce((sum, cur) => {
                                  return sum + cur.hours
                                }, 0)
                              )
                            } else return sum
                          },
                          0,
                        )}
                      </span>
                    </div>
                  )
                })}
            </>
          )
        })}
      </div>
    </div>
  )
}

//Окно для вывода информации о сотруднике и его работе за день
export const EmployeeInfo = (props) => {
  useEffect(() => {}, [props.date])

  return (
    <div className="report-table-page__employee-info">
      <FormWindow
        // title="Отчет работника"
        showWindow={props.showWindow}
        setShowWindow={props.setShowWindow}
        content={
          <div className="report-table-page__employee-wrapper">
            <div className="report-table-page__employee-date">
              {/* Отчет за{' '} */}
              {formatDateString(
                new Date(
                  props.selectedInfo?.year,
                  props.selectedInfo?.month - 1,
                  props.selectedInfo?.day,
                ),
              )}
            </div>
            <div className="report-table-page__employee-title">
              Данные сотрудника
            </div>
            <div className="report-table-page__employee-general">
              <div className="report-table-page__full-name">
                {props.selectedInfo?.employee?.lastName +
                  ' ' +
                  props.selectedInfo?.employee?.name +
                  ' ' +
                  props.selectedInfo?.employee?.middleName}
              </div>
              <div className="report-table-page__workshop">
                {props.selectedInfo?.employee?.workshop}
              </div>
              <div className="report-table-page__position">
                {props.selectedInfo?.employee?.position}
              </div>
            </div>
            {/* //Вывод работ сотрудника */}
            <div className="report-table-page__employee-title">
              Список работ
            </div>
            <div className="report-table-page__employee-works-wrapper">
              {props.selectedInfo?.works?.length === undefined ? (
                <div>Нет учтенной работы</div>
              ) : (
                props.selectedInfo?.works?.map((item) => {
                  console.log(item.workList.work)
                  return (
                    <div className="report-table-page__employee-works-item">
                      <span>{item.workList.work}</span>
                      <span className="report-table-page__employee-hours">
                        {item.hours +
                          ' ' +
                          numberToString(
                            Number.parseInt(Math.floor(item.hours * 100) / 100),
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
                })
              )}
            </div>
            <div className="report-table-page__employee-title">
              Всего:{' '}
              {props.selectedInfo?.works?.length > 0
                ? props.selectedInfo?.works?.reduce(
                    (sum, cur) => sum + cur.hours,
                    0,
                  ) +
                  ' ' +
                  numberToString(
                    Number.parseInt(
                      Math.floor(
                        props.selectedInfo?.works?.reduce(
                          (sum, cur) => sum + cur.hours,
                          0,
                        ) * 100,
                      ) / 100,
                    ),
                    ['час', 'часа', 'часов'],
                  )
                : 0}
            </div>
          </div>
        }
      />
    </div>
  )
}
