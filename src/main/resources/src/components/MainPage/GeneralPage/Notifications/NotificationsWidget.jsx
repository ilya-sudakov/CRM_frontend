import React, { useState, useEffect } from "react";
import deleteSVG from "../../../../../../../../assets/select/delete.svg";
import openWidget from "../../../../../../../../assets/tableview/bx-window-open.svg";
import "./NotificationsWidget.scss";
import Widget from "../Widget/Widget.jsx";
import NotificationsList from "./NotificationsList/NotificationsList.jsx";

const NotificationsWidget = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name:
        "Уведомление1 Уведомление1 Уведомление1 Уведомление1 Уведомление1 Уведомление1 Уведомление1 Уведомление1",
      description: "Описание1",
      expirationTime: new Date(),
      read: false,
    },
    {
      id: 2,
      name: "Уведомление2",
      description:
        "Описание2 Уведомление2 Уведомление2 Уведомление2 Уведомление2 Уведомление2 Уведомление2 Уведомление2Уведомление2Уведомление2Уведомление2",
      expirationTime: new Date(),
      read: true,
    },
    {
      id: 3,
      name: "Уведомление3",
      description: "Описание3",
      expirationTime: new Date(),
      read: false,
    },
  ]);

  useEffect(() => {}, []);

  return (
    <Widget
      className="notifications-widget"
      title="Уведомления"
      // subTitle={formatDateString(new Date())}
      // linkTo={{
      //   address: "/dispatcher/general-tasks",
      //   text: "Открыть",
      //   img: openWidget,
      // }}
      content={<NotificationsList notifications={notifications} />}
    />
  );
};

export default NotificationsWidget;
