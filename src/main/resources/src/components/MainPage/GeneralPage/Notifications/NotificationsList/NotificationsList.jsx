import React from "react";

const NotificationsList = ({ notifications }) => {
  return (
    <div className="notifications__list">
      {notifications.map((notification) => (
        <ListItem item={notification} key={notification.id} />
      ))}
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
        <div>{item.name}</div>
        <div>{item.description}</div>
      </div>
    </div>
  );
};
