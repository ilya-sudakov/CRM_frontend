import React, { useEffect, useState, useContext } from 'react'
import './WorkListWidget.scss'
import { withRouter } from 'react-router-dom'
import openWidget from '../../../../../../../../../assets/tableview/bx-window-open.svg'
import { getRecordedWorkByDay } from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import { formatDateString } from '../../../../../utils/functions.jsx'
import UserContext from '../../../../../App.js'
import PlaceholderLoading from '../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'
import { getAllEmployees } from './functions.js'
import { workshopsList } from './objects.js'
import WorkList from './WorkList.jsx'
import Widget from '../../Widget/Widget.jsx'

const WorkListWidget = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [recordedWork, setRecordedWork] = useState([])
  const [employeesMap, setEmployeesMap] = useState({})
  const [employees, setEmployees] = useState({})
  const userContext = useContext(UserContext)
  const [workshops] = useState(workshopsList)

  const combineWorkHoursForSamePeople = (works) => {
    // let newEmployeesWorkMap = [];
    let newEmployeesMap = {}
    Promise.all(
      works.map(
        (work) =>
          (newEmployeesMap = Object.assign({
            ...newEmployeesMap,
            [work.employee.id]: {
              hours:
                newEmployeesMap[work.employee.id] !== undefined
                  ? Number.parseInt(newEmployeesMap[work.employee.id].hours) +
                    Number.parseInt(work.hours)
                  : [work.hours],
            },
          })),
      ),
    ).then(() => {
      // console.log(newEmployeesMap)
      setEmployeesMap(newEmployeesMap)
    })
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
          const allEmployeesObject = getAllEmployees(res)
          setEmployees(allEmployeesObject)
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
    <Widget
      className="work-list-widget"
      title="Отчет производства"
      subTitle={formatDateString(
        new Date(new Date().setDate(new Date().getDate() - 1)),
      )}
      linkTo={{
        address: '/work-management',
        text: 'Открыть',
        img: openWidget,
      }}
      content={
        recordedWork.length === 0 ? (
          isLoading ? (
            <PlaceholderLoading
              minHeight="2rem"
              wrapperClassName="work-list-widget__list work-list-widget__list--placeholder"
              itemClassName="work-list-widget__item"
            />
          ) : (
            <div className="work-list-widget__info">
              Нет записей о проведенной работе!
            </div>
          )
        ) : (
          <WorkList
            workshops={workshops}
            employees={employees}
            employeesMap={employeesMap}
            userContext={userContext}
          />
        )
      }
    />
  )
}

export default withRouter(WorkListWidget)
