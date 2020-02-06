import React, { useState, useEffect } from 'react';
import './Parts.scss';
import '../../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
// import TableView from './TableView/TableView.jsx';
import TableView from '../TableView/TableView.jsx';
import { getPart, deletePart, deletePartsFromPart, getPartById } from '../../../../../utils/RequestsAPI/Rigging/Parts.jsx';
// import { getParts, deletePart } from '../../../../../utils/RequestsAPI/Parts.jsx';

const Parts = (props) => {
    const [parts, setParts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Запчасти";
        loadParts();
    }, [])

    const loadParts = () => {
        getPart()
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
        getPartById(id)
            .then(res => res.json())
            .then(res => {
                const parts = res.benchParts.map((item) => {
                    return deletePartsFromPart(item.id);
                })
                Promise.all(parts)
                    .then(() => {
                        deletePart(id)
                            .then(() => loadParts())
                    })
            })
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
                    loadData={loadParts}
                />
            </div>
        </div>
    )
}

export default Parts;