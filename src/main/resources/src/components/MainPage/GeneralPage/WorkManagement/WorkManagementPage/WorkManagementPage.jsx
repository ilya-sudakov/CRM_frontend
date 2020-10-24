import React, { useState, useEffect, useContext } from 'react'
import './WorkManagementPage.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
// import viewSVG from '../../../../../../../../../assets/tableview/view.svg';
import OneColumnIcon from '../../../../../../../../../assets/tableview/onecolumn.png'
import okIcon from '../../../../../../../../../assets/tableview/ok.svg'
import TwoColumnsIcon from '../../../../../../../../../assets/tableview/twocolumns.png'
import chevronDownSVG from '../../../../../../../../../assets/tableview/chevron-down.svg'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import {
  getAllProductsFromWorkCount,
  getAllDraftsFromWorkCount,
  getDatesAndWorkItems,
  formatDateString,
} from '../../../../../utils/functions.jsx'
import { getRecordedWorkByDateRange } from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import { getEmployeesByWorkshop } from '../../../../../utils/RequestsAPI/Employees.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import PartsStatistic from './PartsStatistic/PartsStatistic.jsx'
import { UserContext } from '../../../../../App.js'
import TableView from './TableView/TableView.jsx'
import FloatingPlus from '../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import PlaceholderLoading from '../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'
import ControlPanel from '../../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'

const WorkManagementPage = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [workItems, setWorkItems] = useState([])
  const [employeesMap, setEmployeesMap] = useState({})
  const [datesEmployees, setDatesEmployees] = useState({})
  const [employees, setEmployees] = useState({})
  const [partsStatistics, setPartsStatistics] = useState({})
  const [draftsStatistics, setDraftsStatistics] = useState([])
  const [curPage, setCurPage] = useState('Сотрудники')
  const [isOneColumn, setIsOneColumn] = useState(false)
  const [workshops, setWorkshops] = useState([
    {
      name: 'ЦехЛЭМЗ',
      visibility: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
      active: true,
      minimized: true,
      employees: [],
      className: 'lemz',
    },
    {
      name: 'ЦехЛепсари',
      visibility: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
      active: true,
      minimized: true,
      employees: [],
      className: 'lepsari',
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
      minimized: true,
      employees: [],
      className: 'ligovskiy',
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
      minimized: true,
      employees: [],
      className: 'office',
    },
  ])
  const userContext = useContext(UserContext)
  const [dates, setDates] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 1)),
    end: new Date(),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState({
    curSort: 'lastName',
    date: 'desc',
  })
  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0]
    const order = event.target.value.split(' ')[1]
    setSortOrder({
      curSort: name,
      [name]: sortOrder[name] === 'desc' ? 'asc' : 'desc',
    })
  }

  async function loadWorks(signal) {
    setIsLoading(true)
    return getRecordedWorkByDateRange(
      dates.start.getDate(),
      dates.start.getMonth() + 1,
      dates.end.getDate(),
      dates.end.getMonth() + 1,
      signal,
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        setPartsStatistics(getAllProductsFromWorkCount(res))
        setDraftsStatistics(getAllDraftsFromWorkCount(res))
        combineWorksForSamePeople([
          ...res.map((item) => {
            return {
              ...item,
              // openWorks: false,
              openWorks: true,
            }
          }),
        ])
        setDatesEmployees(getDatesAndWorkItems(res))
        getAllEmployees([
          ...res.map((item) => {
            return {
              ...item,
              // openWorks: false,
              openWorks: true,
            }
          }),
        ])
        setWorkItems([
          ...res.map((item) => {
            return {
              ...item,
              // openWorks: false,
              openWorks: true,
            }
          }),
        ])
        setIsLoading(false)
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
    // console.log(newEmployees);
    setEmployees(newEmployees)
  }

  const combineWorksForSamePeople = (works) => {
    // let newEmployeesWorkMap = [];
    let newEmployeesMap = {}
    Promise.all(
      works.map((work) => {
        if (
          newEmployeesMap[work.employee.id] !== undefined &&
          newEmployeesMap[work.employee.id][
            new Date(work.year, work.month - 1, work.day)
          ] !== undefined
        ) {
          return (newEmployeesMap = Object.assign({
            ...newEmployeesMap,
            [work.employee.id]: {
              ...newEmployeesMap[work.employee.id],
              [new Date(work.year, work.month - 1, work.day)]: [
                ...newEmployeesMap[work.employee.id][
                  new Date(work.year, work.month - 1, work.day)
                ],
                work,
              ],
            },
          }))
        } else {
          return (newEmployeesMap = Object.assign({
            ...newEmployeesMap,
            [work.employee.id]: {
              ...newEmployeesMap[work.employee.id],
              [new Date(work.year, work.month - 1, work.day)]: [
                // { openWorks: false },
                { openWorks: true },
                work,
              ],
            },
          }))
        }
      }),
    ).then(() => {
      // console.log(newEmployeesMap)
      setEmployeesMap(newEmployeesMap)
    })
  }

  const loadEmployeesCount = (signal) => {
    setIsLoading(true)
    let temp = workshops
    return Promise.all(
      workshops.map((workshop, index) => {
        return getEmployeesByWorkshop({ workshop: workshop.name }, signal)
          .then((res) => res.json())
          .then((res) => {
            temp.splice(index, 1, {
              ...workshop,
              employees: res.filter((item) => item.relevance !== 'Уволен'),
            })
          })
      }),
    )
      .then(() => {
        setIsLoading(false)
        // console.log(temp)
        setWorkshops([...temp])
        return temp
      })
      .catch((error) => {
        setIsLoading(true)
        console.log(error)
      })
  }

  useEffect(() => {
    document.title = 'Отчет производства'
    let abortController = new AbortController()
    loadWorks(abortController.signal).then(() => {
      loadEmployeesCount(abortController.signal)
    })
    // console.log(employeesMap)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  return (
    <div className="work-management-page">
      <div className="main-window">
        <FloatingPlus
          iconSrc={isOneColumn ? TwoColumnsIcon : OneColumnIcon}
          title={isOneColumn ? 'Несколько столбцов' : 'Один столбец'}
          onClick={() => {
            setIsOneColumn(!isOneColumn)
          }}
          visibility={[
            'ROLE_ADMIN',
            'ROLE_WORKSHOP',
            'ROLE_MANAGER',
            'ROLE_DISPATCHER',
          ]}
        />
        <div className="main-window__title">
          {/* <span>Отчет производства</span> */}
        </div>
        <div className="main-window__header main-window__header--full">
          {(props.userHasAccess(['ROLE_ADMIN']) ||
            props.userHasAccess(['ROLE_WORKSHOP'])) && (
            <PartsStatistic
              data={partsStatistics}
              drafts={draftsStatistics}
              isLoading={isLoading}
            />
          )}
          <div className="main-window__menu">
            {/* <div
              className={
                curPage === 'Работы'
                  ? 'main-window__item main-window__item--active'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('Работы')}
            >
              Работы
            </div> */}
            <div
              className={
                curPage === 'Сотрудники'
                  ? 'main-window__item main-window__item--active'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('Сотрудники')}
            >
              Сотрудники
            </div>
          </div>
        </div>
        <SearchBar
          fullSize
          // title="Поиск по сотрудникам"
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          itemsCount={`Всего: ${workItems.length} записей`}
          buttons={
            <>
              <Button
                text="Пред. день"
                isLoading={isLoading}
                className="main-window__button"
                onClick={() => {
                  setDates({
                    ...dates,
                    start: new Date(
                      new Date(dates.start).setDate(dates.start.getDate() - 1),
                    ),
                  })
                  loadWorks()
                }}
              />
              {formatDateString(dates.end) < formatDateString(new Date()) ? (
                <Button
                  text="Cлед. день"
                  isLoading={isLoading}
                  className="main-window__button"
                  onClick={() => {
                    setDates({
                      ...dates,
                      start: new Date(
                        new Date(dates.start).setDate(
                          dates.start.getDate() + 1,
                        ),
                      ),
                    })
                    loadWorks()
                  }}
                />
              ) : null}
            </>
          }
          content={
            <div className="main-window__info-panel">
              <div className="work-management-page__date-pick">
                <div>
                  <div className="work-management-page__date">
                    <InputDate
                      inputName="Начало:"
                      selected={Date.parse(dates.start)}
                      startDate={Date.parse(dates.start)}
                      endDate={Date.parse(dates.end)}
                      selectsStart
                      handleDateChange={(value) => {
                        setDates({
                          ...dates,
                          start: value,
                        })
                      }}
                    />
                  </div>
                  <div className="work-management-page__date">
                    <InputDate
                      inputName="Конец:"
                      selected={Date.parse(dates.end)}
                      selectsEnd
                      startDate={Date.parse(dates.start)}
                      endDate={Date.parse(dates.end)}
                      handleDateChange={(value) => {
                        setDates({
                          ...dates,
                          end: value,
                        })
                      }}
                    />
                  </div>
                </div>
                <Button
                  text="Применить"
                  isLoading={isLoading}
                  imgSrc={okIcon}
                  className="main-window__button"
                  onClick={loadWorks}
                />
              </div>
              <div className="work-management-page__workshop-pick">
                {workshops.map((item, index) => {
                  if (props.userHasAccess(item.visibility)) {
                    return (
                      <div
                        className={
                          item.active
                            ? 'main-window__button '
                            : 'main-window__button main-window__button--inverted '
                        }
                        onClick={() => {
                          let temp = workshops
                          temp.splice(index, 1, {
                            ...temp[index],
                            name: item.name,
                            active: !item.active,
                          })
                          setWorkshops([...temp])
                        }}
                      >
                        {item.name}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          }
        />
        <div
          className={
            isOneColumn
              ? 'main-window__list main-window__list--one-column'
              : 'main-window__list'
          }
        >
          {/* <TableLoading isLoading={isLoading} /> */}
          {isLoading && (
            <PlaceholderLoading
              // wrapperClassName="work-management-page__table-view"
              itemClassName="main-window__list-item"
              minHeight="1.5rem"
              items={3}
            />
          )}
          {workshops.map((workshop, workshopIndex) => {
            if (
              workshop.active &&
              workItems.find(
                (item) => item.employee.workshop === workshop.name,
              ) !== undefined &&
              props.userHasAccess(workshop.visibility)
            ) {
              return (
                <React.Fragment>
                  <div className="main-window__list-item main-window__list-item--divider">
                    <span
                      title={workshop.minimized ? 'Развернуть' : 'Свернуть'}
                      onClick={() => {
                        let temp = datesEmployees
                        Object.entries(datesEmployees[workshop.name]).map(
                          (date) => {
                            Object.entries(date[1]).map((employee) => {
                              return (temp[workshop.name][date[0]][
                                employee[0]
                              ].isOpen = !datesEmployees[workshop.name][
                                date[0]
                              ][employee[0]].isOpen)
                            })
                          },
                        )
                        datesEmployees[workshop.name]
                        let newWorkshops = workshops
                        newWorkshops.splice(workshopIndex, 1, {
                          ...workshop,
                          minimized: !workshop.minimized,
                        })
                        setWorkshops([...newWorkshops])
                      }}
                    >
                      {workshop.name}
                      <img
                        className={
                          workshop.minimized
                            ? 'main-window__img'
                            : 'main-window__img main-window__img--rotated'
                        }
                        src={chevronDownSVG}
                        // checked={workshop.minimized}
                      />
                    </span>
                  </div>
                  <TableView
                    employees={employees}
                    isLoading={isLoading}
                    isOneColumn={isOneColumn}
                    employees={workshop.employees}
                    curWorkshop={workshop.name}
                    searchQuery={searchQuery}
                    onChange={(newData) => {
                      let temp = Object.assign({
                        ...datesEmployees,
                        [workshop.name]: { ...newData },
                      })
                      setDatesEmployees({ ...temp })
                    }}
                    data={datesEmployees[workshop.name]}
                  />
                </React.Fragment>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default WorkManagementPage
