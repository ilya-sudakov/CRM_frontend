import { useState, useEffect } from 'react';
import openWidget from 'Assets/tableview/bx-window-open.svg';
import './NotificationsWidget.scss';
import Widget from '../Widget/Widget.jsx';
import NotificationsList from './NotificationsList/NotificationsList.jsx';
import useEmployeesNotifications from 'Utils/hooks/useEmployeesNotifications.js';

const NotificationsWidget = () => {
  const [notifications, setNotifications] = useState([]);
  const { employees, isLoadingEmployees } = useEmployeesNotifications();

  useEffect(() => {
    console.log(employees);
    setNotifications(employees);
  }, [employees]);

  return employees.length > 0 && !isLoadingEmployees ? (
    <Widget
      className="notifications-widget"
      title="Уведомления"
      subTitle="Сотрудники"
      linkTo={{
        address: '/dispatcher/employees',
        text: 'Перейти',
        img: openWidget,
      }}
      content={
        <NotificationsList
          notifications={notifications}
          isLoading={isLoadingEmployees}
        />
      }
    />
  ) : null;
};

export default NotificationsWidget;
