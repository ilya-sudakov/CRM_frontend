import React, { useState, useEffect } from 'react';
import './Storage.scss';
import TableView from './TableView/TableView.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { deleteStorage, getStorage } from '../../../utils/RequestsAPI/Workshop/LemzStorage.jsx';

const Storage = (props) => {
    const [storage, setStorage] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Склад";
        loadStorage();
    }, [])

    const loadStorage = () => {
        getStorage()
            .then(res => res.json())
            .then(res => {
                setStorage(res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteStorage(id)
            .then(() => loadStorage())
    }

    return (
        <div className="storage">
            {/* <div className="storage__title">Склад</div> */}
            <SearchBar
                title="Поиск по складу"
                placeholder="Введите артикул детали для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="storage__amount_table">Всего: {storage.length} записей</div>
            <TableView
                data={storage}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
            />
        </div>
    )
}

export default Storage;