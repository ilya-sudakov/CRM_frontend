import React, { useState, useEffect } from 'react';
import './LoginHistory.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';

const LoginHistory = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [history, setHistory] = useState([
        {
            id: 1,
            username: 'ЦехЛепсари',
            time: '12.01.2020'
        }
    ]);

    useEffect(() => {
        loadHistory();
    }, [])

    const loadHistory = () => {
        //API
    }

    const deleteItem = () => {
        //API
    }

    return (
        <div className="login-history">
            <div className="login-history__title">История входов (Тест)</div>
            <SearchBar
                title="Поиск по истории входов"
                placeholder="Введите запрос для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <TableView
                data={history}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
            />
        </div>
    );
};

export default LoginHistory;