import { useEffect, useState } from "react";
import { dateDiffInDays } from "../functions.jsx";
import {
  getEmployeesByComingBirthday,
  getEmployeesByExpiredDocuments,
} from "../RequestsAPI/Employees.jsx";

const useEmployeesNotifications = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);

  const loadData = () => {
    setIsLoadingEmployees(true);
    let employeesTemp = [];
    return getEmployeesByComingBirthday()
      .then((res) => res.json())
      .then((res) => {
        const filteredEmployees = res
          .filter((item) => item.relevance !== "Уволен")
          .map((item) => {
            const expirationTime = new Date(
              new Date(item.dateOfBirth).setFullYear(new Date().getFullYear())
            );
            let birthdayDays = "";
            console.log(
              expirationTime,
              new Date(),
              dateDiffInDays(new Date(), expirationTime)
            );
            if (expirationTime.getDate() === new Date().getDate()) {
              birthdayDays = "Сегодня день рождения";
            }
            const dateDiff = dateDiffInDays(new Date(), expirationTime);
            if (dateDiff <= 0) {
              birthdayDays = `День рождения был ${Math.abs(
                dateDiff
              )} дн. назад`;
            }
            if (dateDiff > 0) {
              birthdayDays = `День рождения будет через ${dateDiffInDays(
                new Date(),
                expirationTime
              )} дн.`;
            }
            if (expirationTime.getDate() === new Date().getDate()) {
              birthdayDays = "Сегодня день рождения!";
            }
            return {
              id: item.id,
              name: `${item.lastName} ${item.name} ${item.middleName}`,
              description: birthdayDays,
              type: "ДР",
              expirationTime: item.dateOfBirth,
              read: true,
              link: `/dispatcher/employees/edit/${item.id}`,
            };
          });
        employeesTemp.push(...filteredEmployees);
      })
      .then(() => getEmployeesByExpiredDocuments())
      .then((res) => res.json())
      .then((res) => {
        const filteredEmployees = res
          .filter((item) => item.relevance !== "Уволен")
          .map((item) => {
            return {
              id: item.id,
              name: `${item.lastName} ${item.name} ${item.middleName}`,
              description:
                item.patentExpirationDate === null ||
                item.registrationExpirationDate === null
                  ? "Не указаны сроки документов"
                  : "Просроченные документы",
              type: "Просроченные документы",
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
