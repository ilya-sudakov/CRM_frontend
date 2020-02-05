import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';
import { editRequestStatus } from '../../../../utils/RequestsAPI/Requests.jsx';
import { formatDateString } from '../../../../utils/functions.jsx';
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';

const TableView = (props) => {
    const [curPage, setCurPage] = useState('Открытые');
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState({
        curSort: 'date',
        date: 'desc'
    })

    const changeSortOrder = (event) => {
        const name = event.target.getAttribute("name");
        setSortOrder({
            curSort: name,
            [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
        })
    }

    const searchQuery = (data) => {
        const query = props.searchQuery.toLowerCase();
        //Временно
        return data.filter(item => {
            if (curPage === 'Открытые') {
                if (item.status !== 'Завершено') return true;
            } else {
                if (item.status === 'Завершено') return true;
            }
        }).filter(item => {
            return (
                (item.requestProducts.length !== 0 && item.requestProducts[0].name !== null)
                    ? (
                        item.requestProducts[0].name.toLowerCase().includes(query) ||
                        item.id.toString().includes(query) ||
                        formatDateString(item.date).includes(query) ||
                        item.codeWord.toLowerCase().includes(query) ||
                        item.status.toLowerCase().includes(query) ||
                        item.responsible.toLowerCase().includes(query) ||
                        formatDateString(item.shippingDate).includes(query)
                    )
                    : item.status.toLowerCase().includes(query)
            )
        })
        // return data.filter(item => {
        //     return (
        //         (item.lemzProducts.length !== 0 && item.lemzProducts[0].name !== null)
        //             ? (
        //                 item.lemzProducts[0].name.toLowerCase().includes(query) ||
        //                 item.id.toString().includes(query) ||
        //                 formatDateString(item.date).includes(query) ||
        //                 item.codeWord.toLowerCase().includes(query) ||
        //                 item.status.toLowerCase().includes(query) ||
        //                 item.responsible.toLowerCase().includes(query) ||
        //                 formatDateString(item.shippingDate).includes(query)
        //             )
        //             : item.status.toLowerCase().includes(query)
        //     )
        // })
    }

    const handleStatusChange = (event) => {
        const status = event.target.value;
        const id = event.target.getAttribute("id");
        editRequestStatus({
            status: status
        }, id)
            .then(() => {
                props.loadData()
            })
            .catch(error => {
                console.log(error);
            })
    }

    const sortRequests = (data) => {
        return searchQuery(data).sort((a, b) => {

            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
            }
            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
            }
            return 0;
        });
        // return searchQuery(data).sort((a, b) => {

        //     if ((a[sortOrder.curSort] < b[sortOrder.curSort]) & (a.status === "Завершено" || b.status === "Завершено") === false) {
        //         return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
        //     }
        //     else if (a.status === "Завершено") {
        //         return 1;
        //     }
        //     else if (b.status === "Завершено") {
        //         return -1
        //     }


        //     if (a[sortOrder.curSort] > b[sortOrder.curSort] & (a.status === "Завершено" || b.status === "Завершено") === false) {
        //         return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
        //     }
        //     else if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        //         return 1;
        //     }
        //     return 0;
        // });
    }

    useEffect(() => {
        props.data.length > 0 && setIsLoading(false);
    }, [props.data])

    return (
        <div className="tableview_requests">
            <div className="tableview_requests__menu">
                <div className={curPage === 'Открытые'
                    ? "tableview_requests__item--active tableview_requests__item"
                    : "tableview_requests__item"}
                    onClick={() => setCurPage('Открытые')}>Открытые</div>
                <div className={curPage === 'Завершено'
                    ? "tableview_requests__item--active tableview_requests__item"
                    : "tableview_requests__item"}
                    onClick={() => setCurPage('Завершено')}>Завершено</div>
            </div>
            <div className="tableview_requests__row tableview_requests__row--header">
                {/* <div className="tableview_requests__col">
                    <span>ID</span>
                    <img name="id" className="tableview_requests__img" onClick={changeSortOrder} src={sortIcon} />
                </div> */}
                <div className="tableview_requests__col">
                    <span>Дата</span>
                    <img name="date" className="tableview_requests__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_requests__col">Продукция</div>
                <div className="tableview_requests__col">Фасовка</div>
                <div className="tableview_requests__col">Количество</div>
                <div className="tableview_requests__col">Кодовое слово</div>
                <div className="tableview_requests__col">Ответственный</div>
                <div className="tableview_requests__col">Статус</div>
                <div className="tableview_requests__col">Действия</div>
            </div>
            {isLoading && <TableDataLoading
                minHeight='50px'
                className="tableview_requests__row tableview_requests__row--even"
            />}
            {sortRequests(props.data).map((request, request_id) => (
                <div key={request_id} className={"tableview_requests__row " +
                    (
                        request.status === "Проблема" && "tableview_requests__row--status_problem" ||
                        request.status === "Материалы" && "tableview_requests__row--status_materials" ||
                        request.status === "Ожидание" && "tableview_requests__row--status_waiting" ||
                        request.status === "В производстве" && "tableview_requests__row--status_in_production" ||
                        request.status === "Готово" && "tableview_requests__row--status_ready" ||
                        request.status === "Частично готово" && "tableview_requests__row--status_ready" ||
                        request.status === "Отгружено" && "tableview_requests__row--status_shipped" ||
                        request.status === "Приоритет" && "tableview_requests__row--status_priority" ||
                        request.status === "Завершено" && "tableview_requests__row--status_completed"
                    )
                }>
                    {/* <div className="tableview_requests__col">{request.id}</div> */}
                    <div className="tableview_requests__col">{formatDateString(request.date)}</div>
                    <div className="tableview_requests__col">
                        {request.requestProducts.sort((a, b) => {
                            if (a.name < b.name) {
                                return -1;
                            }
                            if (a.name > b.name) {
                                return 1;
                            }
                            return 0;
                        }).map((item, index) => {
                            return (
                                <div className="tableview_requests__sub_row" style={{ height: `calc(${100 / request.requestProducts.length}%)` }}>
                                    <div className="tableview_requests__sub_col">{item.name}</div>
                                    <div className="tableview_requests__sub_col">{item.packaging}</div>
                                    <div className="tableview_requests__sub_col">{item.quantity}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="tableview_requests__col">{request.codeWord}</div>
                    <div className="tableview_requests__col">{request.responsible}</div>
                    <div className="tableview_requests__col">
                        <select
                            id={request.id}
                            className="tableview_requests__status_select"
                            value={request.status}
                            onChange={handleStatusChange}
                        >
                            <option value="Проблема">Проблема</option>
                            <option value="Материалы">Материалы</option>
                            <option value="Ожидание">Ожидание</option>
                            <option value="В производстве">В производстве</option>
                            <option value="Готово">Готово</option>
                            <option value="Частично готово">Частично готово</option>
                            <option value="Завершено">Завершено</option>
                            <option value="Отгружено">Отгружено</option>
                            <option value="Приоритет">Приоритет</option>
                        </select>
                    </div>
                    <div className="tableview_requests__actions">
                        <Link to={"/requests/view/" + request.id} className="tableview_requests__action" >Просмотр</Link>
                        {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to={"/requests/edit/" + request.id} className="tableview_requests__action">Редактировать</Link>}
                        {props.userHasAccess(['ROLE_ADMIN']) && <div data-id={request.id} className="tableview_requests__action" onClick={props.deleteItem}>Удалить</div>}
                        {props.userHasAccess(['ROLE_ADMIN']) && <div data-id={request.id} className="tableview_requests__action" onClick={() => props.transferRequest(request.id)}>Перенести</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;