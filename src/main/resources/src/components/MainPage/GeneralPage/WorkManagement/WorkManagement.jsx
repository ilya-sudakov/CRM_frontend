import React, { useEffect, useState, useContext } from 'react'
import './WorkManagement.scss'
import { withRouter } from 'react-router-dom'
import openWidget from '../../../../../../../../assets/tableview/bx-window-open.svg'
import { getRecordedWorkByDay } from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import {
  formatDateString,
  numberToString,
} from '../../../../utils/functions.jsx'
import { UserContext } from '../../../../App.js'
import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const WorkManagement = (props) => {
  const [recordedWork, setRecordedWork] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [employeesMap, setEmployeesMap] = useState({})
  const [employees, setEmployees] = useState({})
  const userContext = useContext(UserContext)
  const [workshops, setWorkshops] = useState([
    {
      name: 'ЦехЛЭМЗ',
      visibility: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
      active: true,
    },
    {
      name: 'ЦехЛепсари',
      visibility: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
      active: true,
    },
    {
      name: 'ЦехЛиговский',
      visibility: [
        'ROLE_ADMIN',
        'ROLE_LIGOVSKIY',
        'ROLE_DISPATCHER',
        'ROLE_MANAGER',
      ],
      active: true,
    },
    {
      name: 'Офис',
      visibility: [
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_MANAGER',
        'ROLE_ENGINEER',
      ],
      active: true,
    },
  ])

  const combineWorkHoursForSamePeople = (works) => {
    // let newEmployeesWorkMap = [];
    let newEmployeesMap = {}
    Promise.all(
      works.map((work) => {
        // console.log(work)
        if (newEmployeesMap[work.employee.id] !== undefined) {
          return (newEmployeesMap = Object.assign({
            ...newEmployeesMap,
            [work.employee.id]: {
              hours:
                Number.parseInt(newEmployeesMap[work.employee.id].hours) +
                Number.parseInt(work.hours),
            },
          }))
        } else {
          return (newEmployeesMap = Object.assign({
            ...newEmployeesMap,
            [work.employee.id]: {
              hours: [work.hours],
            },
          }))
        }
      }),
    ).then(() => {
      // console.log(newEmployeesMap)
      setEmployeesMap(newEmployeesMap)
    })
  }

  const getAllEmployees = (works) => {
    let newEmployees = {}
    works.map((work) => {
      if (newEmployees[work.employee.id] === undefined) {
        return (newEmployees = Object.assign({
          ...newEmployees,
          [work.employee.id]: work.employee,
        }))
      }
    })
    // console.log(newEmployees)
    setEmployees(newEmployees)
  }

  useEffect(() => {
    let abortController = new AbortController()
    let date = new Date()
    date.setDate(date.getDate() - 1)
    setIsLoading(true)
    recordedWork.length === 0 &&
      getRecordedWorkByDay(
        date.getMonth() + 1,
        date.getDate(),
        abortController.signal,
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res)
          setRecordedWork(res)
          combineWorkHoursForSamePeople(res)
          getAllEmployees(res)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
    return function cancel() {
      abortController.abort()
    }
  }, [])

  return (
    <div className="work-management">
      <div className="work-management__title">
        <div className="work-management__date">
          {formatDateString(
            new Date(new Date().setDate(new Date().getDate() - 1)),
          )}
        </div>
        <span>Отчет производства</span>
        <div
          className="work-management__button work-management__button--inverted"
          onClick={() => {
            props.history.push('/work-management')
          }}
        >
          <img src={openWidget} className="work-management__img" />
          Открыть
        </div>
      </div>
      <div className="work-management__content">
        {recordedWork.length === 0 ? (
          isLoading ? (
            <PlaceholderLoading
              minHeight="1rem"
              wrapperClassName="work-management__list work-management__list--placeholder"
              itemClassName="work-management__item"
            />
          ) : (
            <div className="work-management__info">
              Нет записей о проведенной работе!
            </div>
          )
        ) : (
          <div className="work-management__list">
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
                    <div className="work-management__workshop-item">
                      {workshop.name}
                    </div>
                    {Object.entries(employees)
                      .filter((employee) => {
                        const item = employee[1]
                        if (
                          (item.lastName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                            item.workshop
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            item.workshop
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())) &&
                          item.workshop === workshop.name
                        ) {
                          return true
                        }
                      })
                      .sort((a, b) => {
                        if (a[1].lastName < b[1].lastName) {
                          return -1
                        }
                        if (a[1].lastName > b[1].lastName) {
                          return 1
                        }
                        return 0
                      })
                      .map((employee) => {
                        const item = employee[1]
                        return (
                          <div
                            index={item.id}
                            className="work-management__item"
                          >
                            <div>
                              {item.lastName +
                                ' ' +
                                item.name +
                                ' ' +
                                item.middleName}
                            </div>
                            <div>
                              {employeesMap !== undefined &&
                                Math.floor(employeesMap[item.id]?.hours * 100) /
                                  100 +
                                  ' ' +
                                  numberToString(
                                    Number.parseInt(
                                      Math.floor(
                                        employeesMap[item.id]?.hours * 100,
                                      ) / 100,
                                    ),
                                    ['час', 'часа', 'часов'],
                                  )}
                            </div>
                          </div>
                        )
                      })}
                  </>
                )
              }
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(WorkManagement)
