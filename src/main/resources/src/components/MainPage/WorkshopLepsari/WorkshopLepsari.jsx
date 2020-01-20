import React, { useState, useEffect } from 'react';
import './WorkshopLepsari.scss';
import TableView from './TableView/TableView.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import {
    getRequestsLepsari,
    getRequestLepsariById,
    deleteProductsToRequestLepsari,
    deleteRequestLepsari
} from '../../../utils/RequestsAPI/Workshop/Lepsari.jsx';

const WorkshopLepsari = (props) => {
    const [requestLepsari, setRequestLepsari] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        getRequestLepsariById(id)
            .then(res => res.json())
            .then(res => {
                const productsArr = res.lepsariProducts.map((product) => {
                    return deleteProductsToRequestLepsari(product.id)
                })
                Promise.all(productsArr)
                    .then(() => {
                        deleteRequestLepsari(id)
                            .then(() => loadRequestLepsari())
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        document.title = "Заявки - Лепсари";
        loadRequestLepsari()
    }, [])

    const loadRequestLepsari = () => {
        getRequestsLepsari()
            .then(res => res.json())
            .then(requests => {
                setRequestLepsari(requests);
            })
    }

    return (
        <div className="requests_lepsari">
            {/* <div className="requests_lepsari__title">Заявки на производство Лепсари</div> */}
            <SearchBar
                title="Поиск по заявкам Лепсари"
                placeholder="Введите название продукции для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="requests_lepsari__amount_table">Всего: {requestLepsari.length} записей</div>
            <TableView
                data={requestLepsari}
                loadData={loadRequestLepsari}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
                searchQuery={searchQuery}
            />
        </div>
    )
}

export default WorkshopLepsari;