import PlaceholderLoading from '../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import {
  formatDateString,
  formatDateStringNoYear,
  dateDiffInDays,
} from '../../../../../utils/functions.jsx';
import { conditions } from '../objects.js';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const TasksList = ({
  tasks = [],
  isLoading = false,
  controlDates = {},
  userHasAccess = () => {},
}) => {
  return (
    <div className="tasks-widget__list">
      {isLoading ? (
        <PlaceholderLoading
          itemClassName="list__item list__item--placeholder"
          minHeight="2rem"
          items={3}
        />
      ) : (
        Object.entries(controlDates).map((date) => {
          const isExpired = new Date(date[0]) < new Date();
          return (
            <ListWrapper
              isExpired={isExpired}
              date={date}
              tasks={tasks}
              userHasAccess={userHasAccess}
            />
          );
        })
      )}
    </div>
  );
};

export default TasksList;

TasksList.propTypes = {
  tasks: PropTypes.array,
  isLoading: PropTypes.bool,
  controlDates: PropTypes.object,
  userHasAccess: PropTypes.func,
};

const ListWrapper = ({
  isExpired = false,
  date = [new Date()],
  tasks = [],
  userHasAccess,
}) => {
  return (
    <div
      className={`tasks-widget__date-wrapper ${
        isExpired ? 'tasks-widget__date-wrapper--expired' : ''
      }`}
    >
      <div
        className={`tasks-widget__date ${
          isExpired ? 'tasks-widget__date--expired' : ''
        }`}
      >{`до ${formatDateStringNoYear(date[0])} ${
        isExpired
          ? `- опоздание ${dateDiffInDays(new Date(date[0]), new Date())} дн.`
          : ''
      }`}</div>
      {tasks
        .filter(
          (task) =>
            formatDateString(task.dateControl) === formatDateString(date[0]),
        )
        .map((task) => (
          <ListItem task={task} userHasAccess={userHasAccess} />
        ))}
    </div>
  );
};

ListWrapper.propTypes = {
  tasks: PropTypes.array,
  index: PropTypes.number,
  isExpired: PropTypes.bool,
  date: PropTypes.array,
  userHasAccess: PropTypes.func,
};

const ListItem = ({
  task = {
    id: 1,
    description: '',
    condition: '',
    status: '',
    dateCreated: new Date(),
    dateControl: new Date(),
  },
  userHasAccess,
}) => {
  const history = useHistory();

  return (
    <div
      className={`list__item list__item--${conditions[task.condition]}`}
      key={task.id}
    >
      <div
        className="list-item__general-info"
        onClick={() =>
          history.push(`/dispatcher/general-tasks/edit/${task.id}`)
        }
      >
        <span className="list-item__description">{task.description}</span>
        <span className="list-item__conditions">
          <span className="condition condition--status">{task.condition}</span>
          <span
            className={`condition condition--date ${
              !userHasAccess(['ROLE_ADMIN']) &&
              (task.status === '' || task.status === null)
                ? 'condition--hidden'
                : ''
            }`}
          >{`от ${formatDateStringNoYear(task.dateCreated)}`}</span>
          <span className="condition condition--description">
            {userHasAccess(['ROLE_ADMIN']) ? task.responsible : task.status}
          </span>
        </span>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  task: PropTypes.object,
  userHasAccess: PropTypes.func,
};
