import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';

const TableView = (props) => {
    const [sortOrder, setSortOrder] = useState({
        curSort: 'id',
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
        return data.filter(item => item.cargo.toLowerCase().includes(props.searchQuery.toLowerCase()))
    }

    const sortTransportations = (data) => {
        return searchQuery(data).sort((a, b) => {
            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
            }
            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
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
        <div className="tableview_transportation">
            <div className="tableview_transportation__row tableview_transportation__row--header">
                <div className="tableview_transportation__col">
                    <span>ID</span>
                    <img name="id" className="tableview_transportation__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_transportation__col">
                    <span>Дата</span>
                    <img name="date" className="tableview_transportation__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_transportation__col">Товар</div>
                <div className="tableview_transportation__col">Откуда</div>
                <div className="tableview_transportation__col">Куда</div>
                <div className="tableview_transportation__col">Водитель</div>
                <div className="tableview_transportation__col">Действия</div>
            </div>
            {sortTransportations(props.data).map((transportation, transportation_id) => (
                <div key={transportation_id} className={"tableview_transportation__row " + (transportation.id % 2 === 0 ? "tableview_transportation__row--even" : "tableview_transportation__row--odd")}>
                    <div className="tableview_transportation__col">{transportation.id}</div>
                    <div className="tableview_transportation__col">{formatDateString(transportation.date)}</div>
                    <div className="tableview_transportation__col">{transportation.cargo}</div>
                    <div className="tableview_transportation__col">{transportation.sender}</div>
                    <div className="tableview_transportation__col">{transportation.recipient}</div>
                    <div className="tableview_transportation__col">{transportation.driver}</div>
                    <div className="tableview_transportation__actions">
                        {/* <Link to={"/transportation/view/" + transportation.id} className="tableview_transportation__action">Просмотр</Link> */}
                        <Link to={"/dispatcher/transportation/edit/" + transportation.id} className="tableview_transportation__action">Редактировать</Link>
                        {props.userHasAccess(['ROLE_ADMIN']) && <div data-id={transportation.id} className="tableview_transportation__action" onClick={props.deleteItem}>Удалить</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;