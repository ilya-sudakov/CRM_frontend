import React, { useEffect, useState } from 'react';
import './Users.scss';
import '../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx'
import { getUsers, deleteUser } from '../../../../utils/RequestsAPI/Users.jsx';

const Users = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([])

    useEffect(() => {
        document.title = "Управление пользователями";
        let abortController = new AbortController();
        loadUsers(abortController.signal);
        return function cancel() {
            abortController.abort();
        };
    }, [])

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteUser(id)
            .then(() => loadUsers())
    }

    const loadUsers = (signal) => {
        getUsers(signal)
            .then(res => res.json())
            .then(response => {
                setUsers(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="users-manage">
            <div className="main-window">
                <div className="main-window__title">Управление пользователями</div>
                <SearchBar
                    title="Поиск пользователя"
                    placeholder="Введите имя пользователя для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {users.length} записей</div>
                </div>
                <TableView
                    data={users}
                    searchQuery={searchQuery}
                    deleteItem={deleteItem}
                    userHasAccess={props.userHasAccess}
                />
            </div>
        </div>
    );
};

export default Users;