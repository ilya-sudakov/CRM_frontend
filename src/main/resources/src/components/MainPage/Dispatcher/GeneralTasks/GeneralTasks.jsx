import React, { useEffect, useState } from 'react'
import './GeneralTasks.scss'
import '../../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../../SearchBar/SearchBar.jsx'
import TableView from './TableView/TableView.jsx'
import {
  getMainTasks,
  deleteMainTask,
} from '../../../../utils/RequestsAPI/MainTasks.jsx'

const GeneralTasks = (props) => {
  const [generalTasks, setGeneralTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
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

  useEffect(() => {
    document.title = 'Основные задачи'
    let abortController = new AbortController()
    loadTasks(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadTasks = (signal) => {
    getMainTasks(signal)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setGeneralTasks(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteItem = (event) => {
    const id = event.target.dataset.id
    deleteMainTask(id).then(() => loadTasks())
  }

  return (
    <div className="general_tasks">
      <div className="main-window">
        <div className="main-window__title">Основные задачи</div>
        <SearchBar
          title="Поиск по задачам"
          placeholder="Введите описание задачи для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <div className="main-window__info-panel">
          <div className="main-window__amount_table">
            Всего: {generalTasks.length} записей
          </div>
        </div>
        <div className="main-window__status-panel">
          <div>Фильтр по статусам: </div>
          {taskStatuses.map((status, index) => {
            return (
              <div
                className={
                  (status.visible
                    ? 'main-window__button'
                    : 'main-window__button main-window__button--inverted') +
                  ' main-window__list-item--' +
                  status.className
                }
                onClick={() => {
                  let temp = taskStatuses.map((status) => {
                    return {
                      ...status,
                      visible: false,
                    }
                  })
                  temp.splice(index, 1, {
                    ...status,
                    visible: !status.visible,
                  })
                  setTaskStatuses([...temp])
                }}
              >
                {status.name}
              </div>
            )
          })}
        </div>
        <TableView
          data={generalTasks.filter((item) => {
            let check = false
            let noActiveStatuses = true
            taskStatuses.map((status) => {
              taskStatuses.map((status) => {
                if (status.visible) {
                  noActiveStatuses = false
                }
              })
              if (
                noActiveStatuses === true ||
                (status.visible && status.name === item.condition)
              ) {
                check = true
                return
              }
            })
            return check
          })}
          searchQuery={searchQuery}
          userData={props.userData}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          loadData={loadTasks}
        />
      </div>
    </div>
  )
}

export default GeneralTasks
