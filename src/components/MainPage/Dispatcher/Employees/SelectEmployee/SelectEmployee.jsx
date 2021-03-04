import { useState, useEffect } from 'react';
import './SelectEmployee.scss';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import SelectFromButton from 'Utils/Form/SelectFromButton/SelectFromButton.jsx';
import useSort from 'Utils/hooks/useSort/useSort';
import { filterEmployeesBySearchQuery } from '../functions';
import useEmployeesList from 'Utils/hooks/useEmployeesList';

const SelectEmployee = (props) => {
  const [showWindow, setShowWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [fullName, setFullName] = useState('');
  const { employees, setEmployees, isLoadingEmployees } = useEmployeesList(
    !props.employees,
  );
  const { sortedData, sortPanel } = useSort(
    employees,
    {
      sortOrder: {
        curSort: 'lastName',
        lastName: 'asc',
      },
      sortOptions: [
        { value: 'lastName asc', text: 'По фамилии (А-Я)' },
        { value: 'lastName desc', text: 'По фамилии (Я-А)' },
      ],
      ignoreURL: true,
    },
    [employees],
  );

  useEffect(() => {
    if (props.employees && employees.length === 0) {
      return setEmployees(props.employees);
    }
  }, [props.employees, employees]);

  useEffect(() => {
    if (
      typeof props.defaultValue === 'object' &&
      props.defaultValue?.lastName
    ) {
      setEmployee(props.defaultValue);
    }
  }, [props.defaultValue]);

  const clickEmployee = (employeeName, employeeId, employee) => {
    setFullName(employeeName);
    setEmployee(employee);
    props.handleEmployeeChange(employeeId, employeeName, employee);
    setShowWindow(!showWindow);
  };

  return (
    <div className="select-employee">
      <div className="select-employee__input">
        <div className="select-employee__input_name main-form__input_name--header">
          {`${props.inputName} ${props.required ? '*' : ''}`}
          {!props.readOnly && (
            <SelectFromButton
              text="Выбрать сотрудника"
              onClick={() => setShowWindow(!showWindow)}
            />
          )}
        </div>
        {employee ? (
          <div className="select-employee__employee-info">
            <div className="employee-info__name">
              {`${employee.lastName} ${employee.name} ${employee.middleName}`}
            </div>
            <div className="employee-info__workshop">{employee.workshop}</div>
            <div className="employee-info__position">{employee.position}</div>
          </div>
        ) : (
          ((props.defaultValue && typeof props.defaultValue !== 'object') ||
            fullName) && (
            <div className={'select-employee__input_field'}>
              <div className="select-employee__searchbar">
                <input
                  type="text"
                  className={
                    props.error === true
                      ? 'select-employee__input select-employee__input--error'
                      : 'select-employee__input'
                  }
                  defaultValue={
                    props.defaultValue ? props.defaultValue : fullName
                  }
                  placeholder="Выберите работника, нажав на кнопку 'Выбрать сотрудника'"
                  disabled
                />
              </div>
            </div>
          )
        )}
      </div>
      {props.error === true && (
        <div
          className="select-employee__error"
          onClick={
            props.setErrorsArr
              ? () =>
                  props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false,
                  })
              : null
          }
        >
          Поле не заполнено!
        </div>
      )}
      <FormWindow
        title="Выбор сотрудника"
        content={
          <>
            <SearchBar
              fullSize
              setSearchQuery={setSearchQuery}
              placeholder="Введите ФИО сотрудника для поиска..."
            />
            <ControlPanel
              sorting={sortPanel}
              itemsCount={`Всего: ${employees.length} записей`}
            />
            <TableView
              data={filterEmployeesBySearchQuery(sortedData, searchQuery)}
              searchQuery={searchQuery}
              userHasAccess={props.userHasAccess}
              selectEmployee={clickEmployee}
              setCloseWindow={setCloseWindow}
              closeWindow={closeWindow}
              setShowWindow={setShowWindow}
              isLoading={isLoadingEmployees}
            />
          </>
        }
        showWindow={showWindow}
        setShowWindow={setShowWindow}
      />
    </div>
  );
};

export default SelectEmployee;
