import React from 'react';
import './MainPageWorkspace.scss';
import { WorkManagement } from '../../lazyImports.jsx';
import TasksWidget from '../TasksWidget/TasksWidget.jsx';
import GraphWidget from '../GraphWidget/GraphWidget.jsx';
import Notifications from '../Notifications/NotificationsWidget.jsx';

const MainPageWorkspace = (props) => {
  return (
    <div className="main-page-workspace">
      <TasksWidget />
      <WorkManagement />
      {props.userHasAccess(['ROLE_ADMIN']) && <GraphWidget />}
      {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && (
        <Notifications />
      )}
    </div>
  );
};

export default MainPageWorkspace;
