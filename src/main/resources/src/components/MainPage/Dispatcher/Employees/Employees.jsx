import React, { useState, useEffect } from 'react';
import './Employees.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getEmployees, deleteEmployee, getEmployeesByWorkshop } from '../../../../utils/RequestsAPI/Employees.jsx';

const Employees = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        document.title = "Сотрудники";
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        //Тест типо динамической загрузки
        let emplArr = [];
        let workshop = {
            workshop: 'ЦехЛЭМЗ'
        };
        getEmployeesByWorkshop(workshop)
            .then(res => res.json())
            .then(res => {
                res.map(item => emplArr.push(item));
                setEmployees([...emplArr]);
                workshop.workshop = 'ЦехЛепсари';
            })
            .then(() => getEmployeesByWorkshop(workshop)
                .then(res => res.json())
                .then(res => {
                    res.map(item => emplArr.push(item));
                    setEmployees([...emplArr]);
                    workshop.workshop = 'ЦехЛиговский';
                })
                .then(() => getEmployeesByWorkshop(workshop)
                    .then(res => res.json())
                    .then(res => {
                        res.map(item => emplArr.push(item));
                        setEmployees([...emplArr]);
                        workshop.workshop = 'Офис';
                    })
                    .then(() => getEmployeesByWorkshop(workshop)
                        .then(res => res.json())
                        .then(res => {
                            res.map(item => emplArr.push(item));
                            setEmployees([...emplArr]);
                            workshop.workshop = 'Уволенные';
                        })
                        .then(() => getEmployeesByWorkshop(workshop)
                            .then(res => res.json())
                            .then(res => {
                                res.map(item => emplArr.push(item));
                                setEmployees([...emplArr]);
                            })
                        )
                    )
                )
            )
        // getEmployees()
        //     .then(res => res.json())
        //     .then(res => {
        //         // console.log(res);
        //         setEmployees(res);
        //     })
        //     .catch(error => {
        //         console.log(error);                
        //     })
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteEmployee(id)
            .then(() => loadEmployees())
    }

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
                deleteItem={deleteItem}
            />
        </div>
    )
}

export default Employees;