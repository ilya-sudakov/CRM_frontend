import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';

const TableView = (props) => {
    const [sortOrder, setSortOrder] = useState({
        curSort: 'id',
        id: 'desc'
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
            item.username.toLowerCase().includes(query) ||
            item.time.toLowerCase().includes(query) ||
            item.id.toString().includes(query)
        ))
    }

    const sortProducts = (data) => {
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
        <div className="tableview-login-history">
            <div className="tableview-login-history__row tableview-login-history__row--header">
                <div className="tableview-login-history__col">
                    <span>ID</span>
                    <img name="id" className="tableview-login-history__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview-login-history__col">Пользователь</div>
                <div className="tableview-login-history__col">Время</div>
                <div className="tableview-login-history__col">Действия</div>
            </div>
            {sortProducts(props.data).map((work, work_id) => (
                <div key={work_id} className={"tableview-login-history__row " + (work.id % 2 === 0 ? "tableview-login-history__row--even" : "tableview-login-history__row--odd")}>
                    <div className="tableview-login-history__col">{work.id}</div>
                    <div className="tableview-login-history__col">{work.username}</div>
                    <div className="tableview-login-history__col">{work.time}</div>
                    <div className="tableview-login-history__actions">
                        <div data-id={work.id} className="tableview-login-history__action" onClick={props.deleteItem}>Удалить</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;