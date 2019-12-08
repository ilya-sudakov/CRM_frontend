import React, { useEffect, useState } from 'react';
import './GeneralTasks.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';

const GeneralTasks = (props) => {
    const [generalTasks, setGeneralTasks] = useState([]);
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
        </div>
    )
}

export default GeneralTasks;