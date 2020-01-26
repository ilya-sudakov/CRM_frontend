import React, { useEffect, useState } from 'react';
import './Transportation.scss';
import '../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getTransportations, deleteTransportation } from '../../../../utils/RequestsAPI/Transportation.jsx';

const Transportation = (props) => {
    const [transportation, setTransportation] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Реестр транспортировок";
        loadTransportation();
    }, [])

    const loadTransportation = () => {
        getTransportations()
            .then(res => res.json())
            .then(res => {
                setTransportation(res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteTransportation(id)
            .then(() => loadTransportation())
    }

    return (
        <div className="transportation">
            <div className="main-window">
                <div className="main-window__title">Реестр транспортировок</div>
                <SearchBar
                    title="Поиск по транспортировкам"
                    placeholder="Введите название товара для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {transportation.length} записей</div>
                </div>
                <TableView
                    data={transportation}
                    searchQuery={searchQuery}
                    userHasAccess={props.userHasAccess}
                    deleteItem={deleteItem}
                />
            </div>
        </div>
    )
}

export default Transportation;