import React, { useState, useEffect } from 'react';
import './WorkshopLEMZ.scss';
import { getRequestsLEMZ, deleteRequestLEMZ, getRequestLEMZById, deleteProductsToRequestLEMZ } from '../../../utils/utilsAPI.jsx';
import TableView from './TableView/TableView.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

const WorkshopLEMZ = (props) => {
    const [requestsLEMZ, setRequestsLEMZ] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        getRequestLEMZById(id)
            .then(res => res.json())
            .then(res => {
                const productsArr = res.lemzProducts.map((product) => {
                    return deleteProductsToRequestLEMZ(product.id)
                })
                Promise.all(productsArr)
                    .then(() => {
                        deleteRequestLEMZ(id)
                            .then(() => loadRequestsLEMZ())
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        document.title = "Заявки - ЛЭМЗ";
        loadRequestsLEMZ()
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
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
                searchQuery={searchQuery}
            />
        </div>
    )
}

export default WorkshopLEMZ;