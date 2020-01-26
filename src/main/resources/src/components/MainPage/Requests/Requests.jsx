import React, { useState, useEffect } from 'react';
import '../../../utils/MainWindow/MainWindow.scss';
import './Requests.scss';
import { getRequests, deleteRequest, deleteProductsToRequest, getRequestById } from '../../../utils/RequestsAPI/Requests.jsx';
import TableView from './TableView/TableView.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Requests = (props) => {
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        getRequestById(id)
            .then(res => res.json())
            .then(res => {
                const productsArr = res.requestProducts.map((product) => {
                    return deleteProductsToRequest(product.id)
                })
                Promise.all(productsArr)
                    .then(() => {
                        deleteRequest(id)
                            .then(() => loadRequests())
                    })
            })
    }

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
            <div className="main-window">
                <div className="main-window__title">Заявки</div>
                <SearchBar
                    title="Поиск по заявкам"
                    placeholder="Введите название продукции для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {requests.length} записей</div>
                </div>
                <TableView
                    data={requests}
                    loadData={loadRequests}
                    deleteItem={deleteItem}
                    searchQuery={searchQuery}
                    userHasAccess={props.userHasAccess}
                />
            </div>
        </div>
    )
}

export default Requests;