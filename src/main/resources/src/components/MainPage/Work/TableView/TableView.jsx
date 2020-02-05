import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';

const TableView = (props) => {
    const [sortOrder, setSortOrder] = useState({
        curSort: 'work',
        id: 'desc'
    })
    const [isLoading, setIsLoading] = useState(true);

    const changeSortOrder = (event) => {
        const name = event.target.getAttribute("name");
        setSortOrder({
            curSort: name,
            [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
        })
    }

    const searchQuery = (data) => {
        const query = props.searchQuery.toLowerCase();
        return data.filter(item => (
            item.work.toLowerCase().includes(query) ||
            item.id.toString().includes(query)
        ))
    }

    const sortProducts = (data) => {
        return searchQuery(data).sort((a, b) => {
            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
            }
            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
            }
            return 0;
        })
    }

    useEffect(() => {
        props.data.length > 0 && setIsLoading(false);
    }, [props.data])

    return (
        <div className="tableview-work">
            <div className="tableview-work__row tableview-work__row--header">
                <div className="tableview-work__col">Название</div>
                <div className="tableview-work__col">Действия</div>
            </div>
            {isLoading && <TableDataLoading
                minHeight='50px'
                className="tableview_products__row tableview_products__row--even"
            />}
            {sortProducts(props.data).map((work, work_id) => (
                <div key={work_id} className="tableview-work__row tableview-work__row--even">
                    <div className="tableview-work__col">{work.work}</div>
                    <div className="tableview-work__actions">
                        {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to={"/work-list/edit/" + work.id} className="tableview-work__action">Редактировать</Link>}
                        {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && <div data-id={work.id} className="tableview-work__action" onClick={props.deleteItem}>Удалить</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;