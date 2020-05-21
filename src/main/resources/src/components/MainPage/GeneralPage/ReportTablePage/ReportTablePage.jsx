import React, { useState, useEffect } from 'react'
import { months } from '../../../../utils/dataObjects.js' //Список месяцев
import './ReportTablePage.scss'
import { getEmployeesByWorkshop } from '../../../../utils/RequestsAPI/Employees.jsx'
import {
  getWorkReportByEmployee,
  getRecordedWorkByMonth,
} from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import TableLoading from '../../../../utils/TableView/TableLoading/TableLoading.jsx'

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

  const getAllEmployeesWorkData = () => {
    setIsLoading(true)
    //Получаем массив с датами месяца
    const dates = []
    for (
      let i = 1;
      i <
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      ).getDate() +
        1;
      i++
    )
      dates.push(i)
    setDates([...dates])

    let employeesWorkList = {} //Массив работ для каждого сотрудника за месяц
    // let newWorkList = {}

    return getRecordedWorkByMonth(new Date().getMonth() + 1)
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
    getAllEmployeesWorkData()
  }, [])

  return (
    <div className="report-table-page">
      <div className="main-window">
        <div className="main-window__title">Табель</div>
        <TableLoading isLoading={isLoading} />
        <TableView dates={dates} workData={workList} />
      </div>
    </div>
  )
}

export default ReportTablePage

export const TableView = (props) => {
  useEffect(() => {}, [])

  return (
    <div className="report-table-page__tableview">
      <div className="main-window__title">
        1/2 половина - {months[new Date().getMonth()]}
      </div>
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>ФИО</span>
          {props.dates.map((date) => {
            if (date < 16) {
              return <span>{date}</span>
            } else return
          })}
          <span>Сумма</span>
        </div>
        {Object.values(props.workData)
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
                {Object.values(work.works).map((workItem, workItemIndex) => {
                  if (workItemIndex < 15) {
                    return (
                      <span
                        onClick={() => {
                          if (workItem.length > 0) {
                            console.log({
                              employeeId: work.employee.id,
                              day: workItem[0].day,
                              worksId: workItem.map((item) => {
                                return item.workList.id
                              }),
                            })
                          } else {
                            console.log({
                              employeeId: work.employee.id,
                              day: workItemIndex + 1,
                              worksId: null,
                            })
                          }
                        }}
                      >
                        {workItem.hours === 0
                          ? ' '
                          : workItem.reduce((sum, cur) => sum + cur.hours, 0)}
                      </span>
                    )
                  }
                })}
                <span>
                  {Object.values(work.works).reduce((sum, item, index) => {
                    if (item.length > 0 && index < 15) {
                      return (
                        sum +
                        item.reduce((sum, cur) => {
                          return sum + cur.hours
                        }, 0)
                      )
                    } else return sum
                  }, 0)}
                </span>
              </div>
            )
          })}
      </div>

      <div className="main-window__title">
        2/2 половина - {months[new Date().getMonth()]}
      </div>
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>ФИО</span>
          {props.dates.map((date) => {
            if (date > 15) {
              return <span>{date}</span>
            } else return
          })}
          <span>Сумма</span>
        </div>
        {Object.values(props.workData)
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
                {Object.values(work.works).map((workItem, workItemIndex) => {
                  if (workItemIndex > 14) {
                    return (
                      <span
                        onClick={() => {
                          if (workItem.length > 0) {
                            console.log({
                              employeeId: work.employee.id,
                              day: workItem[0].day,
                              worksId: workItem.map((item) => {
                                return item.workList.id
                              }),
                            })
                          } else {
                            console.log({
                              employeeId: work.employee.id,
                              day: workItemIndex + 1,
                              worksId: null,
                            })
                          }
                        }}
                      >
                        {workItem.hours === 0
                          ? ' '
                          : workItem.reduce((sum, cur) => sum + cur.hours, 0)}
                      </span>
                    )
                  }
                })}
                <span>
                  {Object.values(work.works).reduce((sum, item, index) => {
                    if (item.length > 0 && index > 14) {
                      return (
                        sum +
                        item.reduce((sum, cur) => {
                          return sum + cur.hours
                        }, 0)
                      )
                    } else return sum
                  }, 0)}
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}
