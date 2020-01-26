import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake';
import './WorkshopLepsari.scss';
import TableView from './TableView/TableView.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import {
    getRequestsLepsari,
    getRequestLepsariById,
    deleteProductsToRequestLepsari,
    deleteRequestLepsari
} from '../../../utils/RequestsAPI/Workshop/Lepsari.jsx';
import { getRequestsListPdfText } from '../../../utils/functions.jsx';

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

    const printRequestsList = () => {
        let dd = getRequestsListPdfText(requestLepsari.sort((a, b) => (a.id - b.id)), 'ЦехЛепсари', 'lepsariProducts');
        pdfMake.createPdf(dd).print();
    }

    const loadRequestLepsari = () => {
        getRequestsLepsari()
            .then(res => res.json())
            .then(requests => {
                setRequestLepsari(requests);
            })
    }

    return (
        <div className="requests_lepsari">
            <div className="main-window">
                {/* <div className="main-window__title">Заявки на производство Лепсари</div> */}
                <SearchBar
                    title="Поиск по заявкам Лепсари"
                    placeholder="Введите название продукции для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__button" onClick={printRequestsList}>Печать списка</div>
                    <div className="main-window__amount_table">Всего: {requestLepsari.length} записей</div>
                </div>
                <TableView
                    data={requestLepsari}
                    loadData={loadRequestLepsari}
                    userHasAccess={props.userHasAccess}
                    deleteItem={deleteItem}
                    searchQuery={searchQuery}
                />
            </div>
        </div>
    )
}

export default WorkshopLepsari;