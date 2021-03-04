import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import CakeIcon from 'Assets/notifications/birthday-cake.inline.svg';
import DocumentsIcon from 'Assets/statistics/document-report.inline.svg';

const NotificationsList = ({ notifications, isLoading }) => {
  return (
    <div className="notifications__list">
      {isLoading ? (
        <PlaceholderLoading
          minHeight="2rem"
          itemClassName="notifications__list-item"
        />
      ) : notifications.length > 0 ? (
        notifications.map((notification) => (
          <ListItem item={notification} key={notification.id} />
        ))
      ) : (
        <div className="main-window__info-text">Нет уведомлений</div>
      )}
    </div>
  );
};

export default NotificationsList;

const ListItem = ({ item }) => {
  const expirationTime = new Date(item.expirationTime);
  return (
    <div
      className={`notifications__list-item ${
        item.read ? '' : 'notifications__list-item--unread'
      }`}
    >
      <div className="notifications__list-wrapper">
        <Link to={item.link}>{item.name}</Link>
        <div>{item.description}</div>
      </div>
      {item.type === 'ДР' ? (
        <CakeIcon className="main-window__img" />
      ) : (
        <DocumentsIcon className="main-window__img" />
      )}
    </div>
  );
};

NotificationsList.propTypes = {
  notifications: PropTypes.array,
  isLoading: PropTypes.bool,
};
