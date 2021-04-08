import { useEffect, useState } from 'react';
import { dateDiffInDays } from '../functions.jsx';
import {
  getEmployeesByComingBirthday,
  getEmployeesByExpiredDocuments,
} from '../API/employees';

const useEmployeesNotifications = (type = 'birthday') => {
  const [employees, setEmployees] = useState([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);

  const loadBirthdays = (signal) => {
    setIsLoadingEmployees(true);
    let employeesTemp = [];
    return getEmployeesByComingBirthday(signal)
      .then((res) => res.json())
      .then((res) => {
        const filteredEmployees = res
          .filter((item) => item.relevance !== 'Уволен')
          .map((item) => {
            const expirationTime = new Date(
              new Date(item.dateOfBirth).setFullYear(new Date().getFullYear()),
            );
            let birthdayDays = '';
            const dateDiff = dateDiffInDays(new Date(), expirationTime);
            if (dateDiff <= 0) {
              birthdayDays = `${Math.abs(dateDiff)} дн. назад`;
            }
            if (dateDiff > 0) {
              birthdayDays = `Через ${dateDiffInDays(
                new Date(),
                expirationTime,
              )} дн.`;
            }
            if (expirationTime.getDate() === new Date().getDate()) {
              birthdayDays = 'Сегодня';
            }
            return {
              id: item.id,
              name: `${item.lastName} ${item.name} ${item.middleName}`,
              description: birthdayDays,
              type: 'ДР',
              expirationTime: item.dateOfBirth,
              read: true,
              link: `/dispatcher/employees/edit/${item.id}`,
            };
          });
        employeesTemp.push(...filteredEmployees);
        setIsLoadingEmployees(false);
        return setEmployees([...employeesTemp]);
      })
      .catch((error) => {
        console.log(error);
        return setIsLoadingEmployees(false);
      });
  };

  const loadDocuments = (signal) => {
    setIsLoadingEmployees(true);
    let employeesTemp = [];
    return getEmployeesByExpiredDocuments(signal)
      .then((res) => res.json())
      .then((res) => {
        const filteredEmployees = res
          .filter((item) => item.relevance !== 'Уволен')
          .map((item) => {
            return {
              id: item.id,
              name: `${item.lastName} ${item.name} ${item.middleName}`,
              description:
                item.patentExpirationDate === null ||
                item.registrationExpirationDate === null
                  ? 'Не указаны сроки документов'
                  : 'Просроченные документы',
              type: 'Просроченные документы',
              expirationTime: item.patentExpirationDate,
              read: true,
              link: `/dispatcher/employees/edit/${item.id}`,
            };
          });
        employeesTemp.push(...filteredEmployees);
        setIsLoadingEmployees(false);
        return setEmployees(employeesTemp);
      })
      .catch((error) => {
        console.log(error);
        return setIsLoadingEmployees(false);
      });
  };

  const loadData = (signal) => {
    switch (type) {
      case 'birthday': {
        loadBirthdays(signal);
        break;
      }
      case 'documents': {
        loadDocuments(signal);
        break;
      }
      default: {
        loadBirthdays(signal);
        break;
      }
    }
    return;
  };

  useEffect(() => {
    const abortController = new AbortController();
    loadData(abortController.signal);

    return function cancel() {
      abortController.abort();
    };
  }, []);

  return { employees, isLoadingEmployees };
};

export default useEmployeesNotifications;
