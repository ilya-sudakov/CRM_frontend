import React, { useContext, useEffect, useState } from 'react'
import './GeneralTasks.scss'
import '../../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../../SearchBar/SearchBar.jsx'
import TableView from './TableView/TableView.jsx'
import {
  getMainTasks,
  deleteMainTask,
} from '../../../../utils/RequestsAPI/MainTasks.js'
import FloatingPlus from '../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import ControlPanel from '../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'
import Select from 'react-select'
import { formatDateString } from '../../../../utils/functions.jsx'
import UserContext from '../../../../App.js'

const GeneralTasks = (props) => {
  const userContext = useContext(UserContext)
  const [generalTasks, setGeneralTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [curPage, setCurPage] = useState('В процессе')
  //Статусы задач
  const [taskStatuses, setTaskStatuses] = useState([
    {
      name: 'Выполнено',
      className: 'completed',
      visible: false,
    },
    {
      name: 'Отложено',
      className: 'delayed',
      visible: false,
    },
    {
      name: 'Материалы',
      className: 'materials',
      visible: false,
    },
    {
      name: 'В процессе',
      className: 'in-progress',
      visible: false,
    },
    {
      name: 'Проблема',
      className: 'problem',
      visible: false,
    },
  ])
  //Уникальные пользователи
  const [taskUsers, setTaskUsers] = useState({})

  useEffect(() => {
    document.title = 'Основные задачи'
    //abortController для прерывания загрузки данных
    //при переходе на другие страницы
    let abortController = new AbortController()
    loadTasks(abortController.signal)

    return function cancel() {
      abortController.abort()
    }
  }, [])

  //Запрос на получение списка задач
  const loadTasks = (signal) => {
    setIsLoading(true)
    return getMainTasks(signal)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setIsLoading(false)
        getUsers(res)
        setGeneralTasks(res)
      })
      .catch((error) => {
        //Обработка ошибок
        setIsLoading(false)
        console.log(error)
      })
  }

  const getUsers = (tasks) => {
    let users = {}
    tasks.map((task) => {
      if (
        users[task.responsible] === undefined &&
        task.responsible !== '' &&
        task.responsible !== null
      ) {
        users = {
          ...users,
          [task.responsible]: false,
        }
      }
    })
    setTaskUsers(users)
  }

  //Удаление задачи
  const deleteItem = (id) => {
    deleteMainTask(id).then(() => loadTasks())
  }

  //Sorting
  const [sortOrder, setSortOrder] = useState({
    curSort: 'dateCreated',
    dateCreated: 'asc',
  })

  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0]
    const order = event.target.value.split(' ')[1]
    setSortOrder({
      curSort: name,
      [name]: order,
    })
  }

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase()
    return data.filter(
      (item) =>
        item.id.toString().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.responsible.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        formatDateString(item.dateCreated).includes(query) ||
        formatDateString(item.dateControl).includes(query),
    )
  }

  const sortTasks = (data) => {
    return filterSearchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
      }
      return 0
    })
  }

  const filterTasks = (tasks) => {
    const filteredCompletedTasks = filterCompletedTasks(tasks)
    const filteredUsers = filterTasksUsers(filteredCompletedTasks)
    return filteredUsers
  }

  const filterTasksUsers = (tasks) => {
    return tasks.filter((item) => {
      let check = false
      let noActiveStatuses = true
      Object.entries(taskUsers).map((user) => {
        Object.entries(taskUsers).map((user) => {
          if (user[1]) {
            noActiveStatuses = false
          }
        })
        if (
          noActiveStatuses === true ||
          (user[1] && user[0] === item.responsible)
        ) {
          check = true
          return
        }
      })
      return check
    })
  }

  const filterCompletedTasks = (tasks) => {
    return tasks.filter(
      (task) =>
        (curPage === 'В процессе' && task.condition !== 'Выполнено') ||
        (curPage === 'Завершено' && task.condition === 'Выполнено'),
    )
  }

  return (
    <div className="general_tasks">
      <div className="main-window">
        <FloatingPlus
          linkTo="/dispatcher/general-tasks/new"
          visibility={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Основные задачи</div>
          <div className="main-window__menu">
            <div
              className={
                curPage === 'В процессе'
                  ? 'main-window__item main-window__item--active'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('В процессе')}
            >
              В процессе
            </div>
            <div
              className={
                curPage === 'Завершено'
                  ? 'main-window__item main-window__item--active'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('Завершено')}
            >
              Завершено
            </div>
          </div>
        </div>
        <SearchBar
          // title="Основные задачи"
          placeholder="Введите описание задачи для поиска..."
          setSearchQuery={setSearchQuery}
          fullSize
        />
        <ControlPanel
          itemsCount={`Всего: ${generalTasks.length} записей`}
          sorting={
            <div className="main-window__sort-panel">
              <select onChange={changeSortOrder}>
                <option value="dateCreated asc">
                  По дате постановки (убыв.)
                </option>
                <option value="dateCreated desc">
                  По дате постановки (возр.)
                </option>
                <option value="dateControl asc">
                  По дате контроля (убыв.)
                </option>
                <option value="dateControl desc">
                  По дате контроля (возр.)
                </option>
              </select>
            </div>
          }
          content={
            userContext.userHasAccess(['ROLE_ADMIN']) ? (
              <div className="main-window__info-panel">
                <div className="main-window__filter-pick">
                  <div>Фильтр по пользователям: </div>
                  {Object.entries(taskUsers).map((user) => {
                    return (
                      <div
                        className={
                          user[1]
                            ? 'main-window__button'
                            : 'main-window__button main-window__button--inverted'
                        }
                        onClick={() => {
                          return setTaskUsers((taskUsers) => {
                            //Выбор нескольких пользователей
                            // return {
                            //   ...taskUsers,
                            //   [user[0]]: !user[1],
                            // }

                            //Выбор только одного пользователя
                            let newUsers = taskUsers
                            Object.entries(taskUsers).map((oldTask) => {
                              newUsers = {
                                ...newUsers,
                                [oldTask[0]]: false,
                              }
                            })

                            return {
                              ...newUsers,
                              [user[0]]: user[1] ? false : true,
                            }
                          })
                        }}
                      >
                        {user[0]}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null
          }
        />
        <TableView
          data={filterTasks(sortTasks(generalTasks))}
          searchQuery={searchQuery}
          userData={props.userData}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          isLoading={isLoading}
          taskStatuses={taskStatuses}
          loadData={loadTasks}
        />
      </div>
    </div>
  )
}

export default GeneralTasks
