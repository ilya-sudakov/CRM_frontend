import React, { useEffect, useState } from 'react';
import './Transportation.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';

const Transportation = (props) => {
    const [transportation, setTransportation] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="transportation">
            <div className="transportation__title">Реестр транспортировок</div>
            <SearchBar
                title="Поиск по транспортировкам"
                placeholder="Введите () для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="transportation__amount_table">Всего: {transportation.length} записей</div>
        </div>
    )
}

export default Transportation;