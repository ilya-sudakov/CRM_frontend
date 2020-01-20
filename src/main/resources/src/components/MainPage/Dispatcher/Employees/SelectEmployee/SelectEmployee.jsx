import React, { useState, useEffect } from 'react';
import './SelectEmployee.scss';
import FormWindow from '../../../../../utils/Form/FormWindow/FormWindow.jsx';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getEmployees } from '../../../../../utils/RequestsAPI/Employees.jsx';

const SelectEmployee = (props) => {
    const [showWindow, setShowWindow] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [id, setId] = useState(0);
    const [fullName, setFullName] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    useEffect(() => {
        loadEmployees();
    }, [])

    const loadEmployees = () => {
        getEmployees()
            .then(res => res.json())
            .then(res => {
                setEmployees(res);
            })
    }

    const clickEmployee = (employeeName, employeeId) => {
        setId(employeeId);
        setFullName(employeeName);
        props.handleEmployeeChange(employeeId);
        setShowWindow(!showWindow);
    }

    return (
        <div className="select-employee">
            <div className="select-employee__input">
                <div className="select-employee__input_name">{props.inputName + (props.required ? '*' : '')}</div>
                <div className={"select-employee__input_field"}>
                    <div className="select-employee__searchbar">
                        <input
                            type="text"
                            className={props.error === true ? "select-employee__input select-employee__input--error" : "select-employee__input"}
                            // onChange={props.handleInputChange}
                            value={props.defaultValue ? props.defaultValue : fullName}
                            // onClick={!props.readOnly ? clickOnInput : null}
                            placeholder="Выберите работника, нажав на кнопку 'Обзор'"
                            readOnly={props.readOnly}
                        />
                        <button className="select-employee__search_button" onClick={(e) => {
                            e.preventDefault();
                            setShowWindow(!showWindow);
                        }}>Обзор</button>
                    </div>
                </div>
            </div>
            {props.error === true && <div className="select-employee__error" onClick={
                props.setErrorsArr ? (() => props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false
                })) : null
            }>Поле не заполнено!</div>}
            <FormWindow
                title="Выбор сотрудника"
                content={
                    <React.Fragment>
                        <SearchBar
                            title="Поиск по сотрудникам"
                            setSearchQuery={setSearchQuery}
                            placeholder="Введите ФИО сотрудника для поиска..."
                        />
                        <TableView
                            data={employees}
                            searchQuery={searchQuery}
                            userHasAccess={props.userHasAccess}
                            selectEmployee={clickEmployee}
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