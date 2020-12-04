import React, { useState, useEffect } from "react";
import "./SelectEmployee.scss";
import {
  getEmployees,
  getEmployeesByWorkshop,
} from "../../../../../utils/RequestsAPI/Employees.jsx";
import Select from "react-select";

const SelectEmployee = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

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

  const clickEmployee = (employee) => {
    props.handleEmployeeChange(employee);
  };

  return (
    <div className="select-employee-new">
      <div className="select-employee-new__input">
        {props.inputName ? (
          <div className="select-employee-new__input_name">
            {props.inputName + (props.required ? "*" : "")}
          </div>
        ) : null}
        <div className={"select-employee-new__input_field"}>
          <Select
            options={employees.map((employee) => {
              return {
                value: employee.id,
                label: `${employee.lastName} ${employee.name} ${employee.middleName}`,
              };
            })}
            onChange={clickEmployee}
            placeholder="Выберите сотрудника..."
          />
        </div>
      </div>
      {props.error === true && (
        <div
          className="select-employee-new__error"
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
    </div>
  );
};

export default SelectEmployee;
