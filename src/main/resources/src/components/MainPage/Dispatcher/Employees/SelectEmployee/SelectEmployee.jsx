import React, { useState, useEffect } from 'react';
import './SelectEmployee.scss';
import FormWindow from '../../../../../utils/Form/FormWindow/FormWindow.jsx';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getEmployees, getEmployeesByWorkshop } from '../../../../../utils/RequestsAPI/Employees.jsx';

const SelectEmployee = (props) => {
    const [showWindow, setShowWindow] = useState(false);
    const [closeWindow, setCloseWindow] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [id, setId] = useState(0);
    const [fullName, setFullName] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    useEffect(() => {
        (employees.length === 0) && loadEmployees();
    }, [])

    const loadEmployees = () => {
        let workshop = Object.assign({
            workshop: props.userHasAccess(['ROLE_ADMIN'])
                ? 'Админ'
                : props.userHasAccess(['ROLE_DISPATCHER'])
                    ? 'Диспетчер'
                    : props.userHasAccess(['ROLE_LEMZ'])
                        ? 'ЦехЛЭМЗ'
                        : props.userHasAccess(['ROLE_LEPSARI'])
                            ? 'ЦехЛепсари'
                            : props.userHasAccess(['ROLE_LIGOVSKIY'])
                                ? 'ЦехЛиговский'
                                : props.userHasAccess(['ROLE_ENGINEER'])
                                    ? 'Офис'
                                    : props.userHasAccess(['ROLE_MANAGER'])
                                        && 'Офис'
        })
        if (workshop.workshop === 'Админ' || workshop.workshop === 'Диспетчер') {
            getEmployees()
                .then(res => res.json())
                .then(res => {
                    setEmployees(res);
                })
        } else getEmployeesByWorkshop(workshop)
            .then(res => res.json())
            .then(res => {
                setEmployees(res);
            })
    }

    const clickEmployee = (employeeName, employeeId) => {
        setId(employeeId);
        setFullName(employeeName);
        props.handleEmployeeChange(employeeId, employeeName);
        setShowWindow(!showWindow);
    }

    return (
        <div className="select-employee">
            <div className="select-employee__input">
                <div className="select-employee__input_name">{props.inputName + (props.required ? '*' : '')}</div>
                <div className={"select-employee__input_field"}>
                    <button className="select-employee__button" onClick={(e) => {
                        e.preventDefault();
                        setShowWindow(!showWindow);
                    }}>Выбрать сотрудника</button>
                    <div className="select-employee__searchbar">
                        <input
                            type="text"
                            className={props.error === true ? "select-employee__input select-employee__input--error" : "select-employee__input"}
                            // onChange={props.handleInputChange}
                            defaultValue={props.defaultValue ? props.defaultValue : fullName}
                            // onClick={!props.readOnly ? clickOnInput : null}
                            placeholder="Выберите работника, нажав на кнопку 'Выбрать сотрудника'"
                            readOnly={props.readOnly}
                        />
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
                windowName="select-employee-window"
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
                            setCloseWindow={setCloseWindow}
                            closeWindow={closeWindow}
                            setShowWindow={setShowWindow}
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