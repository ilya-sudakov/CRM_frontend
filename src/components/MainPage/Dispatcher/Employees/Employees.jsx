import { useState, useEffect } from 'react';
import './Employees.scss';
import 'Utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import PrintIcon from 'Assets/print.png';
import { getEmployeesListPdfText } from './functions.js';
import {
  deleteEmployee,
  getEmployeesByWorkshop,
} from 'Utils/RequestsAPI/employees';
import Button from 'Utils/Form/Button/Button.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import { sortByField } from 'Utils/sorting/sorting';

const Employees = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const workshops = [
    'ЦехЛЭМЗ',
    'ЦехЛепсари',
    'ЦехЛиговский',
    'Офис',
    'Уволенные',
  ];
  const [isLoading, setIsLoading] = useState(false);

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
