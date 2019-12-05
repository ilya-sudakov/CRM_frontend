import React, { useState, useEffect } from 'react';
import './WorkshopLEMZ.scss';
import { getRequests, deleteRequest, getRequestsLEMZ } from '../../../utils/utilsAPI.jsx';
import TableView from './TableView/TableView.jsx';
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
        loadRequestsLEMZ()
        // setRequestsLEMZ([
        //     {
        //         id: 1,
        //         date: "2019-12-04T14:06:49.657Z",
        //         quantity: null,
        //         codeWord: "Компания",
        //         products: [
        //             {
        //                 comment: "Коммент3",
        //                 id: 3,
        //                 name: "Что-то там 1",
        //                 packaging: "Упаковка",
        //                 photo: null,
        //                 typeOfProduct: "THIRD",
        //                 unit: "шт.",
        //                 weight: 100.5
        //             }
        //         ],
        //         responsible: "Сергей Александрович",
        //         status: "В процессе"
        //     }
        // ])
    }, [])

    const loadRequestsLEMZ = () => {
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
                loadData={loadRequestsLEMZ}
                // deleteItem={deleteItem}
                searchQuery={searchQuery}
            />
        </div>
    )
}

export default WorkshopLEMZ;