import React, { useState, useEffect } from 'react';
import '../../../utils/MainWindow/MainWindow.scss';
import './Requests.scss';
import '../../../utils/Form/Form.scss';
import { getRequests, deleteRequest, deleteProductsToRequest, getRequestById } from '../../../utils/RequestsAPI/Requests.jsx';
import TableView from './TableView/TableView.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx';

const Requests = (props) => {
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showWindow, setShowWindow] = useState(false);
    const [toWorkshop, setToWorkshop] = useState('lemz');
    const [requestId, setRequestId] = useState(0);

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

    const transferRequest = (id) => {
        setRequestId(id);
        setShowWindow(!showWindow);
    }

    return (
        <div className="requests">
            <div className="main-window">
                <div className="main-window__title">Заявки</div>
                <FormWindow
                    title="Перенос заявки в план производства"
                    windowName="transfer-request"
                    content={
                        <React.Fragment>
                            <div className="main-form">
                                <div className="main-form__form">
                                    <div className="main-form__item">
                                        <div className="main-form__input_name">Подразделение</div>
                                        <div className="main-form__input_field">
                                            <select
                                                name="workshop"
                                                onChange={(event) => {
                                                    setToWorkshop(event.target.value);
                                                }}
                                            >
                                                <option value="lemz">ЦехЛЭМЗ</option>
                                                <option value="lepsari">ЦехЛепсари</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="main-form__buttons">
                                        <input className="main-form__submit" type="submit" onClick={() => {
                                            props.setTransferState(true);
                                            props.setTransferData(requests.find(item => {
                                                if (item.id === requestId) {
                                                    return true
                                                }
                                            }))
                                            props.history.push(toWorkshop + '/workshop-' + toWorkshop + '/new');
                                        }} value="Перенести в цех" />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    showWindow={showWindow}
                    setShowWindow={setShowWindow}
                />
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
                    transferRequest={transferRequest}
                    searchQuery={searchQuery}
                    userHasAccess={props.userHasAccess}
                />
            </div>
        </div>
    )
}

export default Requests;