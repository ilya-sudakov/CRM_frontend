import React, { useEffect, useState } from 'react';
import './GeneralTasks.scss';
import '../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getMainTasks, deleteMainTask } from '../../../../utils/RequestsAPI/MainTasks.jsx';

const GeneralTasks = (props) => {
    const [generalTasks, setGeneralTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        document.title = "Основные задачи";
        loadTasks();
    }, [])

    const loadTasks = () => {
        getMainTasks()
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setGeneralTasks(res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteMainTask(id)
            .then(() => loadTasks())
    }

    return (
        <div className="general_tasks">
            <div className="main-window">
                <div className="main-window__title">Основные задачи</div>
                <SearchBar
                    title="Поиск по задачам"
                    placeholder="Введите описание задачи для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {generalTasks.length} записей</div>
                </div>
                <TableView
                    data={generalTasks}
                    searchQuery={searchQuery}
                    userData={props.userData}
                    userHasAccess={props.userHasAccess}
                    deleteItem={deleteItem}
                    loadData={loadTasks}
                />
            </div>
        </div>
    )
}

export default GeneralTasks;