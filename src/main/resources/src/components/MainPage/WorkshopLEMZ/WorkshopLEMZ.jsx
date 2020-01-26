import React, { useState, useEffect } from 'react';
import './WorkshopLEMZ.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import pdfMake from 'pdfmake';
import { getRequestsLEMZ, deleteRequestLEMZ, getRequestLEMZById, deleteProductsToRequestLEMZ } from '../../../utils/RequestsAPI/Workshop/LEMZ.jsx';
import TableView from './TableView/TableView.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { getRequestsListPdfText } from '../../../utils/functions.jsx';

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

    const printRequestsList = () => {
        let dd = getRequestsListPdfText(requestsLEMZ.sort((a, b) => (a.id - b.id)), 'ЦехЛЭМЗ', 'lemzProducts');
        pdfMake.createPdf(dd).print();
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
            <div className="main-window">
                <SearchBar
                    title="Поиск по заявкам ЛЭМЗ"
                    placeholder="Введите название продукции для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__button" onClick={printRequestsList}>Печать списка</div>
                    <div className="main-window__amount_table">Всего: {requestsLEMZ.length} записей</div>
                </div>
                <TableView
                    data={requestsLEMZ}
                    loadData={loadRequestsLEMZ}
                    userHasAccess={props.userHasAccess}
                    deleteItem={deleteItem}
                    searchQuery={searchQuery}
                />
            </div>
        </div>
    )
}

export default WorkshopLEMZ;