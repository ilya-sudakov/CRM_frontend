import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Requests.scss';

const Requests = (props) => {

    const [requests, setRequests] = useState([
        {
            id: 1,
            date1: new Date().getMinutes(),
            date2: new Date().getMinutes(),
            codeword: 'Андрюха',
            accountable: 'Петя',
            items: [
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус2',
                    amount: '160 кор.'
                }
            ]
        },
        {
            id: 2,
            date1: new Date().getMinutes(),
            date2: new Date().getMinutes(),
            codeword: 'Андрюха',
            accountable: 'Петя',
            items: [
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                }
            ]
        },
        {
            id: 3,
            date1: new Date().getMinutes(),
            date2: new Date().getMinutes(),
            codeword: 'Андрюха',
            accountable: 'Петя',
            items: [
                {
                    name: 'Плинтус1',
                    amount: '160 кор.',
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                }
            ]
        },
        {
            id: 4,
            date1: new Date().getMinutes(),
            date2: new Date().getMinutes(),
            codeword: 'Андрюха',
            accountable: 'Петя',
            items: [
                {
                    name: 'Плинтус1',
                    amount: '160 кор.',
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                }
            ]
        },
        {
            id: 5,
            date1: new Date().getMinutes(),
            date2: new Date().getMinutes(),
            codeword: 'Андрюха',
            accountable: 'Петя',
            items: [
                {
                    name: 'Плинтус1',
                    amount: '160 кор.',
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                },
                {
                    name: 'Плинтус1',
                    amount: '160 кор.'
                }
            ]
        }
    ])

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        const newRequests = requests.filter(el => el.id != id);
        setRequests(newRequests);
    }

    useEffect(() => {
        document.title = "Заявки";
    })

    return (
        <div className="requests">
            <div className="requests__title">Заявки</div>
            <Link className="requests__link" to="requests/new">Создать заявку</Link>
            <table className="requests__table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Дата 1</td>
                        <td>Продукция</td>
                        <td>Количество</td>
                        <td>Кодовое слово</td>
                        <td>Ответственный</td>
                        <td>Дата 2</td>
                        <td>Действия</td>
                    </tr>
                </thead>
                <tbody>
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
                    {requests.map((request, request_id) => (
                        request.items.map((order, order_id) => (
                            <tr key={request_id + order_id} className={request_id % 2 === 0 ? 'requests__table--even' : 'requests__table--odd'}>
                                {order_id === 0 && <td rowSpan={request.items.length} data-label="ID">{request.id}</td>}
                                {order_id === 0 && <td rowSpan={request.items.length} data-label="Дата 1">{request.date1}</td>}
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
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Requests;