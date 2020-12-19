import { useEffect, useState } from "react";
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
            return {
              id: item.id,
              name: `${item.lastName} ${item.name} ${item.middleName}`,
              description: "День рождения",
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
              description: "Просроченные документы",
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
