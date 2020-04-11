import React, { useState, useEffect } from 'react';
import './Clients.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import '../../../utils/Form/Form.scss';
import viewSVG from '../../../../../../../assets/tableview/view.svg';
import editSVG from '../../../../../../../assets/tableview/edit.svg';
import deleteSVG from '../../../../../../../assets/tableview/delete.svg';
import phoneSVG from '../../../../../../../assets/tableview/phone.svg';
import calendarSVG from '../../../../../../../assets/tableview/calendar.svg';
import { getClients, deleteClient, getClientsByCategory, getClientsByCategoryAndType, editNextContactDateClient } from '../../../utils/RequestsAPI/Clients.jsx';
import TableDataLoading from '../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import { formatDateString } from '../../../utils/functions.jsx';
import { deleteClientLegalEntity } from '../../../utils/RequestsAPI/Clients/LegalEntity.jsx';
import { deleteClientContact } from '../../../utils/RequestsAPI/Clients/Contacts.jsx';
import { deleteClientWorkHistory, editClientWorkHistory, addClientWorkHistory } from '../../../utils/RequestsAPI/Clients/WorkHistory.jsx';
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx';
import InputDate from '../../../utils/Form/InputDate/InputDate.jsx';
import SelectWorkHistory from './SelectWorkHistory/SelectWorkHistory.jsx';
import TableLoading from '../../../utils/TableView/TableLoading/TableLoading.jsx';

const Clients = (props) => {
    const [clients, setClients] = useState([]);
    const [curCategory, setCurCategory] = useState('');
    const [curClientType, setCurClientType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState([1]);
    const [curPage, setCurPage] = useState(1);
    const [itemsCount, setItemsCount] = useState(0);
    const [itemsActiveCount, setItemsActiveCount] = useState(0);
    const [itemsPotentialCount, setItemsPotentialCount] = useState(0);
    const [itemsProgressCount, setItemsProgressCount] = useState(0);
    const [curForm, setCurForm] = useState('nextContactDate');
    const [showWindow, setShowWindow] = useState(false);
    const [closeWindow, setCloseWindow] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const itemsPerPage = 15;

    const deleteItem = (clientId, index) => {
        Promise.all(clients[index].legalEntities.map(item => {
            return deleteClientLegalEntity(item.id)
        }))
            .then(() => {
                Promise.all(clients[index].contacts.map(item => {
                    return deleteClientContact(item.id)
                }))
                    .then(() => {
                        Promise.all(clients[index].histories.map(item => {
                            return deleteClientWorkHistory(item.id)
                        }))
                            .then(() => {
                                deleteClient(clientId)
                                    .then(() => {
                                        let temp = clients;
                                        temp.splice(index, 1);
                                        setClients([...temp]);
                                        // console.log('deleted successfully');
                                    })
                            })
                    })
            })
            .catch(error => {
                alert('Ошибка при удалении');
                console.log(error);
            })
    };

    const loadClientsTotalByType = (category) => {
        return getClientsByCategoryAndType({
            categoryName: category,
            clientType: 'Активные'
        }, 1, 1, sortOrder)
            .then(res => res.json())
            .then(res => {
                setItemsActiveCount(res.totalElements);
                return getClientsByCategoryAndType({
                    categoryName: category,
                    clientType: 'Потенциальные'
                }, 1, 1, sortOrder)
                    .then(res => res.json())
                    .then(res => {
                        setItemsPotentialCount(res.totalElements);
                        return getClientsByCategoryAndType({
                            categoryName: category,
                            clientType: 'В разработке'
                        }, 1, 1, sortOrder)
                            .then(res => res.json())
                            .then(res => {
                                setItemsProgressCount(res.totalElements);
                            })
                    })
            })
    }

    const loadData = (category, type, signal) => {
        // console.log(category, type);
        setIsLoading(true);
        getClientsByCategoryAndType({
            categoryName: category,
            clientType: type === 'active'
                ? 'Активные'
                : type === 'potential'
                    ? 'Потенциальные'
                    : 'В разработке'
        }, curPage, itemsPerPage, sortOrder, signal)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setClients(res.content);
                // console.log(Math.ceil(res.totalElements / itemsPerPage));
                if (curPage < 5) {
                    // setItemsCount(res.length);
                    setItemsCount(res.totalElements);
                    let temp = [];
                    let i = 1;
                    do {
                        temp.push(i);
                        i++;
                    }
                    while (i <= Math.ceil(res.totalElements / itemsPerPage) && i <= 5);
                    setPagination(temp);
                }
                setIsLoading(false);
            })
    }

    const [sortOrder, setSortOrder] = useState({
        curSort: 'name',
        name: 'asc',
        nextDateContact: 'asc'
    });

    const changeSortOrder = (event) => {
        const name = event.target.value.split(' ')[0];
        const order = event.target.value.split(' ')[1];
        setSortOrder({
            curSort: name,
            // [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
            [name]: order
        });
        // loadData(props.location.pathname.split('/clients/category/')[1].split('/')[0],
        //     props.location.pathname.split('/clients/category/')[1].split('/')[1]);
    };

    useEffect(() => {
        document.title = "Клиенты";
        const abortController = new AbortController();
        // console.log(curPage);
        const curCategoryTemp = props.location.pathname.split('/clients/category/')[1].split('/')[0];
        const curClientTypeTemp = props.location.pathname.split('/clients/category/')[1].split('/')[1];
        if (curCategoryTemp !== curCategory || curClientTypeTemp !== curClientType) {
            setCurPage(1);
        };
        setCurCategory(curCategoryTemp);
        setCurClientType(curClientTypeTemp);
        loadClientsTotalByType(curCategoryTemp);
        loadData(curCategoryTemp, curClientTypeTemp, abortController.signal);
        return function cancel() {
            abortController.abort();
        };
    }, [props.location, curPage, sortOrder]);

    return (
        <div className="clients">
            <div className="main-window">
                <div className="main-window__header">
                    <div className="main-window__title">{curCategory}</div>
                    <div className="main-window__menu">
                        <Link to={'/clients/category/' + curCategory + '/active'} className={props.location.pathname.includes('active') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Активные ({itemsActiveCount})
                        </Link>
                        <Link to={'/clients/category/' + curCategory + '/potential'} className={props.location.pathname.includes('potential') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Потенциальные ({itemsPotentialCount})
                        </Link>
                        <Link to={'/clients/category/' + curCategory + '/in-progress'} className={props.location.pathname.includes('in-progress') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            В разработке ({itemsProgressCount})
                        </Link>
                    </div>
                </div>
                <SearchBar
                    title="Поиск по клиентам"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <FormWindow
                    title={curForm === 'nextContactDate' ? "Дата следующего контакта" : "Запись действия"}
                    content={
                        <React.Fragment>
                            {curForm === 'nextContactDate'
                                ? <EditNextContactDate
                                    selectedItem={selectedItem}
                                    showWindow={showWindow}
                                    setShowWindow={setShowWindow}
                                    setCloseWindow={setCloseWindow}
                                    closeWindow={closeWindow}
                                    loadData={loadData}
                                />
                                : <EditWorkHistory
                                    selectedItem={selectedItem}
                                    showWindow={showWindow}
                                    setShowWindow={setShowWindow}
                                    setCloseWindow={setCloseWindow}
                                    closeWindow={closeWindow}
                                    userHasAccess={props.userHasAccess}
                                />
                            }
                        </React.Fragment>
                    }
                    showWindow={showWindow}
                    setShowWindow={setShowWindow}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {itemsCount} записей</div>
                </div>
                <div className="main-window__sort-panel">
                    <span>Сортировка: </span>
                    <select onChange={changeSortOrder}>
                        <option value="name asc">По алфавиту (А-Я)</option>
                        <option value="name desc">По алфавиту (Я-А)</option>
                        <option value="nextDateContact asc">По дате след. контакта</option>
                    </select>
                </div>
                <div className="main-window__list">
                    <TableLoading
                        isLoading={isLoading}
                    />
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Название</span>
                        <span>Сайт</span>
                        <span>Контакты</span>
                        <span>Комментарий</span>
                        <span>Дата след. контакта</span>
                        <div className="main-window__actions">Действие</div>
                    </div>
                    {/* {isLoading && <TableDataLoading
                        className="main-window__list-item"
                        minHeight="50px"
                    />} */}
                    {clients
                        .filter(item => {
                            return (
                                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.comment.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                        })
                        .map((item, index) => {
                            return <div className="main-window__list-item">
                                <span><div className="main-window__mobile-text">Название: </div>{item.name}</span>
                                <span><div className="main-window__mobile-text">Сайт: </div>
                                    {/* {item.site} */}
                                    <a className="main-window__link" title={item.site} href={item.site.split('//').length > 1 ? item.site : 'http://' + item.site} target="_blank">{item.site.split('//').length > 1 ? item.site.split('//')[1] : item.site}</a>
                                </span>
                                <span><div className="main-window__mobile-text">Контактное лицо: </div>{item.contacts.length > 0 ? ((item.contacts[0].name !== '' ? (item.contacts[0].name + ', ') : '') + item.contacts[0].phoneNumber) : 'Не указаны контакт. данные'}</span>
                                <span><div className="main-window__mobile-text">Комментарий: </div>{item.comment}</span>
                                <span><div className="main-window__mobile-text">Дата след. контакта: </div>
                                    {/* {formatDateString(item.nextDateContact)} */}
                                    {
                                        (new Date(item.nextDateContact) < new Date())
                                            ? <div className="main-window__reminder">
                                                <div>!</div>
                                                <div>{formatDateString(item.nextDateContact)}</div>
                                            </div>
                                            : formatDateString(item.nextDateContact)
                                    }

                                </span>
                                <div className="main-window__actions">
                                    <div className="main-window__action" title="Совершить действие" onClick={() => {
                                        setCloseWindow(false);
                                        setSelectedItem(item);
                                        setShowWindow(true);
                                        setCurForm('workHistory');
                                    }}>
                                        <img className="main-window__img" src={phoneSVG} />
                                    </div>
                                    <div className="main-window__action" title="Дата следующего контакта" onClick={() => {
                                        setCloseWindow(false);
                                        setSelectedItem(item);
                                        setShowWindow(true);
                                        setCurForm('nextContactDate');
                                    }}>
                                        <img className="main-window__img" src={calendarSVG} />
                                    </div>
                                    <div className="main-window__action" title="Просмотр клиента" onClick={() => {
                                        props.history.push('/clients/view/' + item.id)
                                    }}>
                                        <img className="main-window__img" src={viewSVG} />
                                    </div>
                                    <div className="main-window__action" title="Редактирование клиента" onClick={() => {
                                        props.history.push('/clients/edit/' + item.id)
                                    }}>
                                        <img className="main-window__img" src={editSVG} />
                                    </div>
                                    {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" title="Удаление клиента" onClick={() => {
                                        deleteItem(item.id, index);
                                    }}>
                                        <img className="main-window__img" src={deleteSVG} />
                                    </div>}
                                </div>
                            </div>
                        })}
                </div>
                <div className="main-window__pagination">
                    <div className="main-window__page-number main-window__page-number--skip" onClick={() => {
                        if (curPage > 1) {
                            const item = curPage - 1;
                            setCurPage(item);
                            if (Math.floor(itemsCount / itemsPerPage) > 5) {
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
                        }
                    }}>Пред</div>
                    {curPage >= 5 && <React.Fragment>
                        <div className="main-window__page-number" onClick={() => {
                            const item = 1;
                            setCurPage(item);
                            if (Math.floor(itemsCount / itemsPerPage) > 5) {
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
                        }}>1</div>
                        <span>...</span>
                    </React.Fragment>}
                    {pagination.map((item, index) => {
                        return <div className={curPage == item ? "main-window__page-number main-window__page-number--active" : "main-window__page-number"} onClick={() => {
                            setCurPage(item);
                            if (Math.floor(itemsCount / itemsPerPage) > 5) {
                                if (pagination.indexOf(item) === 0 && item !== 1) {
                                    let temp = [];
                                    for (let i = pagination[0] - 1; i <= Math.floor(itemsCount / itemsPerPage) && i <= pagination[pagination.length - 1] - 1; i++) {
                                        temp.push(i);
                                    }
                                    return setPagination(temp)
                                }
                                if (pagination.indexOf(item) === (pagination.length - 1) && item !== (Math.ceil(itemsCount / itemsPerPage))) {
                                    let temp = [];
                                    for (let i = pagination[0] + 1; i <= Math.ceil(itemsCount / itemsPerPage) && i <= pagination[pagination.length - 1] + 1; i++) {
                                        temp.push(i);
                                    }
                                    return setPagination(temp)
                                }
                            }
                        }}>{item}<div className="main-window__mobile-text">из {Math.ceil(itemsCount / itemsPerPage)}</div></div>
                    })}
                    {(curPage <= (
                        Math.ceil(itemsCount / itemsPerPage) - 2)
                        && Math.ceil(itemsCount / itemsPerPage) > 5
                        && pagination.find(item => item === Math.ceil(itemsCount / itemsPerPage)) === undefined
                    ) && <React.Fragment>
                            <span>...</span>
                            {/* {console.log(pagination.find(item => item === Math.ceil(itemsCount / itemsPerPage)))} */}
                            <div className="main-window__page-number" onClick={() => {
                                const item = Math.ceil(itemsCount / itemsPerPage);
                                setCurPage(item);
                                console.log(item);
                                if (Math.ceil(itemsCount / itemsPerPage) > 5) {
                                    let temp = [];
                                    for (let i = item - 5; i <= Math.ceil(itemsCount / itemsPerPage); i++) {
                                        temp.push(i);
                                    }
                                    return setPagination(temp)
                                }
                            }}>{Math.ceil(itemsCount / itemsPerPage)}</div>
                        </React.Fragment>}
                    <div className="main-window__page-number main-window__page-number--skip" onClick={() => {
                        if (curPage < Math.ceil(itemsCount / itemsPerPage)) {
                            const item = curPage + 1;
                            setCurPage(item);
                            if (Math.ceil(itemsCount / itemsPerPage) >= 5) {
                                if (pagination.indexOf(item) === 0 && item !== 1) {
                                    let temp = [];
                                    for (let i = pagination[0] - 1; i <= Math.ceil(itemsCount / itemsPerPage) && i <= pagination[pagination.length - 1] - 1; i++) {
                                        temp.push(i);
                                    }
                                    return setPagination(temp)
                                }
                                if (pagination.indexOf(item) === (pagination.length - 1) && item !== (Math.ceil(itemsCount / itemsPerPage))) {
                                    let temp = [];
                                    for (let i = pagination[0] + 1; i <= Math.ceil(itemsCount / itemsPerPage) && i <= pagination[pagination.length - 1] + 1; i++) {
                                        temp.push(i);
                                    }
                                    return setPagination(temp)
                                }
                            }
                        }
                    }}>След</div>
                </div>
            </div>
        </div>
    );
}
export default Clients;


const EditNextContactDate = (props) => {
    const [date, setDate] = useState(new Date);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        editNextContactDateClient({
            nextDateContact: new Date(date).getTime() / 1000,
            id: props.selectedItem.id
        })
            .then(() => {
                props.loadData(props.selectedItem.category.name, (props.selectedItem.clientType === 'Активные' ? 'active' : 'potential'));
                props.setCloseWindow(!props.closeWindow);
            })
    }

    useEffect(() => {
        if (props.selectedItem.nextDateContact && props.setShowWindow && props.closeWindow === true) {
            props.setShowWindow(false);
        }
        else {
            setDate(props.selectedItem.nextDateContact);
        }
    }, [props.selectedItem, props.closeWindow])

    return (
        <div className="main-form">
            <form className="main-form__form">
                <InputDate
                    inputName="Дата след. контакта"
                    name="nextContactDate"
                    selected={Date.parse(date)}
                    handleDateChange={(value) => {
                        setDate(value)
                    }}
                />
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => {
                        props.setCloseWindow(!props.closeWindow);
                    }} value="Закрыть" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Изменить дату" />
                    {isLoading && <ImgLoader />}
                </div>
            </form>
        </div>
    );
};


const EditWorkHistory = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [workHistory, setWorkHistory] = useState([]);
    const [workHistoryNew, setWorkHistoryNew] = useState([]);
    const [clientId, setClientId] = useState(0);

    const handleSubmit = () => {
        //PUT if edited, POST if item is new
        const itemsArr = workHistoryNew.map((selected) => {
            let edited = false;
            workHistory.map((item) => {
                if (item.id === selected.id) {
                    edited = true;
                    return;
                }
            });
            return (edited === true)
                ? (
                    editClientWorkHistory({
                        date: selected.date,
                        action: selected.action,
                        result: selected.result,
                        comment: selected.comment,
                        clientId: clientId
                    }, selected.id)
                )
                : (
                    addClientWorkHistory({
                        date: selected.date,
                        action: selected.action,
                        result: selected.result,
                        comment: selected.comment,
                        clientId: clientId
                    })
                )
        })
        Promise.all(itemsArr)
            .then(() => {
                //DELETE items removed by user
                const itemsArr = workHistory.map((item) => {
                    let deleted = true;
                    workHistoryNew.map((selected) => {
                        if (selected.id === item.id) {
                            deleted = false;
                            return;
                        }
                    })
                    return (deleted === true && deleteClientWorkHistory(item.id));
                })
                Promise.all(itemsArr)
                    .then(() => {
                        props.setCloseWindow(!props.closeWindow);
                    })
            })
    }

    useEffect(() => {
        if (props.selectedItem && props.setShowWindow && props.closeWindow === true) {
            props.setShowWindow(false);
        }
        else {
            setClientId(props.selectedItem.id);
            setWorkHistory(props.selectedItem.histories);
            setWorkHistoryNew(props.selectedItem.histories);
        }
    }, [props.selectedItem, props.closeWindow])

    return (
        <div className="main-form">
            <form className="main-form__form">
                <div className="main-form__item">
                    <SelectWorkHistory
                        defaultValue={workHistory}
                        userHasAccess={props.userHasAccess}
                        handleWorkHistoryChange={(value) => {
                            setWorkHistoryNew(value);
                        }}
                    />
                </div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => {
                        props.setCloseWindow(!props.closeWindow);
                    }} value="Закрыть" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Сохранить" />
                    {isLoading && <ImgLoader />}
                </div>
            </form>
        </div>
    );
};