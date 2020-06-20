import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './WorkManagementPage.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
// import viewSVG from '../../../../../../../../../assets/tableview/view.svg';
import deleteSVG from '../../../../../../../../../assets/tableview/delete.svg'
import editSVG from '../../../../../../../../../assets/tableview/edit.svg'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
// import DownloadIcon from '../../../../../../../../../assets/download.svg';
import {
  formatDateString,
  numberToString,
  getAllProductsFromWorkCount,
  addSpaceDelimiter,
  getAllDraftsFromWorkCount,
} from '../../../../../utils/functions.jsx'
import {
  getRecordedWorkByDateRange,
  deleteRecordedWork,
  deleteProductFromRecordedWork,
  deleteDraftFromRecordedWork,
} from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import { getEmployeesByWorkshop } from '../../../../../utils/RequestsAPI/Employees.jsx'
// import TableDataLoading from '../../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';
import TableLoading from '../../../../../utils/TableView/TableLoading/TableLoading.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import CheckBox from '../../../../../utils/Form/CheckBox/CheckBox.jsx'
import PartsStatistic from './PartsStatistic/PartsStatistic.jsx'
import { UserContext } from '../../../../../App.js'

const WorkManagementPage = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [workItems, setWorkItems] = useState([])
  const [employeesMap, setEmployeesMap] = useState({})
  const [employees, setEmployees] = useState({})
  const [partsStatistics, setPartsStatistics] = useState({})
  const [draftsStatistics, setDraftsStatistics] = useState([])
  const [curPage, setCurPage] = useState('Сотрудники')
  const [workshops, setWorkshops] = useState([
    {
      name: 'ЦехЛЭМЗ',
      visibility: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
      active: true,
      minimized: true,
      employeesTotal: 0,
    },
    {
      name: 'ЦехЛепсари',
      visibility: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
      active: true,
      minimized: true,
      employeesTotal: 0,
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
      employeesTotal: 0,
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
      employeesTotal: 0,
    },
  ])
  const userContext = useContext(UserContext)
  const [dates, setDates] = useState({
    // start: new Date(new Date().setMonth((new Date()).getMonth() - 1)),
    // end: new Date()
    start: new Date(new Date().setDate(new Date().getDate() - 1)),
    // start: new Date(),
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
        console.log(res)
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
    let temp = workshops
    return Promise.all(
      workshops.map((workshop, index) => {
        return getEmployeesByWorkshop({ workshop: workshop.name }, signal)
          .then((res) => res.json())
          .then((res) => {
            temp.splice(index, 1, {
              ...workshop,
              employeesTotal: res.filter((item) => item.relevance !== 'Уволен')
                .length,
            })
          })
      }),
    ).then(() => {
      return setWorkshops([...temp])
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
        <div className="main-window__title">
          {/* <span>Отчет производства</span> */}
        </div>
        {(props.userHasAccess(['ROLE_ADMIN']) ||
          props.userHasAccess(['ROLE_WORKSHOP'])) && (
          <PartsStatistic
            data={partsStatistics}
            drafts={draftsStatistics}
            isLoading={isLoading}
          />
        )}
        <div className="main-window__header">
          <SearchBar
            title="Поиск по записям"
            placeholder="Введите запрос для поиска..."
            setSearchQuery={setSearchQuery}
          />
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
        <div className="main-window__info-panel">
          <div className="work-management-page__date-pick">
            <div className="work-management-page__date">
              <InputDate
                inputName="Начало:"
                selected={Date.parse(dates.start)}
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
                handleDateChange={(value) => {
                  setDates({
                    ...dates,
                    end: value,
                  })
                }}
              />
            </div>
            {/* <div
                            className="main-window__button"
                            onClick={() => loadWorks()}
                        >Применить фильтр</div> */}
            <Button
              text="Применить"
              isLoading={isLoading}
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
                        ? 'main-window__button'
                        : 'main-window__button main-window__button--inverted'
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
            <div className="main-window__amount_table">
              Всего: {workItems.length} записей
            </div>
          </div>
        </div>
        <div className="main-window__sort-panel">
          <span>Сортировка: </span>
          <select onChange={changeSortOrder}>
            <option value="lastName desc">По алфавиту (А-Я)</option>
            <option value="lastName asc">По алфавиту (Я-А)</option>
            <option value="date asc">По дате</option>
            <option value="hours desc">По часам</option>
          </select>
        </div>
        <div className="main-window__list">
          {/* {isLoading && <TableDataLoading
                        className="main-window__list-item"
                    />} */}
          <TableLoading isLoading={isLoading} />
          {workshops.map((workshop, workshopIndex) => {
            if (
              workshop.active &&
              //&& employees.entries().find(item => item.workshop === workshop.name) !== undefined
              workItems.find(
                (item) => item.employee.workshop === workshop.name,
              ) !== undefined &&
              props.userHasAccess(workshop.visibility)
            ) {
              return (
                <React.Fragment>
                  <div className="main-window__list-item main-window__list-item--divider">
                    <span>
                      {workshop.name +
                        ' (' +
                        Object.entries(employeesMap).filter(
                          (item) =>
                            workshop.name === employees[item[0]]?.workshop,
                        ).length +
                        ' из ' +
                        workshop.employeesTotal +
                        ' сотрудников)'}
                      <CheckBox
                        checked={workshop.minimized}
                        // text="Свернуть"
                        onChange={() => {
                          let temp = employeesMap
                          Object.entries(temp).map((employee) => {
                            if (
                              employees[employee[0]].workshop === workshop.name
                            ) {
                              Object.entries(employee[1]).map((date) => {
                                // console.log(date[1][0])
                                date[1][0].openWorks = !date[1][0].openWorks
                              })
                            }
                          })
                          let newWorkshops = workshops
                          newWorkshops.splice(workshopIndex, 1, {
                            ...workshop,
                            minimized: !workshop.minimized,
                          })
                          setWorkshops([...newWorkshops])
                          return setEmployeesMap({ ...temp })
                        }}
                      />
                    </span>
                  </div>
                  <div className="main-window__list-item main-window__list-item--header">
                    <span>Должность</span>
                    <span>ФИО</span>
                    <span>Часы</span>
                    {/* <span>Подразделение</span> */}
                    <span>Дата</span>
                    <div className="main-window__actions">Действие</div>
                  </div>
                  {Object.entries(employeesMap)
                    .filter((item) => {
                      {
                        /* console.log(item[1]) */
                      }
                      if (
                        workshop.name === employees[item[0]]?.workshop &&
                        (employees[item[0]].lastName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                          employees[item[0]].name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          employees[item[0]].middleName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          employees[item[0]].workshop
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
                        //formatDateString(new Date(temp)).includes(searchQuery)
                      ) {
                        let check = false
                        workshops.map((workshop) => {
                          if (
                            workshop.active &&
                            workshop.name === employees[item[0]].workshop &&
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
                      if (sortOrder.curSort === 'lastName') {
                        {
                          /* console.log(employees[a[0]][sortOrder.curSort]); */
                        }
                        if (
                          employees[a[0]][sortOrder.curSort] <
                          employees[b[0]][sortOrder.curSort]
                        ) {
                          return sortOrder[sortOrder.curSort] === 'desc'
                            ? 1
                            : -1
                        }
                        if (
                          employees[a[0]][sortOrder.curSort] >
                          employees[b[0]][sortOrder.curSort]
                        ) {
                          return sortOrder[sortOrder.curSort] === 'desc'
                            ? -1
                            : 1
                        }
                        return 0
                      } else {
                        if (sortOrder.curSort === 'date') {
                          if (
                            new Date(Object.entries(a[1])[0][0]) <
                            new Date(Object.entries(b[1])[0][0])
                          ) {
                            return sortOrder[sortOrder.curSort] === 'desc'
                              ? 1
                              : -1
                          }
                          if (
                            new Date(Object.entries(a[1])[0][0]) >
                            new Date(Object.entries(b[1])[0][0])
                          ) {
                            return sortOrder[sortOrder.curSort] === 'desc'
                              ? -1
                              : 1
                          }
                          return 0
                        } else {
                          if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                            return sortOrder[sortOrder.curSort] === 'desc'
                              ? 1
                              : -1
                          }
                          if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                            return sortOrder[sortOrder.curSort] === 'desc'
                              ? -1
                              : 1
                          }
                          return 0
                        }
                      }
                    })
                    .map((workItem, workItemIndex) => {
                      let count = 0
                      let prevDate = Object.entries(workItem[1])[0][0]
                      return Object.entries(workItem[1]).map(
                        (tempItem, tempItemIndex) => {
                          return (
                            <React.Fragment>
                              {/* {((prevDate < tempItem[0] &&
                                (prevDate = tempItem[0])) ||
                                count === 0) && (
                                <div className="main-window__list-item main-window__list-item--date-divider">
                                  <span>
                                    {formatDateString(new Date(tempItem[0]))}
                                  </span>
                                </div>
                              )} */}
                              {/* {console.log(
                                prevDate,
                                tempItem[0],
                                prevDate < tempItem[0],
                                count,
                              )} */}
                              <div
                                className="main-window__list-item"
                                onClick={() => {
                                  let temp = employeesMap
                                  let newDates = [
                                    Object.assign({
                                      openWorks: !employeesMap[workItem[0]][
                                        new Date(tempItem[0])
                                      ][0].openWorks,
                                    }),
                                    ...employeesMap[workItem[0]][
                                      new Date(tempItem[0])
                                    ].filter((item, index) => {
                                      if (index > 0) {
                                        return true
                                      } else {
                                        return false
                                      }
                                    }),
                                  ]
                                  // temp = employeesMap[workItem[0]][new Date(tempItem[0])][0].openWorks
                                  temp = {
                                    ...temp,
                                    [workItem[0]]: {
                                      ...employeesMap[workItem[0]],
                                      [new Date(tempItem[0])]: newDates,
                                    },
                                  }
                                  // console.log(temp);
                                  setEmployeesMap(temp)
                                }}
                              >
                                <span>
                                  <div className="main-window__mobile-text">
                                    Должность:{' '}
                                  </div>
                                  {employees[workItem[0]].position}
                                </span>
                                <span>
                                  <div className="main-window__mobile-text">
                                    ФИО:{' '}
                                  </div>
                                  <div className="main-window__text">
                                    {employees[workItem[0]].lastName +
                                      ' ' +
                                      employees[workItem[0]].name +
                                      ' ' +
                                      employees[workItem[0]].middleName}
                                  </div>
                                </span>
                                <span>
                                  <div className="main-window__mobile-text">
                                    Часы:{' '}
                                  </div>
                                  {Math.floor(
                                    tempItem[1].reduce((sum, cur) => {
                                      {
                                        /* console.log(cur.openWorks) */
                                      }
                                      if (cur.hours !== undefined) {
                                        return sum + cur.hours
                                      } else {
                                        return sum
                                      }
                                    }, 0) * 100,
                                  ) / 100}
                                </span>
                                {/* <span><div className="main-window__mobile-text">Подразделение: </div>{employees[workItem[0]].workshop}</span> */}
                                <span>
                                  <div className="main-window__mobile-text">
                                    Дата:{' '}
                                  </div>
                                  {formatDateString(new Date(tempItem[0]))}
                                </span>
                                <div className="main-window__actions">
                                  {/* <Link to={"work-management/record-time/edit/" + tempItem[1].id} className="main-window__action" title="Редактировать">
                                                            <img className="main-window__img" src={editSVG} />
                                                        </Link> */}
                                  <div
                                    className="main-window__action"
                                    onClick={() => {
                                      // console.log(tempItem[1]);
                                      Promise.all(
                                        tempItem[1].map(
                                          (itemDelete, itemDeleteIndex) => {
                                            if (itemDeleteIndex > 0) {
                                              return Promise.all(
                                                itemDelete.workControlProduct.map(
                                                  (product) => {
                                                    return deleteProductFromRecordedWork(
                                                      itemDelete.id,
                                                      product.product.id,
                                                    )
                                                  },
                                                ),
                                              ).then(() => {
                                                return deleteRecordedWork(
                                                  itemDelete.id,
                                                )
                                              })
                                            }
                                          },
                                        ),
                                      ).then(() => {
                                        return loadWorks()
                                      })
                                    }}
                                    title="Удалить"
                                  >
                                    <img
                                      className="main-window__img"
                                      src={deleteSVG}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div
                                className={
                                  tempItem[1][0].openWorks
                                    ? 'main-window__list-options'
                                    : 'main-window__list-options main-window__list-options--hidden'
                                }
                              >
                                <div className="main-window__line"></div>
                                {tempItem[1].map((work, workIndex) => {
                                  if (workIndex !== 0) {
                                    return (
                                      <React.Fragment>
                                        <span
                                          data-hours={
                                            Math.floor(work.hours * 100) / 100 +
                                            ' ' +
                                            numberToString(
                                              Number.parseInt(
                                                Math.floor(work.hours * 100) /
                                                  100,
                                              ),
                                              ['час', 'часа', 'часов'],
                                            )
                                          }
                                        >
                                          {/* <div className="main-window__mobile-text">Тип работы: </div> */}
                                          <div>{work.workList.work}</div>
                                          <div className="main-window__mobile-text">
                                            {Math.floor(work.hours * 100) /
                                              100 +
                                              ' ' +
                                              numberToString(
                                                Number.parseInt(
                                                  Math.floor(work.hours * 100) /
                                                    100,
                                                ),
                                                ['час', 'часа', 'часов'],
                                              )}
                                          </div>
                                          <Link
                                            to={
                                              'work-management/record-time/edit/' +
                                              work.id
                                            }
                                            className="main-window__action"
                                            title="Редактировать"
                                          >
                                            <img
                                              className="main-window__img"
                                              src={editSVG}
                                            />
                                          </Link>
                                          <div
                                            className="main-window__action"
                                            onClick={() => {
                                              return Promise.all(
                                                work.workControlProduct.map(
                                                  (product) => {
                                                    return deleteProductFromRecordedWork(
                                                      work.id,
                                                      product.product.id,
                                                    )
                                                  },
                                                ),
                                              )
                                                .then(() => {
                                                  return Promise.all(
                                                    work.partsWorks.map(
                                                      (draft) => {
                                                        console.log(draft)
                                                        return deleteDraftFromRecordedWork(
                                                          work.id,
                                                          draft.partId,
                                                          draft.partType,
                                                        )
                                                      },
                                                    ),
                                                  )
                                                })
                                                .then(() => {
                                                  return deleteRecordedWork(
                                                    work.id,
                                                  )
                                                })
                                                .then(() => {
                                                  return loadWorks()
                                                })
                                            }}
                                            title="Удалить"
                                          >
                                            <img
                                              className="main-window__img"
                                              src={deleteSVG}
                                            />
                                          </div>
                                        </span>
                                        {(work.workControlProduct.length > 0 ||
                                          work.partsWorks.length > 0) && (
                                          <div className="main-window__list-item main-window__list-item--header">
                                            <span>Название</span>
                                            <span>Кол-во</span>
                                            {/* <span>Часы</span> */}
                                          </div>
                                        )}
                                        {((work.workControlProduct.length ===
                                          0 &&
                                          work.workList.typeOfWork ===
                                            'Продукция') ||
                                          (work.partsWorks.length === 0 &&
                                            work.workList.typeOfWork ===
                                              'Чертеж')) && (
                                          <React.Fragment>
                                            <div className="main-window__list-item main-window__list-item--header"></div>
                                            <div className="main-window__list-item">
                                              <span>
                                                <div className="main-window__reminder">
                                                  <div>!</div>
                                                  <div>
                                                    Нет{' '}
                                                    {work.workList
                                                      .typeOfWork ===
                                                    'Продукция'
                                                      ? 'продукции'
                                                      : 'чертежа'}
                                                  </div>
                                                </div>
                                              </span>
                                            </div>
                                          </React.Fragment>
                                        )}
                                        {work.workControlProduct.map((item) => {
                                          return (
                                            <div className="main-window__list-item">
                                              <span>
                                                <div className="main-window__mobile-text">
                                                  Название:{' '}
                                                </div>
                                                {item.product.name}
                                              </span>
                                              <span>
                                                <div className="main-window__mobile-text">
                                                  Кол-во:{' '}
                                                </div>
                                                {addSpaceDelimiter(
                                                  item.quantity === null
                                                    ? 0
                                                    : item.quantity,
                                                )}
                                              </span>
                                              {/* <span><div className="main-window__mobile-text">Часы: </div>{work.hours}</span> */}
                                            </div>
                                          )
                                        })}
                                        {work.partsWorks.map((item) => {
                                          return (
                                            <div className="main-window__list-item">
                                              <span>
                                                <div className="main-window__mobile-text">
                                                  Название:{' '}
                                                </div>
                                                {item.name}
                                              </span>
                                              <span>
                                                <div className="main-window__mobile-text">
                                                  Кол-во:{' '}
                                                </div>
                                                {addSpaceDelimiter(
                                                  item.quantity === null
                                                    ? 0
                                                    : item.quantity,
                                                )}
                                              </span>
                                            </div>
                                          )
                                        })}
                                      </React.Fragment>
                                    )
                                  }
                                })}
                              </div>
                            </React.Fragment>
                          )
                        },
                      )
                    })}
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
