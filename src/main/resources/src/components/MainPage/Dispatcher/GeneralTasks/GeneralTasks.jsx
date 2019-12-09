import React, { useEffect, useState } from 'react';
import './GeneralTasks.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';

const GeneralTasks = (props) => {
    const [generalTasks, setGeneralTasks] = useState([
        {
            id: 1,
            dateCreated: new Date(),
            description: 'Описание',
            responsible: 'Ответственный',
            dateControl: new Date,
            status: 'Под контролем',
        },
        {
            id: 2,
            dateCreated: new Date(),
            description: 'Описание2',
            responsible: 'Ответственный2',
            dateControl: new Date,
            status: 'Под контролем3',
        }
    ]);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="general_tasks">
            <div className="general_tasks__title">Основные задачи</div>
            <SearchBar
                title="Поиск по задачам"
                placeholder="Введите () для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="general_tasks__amount_table">Всего: {generalTasks.length} записей</div>
            <TableView
                data={generalTasks}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
            />
        </div>
    )
}

export default GeneralTasks;