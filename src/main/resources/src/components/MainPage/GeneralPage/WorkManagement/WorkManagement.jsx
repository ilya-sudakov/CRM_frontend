import React, { useEffect, useState } from 'react'
import './WorkManagement.scss'
import { Link, withRouter } from 'react-router-dom'
import searchImg from '../../../../../../../../assets/searchbar/search.svg'
import {
  getRecordedWorks,
  getRecordedWorkByMonth,
  getRecordedWorkByDay,
} from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import {
  formatDateString,
  numberToString,
  // combineWorkHoursForSamePeople,
  // getAllEmployees,
} from '../../../../utils/functions.jsx'
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx'
import SearchBar from '../../SearchBar/SearchBar.jsx'

const WorkManagement = (props) => {
  const [recordedWork, setRecordedWork] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [employeesMap, setEmployeesMap] = useState({})
  const [employees, setEmployees] = useState({})
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
        console.log(work)
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
      console.log(newEmployeesMap)
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
    console.log(newEmployees)
    setEmployees(newEmployees)
  }

  useEffect(() => {
    let abortController = new AbortController()
    let works = {}
    let newEmployees = {}
    setIsLoading(true)
    recordedWork.length === 0 &&
      getRecordedWorkByDay(
        new Date().getMonth() + 1,
        new Date().getDate() - 1,
        abortController.signal,
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          setRecordedWork(res)
          combineWorkHoursForSamePeople(res)
          getAllEmployees(res)
          return setIsLoading(false)
        })
    return function cancel() {
      abortController.abort()
    }
  }, [employeesMap])

  return (
    <div className="work-management">
      <div className="work-management__title">
        <div className="work-management__date">
          {formatDateString(
            new Date(new Date().setDate(new Date().getDate() - 1)),
          )}
          {/* <InputDate selected={new Date(new Date().setDate(new Date().getDate() - 1))} /> */}
        </div>
        <span>
          {props.userHasAccess(['ROLE_ADMIN'])
            ? 'Сводка дня'
            : props.userHasAccess(['ROLE_DISPATCHER']) ||
              props.userHasAccess(['ROLE_MANAGER'])
            ? 'Офис'
            : props.userHasAccess(['ROLE_LEPSARI'])
            ? 'ЦехЛепсари'
            : props.userHasAccess(['ROLE_LEMZ'])
            ? 'ЦехЛЭМЗ'
            : props.userHasAccess(['ROLE_LIGOVSKIY'])
            ? 'ЦехЛиговский'
            : props.userHasAccess(['ROLE_ENGINEER']) && 'Инженер'}
        </span>
        <div
          className="work-management__button work-management__button--inverted"
          onClick={() => {
            props.history.push('/work-managment')
          }}
        >
          Открыть
        </div>
      </div>
      <div className="work-management__content">
        <SearchBar
          title=""
          placeholder="Введите данные работника для поиска..."
          setSearchQuery={setSearchQuery}
        />
        {recordedWork.length === 0 ? (
          isLoading ? (
            <TableDataLoading className="work-management__item" />
          ) : (
            <div className="work-management__info">
              Нет записей о проведенной работе за сегодня!
            </div>
          )
        ) : (
          <div className="work-management__list">
            {Object.entries(employees)
              .filter((employee) => {
                const item = employee[1]
                {
                  /* console.log(item, item.lastName) */
                }
                if (
                  item.lastName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  //item.hours.toString().includes(searchQuery) ||
                  item.workshop
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  item.workshop
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ) {
                  let check = false
                  workshops.map((workshop) => {
                    if (
                      workshop.name === item.workshop &&
                      props.userHasAccess(workshop.visibility)
                    ) {
                      check = true
                      return
                    }
                  })
                  return check
                }
              })
              .sort((a, b) => {
                if (a.lastName < b.lastName) {
                  return -1
                }
                if (a.lastName > b.lastName) {
                  return 1
                }
                return 0
              })
              .map((employee) => {
                const item = employee[1]
                {
                  /* console.log(employeesMap[item.id]) */
                }
                return (
                  <Link
                    className="work-management__item"
                    // to={'/work-managment/record-time/edit/' + item.id}
                    to={'/work-managment'}
                  >
                    <div>
                      {item.lastName + ' ' + item.name + ' ' + item.middleName}
                    </div>
                    <div>
                      Время работы:{' '}
                      {employeesMap !== undefined &&
                        Math.floor(employeesMap[item.id]?.hours * 100) / 100 +
                          ' ' +
                          numberToString(
                            Number.parseInt(
                              Math.floor(employeesMap[item.id]?.hours * 100) /
                                100,
                            ),
                            ['час', 'часа', 'часов'],
                          )}
                    </div>
                    <div>{item.workshop}</div>
                  </Link>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(WorkManagement)
