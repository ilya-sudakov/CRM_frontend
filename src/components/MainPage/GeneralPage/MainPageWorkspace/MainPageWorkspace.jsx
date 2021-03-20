import './MainPageWorkspace.scss';
import { WorkManagement } from '../../lazyImports.jsx';
import TasksWidget from '../TasksWidget/TasksWidget.jsx';
import GraphWidget from '../GraphWidget/GraphWidget.jsx';
import Notifications from '../Notifications/NotificationsWidget.jsx';

const MainPageWorkspace = (props) => {
  return (
    <div className="main-page-workspace">
      <div className="main-page-workspace__row main-page-workspace__row--horizontal">
        <TasksWidget />
        <WorkManagement />
        {props.userHasAccess(['ROLE_ADMIN']) && <GraphWidget />}
      </div>
      <div className="main-page-workspace__row main-page-workspace__row--vertical">
        {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && (
          <Notifications type="birthday" />
        )}
        {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && (
          <Notifications type="documents" />
        )}
      </div>
    </div>
  );
};

export default MainPageWorkspace;
