import { useState, useEffect, useMemo, useContext } from 'react';
import './Employees.scss';
import 'Utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import PrintIcon from 'Assets/print.png';
import {
  filterEmployeesBySearchQuery,
  getEmployeesByWorkshopListPdfText,
  getEmployeesListPdfText,
} from './functions.js';
import {
  deleteEmployee,
  getEmployeesByWorkshop,
} from 'Utils/RequestsAPI/employees';
import Button from 'Utils/Form/Button/Button.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import { sortByField } from 'Utils/sorting/sorting';
import { useTable } from 'Utils/hooks';
import { formatDateString } from 'Utils/functions.jsx';
import UserContext from '../../../../App';

const Employees = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const userContext = useContext(UserContext);
  const workshops = [
    'ЦехЛЭМЗ',
    'ЦехЛепсари',
    'ЦехЛиговский',
    'Офис',
    'Уволенные',
  ];
  const workshopsTest = [
    { name: 'ЦехЛЭМЗ' },
    { name: 'ЦехЛепсари' },
    { name: 'ЦехЛиговский' },
    { name: 'Офис' },
    { name: 'Уволенные' },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const filterEmployees = (data, workshopItem) => {
    return data.filter(
      (employee) =>
        (workshopItem === employee.workshop &&
          employee.relevance !== 'Уволен') ||
        (workshopItem === 'Уволенные' && employee.relevance === 'Уволен'),
    );
  };
  const sortEmployees = (data) => {
    return sortByField(filterEmployeesBySearchQuery(data, searchQuery), {
      fieldName: 'lastName',
      direction: 'asc',
    });
  };
  const columns = [
    {
      text: 'Подразделение',
      value: 'name',
      itemsCount: (item) => filterEmployees(employees, item.name).length,
    },
  ];
  const nestedColumns = [
    {
      text: 'ФИО',
      value: 'lastName',
      formatFn: (item) => `${item.lastName} ${item.name} ${item.middleName}`,
    },
    {
      text: 'Дата рождения',
      value: 'dateOfBirth',
      formatFn: ({ dateOfBirth }) => formatDateString(dateOfBirth),
    },
    { text: 'Гражданство', value: '' },
    { text: 'Должность', value: 'position' },
  ];
  const actions = (item) => [
    {
      onClick: () =>
        getEmployeesByWorkshopListPdfText(item.employees, item.name),
      icon: 'print',
      text: 'Печать',
    },
  ];
  const actionsNested = (item) => [
    {
      elementType: 'edit',
      title: 'Редактирование сотрудника',
      link: `/dispatcher/employees/edit/${item.id}`,
      isRendered: userContext.userHasAccess([
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
        'ROLE_WORKSHOP',
      ]),
    },
    {
      elementType: 'delete',
      title: 'Удаление сотрудника',
      onClick: () => deleteItem(item.id),
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];
  const data = useMemo(
    () =>
      workshopsTest.map((workshop) => ({
        ...workshop,
        employees: sortEmployees(filterEmployees(employees, workshop.name)),
      })),
    [employees, isLoading, searchQuery],
  );

  const [table] = useTable({
    data,
    isLoading,
    columns,
    actions,
    nestedTable: {
      isLoading,
      columns: nestedColumns,
      actions: actionsNested,
      fieldName: 'employees',
    },
  });

  useEffect(() => {
    document.title = 'Сотрудники';
    let abortController = new AbortController();
    loadEmployees(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  const loadEmployees = (signal) => {
    setIsLoading(true);
    //Динамический
    let emplArr = [];
    const temp = workshops.map((item) => {
      let workshop = {
        workshop: item,
      };
      return getEmployeesByWorkshop(workshop, signal)
        .then((res) => res.json())
        .then((res) => {
          res.map((item) => emplArr.push(item));
          setEmployees([...emplArr]);
        });
    });
    Promise.all(temp)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const printEmployeesList = () => {
    getEmployeesListPdfText(
      sortByField(employees, { fieldName: 'lastName', direction: 'asc' }),
      workshops,
    );
  };

  const deleteItem = (id) => {
    deleteEmployee(id).then(() => loadEmployees());
  };

  return (
    <div className="employees">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Сотрудники</div>
        </div>
        <SearchBar
          fullSize
          placeholder="Введите фамилию сотрудника для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          buttons={
            <Button
              text="Печать списка"
              isLoading={isLoading}
              imgSrc={PrintIcon}
              inverted
              className="main-window__button main-window__button--inverted"
              onClick={printEmployeesList}
            />
          }
          itemsCount={`Всего: ${
            employees.filter((employee) => {
              return (
                employee.relevance !== 'Уволен' &&
                employee.workshop !== 'Уволенные'
              );
            }).length
          } записей`}
        />
        {table}
        <TableView
          data={employees}
          searchQuery={searchQuery}
          isLoading={isLoading}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
};

export default Employees;
