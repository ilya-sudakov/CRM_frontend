import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PlaceholderLoading from "../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";

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
  return (
    <div
      className={`notifications__list-item ${
        item.read ? "" : "notifications__list-item--unread"
      }`}
    >
      <div className="notifications__list-wrapper">
        <Link to={item.link}>{item.name}</Link>
        <div>{item.description}</div>
      </div>
    </div>
  );
};

NotificationsList.propTypes = {
  notifications: PropTypes.array,
  isLoading: PropTypes.bool,
};
