import React, { useEffect, useState } from 'react';
import './Users.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx'
import { getUsers } from '../../../../utils/utilsAPI.jsx';

const Users = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'Роман Треухов Сергеевич',
            password: 'sdsd',
            email: 'dfdfdf@',
            role: 'admin'
        },
        {
            id: 2,
            username: 'Георгий Жора',
            password: 'sdsd',
            email: 'dfdfdf@',
            role: 'user'
        },
    ])
    useEffect(() => {
        document.title = "Управление пользователями";
        getUsers()
            .then(res => res.json())
            .then(response => {
                console.log(response);
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