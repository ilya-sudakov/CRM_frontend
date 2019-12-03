import React, { useEffect, useState } from 'react';
import './Users.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx'
import { getUsers } from '../../../../utils/utilsAPI.jsx';

const Users = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([])
    useEffect(() => {
        document.title = "Управление пользователями";
        getUsers()
            .then(res => res.json())
            .then(response => {
                setUsers(response);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <div className="users_manage">
            <div className="users_manage__title">Управление пользователями</div>
            <SearchBar
                title="Поиск пользователя"
                placeholder="Введите имя пользователя для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="users_manage__amount_table">Всего: {users.length} записей</div>
            <TableView
                data={users}
                searchQuery={searchQuery}
            />
        </div>
    )
};

export default Users;