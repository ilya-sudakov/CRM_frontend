import React, { useState, useEffect } from 'react';
import './Employees.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getEmployees } from '../../../../utils/utilsAPI.jsx';

const Employees = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        document.title="Сотрудники";
        getEmployees()
            .then(res => res.json())
            .then(res => {
                setEmployees(res);
            })
    }, []);

    return (
        <div className="employees">
            <div className="employees__title">Сотрудники</div>
            <SearchBar
                title="Поиск сотрудников"
                placeholder="Введите фамилию сотрудника для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="employees__amount_table">Всего: {employees.length} записей</div>
            <TableView 
                data={employees}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
            />
        </div>
    )
}

export default Employees;