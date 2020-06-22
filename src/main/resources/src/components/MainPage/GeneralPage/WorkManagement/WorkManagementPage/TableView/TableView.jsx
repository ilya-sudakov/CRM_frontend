import React from 'react'
import './TableView.scss'
import { numberToString } from '../../../../../../utils/functions.jsx'

const TableView = (props) => {
  return (
    <div className="work-management-page__table-view">
      {props.data.map((item) => {
        return (
          <div
            className={
              Object.values(item[1])[0][0].openWorks
                ? 'work-management-page__row'
                : 'work-management-page__row work-management-page__row--hidden'
            }
          >
            <div className="work-management-page__item work-management-page__item--header">
              <span>{props.employees[item[0]].position + ' '}</span>
              <span>
                {' ' +
                  props.employees[item[0]].lastName +
                  ' ' +
                  props.employees[item[0]].name +
                  ' ' +
                  props.employees[item[0]].middleName}
              </span>
              <span>
                {Math.floor(
                  Object.values(item[1])[0].reduce((sum, cur) => {
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
                      Object.values(item[1])[0].reduce((sum, cur) => {
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
            {Object.values(item[1])[0].map((workItem, index) => {
              if (index >= 1) {
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
              }
            })}
          </div>
        )
      })}
    </div>
  )
}

export default TableView
