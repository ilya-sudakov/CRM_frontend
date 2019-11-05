import React, { useState, useEffect } from 'react';
import './Clients.scss';
import { getClients, deleteClient } from '../../../utils/utilsAPI.jsx';

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
                        <tr key={id + 1}>
                            <td>{item.id}</td>
                            <td>{item.client}</td>
                            <td>{item.contant}</td>
                            <td>{item.address !== '' ? item.address : '...'}</td>
                            <td>{item.file !== '' ? item.dossier : '...'}</td>
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