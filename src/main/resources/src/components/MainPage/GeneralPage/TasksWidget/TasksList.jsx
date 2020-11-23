import React from 'react'
import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'
import { formatDateStringNoYear } from '../../../../utils/functions.jsx'
import { conditions } from './objects.js'
import { Link } from 'react-router-dom'

const TasksList = ({ tasks, isLoading, controlDates }) => {
  return (
    <div className="tasks-widget__list">
      {isLoading ? (
        <PlaceholderLoading
          itemClassName="list__item"
          minHeight="2rem"
          items={3}
        />
      ) : (
        Object.entries(controlDates).map((date) => (
          <>
            <div className="tasks-widget__date">{`до ${date[0]}`}</div>
            {tasks
              .filter((task) => {
                const curDate = formatDateStringNoYear(task.dateControl)
                return curDate === date[0]
              })
              .map((task) => (
                <ListItem task={task} />
              ))}
          </>
        ))
      )}
    </div>
  )
}

export default TasksList

const ListItem = ({ task }) => {
  return (
    <div className={`list__item list__item--${conditions[task.condition]}`}>
      <Link
        className="list-item__general-info"
        to={`/dispatcher/general-tasks/edit/${task.id}`}
      >
        <span className="list-item__description">{task.description}</span>
        <span className="list-item__conditions">
          <span>{task.condition}</span>
          <span>{task.status}</span>
        </span>
      </Link>
    </div>
  )
}
