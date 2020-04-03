import React, { useState } from 'react';
import './WorkshopOrders.scss';
import '../../../../utils/MainWindow/MainWindow.scss';
import editSVG from '../../../../../../../../assets/tableview/edit.svg';
import deleteSVG from '../../../../../../../../assets/tableview/delete.svg';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import { formatDateString } from '../../../../utils/functions.jsx';

const WorkshopOrders = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [statuses, setStatuses] = useState([
        {
            className: 'sent',
            name: 'Отправлено',
            visible: true,
        },
        {
            className: 'completed',
            name: 'Завершено',
            visible: false,
        },
        {
            className: 'ordered',
            name: 'Заказано',
            visible: true,
        }
    ])

    useState(() => {
        const data = [
            {
                date: new Date(),
                products: [
                    {
                        name: 'Продукт1',
                        quantity: '12000'
                    },
                    {
                        name: 'Продукт1',
                        quantity: '12000'
                    },
                    {
                        name: 'Продукт1',
                        quantity: '12000'
                    }
                ],
                name: 'Обновление оборудования',
                assembly: 'Коробочка',
                status: 'sent'
            },
            {
                date: new Date(),
                products: [
                    {
                        name: 'Продукт1',
                        quantity: '12000'
                    }
                ],
                name: 'Обновление оборудования',
                assembly: 'Коробочка',
                status: 'ordered'
            }
        ];
        setOrders(data);
        setIsLoading(false);
    }, [])

    return (
        <div className="workshop-orders">
            <div className="main-window">
                <SearchBar
                    title="Поиск по заказам"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="workshop-orders__status-wrapper">
                        <div>Фильтр по статусам: </div>
                        {statuses.map((status, index) => {
                            return <div
                                className={(status.visible ? "main-window__button" : "main-window__button main-window__button--inverted") + " main-window__list-item--" + status.className}
                                onClick={() => {
                                    let temp = statuses;
                                    temp.splice(index, 1, {
                                        ...status,
                                        visible: !status.visible
                                    });
                                    setStatuses([...temp]);
                                }}
                            >{status.name}</div>
                        })}
                    </div>
                    <div className="main-window__amount_table">Всего: {orders.length} записей</div>
                </div>
                <div className="main-window__list">
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Дата</span>
                        <span>Продукция</span>
                        <span>Название</span>
                        <span>Комплектация</span>
                        <span>Статус</span>
                        <div className="main-window__actions">Действие</div>
                    </div>
                    {orders
                        .filter(item => {
                            if (
                                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                formatDateString(item.date).toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.assembly.toLowerCase().includes(searchQuery.toLowerCase())
                            ) {
                                let check = false;
                                statuses.map(status => {
                                    if (
                                        status.visible && (status.className === item.status)
                                    ) {
                                        check = true;
                                        return;
                                    }
                                })
                                return check;
                            }
                        })
                        .sort((a, b) => {
                            if (a.date < b.date) {
                                return -1;
                            }
                            if (a.date > b.date) {
                                return 1;
                            }
                            return 0;
                        })
                        .map((order, orderIndex) => {
                            return <div className={"main-window__list-item main-window__list-item--" + order.status}>
                                <span><div className="main-window__mobile-text">Дата: </div>{formatDateString(order.date)}</span>
                                {/* <span><div className="main-window__mobile-text">Продукция: </div>{order.name}</span> */}
                                <span><div className="main-window__mobile-text">Продукция: </div>
                                    <div className="main-window__list-col">
                                        {order.products.map(product => {
                                            return <div>
                                                {product.name} ({product.quantity} шт.)
                                        </div>
                                        })}
                                    </div>
                                </span>
                                <span><div className="main-window__mobile-text">Название: </div>{order.name}</span>
                                <span><div className="main-window__mobile-text">Комплектация: </div>{order.assembly}</span>
                                <span><div className="main-window__mobile-text">Статус: </div>{statuses.find(item => item.className === order.status)?.name}</span>
                                <div className="main-window__actions">
                                    <div className="main-window__action" title="Редактирование заказа" onClick={() => {
                                        props.history.push('/lemz/workshop-orders/edit/' + order.id)
                                    }}>
                                        <img className="main-window__img" src={editSVG} />
                                    </div>
                                    {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" title="Удаление заказа" onClick={() => {
                                        // deleteItem(order.id, orderIndex);
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

export default WorkshopOrders;