import React, { useEffect, useState } from 'react';
import './Transportation.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getTransportations } from '../../../../utils/utilsAPI.jsx';

const Transportation = (props) => {
    const [transportation, setTransportation] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        document.title = "Реестр транспортировок";
        getTransportations()
            .then(res => res.json())
            .then(res => {
                setTransportation(res);
            })
    }, [])

    return (
        <div className="transportation">
            <div className="transportation__title">Реестр транспортировок</div>
            <SearchBar
                title="Поиск по транспортировкам"
                placeholder="Введите название товара для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="transportation__amount_table">Всего: {transportation.length} записей</div>
            <TableView 
                data={transportation}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
            />
        </div>
    )
}

export default Transportation;