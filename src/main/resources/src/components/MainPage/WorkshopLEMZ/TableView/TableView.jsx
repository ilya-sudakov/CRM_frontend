import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';
import { editRequestStatus, editRequestLEMZStatus } from '../../../../utils/utilsAPI.jsx';

const TableView = (props) => {
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
        return data.filter(item => item.codeWord.toLowerCase().includes(props.searchQuery.toLowerCase()))
    }

    const handleStatusChange = (event) => {
        const status = event.target.value;
        const id = event.target.getAttribute("id");
        editRequestLEMZStatus({
            status: status
        }, id)
            .then(() => {
                window.location.reload(); //на данный момент так
            })
            .catch(error => {
                console.log(error);
            })
    }

    const sortRequests = (data) => {
        return searchQuery(data).sort((a, b) => {

            if ((a[sortOrder.curSort] < b[sortOrder.curSort]) & (a.status === "Завершено" || b.status === "Завершено") === false) {
                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
            }
            else if (a.status === "Завершено") {
                return 1;
            }
            else if (b.status === "Завершено") {
                return -1
            }


            if (a[sortOrder.curSort] > b[sortOrder.curSort] & (a.status === "Завершено" || b.status === "Завершено") === false) {
                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
            }
            else if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                return 1;
            }
            return 0;
        })
    }

    const formatDateString = (dateString) => {
        const newDate = dateString.split("T")[0];
        return (
            newDate.split("-")[2] + "." +
            newDate.split("-")[1] + "." +
            newDate.split("-")[0]
        );
    }

    return (
        <div className="tableview_requests_LEMZ">
            <div className="tableview_requests_LEMZ__row tableview_requests_LEMZ__row--header">
                <div className="tableview_requests_LEMZ__col">
                    <span>ID</span>
                    <img name="id" className="tableview_requests_LEMZ__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_requests_LEMZ__col">
                    <span>Дата</span>
                    <img name="date" className="tableview_requests_LEMZ__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_requests_LEMZ__col">Продукция</div>
                <div className="tableview_requests_LEMZ__col">Фасовка</div>
                <div className="tableview_requests_LEMZ__col">Количество</div>
                <div className="tableview_requests_LEMZ__col">Кодовое слово</div>
                <div className="tableview_requests_LEMZ__col">Ответственный</div>
                <div className="tableview_requests_LEMZ__col">Статус</div>
                <div className="tableview_requests_LEMZ__col">Дата отгрузки</div>
                <div className="tableview_requests_LEMZ__col">Комментарий</div>
                <div className="tableview_requests_LEMZ__col">Действия</div>
            </div>
            {sortRequests(props.data).map((request, request_id) => (
                <div key={request_id} className={"tableview_requests_LEMZ__row " +
                    (
                        request.status === "Проблема" && "tableview_requests_LEMZ__row--status_problem" ||
                        request.status === "Материалы" && "tableview_requests_LEMZ__row--status_materials" ||
                        request.status === "Ожидание" && "tableview_requests_LEMZ__row--status_waiting" ||
                        request.status === "В производстве" && "tableview_requests_LEMZ__row--status_in_production" ||
                        request.status === "Готово" && "tableview_requests_LEMZ__row--status_ready" ||
                        request.status === "Отгружено" && "tableview_requests_LEMZ__row--status_shipped" ||
                        request.status === "Приоритет" && "tableview_requests_LEMZ__row--status_priority" ||
                        request.status === "Завершено" && "tableview_requests_LEMZ__row--status_completed"
                    )
                }>
                    <div className="tableview_requests_LEMZ__col">{request.id}</div>
                    <div className="tableview_requests_LEMZ__col">{formatDateString(request.date)}</div>
                    <div className="tableview_requests_LEMZ__col">
                        {/* {request.products.map((item, index) => {
                            return (
                                <div className="tableview_requests_LEMZ__sub_row" style={{ height: `calc(${100 / request.products.length}%)` }}>
                                    <div className="tableview_requests_LEMZ__sub_col">{item.name}</div>
                                    <div className="tableview_requests_LEMZ__sub_col">{item.packaging}</div>
                                    <div className="tableview_requests_LEMZ__sub_col">{item.quantity + " " + item.unit}</div>
                                </div>
                            )
                        })} */}
                    </div>
                    {/* Корректный вывод но с ограничением по количеству символов в строке */}
                    {/* <div className="tableview_requests_LEMZ__col">
                        <div className="tableview_requests_LEMZ__subrow" style={{height: `${100/2}%`}}><div className="tableview_requests_LEMZ__subtext">{request.products}</div></div>
                        <div className="tableview_requests_LEMZ__subrow" style={{height: `${100/2}%`}}><div className="tableview_requests_LEMZ__subtext">{request.products}</div></div>
                    </div>
                    <div className="tableview_requests_LEMZ__col">
                        <div className="tableview_requests_LEMZ__subrow" style={{height: `${100/2}%`}}><div className="tableview_requests_LEMZ__subtext">{request.quantity}</div></div>
                        <div className="tableview_requests_LEMZ__subrow" style={{height: `${100/2}%`}}><div className="tableview_requests_LEMZ__subtext">{request.quantity}</div></div>
                    </div> */}
                    <div className="tableview_requests_LEMZ__col">{request.codeWord}</div>
                    <div className="tableview_requests_LEMZ__col">{request.responsible}</div>
                    <div className="tableview_requests_LEMZ__col">
                        <select
                            id={request.id}
                            className="tableview_requests_LEMZ__status_select"
                            defaultValue={request.status}
                            onChange={handleStatusChange}
                        >
                            <option>Приоритет</option>
                            <option>Проблема</option>
                            <option>Материалы</option>
                            <option>Ожидание</option>
                            <option>В производстве</option>
                            <option>Готово</option>
                            <option>Отгружено</option>
                            <option>Завершено</option>
                        </select>
                    </div>
                    <div className="tableview_requests_LEMZ__col">{request.shippingDate && formatDateString(request.shippingDate)}</div>
                    <div className="tableview_requests_LEMZ__col">{request.comment}</div>
                    <div className="tableview_requests_LEMZ__actions">
                        <Link to={"/workshop-lemz/view/" + request.id} className="tableview_requests_LEMZ__action" >Просмотр</Link>
                        {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to={"/workshop-lemz/edit/" + request.id} className="tableview_requests_LEMZ__action">Редактировать</Link>}
                        {/* <div data-id={request.id} className="tableview_requests_LEMZ__action" onClick={props.deleteItem}>Удалить</div> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;