import React, { useState, useEffect } from 'react';
import './Parts.scss';
import '../../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getParts, deletePart } from '../../../../../utils/RequestsAPI/Parts.jsx';

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
            <div className="main-window">
                <SearchBar
                    title="Поиск запчастей"
                    placeholder="Введите артикул запчасти для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {parts.length} записей</div>
                </div>
                <TableView
                    data={parts}
                    searchQuery={searchQuery}
                    userHasAccess={props.userHasAccess}
                    deleteItem={deleteItem}
                />
            </div>
        </div>
    )
}

export default Parts;