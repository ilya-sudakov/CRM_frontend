import React, { useEffect, useState } from 'react'
import './TableView.scss'
import editSVG from '../../../../../../../../../../assets/tableview/edit.svg'
import {
  numberToString,
  formatDateString,
  addSpaceDelimiter,
} from '../../../../../../utils/functions.jsx'
import TableDataLoading from '../../../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'
import { days } from '../../../../../../utils/dataObjects'
import { Link } from 'react-router-dom'

const TableView = (props) => {
  const [datesEmployees, setDatesEmployees] = useState({})

  const findMissingEmployees = (datesEmployees, employees, curWorkshop) => {
    let temp = datesEmployees
    Object.entries(datesEmployees).map((date) => {
      employees.map((employee) => {
        if (date[1][employee.id] === undefined) {
          temp[date[0]] = {
            ...temp[date[0]],
            [employee.id]: {
              employee: employee,
              works: [],
            },
          }
        }
      })
    })
    // console.log(temp)
    return temp
  }

  useEffect(() => {
    setDatesEmployees({
      ...findMissingEmployees(props.data, props.employees, props.curWorkshop),
    })
  }, [props.data, props.employees, props.isLoading, props.searchQuery])

  const onClickHandle = (employee, date, value) => {
    let newData = props.data
    newData[date][employee.id].isOpen = !value
    props.onChange(newData)
  }

  return (
    <div
      className={
        props.isOneColumn
          ? 'work-management-page__table-view work-management-page__table-view--one-col'
          : 'work-management-page__table-view work-management-page__table-view--two-col'
      }
    >
      {props.isLoading && (
        <TableDataLoading
          className="work-management-page__row"
          minHeight="45px"
        />
      )}
      {Object.entries(datesEmployees)
        .sort((a, b) => {
          if (new Date(a[0]) < new Date(b[0])) {
            return -1
          }
          if (new Date(a[0]) > new Date(b[0])) {
            return 1
          }
          return 0
        })
        .map((date) => {
          let index = 0
          return (
            <>
              <div className="work-management-page__table-date">
                {formatDateString(date[0]) +
                  ' - ' +
                  days[new Date(date[0]).getDay()]}
              </div>
              {Object.values(date[1])
                .sort((a, b) => {
                  if (a.employee.lastName < b.employee.lastName) {
                    return -1
                  }
                  if (a.employee.lastName > b.employee.lastName) {
                    return 1
                  }
                  return 0
                })
                .filter((item) =>
                  item.employee.lastName
                    .toLowerCase()
                    .includes(props.searchQuery.toLowerCase()),
                )
                .map((item) => {
                  if (
                    item.works.length > 0 ||
                    (new Date(date[0]).getDay() !== 0 &&
                      new Date(date[0]).getDay() !== 6)
                  ) {
                    return (
                      <div
                        // index={index++}
                        className={
                          (item.isOpen
                            ? 'work-management-page__row '
                            : 'work-management-page__row work-management-page__row--hidden ') +
                          (item.works.length === 0
                            ? 'work-management-page__row--reminder'
                            : '')
                        }
                        onClick={() => {
                          onClickHandle(item.employee, date[0], item.isOpen)
                        }}
                      >
                        <div className="work-management-page__item work-management-page__item--header">
                          <span>{item.employee.position + ' '}</span>
                          <span>
                            {' ' +
                              item.employee.lastName +
                              ' ' +
                              item.employee.name +
                              ' ' +
                              item.employee.middleName}
                          </span>
                          <span>
                            {item.works.length > 0
                              ? Math.floor(
                                  item.works.reduce((sum, cur) => {
                                    if (cur.hours !== undefined) {
                                      return sum + cur.hours
                                    } else {
                                      return sum
                                    }
                                  }, 0) * 100,
                                ) /
                                  100 +
                                ' ' +
                                numberToString(
                                  Math.floor(
                                    item.works.reduce((sum, cur) => {
                                      if (cur.hours !== undefined) {
                                        return sum + cur.hours
                                      } else {
                                        return sum
                                      }
                                    }, 0) * 100,
                                  ) / 100,
                                  ['час', 'часа', 'часов'],
                                )
                              : 'Нет записи!'}
                          </span>
                        </div>
                        {item.works.map((workItem, index) => {
                          {
                            /* console.log(workItem) */
                          }
                          return (
                            <div className="work-management-page__item">
                              <Link
                                title="Редактировать"
                                to={
                                  '/work-management/record-time/edit/' +
                                  workItem.id
                                }
                              >
                                {workItem.workList.work +
                                  ' - ' +
                                  workItem.hours +
                                  ' ' +
                                  numberToString(
                                    Number.parseInt(
                                      Math.floor(workItem.hours * 100) / 100,
                                    ),
                                    ['час', 'часа', 'часов'],
                                  )}
                                <img
                                  className="main-window__img"
                                  src={editSVG}
                                  alt=""
                                />
                              </Link>
                              <div className="work-management-page__item work-management-page__item--products">
                                {workItem.workControlProduct.map((product) => {
                                  return (
                                    <div>
                                      {product.product.name +
                                        ' (' +
                                        addSpaceDelimiter(product.quantity) +
                                        ' шт.)'}
                                    </div>
                                  )
                                })}
                                {workItem.partsWorks.map((draft) => {
                                  return (
                                    <div>
                                      {draft.name +
                                        ' (' +
                                        draft.quantity +
                                        ' шт.)'}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }
                })}
              {new Date(date[0]).getDay() !== 0 &&
                new Date(date[0]).getDay() !== 6 && (
                  <div className="work-management-page__table-employees-count">
                    <span>
                      {
                        Object.values(date[1]).filter(
                          (item) => item.works.length > 0,
                        ).length
                        //+ ' из'
                      }
                    </span>
                    <span>
                      {
                        '/' + Object.values(props.employees).length
                        //+ ' сотрудников'
                      }
                    </span>
                  </div>
                )}
            </>
          )
        })}
    </div>
  )
}

export default TableView
