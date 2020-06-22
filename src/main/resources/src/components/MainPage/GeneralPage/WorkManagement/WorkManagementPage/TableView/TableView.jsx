import React from 'react'
import './TableView.scss'
import {
  numberToString,
  formatDateString,
} from '../../../../../../utils/functions.jsx'
import TableDataLoading from '../../../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'

const TableView = (props) => {
  const onClickHandle = (employeeId, date, value) => {
    let newData = props.data
    console.log(employeeId, date, value)
  }

  return (
    <div className="work-management-page__table-view">
      {props.isLoading && (
        <TableDataLoading className="work-management-page__row" />
      )}
      {Object.entries(props.data).map((date) => {
        return (
          <>
            <div className="work-management-page__table-date">
              {formatDateString(date[0])}
            </div>
            {Object.values(date[1]).map((item) => {
              console.log(item)
              return (
                <div
                  className={
                    item.isOpen
                      ? 'work-management-page__row'
                      : 'work-management-page__row work-management-page__row--hidden'
                  }
                  onClick={() => {
                    onClickHandle(item.employee.id, date[0], true)
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
                      {Math.floor(
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
                        )}
                    </span>
                  </div>
                  {item.works.map((workItem, index) => {
                    return (
                      <div className="work-management-page__item">
                        <div>
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
                        </div>
                        <div className="work-management-page__item work-management-page__item--products">
                          {workItem.workControlProduct.map((product) => {
                            return (
                              <div>
                                {product.product.name +
                                  ' (' +
                                  product.quantity +
                                  ' шт.)'}
                              </div>
                            )
                          })}
                          {workItem.partsWorks.map((draft) => {
                            return (
                              <div>
                                {draft.name + ' (' + draft.quantity + ' шт.)'}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </>
        )
      })}
    </div>
  )
}

export default TableView
