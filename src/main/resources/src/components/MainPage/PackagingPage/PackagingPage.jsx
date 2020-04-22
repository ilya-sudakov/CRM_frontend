import React, { useState, useEffect } from 'react';
import './PackagingPage.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import editSVG from '../../../../../../../assets/tableview/edit.svg';
import deleteSVG from '../../../../../../../assets/tableview/delete.svg';
import TableLoading from '../../../utils/TableView/TableLoading/TableLoading.jsx';

const PackagingPage = (props) => {
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
            [name]: order
        });
    };

    useEffect(() => {
        setIsLoading(true);
        loadData();
        setIsLoading(false);
    }, []);

    const loadData = () => {
        const data = [
            {
                id: 1,
                name: 'Уfпаковка',
                quantity: 10000,
                comment: 'Комментарий',
                size: '2x6'
            },
            {
                id: 2,
                name: 'Упzаковка',
                quantity: 15000,
                comment: 'Коммеxcvxнтарий',
                size: '2x6'
            },
            {
                id: 3,
                name: 'Упаковhyка',
                quantity: 5000,
                comment: 'Коммеdsfнтарий',
                size: '2x6'
            },
            {
                id: 1,
                name: '1Упаковка',
                quantity: 1000,
                comment: 'Комментарий',
                size: '2x6'
            },
        ]
        setPackages(data);
    };

    return (
        <div className="packaging-page">
            <div className="main-window">
                <div className="main-window__title">Упаковки</div>
                <SearchBar
                    title="Поиск по упаковкам"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {packages.length} записей</div>
                </div>
                <div className="main-window__sort-panel">
                    <span>Сортировка: </span>
                    <select onChange={changeSortOrder}>
                        <option value="name asc">По алфавиту (А-Я)</option>
                        <option value="name desc">По алфавиту (Я-А)</option>
                        <option value="quantity desc">По штукам</option>
                    </select>
                </div>
                <div className="main-window__list">
                    <TableLoading
                        isLoading={isLoading}
                    />
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Название</span>
                        <span>Кол-во</span>
                        <span>Размер</span>
                        <span>Комментарий</span>
                        <div className="main-window__actions">Действия</div>
                    </div>
                    {packages
                        .filter(item => (
                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.quantity.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.comment.toLowerCase().includes(searchQuery.toLowerCase())
                        ))
                        .sort((a, b) => {
                            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
                            }
                            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
                            }
                            return 0;
                        })
                        .map((packageItem, packageIndex) => {
                            return <div className="main-window__list-item">
                                <span><div className="main-window__mobile-text">Название</div>{packageItem.name}</span>
                                <span><div className="main-window__mobile-text">Кол-во</div>{packageItem.quantity}</span>
                                <span><div className="main-window__mobile-text">Размер</div>{packageItem.size}</span>
                                <span><div className="main-window__mobile-text">Комментарий</div>{packageItem.comment}</span>
                                <div className="main-window__actions">
                                    <div className="main-window__mobile-text">Действия</div>
                                    <div className="main-window__action" title="Редактирование упаковки" onClick={() => {
                                        props.history.push('/packages/edit/' + packageItem.id)
                                    }}>
                                        <img className="main-window__img" src={editSVG} />
                                    </div>
                                    {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" title="Удаление упаковки" onClick={() => {
                                        // deleteItem(packageItem.id);
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

export default PackagingPage;