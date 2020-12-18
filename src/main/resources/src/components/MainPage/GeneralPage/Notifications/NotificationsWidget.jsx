import React, { useState, useEffect } from "react";
import deleteSVG from "../../../../../../../../assets/select/delete.svg";
import openWidget from "../../../../../../../../assets/tableview/bx-window-open.svg";
import "./NotificationsWidget.scss";
import Widget from "../Widget/Widget.jsx";
import NotificationsList from "./NotificationsList/NotificationsList.jsx";
import useEmployeesNotifications from "../../../../utils/hooks/useEmployeesNotifications.js";

const NotificationsWidget = () => {
  const [notifications, setNotifications] = useState([]);
  const { employees, isLoadingEmployees } = useEmployeesNotifications();

  useEffect(() => {
    setNotifications(employees);
  }, [employees]);

  return (
    <Widget
      className="notifications-widget"
      title="Уведомления"
      subTitle="Сотрудники"
      linkTo={{
        address: "/dispatcher/employees",
        text: "Перейти",
        img: openWidget,
      }}
      content={
        <NotificationsList
          notifications={notifications}
          isLoading={isLoadingEmployees}
        />
      }
    />
  );
};

export default NotificationsWidget;
