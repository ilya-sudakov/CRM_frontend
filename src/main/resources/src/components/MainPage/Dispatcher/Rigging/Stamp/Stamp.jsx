import React, { useState, useEffect } from 'react';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import './Stamp.scss';

const Stamp = (props) => {
    const [stamps, setStamps] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Штампы";
    }, [])

    return (
        <div className="stamp">
            <SearchBar
                title='Поиск штампа'
                searchQuery={searchQuery}
                placeholder='Введите () для поиска...'
            />
            <div className="stamp__amount_table">Всего: {stamps.length} записей</div>
        </div>
    )
}

export default Stamp;