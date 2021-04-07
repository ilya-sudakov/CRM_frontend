import { useContext, useEffect, useState } from 'react';
import UserContext from '../../App.js';
import { getEmployees, getEmployeesByWorkshop } from '../RequestsAPI/employees';

const useEmployeesList = (shouldExecute = true) => {
  const [employees, setEmployees] = useState([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const userContext = useContext(UserContext);
  const workshops = ['ЦехЛЭМЗ', 'ЦехЛепсари', 'ЦехЛиговский', 'Офис'];

  const loadData = () => {
    setIsLoadingEmployees(true);
    let workshop = Object.assign({
      workshop: userContext.userHasAccess(['ROLE_ADMIN'])
        ? 'Админ'
        : userContext.userHasAccess(['ROLE_DISPATCHER'])
        ? 'Диспетчер'
        : userContext.userHasAccess(['ROLE_LEMZ'])
        ? 'ЦехЛЭМЗ'
        : userContext.userHasAccess(['ROLE_LEPSARI'])
        ? 'ЦехЛепсари'
        : userContext.userHasAccess(['ROLE_LIGOVSKIY'])
        ? 'ЦехЛиговский'
        : userContext.userHasAccess(['ROLE_ENGINEER'])
        ? 'Офис'
        : userContext.userHasAccess(['ROLE_MANAGER']) && 'Офис',
    });
    if (workshop.workshop === 'Админ' || workshop.workshop === 'Диспетчер') {
      getEmployees()
        .then((res) => res.json())
        .then((res) => {
          setIsLoadingEmployees(false);
          const filteredEmployees = res.filter(
            (item) => item.relevance !== 'Уволен',
          );
          setEmployees(filteredEmployees);
        })
        .catch((error) => {
          console.log(error);
          setIsLoadingEmployees(false);
        });
    } else
      getEmployeesByWorkshop(workshop)
        .then((res) => res.json())
        .then((res) => {
          setIsLoadingEmployees(false);
          const filteredEmployees = res.filter(
            (item) => item.relevance !== 'Уволен',
          );
          setEmployees(filteredEmployees);
        })
        .catch((error) => {
          console.log(error);
          setIsLoadingEmployees(false);
        });
  };

  useEffect(() => {
    if (!shouldExecute) return;
    const abortController = new AbortController();
    loadData(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  return { employees, setEmployees, isLoadingEmployees, workshops };
};

export default useEmployeesList;
