import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Clients.scss';
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
            <div className="clients__title">Клиенты</div>
            <Link className="clients__link" to="clients/new">Добавить клиента</Link>
            <table className="clients__table">
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
                        <tr key={id + 1} className={id % 2 === 0 ? 'clients__table--even' : 'clients__table--odd'}>
                            <td>{item.id}</td>
                            <td>{item.client}</td>
                            <td>{item.contact}</td>
                            <td>{item.address !== '' ? item.address : '...'}</td>
                            <td>{item.file !== '' ? item.file : '...'}</td>
                            <td>{item.status}</td>
                            <td>{item.smpl ? 'Да' : 'Нет'}</td>
                            <td>
                                <div data-id={item.id} className="clients__action" >Просмотр</div>
                                <div data-id={item.id} className="clients__action" >Редактировать</div>
                                <div data-id={item.id} className="clients__action" onClick={deleteItem}>Удалить</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Clients;