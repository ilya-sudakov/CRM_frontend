import { useState, useEffect } from 'react';
import openWidget from 'Assets/tableview/bx-window-open.svg';
import './NotificationsWidget.scss';
import Widget from '../Widget/Widget.jsx';
import NotificationsList from './NotificationsList/NotificationsList.jsx';
import useEmployeesNotifications from 'Utils/hooks/useEmployeesNotifications.js';

const NotificationsWidget = ({ type = 'birthday' }) => {
  const types = {
    birthday: {
      title: 'Дни рождений',
    },
    documents: {
      title: 'Документы',
    },
  };
  const [notifications, setNotifications] = useState([]);
  const { employees, isLoadingEmployees } = useEmployeesNotifications(type);

  useEffect(() => {
    console.log(employees);
    setNotifications(employees);
  }, [employees]);

  return employees.length > 0 && !isLoadingEmployees ? (
    <Widget
      className="notifications-widget"
      title={types[type].title}
      subTitle="Сотрудники"
      linkTo={{
        address: '/dispatcher/employees',
        text: 'Перейти',
        img: openWidget,
      }}
      miniWidget
      content={
        <NotificationsList
          notifications={notifications}
          isLoading={isLoadingEmployees}
          type={type}
        />
      }
    />
  ) : null;
};

export default NotificationsWidget;
