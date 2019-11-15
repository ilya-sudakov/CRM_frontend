import React, { useState } from 'react';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';

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

    const searchQuery = () => {
        return props.data.filter(item => item.products.includes(props.searchQuery))
    }

    const sortRequests = () => {
        return searchQuery().sort((a, b) => {

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

    return (
        <div className="tableview">
            <div className="tableview__row tableview__row--header">
                <div className="tableview__col" data-label="ID">
                    <span>ID</span>
                    <img name="id" className="tableview__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview__col" data-label="Дата">
                    <span>Дата</span>
                    <img name="date" className="tableview__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview__col" data-label="Продукция">Продукция</div>
                <div className="tableview__col" data-label="Количество">Количество</div>
                <div className="tableview__col" data-label="Кодовое слово">Кодовое слово</div>
                <div className="tableview__col" data-label="Ответственный">Ответственный</div>
                <div className="tableview__col" data-label="Статус">Статус</div>
                <div className="tableview__col" data-label="Действия">Действия</div>
            </div>
            {sortRequests().map((request, request_id) => (
                <div key={request_id} className={"tableview__row " +
                    (request.status === "Не готово" && "tableview__row--status_not_ready" ||
                        request.status === "В процессе" && "tableview__row--status_in_progress" ||
                        request.status === "Готово к отгрузке" && "tableview__row--status_ready" ||
                        request.status === "Отгружено" && "tableview__row--status_shipped")
                }>
                    <div className="tableview__col" data-label="ID">{request.id}</div>
                    <div className="tableview__col" data-label="Дата">{request.date}</div>
                    <div className="tableview__col" data-label="Продукция">{request.products}</div>
                    <div className="tableview__col" data-label="Количество">{request.quantity}</div>
                    <div className="tableview__col" data-label="Кодовое слово">{request.codeWord}</div>
                    <div className="tableview__col" data-label="Ответственный">{request.responsible}</div>
                    <div className="tableview__col" data-label="Статус">{request.status}</div>
                    <div className="tableview__col" data-label="Действия" className="tableview__actions">
                        {/* <div data-id={request.id} className="tableview__action" >Просмотр</div>
                        <div data-id={request.id} className="tableview__action" >Редактировать</div> */}
                        <div data-id={request.id} className="tableview__action" onClick={props.deleteItem}>Удалить</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;