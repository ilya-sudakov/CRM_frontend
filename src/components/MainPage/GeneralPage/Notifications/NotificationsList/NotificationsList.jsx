import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';

const NotificationsList = ({ notifications, isLoading, type }) => {
  const types = {
    birthday: [
      'Сегодня',
      'Через 1 дн.',
      'Через 2 дн.',
      '1 дн. назад',
      '2 дн. назад',
    ],
    documents: ['Просроченные документы', 'Не указаны сроки документов'],
  };
  return (
    <div className="notifications__list">
      {isLoading ? (
        <PlaceholderLoading
          minHeight="2rem"
          itemClassName="notifications__list-item"
        />
      ) : notifications.length > 0 ? (
        types[type].map((typeItem) => {
          const filteredNotifications = notifications.filter(
            (notification) => notification.description === typeItem,
          );
          if (filteredNotifications.length === 0) return null;
          return (
            <>
              <div className="notifications__category">{typeItem}</div>
              {filteredNotifications.map((notification) => (
                <ListItem item={notification} key={notification.id} />
              ))}
            </>
          );
        })
      ) : (
        <div className="main-window__info-text">Нет уведомлений</div>
      )}
    </div>
  );
};

export default NotificationsList;

const ListItem = ({ item }) => {
  return (
    <div
      className={`notifications__list-item ${
        item.read ? '' : 'notifications__list-item--unread'
      }`}
    >
      <Link to={item.link} className="notifications__list-wrapper">
        <span>{item.name}</span>
      </Link>
    </div>
  );
};

NotificationsList.propTypes = {
  notifications: PropTypes.array,
  isLoading: PropTypes.bool,
};
