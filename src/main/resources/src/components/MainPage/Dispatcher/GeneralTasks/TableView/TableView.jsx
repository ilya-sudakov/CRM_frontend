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
        const query = props.searchQuery.toLowerCase();
        return data.filter(item => (
            item.id.toString().includes(query) ||
            item.description.toLowerCase().includes(query) || 
            item.responsible.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query) ||
            formatDateString(item.dateCreated).includes(query) ||
            formatDateString(item.dateControl).includes(query)
        ))
    }

    const sortTasks = (data) => {
        return searchQuery(data).sort((a, b) => {
            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
            }
            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
            }
            return 0;
        })
    }

    const formatDateString = (dateString) => {
        const newDate = dateString.split("T")[0];
        return (
            newDate.split("-")[2] + "." +
            newDate.split("-")[1] + "." +
            newDate.split("-")[0]
        );
    }

    return (
        <div className="tableview_general_tasks">
            <div className="tableview_general_tasks__row tableview_general_tasks__row--header">
                <div className="tableview_general_tasks__col">
                    <span>ID</span>
                    <img name="id" className="tableview_general_tasks__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_general_tasks__col">
                    <span>Дата постановки</span>
                    <img name="dateCreated" className="tableview_general_tasks__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_general_tasks__col">Описание</div>
                <div className="tableview_general_tasks__col">Ответственный</div>
                <div className="tableview_general_tasks__col">
                    <span>Дата контроля</span>
                    <img name="dateControl" className="tableview_general_tasks__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_general_tasks__col">Состояние</div>
                <div className="tableview_general_tasks__col">Действия</div>
            </div>
            {sortTasks(props.data).map((task, task_id) => (
                <div key={task_id} className={"tableview_general_tasks__row " + (task.id % 2 === 0 ? "tableview_general_tasks__row--even" : "tableview_general_tasks__row--odd")}>
                    <div className="tableview_general_tasks__col">{task.id}</div>
                    <div className="tableview_general_tasks__col">{formatDateString(task.dateCreated)}</div>
                    <div className="tableview_general_tasks__col">{task.description}</div>
                    <div className="tableview_general_tasks__col">{task.responsible}</div>
                    <div className="tableview_general_tasks__col">{formatDateString(task.dateControl)}</div>
                    <div className="tableview_general_tasks__col">{task.status}</div>
                    <div className="tableview_general_tasks__actions">
                        {/* <Link to={"/task/view/" + task.id} className="tableview_general_tasks__action">Просмотр</Link> */}
                        {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && <Link to={"/dispatcher/general-tasks/edit/" + task.id} className="tableview_general_tasks__action">Редактировать</Link>}
                        {props.userHasAccess(['ROLE_ADMIN']) && <div data-id={task.id} className="tableview_general_tasks__action" onClick={props.deleteItem}>Удалить</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;