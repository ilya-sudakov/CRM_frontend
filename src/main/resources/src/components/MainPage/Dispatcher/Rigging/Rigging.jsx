import React, { useEffect, useState } from 'react';
import './Rigging.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';

const Rigging = (props) => {
    const [rigging, setRigging] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="rigging">
            <div className="rigging__title">Оснастка</div>
            <SearchBar
                title="Поиск по оснасткам"
                placeholder="Введите () для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="rigging__amount_table">Всего: {rigging.length} записей</div>
        </div>
    )
}

export default Rigging;