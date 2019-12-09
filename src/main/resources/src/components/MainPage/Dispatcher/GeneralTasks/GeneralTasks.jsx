import React, { useEffect, useState } from 'react';
import './GeneralTasks.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getMainTasks } from '../../../../utils/utilsAPI.jsx';

const GeneralTasks = (props) => {
    const [generalTasks, setGeneralTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        document.title = "Основные задачи";
        getMainTasks()
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setGeneralTasks(res);
            })
    }, [])

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