import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';
import { editRequestStatus } from '../../../../utils/utilsAPI.jsx';

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
        return data.filter(item => item.products[0].name.toLowerCase().includes(props.searchQuery.toLowerCase()))
    }

    const handleStatusChange = (event) => {
        const status = event.target.value;
        const id = event.target.getAttribute("id");
        editRequestStatus({
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

            if ((a[sortOrder.curSort] < b[sortOrder.curSort]) & (a.status === "Отгружено" || b.status === "Отгружено") === false) {
                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
            }
            else if (a.status === "Отгружено") {
                return 1;
            }
            else if (b.status === "Отгружено") {
                return -1
            }


            if (a[sortOrder.curSort] > b[sortOrder.curSort] & (a.status === "Отгружено" || b.status === "Отгружено") === false) {
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
        <div className="tableview_requests">
            <div className="tableview_requests__row tableview_requests__row--header">
                <div className="tableview_requests__col">
                    <span>ID</span>
                    <img name="id" className="tableview_requests__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
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
            {sortRequests(props.data).map((request, request_id) => (
                <div key={request_id} className={"tableview_requests__row " +
                    (request.status === "Не готово" && "tableview_requests__row--status_not_ready" ||
                        request.status === "В процессе" && "tableview_requests__row--status_in_progress" ||
                        request.status === "Готово к отгрузке" && "tableview_requests__row--status_ready" ||
                        request.status === "Отгружено" && "tableview_requests__row--status_shipped")
                }>
                    <div className="tableview_requests__col">{request.id}</div>
                    <div className="tableview_requests__col">{formatDateString(request.date)}</div>
                    <div className="tableview_requests__col">
                        {request.products.map((item, index) => {
                            return (
                                <div className="tableview_requests__sub_row" style={{ height: `calc(${100 / request.products.length}%)` }}>
                                    <div className="tableview_requests__sub_col">{item.name}</div>
                                    <div className="tableview_requests__sub_col">{item.packaging}</div>
                                    <div className="tableview_requests__sub_col">{item.quantity + " " + item.unit}</div>
                                </div>
                            )
                        })}
                    </div>
                    {/* Корректный вывод но с ограничением по количеству символов в строке */}
                    {/* <div className="tableview_requests__col">
                        <div className="tableview_requests__subrow" style={{height: `${100/2}%`}}><div className="tableview_requests__subtext">{request.products}</div></div>
                        <div className="tableview_requests__subrow" style={{height: `${100/2}%`}}><div className="tableview_requests__subtext">{request.products}</div></div>
                    </div>
                    <div className="tableview_requests__col">
                        <div className="tableview_requests__subrow" style={{height: `${100/2}%`}}><div className="tableview_requests__subtext">{request.quantity}</div></div>
                        <div className="tableview_requests__subrow" style={{height: `${100/2}%`}}><div className="tableview_requests__subtext">{request.quantity}</div></div>
                    </div> */}
                    <div className="tableview_requests__col">{request.codeWord}</div>
                    <div className="tableview_requests__col">{request.responsible}</div>
                    <div className="tableview_requests__col">
                        <select
                            id={request.id}
                            className="tableview_requests__status_select"
                            defaultValue={request.status}
                            onChange={handleStatusChange}
                        >
                            <option>Не готово</option>
                            <option>В процессе</option>
                            <option>Готово к отгрузке</option>
                            <option>Отгружено</option>
                        </select>
                    </div>
                    <div className="tableview_requests__actions">
                        <Link to={"/requests/view/" + request.id} className="tableview_requests__action" >Просмотр</Link>
                        {<Link to={"/requests/edit/" + request.id} className="tableview_requests__action">Редактировать</Link>}
                        {/* <div data-id={request.id} className="tableview_requests__action" onClick={props.deleteItem}>Удалить</div> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;