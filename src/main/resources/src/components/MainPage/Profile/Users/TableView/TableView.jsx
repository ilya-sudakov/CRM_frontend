import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../../assets/tableview/sort_icon.png';
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
        return data.filter(item => item.username.toLowerCase().includes(props.searchQuery.toLowerCase()))
    }

    const sortUsers = (data) => {
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
        <div className="tableview_users">
            <div className="tableview_users__row tableview_users__row--header">
                <div className="tableview_users__col">
                    <span>ID</span>
                    <img name="id" className="tableview_users__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_users__col">ФИО</div>
                {/* <div className="tableview_users__col">Пароль</div> */}
                <div className="tableview_users__col">Эл. почта</div>
                <div className="tableview_users__col">Роль</div>
                <div className="tableview_users__col">Действия</div>
            </div>
            {sortUsers(props.data).map((user, user_id) => (
                <div key={user_id} className={"tableview_users__row " + (user.id % 2 === 0 ? "tableview_users__row--even" : "tableview_users__row--odd")}>
                    <div className="tableview_users__col">{user.id}</div>
                    <div className="tableview_users__col">{user.username}</div>
                    {/* <div className="tableview_users__col">{user.password}</div> */}
                    <div className="tableview_users__col">{user.email}</div>
                    <div className="tableview_users__col">{user.roles.map((item) => {
                        return (item.name === "ROLE_ADMIN" ? "Руководитель "
                            : item.name === "ROLE_MANAGER" ? "Менеджер1 "
                            : item.name === "ROLE_WORKSHOP" ? "Цех "
                            : item.name === "ROLE_USER" ? "Пользователь " : null)
                    })}</div>
                    <div className="tableview_users__actions">
                        {/* <div data-id={user.id} className="tableview_users__action" >Просмотр</div> */}
                        <Link className="tableview_users__action" to={"/profile/users/edit/" + user.id}>Редактировать</Link>
                        {/* <div data-id={user.id} className="tableview_users__action" onClick={props.deleteItem}>Удалить</div> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;