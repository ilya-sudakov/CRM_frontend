import React from 'react'
import './MainPageWorkspace.scss'
import { WorkManagement } from '../../lazyImports.jsx'
import TasksWidget from '../TasksWidget/TasksWidget.jsx'
import GraphWidget from '../GraphWidget/GraphWidget.jsx'

const MainPageWorkspace = (props) => {
  return (
    <div className="main-page-workspace">
      <WorkManagement />
      <TasksWidget />
      {props.userHasAccess(['ROLE_ADMIN']) && <GraphWidget />}
    </div>
  )
}

export default MainPageWorkspace
