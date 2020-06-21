import React, { useState, useEffect } from 'react';
import './ClientCategories.scss';
import editSVG from '../../../../../../../../assets/tableview/edit.svg';
import deleteSVG from '../../../../../../../../assets/tableview/delete.svg';
import '../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';
import { getClientCategories, deleteClientCategory, addClientCategory, editClientCategory } from '../../../../utils/RequestsAPI/Clients/Categories.jsx';
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx';
import NewClientCategory from './NewClientCategory/NewClientCategory.jsx';
import EditClientCategory from './EditClientCategory/EditClientCategory.jsx';

const ClientCategories = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showWindow, setShowWindow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [curForm, setCurForm] = useState('new');
    const [editCategory, setEditCategory] = useState(null);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        getClientCategories()
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setCategories(res);
                setIsLoading(false);
            })
    }

    const deleteItem = (id) => {
        deleteClientCategory(id)
            .then(() => {
                loadData();
            })
            .catch(error => {
                alert('Ошибка при удалении записи! Убедитесь что в категории нет клиентов');
                console.log(error);
            })
    }

    return (
        <div className="client-categories">
            <div className="main-window">
                <div className="main-window__header">
                    <div className="main-window__title">Категории клиентов</div>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <div className="main-window__button" onClick={() => {
                        setCurForm('new');
                        setShowWindow(!showWindow);
                    }}>Создать категорию</div>}
                </div>
                <FormWindow
                    title={curForm === 'new' ? "Создание категории" : "Редактирование категории"}
                    content={
                        <React.Fragment>
                            {curForm === 'new'
                                ? <NewClientCategory
                                    onSubmit={loadData}
                                    showWindow={showWindow}
                                    setShowWindow={setShowWindow}
                                />
                                : <EditClientCategory
                                    onSubmit={loadData}
                                    showWindow={showWindow}
                                    setShowWindow={setShowWindow}
                                    category={editCategory}
                                />
                            }
                        </React.Fragment>
                    }
                    showWindow={showWindow}
                    setShowWindow={setShowWindow}
                />
                <SearchBar
                    // title="Поиск по категориям клиентов"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {categories.length} записей</div>
                </div>
                <div className="main-window__list">
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Название</span>
                        <span>Видимость</span>
                        <div className="main-window__actions">Действия</div>
                    </div>
                    {isLoading && <TableDataLoading
                        className="main-window__list-item"
                        minHeight="20px"
                    />}
                    {categories.filter(item => {
                        return (item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    }).sort((a, b) => {
                        if (a.name.localeCompare(b.name, undefined, { numeric: true }) < 0) {
                            return -1;
                        }
                        if (a.name.localeCompare(b.name, undefined, { numeric: true }) > 0) {
                            return 1;
                        }
                        return 0;
                    }).map((item) => {
                        return <div className="main-window__list-item">
                            <span><div className="main-window__mobile-text">Название: </div>{item.name}</span>
                            <span><div className="main-window__mobile-text">Видимость: </div>{item.visibility}</span>
                            <div className="main-window__actions">
                                <div className="main-window__action" onClick={() => {
                                    setEditCategory(item);
                                    setCurForm('edit');
                                    setShowWindow(!showWindow);
                                }}>
                                    <img className="main-window__img" src={editSVG} />
                                </div>
                                {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" onClick={() => {
                                    deleteItem(item.id);
                                }}>
                                    <img className="main-window__img" src={deleteSVG} />
                                </div>}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default ClientCategories;