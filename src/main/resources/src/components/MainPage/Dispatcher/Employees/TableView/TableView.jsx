import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';

const TableView = (props) => {
    const [sortOrder, setSortOrder] = useState({
        curSort: 'id',
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
        const query = props.searchQuery.toLowerCase();
        return data.filter(item => (
            item.lastName.toLowerCase().includes(query) ||
            item.name.toLowerCase().includes(query) ||
            item.middleName.toLowerCase().includes(query) ||
            item.id.toString().includes(query) ||
            item.yearOfBirth.toString().includes(query) ||
            item.citizenship.toLowerCase().includes(query) ||
            item.workshop.toLowerCase().includes(query) ||
            item.position.toLowerCase().includes(query) ||
            item.comment.toLowerCase().includes(query) ||
            item.relevance.toLowerCase().includes(query)
        ))
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

    const formatDateString = (dateString) => {
        const testDate = new Date(dateString);
        return (
            ((testDate.getDate() < 10) ? ('0' + testDate.getDate()) : testDate.getDate())
            + '.' + (((testDate.getMonth() + 1) < 10) ? ('0' + (testDate.getMonth() + 1)) : testDate.getMonth() + 1)
            + '.' + testDate.getFullYear()
        );
        // const newDate = dateString.split("T")[0];
        // return (
        //     newDate.split("-")[2] + "." +
        //     newDate.split("-")[1] + "." +
        //     newDate.split("-")[0]
        // );
    }

    return (
        <div className="tableview_employees">
            <div className="tableview_employees__row tableview_employees__row--header">
                <div className="tableview_employees__col">ФИО</div>
                <div className="tableview_employees__col">
                    <span>Дата рождения</span>
                    <img name="yearOfBirth" className="tableview_employees__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
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
                    <div className="tableview_employees__col">{formatDateString(employee.yearOfBirth)}</div>
                    <div className="tableview_employees__col">{employee.citizenship}</div>
                    <div className="tableview_employees__col">{employee.workshop}</div>
                    <div className="tableview_employees__col">{employee.position}</div>
                    <div className="tableview_employees__col">{employee.comment}</div>
                    <div className="tableview_employees__col">{employee.relevance}</div>
                    <div className="tableview_employees__actions">
                        <Link to={"/dispatcher/employees/view/" + employee.id} className="tableview_employees__action">Просмотр</Link>
                        <Link to={"/dispatcher/employees/edit/" + employee.id} className="tableview_employees__action">Редактировать</Link>
                        {props.userHasAccess(['ROLE_ADMIN']) && <div data-id={employee.id} className="tableview_employees__action" onClick={props.deleteItem}>Удалить</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;