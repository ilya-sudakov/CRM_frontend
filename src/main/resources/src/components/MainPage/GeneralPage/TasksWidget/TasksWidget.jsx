import React, { useContext, useEffect, useState } from 'react'
import Widget from '../Widget/Widget.jsx'
import './TasksWidget.scss'
import {
  filterTasks,
  filterTasksByUser,
  getTasksControlDatesList,
  getTasksList,
} from './functions.js'
import openWidget from '../../../../../../../../assets/tableview/bx-window-open.svg'
import { UserContext } from '../../../../App.js'
import TasksList from './TasksList.jsx'

const TasksWidget = () => {
  const [tasks, setTasks] = useState([])
  const [controlDates, setControlDates] = useState({})
  const [isLoading, setIsLoading] = useState([])
  const userContext = useContext(UserContext)

  const loadTasks = async () => {
    setIsLoading(true)
    return await getTasksList().then((tasks) => {
      //filter received tasks
      const filteredCompletedTasks = filterTasks(tasks)
      const filteredTasksByUser = userContext.userHasAccess(['ROLE_ADMIN'])
        ? filteredCompletedTasks
        : filterTasksByUser(
            filteredCompletedTasks,
            userContext.userData.username,
          )

      //get dates object from tasks
      const controlDates = getTasksControlDatesList(filteredTasksByUser)
      setControlDates(controlDates)

      setTasks([...filteredTasksByUser])
      return setIsLoading(false)
    })
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return tasks.length > 0 || isLoading ? (
    <Widget
      className="tasks-widget"
      title="Ваши задачи"
      subTitle={userContext.userData.username}
      linkTo={{
        address: '/dispatcher/general-tasks',
        text: 'Перейти',
        img: openWidget,
      }}
      content={
        <TasksList
          tasks={tasks}
          isLoading={isLoading}
          controlDates={controlDates}
        />
      }
    />
  ) : null
}

export default TasksWidget
