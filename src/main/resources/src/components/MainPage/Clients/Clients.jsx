import React, { useState, useEffect } from 'react';
import './Clients.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import { getClients, deleteClient } from '../../../utils/RequestsAPI/Clients.jsx';
import TableDataLoading from '../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Clients = (props) => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteClient(id)
            .then(() => getClients())
            .then(res => res.json())
            .then((clients) => {
                setClients(clients);
            })
    }

    const loadData = () => {
        // getClients()
        //     .then(res => res.json())
        //     .then((clients) => {
        //         setClients(clients);
        //         setIsLoading(false);
        //     })
        setClients([
            {
                name: 'СБЕРБАНК РОССИИ',
                legalEntity: '3',
                INN: '7707083893',
                KPP: '3',
                OGRN: '3',
                BIK: '3',
                checkingAccount: '3',
                legalAddress: '3',
                factualAddress: '3',
                contacts: '42849283-74928-374',
                site: '3',
                comment: 'Комментарий',
                storageAddress: '3',
                WorkConditions: '3',
                price: '3',
                discount: '3',
                check: '3',
                workHistory: '3',
                clientType: 'Активные'
            },
            {
                name: 'СБЕРБАНК РОССИИ',
                legalEntity: '3',
                INN: '7707083893',
                KPP: '3',
                OGRN: '3',
                BIK: '3',
                checkingAccount: '3',
                legalAddress: '3',
                factualAddress: '3',
                contacts: '42849283-74928-374',
                site: '3',
                comment: 'Комментарий',
                storageAddress: '3',
                WorkConditions: '3',
                price: '3',
                discount: '3',
                check: '3',
                workHistory: '3',
                clientType: 'Активные'
            }
        ])
        setIsLoading(false);
    }

    useEffect(() => {
        document.title = "Клиенты";
        loadData();
    }, [])

    return (
        <div className="clients">
            <div className="main-window">
                <div className="main-window__title">Клиенты</div>
                <SearchBar
                    title="Поиск по клиентам"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {clients.length} записей</div>
                </div>
                <div className="main-window__list">
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Название</span>
                        <span>ИНН</span>
                        <span>Контакты</span>
                        <span>Комментарий</span>
                        <div className="main-window__actions">Действие</div>
                    </div>
                    {isLoading && <TableDataLoading
                        className="main-window__list-item"
                        minHeight="20px"
                    />}
                    {clients.map((item) => {
                        return <div className="main-window__list-item">
                            <span><div className="main-window__mobile-text">Название: </div>{item.name}</span>
                            <span><div className="main-window__mobile-text">ИНН: </div>{item.INN}</span>
                            <span><div className="main-window__mobile-text">Контактное лицо: </div>{item.contacts}</span>
                            <span><div className="main-window__mobile-text">Комментарий: </div>{item.comment}</span>
                            <div className="main-window__actions">
                                <div className="main-window__action" onClick={() => { }}>Просмотр</div>
                                <div className="main-window__action" onClick={() => { }}>Редактировать</div>
                                {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" onClick={() => { }}>Удалить</div>}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Clients;