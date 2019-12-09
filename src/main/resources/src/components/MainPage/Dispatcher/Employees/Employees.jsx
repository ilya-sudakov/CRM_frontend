import React, { useState, useEffect } from 'react';
import './Employees.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';

const Employees = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: 'Иван',
            lastName: 'Иванов2',
            middleName: 'Иванович',
            yearOfBirth: '2003',
            citizenship: 'РФ',
            position: 'Секретарь',
            workshop: 'Лиговский',
            passportScan: ['3', '5'],
            comment: 'Человек',
            relevance: 'Работает'
        },
        {
            id: 2,
            name: 'Иван',
            lastName: 'Иванов1',
            middleName: 'Иванович',
            yearOfBirth: '2003',
            citizenship: 'РФ',
            position: 'Секретарь',
            workshop: 'Лиговский',
            passportScan: ['3', '5'],
            comment: 'Человек',
            relevance: 'Работает'
        },
    ])
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