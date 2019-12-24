import React, { useState, useEffect } from 'react';
import './Parts.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getParts, deletePart } from '../../../../../utils/utilsAPI.jsx';

const Parts = (props) => {
    const [parts, setParts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Запчасти";
        loadParts();
    }, [])

    const loadParts = () => {
        getParts()
            .then(res => res.json())
            .then(res => {
                setParts(res);
            })
            .catch(error => {
                console.log(error);                
            })
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deletePart(id)
            .then(() => loadParts())
    }

    return (
        <div className="parts">
            <SearchBar
                title="Поиск запчастей"
                placeholder="Введите артикул детали для поиска"
                setSearchQuery={setSearchQuery}
            />
            <div className="parts__amount_table">Всего: {parts.length} записей</div>
            <TableView
                data={parts}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
            />
        </div>
    )
}

export default Parts;