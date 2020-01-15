import React, { useState, useEffect } from 'react';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import './Stamp.scss';
import TableView from '../TableView/TableView.jsx';
import { getStamp, getStampById, deletePartsFromStamp, deleteStamp } from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx';

const Stamp = (props) => {
    const [stamps, setStamps] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Штампы";
        loadStamps();
    }, [])

    const loadStamps = () => {
        getStamp()
            .then(res => res.json())
            .then(res => {
                // console.log(res);                
                setStamps(res);
            })
            .catch(error => {
                console.log(error);                
            })
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        getStampById(id)
            .then(res => res.json())
            .then(res => {
                const parts = res.stampParts.map((item) => {
                    return deletePartsFromStamp(item.id);
                })
                Promise.all(parts)
                    .then(() => {
                        deleteStamp(id)
                            .then(() => loadStamps())
                    })
            })
    }

    return (
        <div className="stamp">
            <SearchBar
                title='Поиск штампа'
                setSearchQuery={setSearchQuery}
                placeholder='Введите здесь запрос для поиска...'
            />
            <div className="stamp__amount_table">Всего: {stamps.length} записей</div>
            <TableView
                data={stamps}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                loadData={loadStamps}
                deleteItem={deleteItem}
            />
        </div>
    )
}

export default Stamp;