import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
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
        let re = /[.,\s]/gi;
        const query = props.searchQuery.toLowerCase();
        return data.filter(item => (
            item.id.toString().includes(query) ||
            item.name.toLowerCase().includes(query) ||
            item.quantity.toLowerCase().includes(query) ||
            item.comment.toLowerCase().includes(query) ||
            item.number.toString().toLowerCase().includes(query)
        ))
    }

    const sortParts = (data) => {
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
        <div className="tableview_storage">
            <div className="tableview_storage__row tableview_storage__row--header">
                <div className="tableview_storage__col">
                    <span>ID</span>
                    <img name="id" className="tableview_storage__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_storage__col">Номер</div>
                <div className="tableview_storage__col">Название</div>
                <div className="tableview_storage__col">Кол-во</div>
                <div className="tableview_storage__col">Комментарий</div>
                <div className="tableview_storage__col">Действия</div>
            </div>
            {sortParts(props.data).map((storage, storage_id) => (
                <div key={storage_id} className={"tableview_storage__row " + (storage.id % 2 === 0 ? "tableview_storage__row--even" : "tableview_storage__row--odd")}>
                    <div className="tableview_storage__col">{storage.id}</div>
                    <div className="tableview_storage__col">{storage.number}</div>
                    <div className="tableview_storage__col">{storage.name}</div>
                    <div className="tableview_storage__col">{storage.quantity}</div>
                    <div className="tableview_storage__col">{storage.comment}</div>
                    <div className="tableview_storage__actions">
                        {/* <Link to={"/storage/view/" + storage.id} className="tableview_storage__action">Просмотр</Link> */}
                        <Link to={"/lemz/workshop-storage/edit/" + storage.id} className="tableview_storage__action">Редактировать</Link>
                        {props.userHasAccess(['ROLE_ADMIN']) && <div data-id={storage.id} className="tableview_storage__action" onClick={props.deleteItem}>Удалить</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;