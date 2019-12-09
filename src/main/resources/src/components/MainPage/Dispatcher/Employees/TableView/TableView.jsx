import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';

const TableView = (props) => {
    const [sortOrder, setSortOrder] = useState({
        curSort: 'dateCreated',
        date: 'desc'
    })

    const changeSortOrder = (event) => {
        const name = event.target.getAttribute("name");
        setSortOrder({
            curSort: name,
            [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
        })
    }

    const searchQuery = (data) => {
        return data.filter(item => item.lastName.toLowerCase().includes(props.searchQuery.toLowerCase()))
    }

    const sortEmployees = (data) => {
        return searchQuery(data).sort((a, b) => {
            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
            }
            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
            }
            return 0;
        })
    }

    return (
        <div className="tableview_employees">
            <div className="tableview_employees__row tableview_employees__row--header">
                <div className="tableview_employees__col">ФИО</div>
                <div className="tableview_employees__col">Год рождения</div>
                <div className="tableview_employees__col">Гражданство</div>
                <div className="tableview_employees__col">Цех</div>
                <div className="tableview_employees__col">Должность</div>
                <div className="tableview_employees__col">Комментарий</div>
                <div className="tableview_employees__col">Актуальность</div>
                <div className="tableview_employees__col">Действия</div>
            </div>
            {sortEmployees(props.data).map((employee, employee_id) => (
                <div key={employee_id} className={"tableview_employees__row " + (employee.id % 2 === 0 ? "tableview_employees__row--even" : "tableview_employees__row--odd")}>
                    <div className="tableview_employees__col">{employee.lastName + ' ' + employee.name + ' ' + employee.middleName}</div>
                    <div className="tableview_employees__col">{employee.yearOfBirth}</div>
                    <div className="tableview_employees__col">{employee.citizenship}</div>
                    <div className="tableview_employees__col">{employee.workshop}</div>
                    <div className="tableview_employees__col">{employee.position}</div>
                    <div className="tableview_employees__col">{employee.comment}</div>
                    <div className="tableview_employees__col">{employee.relevance}</div>
                    <div className="tableview_employees__actions">
                        <Link to={"/dispatcher/employees/view/" + employee.id} className="tableview_employees__action">Просмотр</Link>
                        <Link to={"/dispatcher/employees/edit/" + employee.id} className="tableview_employees__action">Редактировать</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;