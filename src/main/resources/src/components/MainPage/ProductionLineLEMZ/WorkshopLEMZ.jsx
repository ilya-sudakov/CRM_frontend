import React, { useState, useEffect } from 'react';
import './WorkshopLEMZ.scss';
import { getRequests, deleteRequest } from '../../../utils/utilsAPI.jsx';
import TableView from './TableView/TableView.jsx.js';
import SearchBar from '../SearchBar/SearchBar.jsx';

const WorkshopLEMZ = (props) => {
    const [requestsLEMZ, setRequestsLEMZ] = useState([]);
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
        document.title = "Заявки - ЛЭМЗ";
        // loadRequests()
    }, [])

    const loadRequests = () => {
        getRequestsLEMZ()
            .then(res => res.json())
            .then(requests => {
                setRequestsLEMZ(requests);
            })
    }

    return (
        <div className="requests_LEMZ">
            <div className="requests_LEMZ__title">Заявки на производство ЛЭМЗ</div>
            <SearchBar
                title="Поиск по заявкам ЛЭМЗ"
                placeholder="Введите название продукции для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="requests_LEMZ__amount_table">Всего: {requestsLEMZ.length} записей</div>
            <TableView
                data={requestsLEMZ}
                loadData={loadRequests}
                // deleteItem={deleteItem}
                searchQuery={searchQuery}
            />
        </div>
    )
}

export default WorkshopLEMZ;