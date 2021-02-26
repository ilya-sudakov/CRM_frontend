import React, { useState, useEffect } from "react";
import "./SelectEmployee.scss";
import FormWindow from "../../../../../utils/Form/FormWindow/FormWindow.jsx";
import SearchBar from "../../../SearchBar/SearchBar.jsx";
import TableView from "./TableView/TableView.jsx";
import {
  getEmployees,
  getEmployeesByWorkshop,
} from "../../../../../utils/RequestsAPI/Employees.jsx";
import ControlPanel from "../../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import SelectFromButton from "../../../../../utils/Form/SelectFromButton/SelectFromButton.jsx";
import useSort from "../../../../../utils/hooks/useSort/useSort";

const SelectEmployee = (props) => {
  const [showWindow, setShowWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState(0);
  const [fullName, setFullName] = useState("");
  const { sortedData, sortPanel } = useSort(
    employees,
    {
      sortOrder: {
        curSort: "lastName",
        lastName: "asc",
      },
      sortOptions: [
        { value: "lastName asc", text: "По фамилии (А-Я)" },
        { value: "lastName desc", text: "По фамилии (Я-А)" },
      ],
      ignoreURL: true,
    },
    [employees]
  );

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (props.employees && employees.length === 0) {
      return setEmployees(props.employees);
    }
    console.log(employees);
    employees.length === 0 && !isLoading && loadEmployees();
  }, [props.employees, employees]);

  useEffect(() => {
    if (
      typeof props.defaultValue === "object" &&
      props.defaultValue?.lastName
    ) {
      setEmployee(props.defaultValue);
    }
  }, [props.defaultValue]);

  const loadEmployees = () => {
    setIsLoading(true);
    let workshop = Object.assign({
      workshop: props.userHasAccess(["ROLE_ADMIN"])
        ? "Админ"
        : props.userHasAccess(["ROLE_DISPATCHER"])
        ? "Диспетчер"
        : props.userHasAccess(["ROLE_LEMZ"])
        ? "ЦехЛЭМЗ"
        : props.userHasAccess(["ROLE_LEPSARI"])
        ? "ЦехЛепсари"
        : props.userHasAccess(["ROLE_LIGOVSKIY"])
        ? "ЦехЛиговский"
        : props.userHasAccess(["ROLE_ENGINEER"])
        ? "Офис"
        : props.userHasAccess(["ROLE_MANAGER"]) && "Офис",
    });
    if (workshop.workshop === "Админ" || workshop.workshop === "Диспетчер") {
      return getEmployees()
        .then((res) => res.json())
        .then((res) => {
          setEmployees(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      return getEmployeesByWorkshop(workshop)
        .then((res) => res.json())
        .then((res) => {
          setEmployees(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const clickEmployee = (employeeName, employeeId, employee) => {
    setId(employeeId);
    setFullName(employeeName);
    setEmployee(employee);
    props.handleEmployeeChange(employeeId, employeeName, employee);
    setShowWindow(!showWindow);
  };

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase();
    return data.filter((item) => {
      if (item.name === null) return false;
      const isFound =
        item.lastName.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.middleName.toLowerCase().includes(query) ||
        item.id.toString().includes(query) ||
        (item.yearOfBirth && item.yearOfBirth.toString().includes(query)) ||
        (item.dateOfBirth && item.dateOfBirth.toString().includes(query)) ||
        item.citizenship.toLowerCase().includes(query) ||
        item.workshop.toLowerCase().includes(query) ||
        item.position.toLowerCase().includes(query) ||
        item.comment.toLowerCase().includes(query) ||
        item.relevance.toLowerCase().includes(query);
      return isFound;
    });
  };

  return (
    <div className="select-employee">
      <div className="select-employee__input">
        <div className="select-employee__input_name main-form__input_name--header">
          {`${props.inputName} ${props.required ? "*" : ""}`}
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
          ((props.defaultValue && typeof props.defaultValue !== "object") ||
            fullName) && (
            <div className={"select-employee__input_field"}>
              <div className="select-employee__searchbar">
                <input
                  type="text"
                  className={
                    props.error === true
                      ? "select-employee__input select-employee__input--error"
                      : "select-employee__input"
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
        windowName="select-employee-window"
        content={
          <React.Fragment>
            <SearchBar
              // title="Поиск по сотрудникам"
              fullSize
              setSearchQuery={setSearchQuery}
              placeholder="Введите ФИО сотрудника для поиска..."
            />
            <ControlPanel
              sorting={sortPanel}
              itemsCount={`Всего: ${employees.length} записей`}
            />
            <TableView
              data={filterSearchQuery(sortedData)}
              searchQuery={searchQuery}
              userHasAccess={props.userHasAccess}
              selectEmployee={clickEmployee}
              setCloseWindow={setCloseWindow}
              closeWindow={closeWindow}
              setShowWindow={setShowWindow}
              isLoading={isLoading}
            />
          </React.Fragment>
        }
        showWindow={showWindow}
        setShowWindow={setShowWindow}
      />
    </div>
  );
};

export default SelectEmployee;
