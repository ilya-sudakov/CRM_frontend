import React, { useEffect, useState } from 'react'
import Widget from '../Widget/Widget.jsx'
import './TasksWidget.scss'
import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'
import { filterTasks, getTasksList } from './functions.js'

const TasksWidget = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState([])

  const loadTasks = () => {
    setIsLoading(true)
    return getTasksList().then((tasks) => {
      const filteredTasks = filterTasks(tasks)
      setTasks([...filteredTasks])
      setIsLoading(false)
    })
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <Widget
      className="tasks-widget"
      title="Ваши задачи"
      subTitle="ЦехЛЭМЗ"
      linkTo={{ address: '/dispatcher/general-tasks', text: 'Открыть' }}
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
          itemClassName="tasks-widget__list-item"
          minHeight="2rem"
          items={3}
        />
      ) : (
        tasks.map((task) => (
          <div className="tasks-widget__list-item">{task.description}</div>
        ))
      )}
    </div>
  )
}
