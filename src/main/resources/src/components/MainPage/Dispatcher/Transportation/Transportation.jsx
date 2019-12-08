import React, { useEffect, useState } from 'react';
import './Transportation.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';

const Transportation = (props) => {
    const [transportation, setTransportation] = useState([
        {
            id: 1,
            date: new Date(),
            package: 'Коробки с углем',
            from: 'ЦехЛЭМЗ',
            to: 'ЦехЛЭМЗ',
            driver: 'Григорий алкаш'
        },
        {
            id: 2,
            date: new Date(),
            package: 'Ящики с углем',
            from: 'ЦехЛЭМЗ',
            to: 'ЦехЛиговский',
            driver: 'Виктор алкаш'
        }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        document.title = "Реестр транспортировок";
    })

    return (
        <div className="transportation">
            <div className="transportation__title">Реестр транспортировок</div>
            <SearchBar
                title="Поиск по транспортировкам"
                placeholder="Введите () для поиска..."
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