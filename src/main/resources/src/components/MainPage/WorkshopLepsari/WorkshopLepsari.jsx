import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake';
import './WorkshopLepsari.scss';
import PrintIcon from '../../../../../../../assets/print.png';
import TableView from './TableView/TableView.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import {
    getRequestsLepsari,
    getRequestLepsariById,
    deleteProductsToRequestLepsari,
    deleteRequestLepsari
} from '../../../utils/RequestsAPI/Workshop/Lepsari.jsx';
import { getRequestsListPdfText } from '../../../utils/pdfFunctions.jsx';
import ImgLoader from '../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const WorkshopLepsari = (props) => {
    const [requestLepsari, setRequestLepsari] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const copyRequest = (id) => {
        props.setTransferState(true);
        props.setTransferData(requestLepsari.find(item => {
            if (item.id === id) {
                return true
            }
        }))
        props.history.push('/lepsari/workshop-lepsari/new');
    }

    useEffect(() => {
        document.title = "Заявки - Лепсари";
        loadRequestLepsari();
    }, [])

    const printRequestsList = () => {
        let dd = getRequestsListPdfText(requestLepsari.sort((a, b) => (a.id - b.id)), 'ЦехЛепсари', 'lepsariProducts');
        pdfMake.createPdf(dd).print();
    }

    const loadRequestLepsari = () => {
        setIsLoading(true);
        getRequestsLepsari()
            .then(res => res.json())
            .then(requests => {
                // console.log(requests);                
                setRequestLepsari(requests);
                setIsLoading(false);
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
                    {isLoading ? <ImgLoader /> : <div className="main-window__button" onClick={printRequestsList}>
                        <img className="main-window__img" src={PrintIcon} alt="" />
                        <span>Печать списка</span>
                    </div>}
                    <div className="main-window__amount_table">Всего: {requestLepsari.length} записей</div>
                </div>
                <TableView
                    data={requestLepsari}
                    loadData={loadRequestLepsari}
                    userHasAccess={props.userHasAccess}
                    deleteItem={deleteItem}
                    copyRequest={copyRequest}
                    searchQuery={searchQuery}
                />
            </div>
        </div>
    )
}

export default WorkshopLepsari;