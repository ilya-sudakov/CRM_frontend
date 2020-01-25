import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';
import { formatDateString } from '../../../../../../utils/functions.jsx';

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

    useEffect(() => {
        props.setShowWindow && props.setShowWindow(false);
    }, [props.closeWindow])

    return (
        <div className="tableview-employees">
            <div className="tableview-employees__row tableview-employees__row--header">
                <div className="tableview-employees__col">ФИО</div>
                <div className="tableview-employees__col">
                    <span>Дата рождения</span>
                    <img name="yearOfBirth" className="tableview-employees__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview-employees__col">Гражданство</div>
                <div className="tableview-employees__col">Подразделение</div>
                <div className="tableview-employees__col">Должность</div>
                <div className="tableview-employees__col">Комментарий</div>
                <div className="tableview-employees__col">Актуальность</div>
                <div className="tableview-employees__col">Действия</div>
            </div>
            {sortEmployees(props.data).map((employee, employee_id) => (
                <div key={employee_id} className={"tableview-employees__row " + (employee.id % 2 === 0 ? "tableview-employees__row--even" : "tableview-employees__row--odd")}>
                    <div className="tableview-employees__col">{employee.lastName + ' ' + employee.name + ' ' + employee.middleName}</div>
                    <div className="tableview-employees__col">{formatDateString(employee.yearOfBirth)}</div>
                    <div className="tableview-employees__col">{employee.citizenship}</div>
                    <div className="tableview-employees__col">{employee.workshop}</div>
                    <div className="tableview-employees__col">{employee.position}</div>
                    <div className="tableview-employees__col">{employee.comment}</div>
                    <div className="tableview-employees__col">{employee.relevance}</div>
                    <div className="tableview-employees__actions">
                        <div data-id={employee.id} className="tableview-employees__action" onClick={() => {
                            props.selectEmployee(employee.lastName + ' ' + employee.name + ' ' + employee.middleName, employee.id);
                            props.setCloseWindow(!props.closeWindow);
                        }}>Выбрать</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;