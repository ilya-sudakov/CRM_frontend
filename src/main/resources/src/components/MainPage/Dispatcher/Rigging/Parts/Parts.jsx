import React, { useState, useEffect } from 'react';
import './Parts.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getParts } from '../../../../../utils/utilsAPI.jsx';

const Parts = (props) => {
    const [parts, setParts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Детали";
        getParts()
            .then(res => res.json())
            .then(res => {
                setParts(res);
            })
    }, [])

    return (
        <div className="parts">
            <SearchBar
                title="Поиск деталей"
                placeholder="Введите артикул детали для поиска"
                setSearchQuery={setSearchQuery}
            />
            <div className="parts__amount_table">Всего: {parts.length} записей</div>
            <TableView
                data={parts}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
            />
        </div>
    )
}

export default Parts;