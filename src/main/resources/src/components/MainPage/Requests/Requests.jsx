import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Requests.scss';
import { getRequests, deleteRequest } from '../../../utils/utilsAPI.jsx';
import TableView from './TableView/TableView.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Requests = (props) => {
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // const deleteItem = (event) => {
    //     const id = event.target.dataset.id;
    //     deleteRequest(id)
    //         .then(() => getRequests())
    //         .then(res => res.json())
    //         .then((requests) => {
    //             setRequests(requests);
    //         })
    // }

    useEffect(() => {
        document.title = "Заявки";
        loadRequests()
    }, [])

    const loadRequests = () => {
        getRequests()
            .then(res => res.json())
            .then(requests => {
                // console.log(requests);
                setRequests(requests);
            })
    }

    return (
        <div className="requests">
            <div className="requests__title">Заявки</div>
            <SearchBar
                title="Поиск по заявкам"
                placeholder="Введите название продукции для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="requests__amount_table">Всего: {requests.length} записей</div>
            <TableView
                data={requests}
                loadData={loadRequests}
                // deleteItem={deleteItem}
                searchQuery={searchQuery}
                // userHasAccess={props.userHasAccess(["ROLE_ADMIN", "ROLE_MANAGER"])}
            />
        </div>
    )
}

export default Requests;