import { useState, useEffect } from 'react';
import './NotificationsWidget.scss';
import Widget from '../Widget/Widget.jsx';
import NotificationsList from './NotificationsList/NotificationsList.jsx';
import useEmployeesNotifications from 'Utils/hooks/useEmployeesNotifications.js';

const NotificationsWidget = ({ type = 'birthday' }) => {
  const types = {
    birthday: {
      title: 'Дни рождения',
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

  return employees.length > 0 || isLoadingEmployees ? (
    <Widget
      className="notifications-widget"
      title={types[type].title}
      subTitle="Сотрудники"
      linkTo={{
        address: '/dispatcher/employees',
        text: 'Перейти',
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
