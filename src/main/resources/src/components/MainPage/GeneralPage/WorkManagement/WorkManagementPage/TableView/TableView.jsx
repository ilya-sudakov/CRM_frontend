import React from 'react'
import './TableView.scss'
import { numberToString } from '../../../../../../utils/functions.jsx'

const TableView = (props) => {
  return (
    <div className="work-management-page__table-view">
      {props.data.map((item) => {
        return (
          <div className="work-management-page__row">
            {Object.values(item[1])[0].map((workItem, index) => {
              if (index >= 1) {
                return (
                  <div className="work-management-page__item work-management-page__item--header">
                    <div>
                      {workItem.employee.lastName +
                        ' ' +
                        workItem.employee.name +
                        ' ' +
                        workItem.employee.middleName + ' '}
                    </div>
                    <div>
                      {' - ' +
                        workItem.hours +
                        ' ' +
                        numberToString(
                          Number.parseInt(
                            Math.floor(workItem.hours * 100) / 100,
                          ),
                          ['час', 'часа', 'часов'],
                        )}
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
