import React, { useState, useEffect } from 'react';
import './Clients.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import viewSVG from '../../../../../../../assets/tableview/view.svg';
import editSVG from '../../../../../../../assets/tableview/edit.svg';
import deleteSVG from '../../../../../../../assets/tableview/delete.svg';
import phoneSVG from '../../../../../../../assets/tableview/phone.svg';
import calendarSVG from '../../../../../../../assets/tableview/calendar.svg';
import { getClients, deleteClient } from '../../../utils/RequestsAPI/Clients.jsx';
import TableDataLoading from '../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';

const Clients = (props) => {
    const [clients, setClients] = useState([]);
    const [curCategory, setCurCategory] = useState('');
    const [curClientType, setCurClientType] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState([1]);
    const [curPage, setCurPage] = useState(1);
    const [itemsCount, setItemsCount] = useState(0);
    const itemsPerPage = 20;

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
        const data = [
            {
                id: 1,
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
                site: 'www.ffff.com',
                comment: 'Комментарий',
                storageAddress: '3',
                WorkConditions: '3',
                price: '3',
                discount: '3',
                check: '3',
                firstName: 'Иван',
                workHistory: '3',
                clientType: 'Активные'
            },
            {
                id: 2,
                name: 'СБЕРБАНК РОССИИ',
                legalEntity: '3',
                INN: '7707083893',
                KPP: '3',
                OGRN: '3',
                BIK: '3',
                checkingAccount: '3',
                legalAddress: '3',
                factualAddress: '3',
                firstName: 'Иван',
                contacts: '42849283-74928-374',
                site: 'www.ffff.com',
                comment: 'Комментарий',
                storageAddress: '3',
                WorkConditions: '3',
                price: '3',
                discount: '3',
                check: '3',
                workHistory: '3',
                clientType: 'Активные'
            }
        ];
        setClients(data);
        // setItemsCount(data.length);
        // let temp = [];
        // let i = 1;
        // do {
        //     temp.push(i);
        //     i++;
        // }
        // while (i <= Math.floor(data.length / itemsPerPage));
        // setPagination(temp);
        if (curPage < 10) {
            if (props.location.pathname.split('/clients/category/')[1].split('/')[1] === 'active') {
                setItemsCount(40);
                let temp = [];
                let i = 1;
                do {
                    temp.push(i);
                    i++;
                }
                while (i <= Math.floor(40 / itemsPerPage) && i <= 10);
                setPagination(temp);
            }
            else {
                setItemsCount(700);
                let temp = [];
                let i = 1;
                do {
                    temp.push(i);
                    i++;
                }
                while (i <= Math.floor(700 / itemsPerPage) && i <= 10);
                setPagination(temp);
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        document.title = "Клиенты";
        setCurCategory(props.location.pathname.split('/clients/category/')[1].split('/')[0]);
        setCurClientType(props.location.pathname.split('/clients/category/')[1].split('/')[1]);
        loadData();
    }, [props.location, curPage])

    return (
        <div className="clients">
            <div className="main-window">
                <div className="main-window__header">
                    <div className="main-window__title">{curCategory}</div>
                    <div className="main-window__menu">
                        <Link to={'/clients/category/' + curCategory + '/active'} className={props.location.pathname.includes('active') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Активные
                        </Link>
                        <Link to={'/clients/category/' + curCategory + '/potential'} className={props.location.pathname.includes('potential') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Потенциальные
                        </Link>
                    </div>
                </div>
                <SearchBar
                    title="Поиск по клиентам"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {itemsCount} записей</div>
                </div>
                <div className="main-window__list">
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Название</span>
                        <span>Сайт</span>
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
                            <span><div className="main-window__mobile-text">Сайт: </div>{item.site}</span>
                            <span><div className="main-window__mobile-text">Контактное лицо: </div>{item.firstName + ', ' + item.contacts}</span>
                            <span><div className="main-window__mobile-text">Комментарий: </div>{item.comment}</span>
                            <div className="main-window__actions">
                                <div className="main-window__action" onClick={() => {
                                    props.history.push('/clients/category/' + curCategory + '/view/' + item.id)
                                }}>
                                    <img className="main-window__img" src={phoneSVG} />
                                </div>
                                <div className="main-window__action" onClick={() => {
                                    // props.history.push('/clients/category/' + curCategory + '/view/' + item.id)
                                }}>
                                    <img className="main-window__img" src={calendarSVG} />
                                </div>
                                <div className="main-window__action" onClick={() => {
                                    props.history.push('/clients/category/' + curCategory + '/view/' + item.id)
                                }}>
                                    <img className="main-window__img" src={viewSVG} />
                                </div>
                                <div className="main-window__action" onClick={() => {
                                    props.history.push('/clients/category/' + curCategory + '/edit/' + item.id)
                                }}>
                                    <img className="main-window__img" src={editSVG} />
                                </div>
                                {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" onClick={() => {
                                    // props.history('/clients/category/' + curCategory + '/d/' + item.id)
                                }}>
                                    <img className="main-window__img" src={deleteSVG} />
                                </div>}
                            </div>
                        </div>
                    })}
                    <div className="main-window__pagination">
                        {pagination.map((item, index) => {
                            return <div className={curPage == item ? "main-window__page-number main-window__page-number--active" : "main-window__page-number"} onClick={() => {
                                setCurPage(item);
                                if (Math.floor(itemsCount / itemsPerPage) > 10) {
                                    if (pagination.indexOf(item) === 0 && item !== 1) {
                                        let temp = [];
                                        for (let i = pagination[0] - 1; i <= Math.floor(itemsCount / itemsPerPage) && i <= pagination[pagination.length - 1] - 1; i++) {
                                            temp.push(i);
                                        }
                                        return setPagination(temp)
                                    }
                                    if (pagination.indexOf(item) === (pagination.length - 1) && item !== (Math.floor(itemsCount / itemsPerPage))) {
                                        let temp = [];
                                        for (let i = pagination[0] + 1; i <= Math.floor(itemsCount / itemsPerPage) && i <= pagination[pagination.length - 1] + 1; i++) {
                                            temp.push(i);
                                        }
                                        return setPagination(temp)
                                    }
                                }
                            }}>{item}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Clients;