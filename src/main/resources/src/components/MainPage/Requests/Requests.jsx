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
        getRequests()
            .then(res => res.json())
            .then(requests => {
                setRequests(requests);
                // console.log(requests);
            })
    }, [])

    return (
        <div className="requests">
            <div className="requests__title">Заявки</div>
            <SearchBar
                title="Поиск по заявкам"
                placeholder="Введите название продукции для поиска..."
                setSearchQuery={setSearchQuery}
            />
            {/* <div className="requests__amount_table">{requests.length} записей из {requests.length}</div> */}
            <div className="requests__amount_table">Всего: {requests.length} записей</div>
            <TableView
                data={requests}
                // deleteItem={deleteItem}
                searchQuery={searchQuery}
            />
            {/* Working <table tag> */}
            {/* <table className="requests__table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>
                            <span>
                                Дата
                            </span>
                            <span name="date" className="requests__sortButton" onClick={changeSortOrder}>
                                {sortOrder.date === 'desc' ? '(Убывание)' : '(Возрастание)'}
                            </span>
                        </td>
                        <td>Продукция</td>
                        <td>Количество</td>
                        <td>Кодовое слово</td>
                        <td>Ответственный</td>
                        <td>Статус</td>
                        <td>Действия</td>
                    </tr>
                </thead>
                <tbody> */}
            {/* {requests.map((request, id) => (
                        <tr key={id + 1}>
                            <td>{request.id}</td>
                            <td>{request.date1}</td>
                            <td colSpan={4}>
                                {request.items.map((order, id) => (
                                    <table key={id + 1}>
                                        <tbody>
                                            <tr>
                                                <td>{order.name}</td>
                                                <td>{order.amount}</td>
                                                <td>{order.codeword}</td>
                                                <td>{order.accountable}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))}
                            </td>
                            <td>{request.date2}</td>

                        </tr>
                    ))} */}
            {/* Works w/ items as array */}
            {/* {requests.map((request, request_id) => (
                        request.items.map((order, order_id) => (
                            <tr key={request_id + order_id} className={request_id % 2 === 0 ? 'requests__table--even' : 'requests__table--odd'}>
                                {order_id === 0 && <td rowSpan={request.items.length} data-label="ID">{request.id}</td>}
                                {order_id === 0 && <td rowSpan={request.items.length} data-label="Дата 1">{request.date}</td>}
                                <td data-label="Продукция">{order.name}</td>
                                <td data-label="Количество">{order.amount}</td>
                                {order_id === 0 && <td rowSpan={request.items.length} data-label="Кодовое слово">{request.codeword}</td>}
                                {order_id === 0 && <td rowSpan={request.items.length} data-label="Ответственный">{request.accountable}</td>}
                                {order_id === 0 && <td rowSpan={request.items.length} data-label="Дата 2">{request.date2}</td>}
                                {order_id === 0 && <td rowSpan={request.items.length} data-label="Действия" className="requests__actions">
                                    <div data-id={request.id} className="requests__action" >Просмотр</div>
                                    <div data-id={request.id} className="requests__action" >Редактировать</div>
                                    <div data-id={request.id} className="requests__action" onClick={deleteItem}>Удалить</div>
                                </td>}
                            </tr>
                        ))
                    ))}  */}
            {/* Working <table tag> */}
            {/* {sortRequests().map((request, request_id) => (
                        //<tr key={request_id} className={request_id % 2 === 0 ? 'requests__table--even' : 'requests__table--odd'}>
                        <tr key={request_id} className={
                            request.status === "Не готово" && "requests__table--status_not_ready" ||
                            request.status === "В процессе" && "requests__table--status_in_progress" ||
                            request.status === "Готово к отгрузке" && "requests__table--status_ready" ||
                            request.status === "Отгружено" && "requests__table--status_shipped"
                        }>
                            <td data-label="ID">{request.id}</td>
                            <td data-label="Дата">{request.date}</td>
                            <td data-label="Продукция">{request.products}</td>
                            <td data-label="Количество">{request.quantity}</td>
                            <td data-label="Кодовое слово">{request.codeWord}</td>
                            <td data-label="Ответственный">{request.responsible}</td>
                            <td data-label="Статус">{request.status}</td>
                            <td data-label="Действия" className="requests__actions">
                                <div data-id={request.id} className="requests__action" >Просмотр</div>
                                <div data-id={request.id} className="requests__action" >Редактировать</div>
                                <div data-id={request.id} className="requests__action" onClick={deleteItem}>Удалить</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    )
}

export default Requests;