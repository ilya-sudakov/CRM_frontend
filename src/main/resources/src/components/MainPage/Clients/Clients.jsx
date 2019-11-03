import React, { useState, useEffect } from 'react';
import './Clients.scss';

const Clients = () => {

    const [clients, setClients] = useState([
        {
            id: 1,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 2,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 3,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 4,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 5,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 6,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 7,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 8,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 9,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 10,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 11,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
        {
            id: 12,
            name: 'ООО компания',
            contant: '982734982374',
            address: 'sdfdf',
            dossier: '',
            status: 'Клиент',
            simplified: true
        },
    ])

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        const newClients = clients.filter( el => el.id != id );
        setClients(newClients);
    }

    useEffect(() => {
        document.title = "Клиенты";
    })

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
                            <td>{item.name}</td>
                            <td>{item.contant}</td>
                            <td>{item.address !== '' ? item.address : '...'}</td>
                            <td>{item.dossier !== '' ? item.dossier : '...'}</td>
                            <td>{item.status}</td>
                            <td>{item.simplified ? 'Да' : 'Нет'}</td>
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