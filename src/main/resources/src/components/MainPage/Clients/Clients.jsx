import React, { useState, useEffect } from 'react';
import './Clients.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import { getClients, deleteClient } from '../../../utils/RequestsAPI/Clients.jsx';

const Clients = () => {

    const [clients, setClients] = useState([])

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteClient(id)
            .then(() => getClients())
            .then(res => res.json())
            .then((clients) => {
                setClients(clients);
            })
    }

    useEffect(() => {
        document.title = "Клиенты";
        getClients()
            .then(res => res.json())
            .then((clients) => {
                setClients(clients);
            })
    }, [])

    return (
        <div className="clients">
            <div className="main-window">
                <div className="main-window__title">Клиенты</div>
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {clients.length} записей</div>
                </div>
                <table className="main-window__table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Клиент</td>
                            <td>Контакт</td>
                            <td>Адрес</td>
                            <td>Досье</td>
                            <td>Статус</td>
                            <td>Упрощенка</td>
                            <td>Действия</td>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((item, id) => (
                            <tr key={id + 1} className={id % 2 === 0 ? 'main-window__table--even' : 'main-window__table--odd'}>
                                <td>{item.id}</td>
                                <td>{item.client}</td>
                                <td>{item.contact}</td>
                                <td>{item.address !== '' ? item.address : '...'}</td>
                                <td>{item.file !== '' ? item.file : '...'}</td>
                                <td>{item.status}</td>
                                <td>{item.smpl ? 'Да' : 'Нет'}</td>
                                <td>
                                    <div data-id={item.id} className="main-window__action" >Просмотр</div>
                                    <div data-id={item.id} className="main-window__action" >Редактировать</div>
                                    <div data-id={item.id} className="main-window__action" onClick={deleteItem}>Удалить</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Clients;