import React from 'react'
import './WorkListWidget.scss'
import {
  numberToString,
  roundUpWorkHours,
} from '../../../../../utils/functions.jsx'
import { filterEmployeesObject, sortEmployeesObject } from './functions.js'

const WorkList = ({ workshops, employees, employeesMap, userContext }) => {
  return (
    <div className="work-list-widget__list">
      {workshops.map((workshop) => {
        if (
          userContext.userHasAccess(workshop.visibility) &&
          Object.entries(employees).filter((employee) => {
            const item = employee[1]
            if (item.workshop === workshop.name) {
              return true
            }
          }).length > 0
        ) {
          return (
            <>
              <div className="work-list-widget__workshop-item">
                {workshop.name}
              </div>
              {sortEmployeesObject(
                filterEmployeesObject(Object.entries(employees), workshop),
              ).map((employee) => {
                const item = employee[1]
                return <ListItem item={item} employeesMap={employeesMap} />
              })}
            </>
          )
        }
      })}
    </div>
  )
}

export default WorkList

const ListItem = ({ item, employeesMap }) => {
  return (
    <div index={item.id} className="work-list-widget__item">
      <div>{item.lastName + ' ' + item.name + ' ' + item.middleName}</div>
      <div>
        {employeesMap !== undefined &&
          roundUpWorkHours(employeesMap[item.id]?.hours) +
            ' ' +
            numberToString(
              Number.parseInt(roundUpWorkHours(employeesMap[item.id]?.hours)),
              ['час', 'часа', 'часов'],
            )}
      </div>
    </div>
  )
}
