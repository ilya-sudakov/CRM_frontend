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
import Button from "../../../../../utils/Form/Button/Button.jsx";

const SelectEmployee = (props) => {
  const [showWindow, setShowWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState(0);
  const [fullName, setFullName] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (props.employees && employees.length === 0) {
      return setEmployees(props.employees);
    }
    employees.length === 0 && loadEmployees();
  }, [props.employees]);

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
      getEmployees()
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false);
          setEmployees(res);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else
      getEmployeesByWorkshop(workshop)
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false);
          setEmployees(res);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
  };

  const clickEmployee = (employeeName, employeeId, employee) => {
    setId(employeeId);
    setFullName(employeeName);
    props.handleEmployeeChange(employeeId, employeeName, employee);
    setShowWindow(!showWindow);
  };

  // * Sorting

  const [sortOrder, setSortOrder] = useState({
    curSort: "lastName",
    lastName: "asc",
  });

  const changeSortOrder = (event) => {
    const name = event.target.value.split(" ")[0];
    const order = event.target.value.split(" ")[1];
    setSortOrder({
      curSort: name,
      [name]: order,
    });
  };

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase();
    return data.filter((item) => {
      if (item.name !== null) {
        return (
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
          item.relevance.toLowerCase().includes(query)
        );
      }
      return false;
    });
  };

  const sortEmployees = (data) => {
    return filterSearchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === "desc" ? 1 : -1;
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === "desc" ? -1 : 1;
      }
      return 0;
    });
  };

  return (
    <div className="select-employee">
      <div className="select-employee__input">
        {props.inputName ? (
          <div className="select-employee__input_name">
            {props.inputName + (props.required ? "*" : "")}
          </div>
        ) : null}
        <div className={"select-employee__input_field"}>
          <Button
            text="Выбрать сотрудника"
            className="main-form__button"
            onClick={() => setShowWindow(!showWindow)}
          />
          <div className="select-employee__searchbar">
            <input
              type="text"
              className={
                props.error === true
                  ? "select-employee__input select-employee__input--error"
                  : "select-employee__input"
              }
              defaultValue={props.defaultValue ? props.defaultValue : fullName}
              placeholder="Выберите работника, нажав на кнопку 'Выбрать сотрудника'"
              readOnly
            />
          </div>
        </div>
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
              sorting={
                <div className="main-window__sort-panel">
                  <select onChange={changeSortOrder}>
                    <option value="lastName asc">По алфавиту (А-Я)</option>
                    <option value="lastName desc">По алфавиту (Я-А)</option>
                    <option value="yearOfBirth asc">По дате рождения</option>
                  </select>
                </div>
              }
              itemsCount={`Всего: ${employees.length} записей`}
            />
            <TableView
              data={sortEmployees(employees)}
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
