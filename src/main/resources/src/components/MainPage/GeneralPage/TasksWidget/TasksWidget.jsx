import React, { useContext, useEffect, useState } from 'react'
import Widget from '../Widget/Widget.jsx'
import './TasksWidget.scss'
import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'
import { filterTasks, filterTasksByUser, getTasksList } from './functions.js'
import { conditions } from './objects.js'
import openWidget from '../../../../../../../../assets/tableview/bx-window-open.svg'
import { UserContext } from '../../../../App.js'
import { Link } from 'react-router-dom'

const TasksWidget = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState([])
  const userContext = useContext(UserContext)

  const loadTasks = async () => {
    setIsLoading(true)
    return await getTasksList().then((tasks) => {
      const filteredTasks = filterTasks(tasks)
      const filteredTasksByUser = filterTasksByUser(
        filteredTasks,
        userContext.userData.username,
      )
      setTasks([...filteredTasksByUser])
      return setIsLoading(false)
    })
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <Widget
      className="tasks-widget"
      title="Ваши задачи"
      subTitle={userContext.userData.username}
      linkTo={{
        address: '/dispatcher/general-tasks',
        text: 'Перейти',
        img: openWidget,
      }}
      content={<TasksList tasks={tasks} isLoading={isLoading} />}
    />
  )
}

export default TasksWidget

const TasksList = ({ tasks, isLoading }) => {
  return (
    <div className="tasks-widget__list">
      {isLoading ? (
        <PlaceholderLoading
          itemClassName="list__item"
          minHeight="2rem"
          items={3}
        />
      ) : (
        tasks.map((task) => (
          <div
            className={`list__item list__item--${conditions[task.condition]}`}
          >
            <Link
              className="list-item__general-info"
              to={`/dispatcher/general-tasks/edit/${task.id}`}
            >
              <span className="list-item__description">{task.description}</span>
              <span className="list-item__condition">{task.condition}</span>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}
