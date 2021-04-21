import { useState, useEffect } from 'react';
import './SelectEmployee.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from '../TableView.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import SelectFromButton from 'Components/Form/SelectFromButton/SelectFromButton.jsx';
import { useSort, useFormWindow } from 'Utils/hooks';
import { filterEmployeesBySearchQuery } from '../functions';
import { getEmployeeNameText } from 'Utils/functions.jsx';
import useEmployeesList from 'Utils/hooks/useEmployeesList';

const SelectEmployee = (props) => {
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

  const clickEmployee = (employee) => {
    const { id } = employee;
    const _fullName = getEmployeeNameText(employee);
    setFullName(_fullName);
    setEmployee(employee);
    props.handleEmployeeChange(id, _fullName, employee);
    toggleFormWindow();
  };

  const { formWindow, toggleFormWindow } = useFormWindow(
    'Выбор сотрудника',
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
        employees={filterEmployeesBySearchQuery(sortedData, searchQuery)}
        isLoading={isLoadingEmployees}
        searchQuery={searchQuery}
        onSelect={clickEmployee}
      />
    </>,
  );

  return (
    <div className="select-employee">
      <div className="select-employee__input">
        <div className="select-employee__input_name main-form__input_name--header">
          {`${props.inputName} ${props.required ? '*' : ''}`}
          {!props.readOnly && (
            <SelectFromButton
              text="Выбрать сотрудника"
              onClick={() => toggleFormWindow()}
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
      {formWindow}
    </div>
  );
};

export default SelectEmployee;
