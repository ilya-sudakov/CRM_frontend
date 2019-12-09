import React, { useState } from 'react';
import './Parts.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';

const Parts = (props) => {
    const [parts, setParts] = useState([
        {
            id: 1,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        },
        {
            id: 2,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        },
        {
            id: 3,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        },
        {
            id: 4,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        },
        {
            id: 5,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        },
        {
            id: 6,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        },
        {
            id: 7,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        },
        {
            id: 8,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        },
        {
            id: 9,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        },
        {
            id: 10,
            number: 'ТМАН.043.004',
            name: 'Злой кляймер',
            dimensions: '5x60',
            processing: 'покраска'
        }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
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