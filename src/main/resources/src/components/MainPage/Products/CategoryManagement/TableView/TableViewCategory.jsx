import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../../assets/tableview/sort_icon.png';
import './TableViewCategory.scss';

const TableViewCategory = (props) => {
    const [sortOrder, setSortOrder] = useState({
        curSort: 'id',
        id: 'desc'
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
        return data.filter(item => (
            item.name.toLowerCase().includes(query) ||
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
        props.setShowWindow && props.setShowWindow(false);
    }, [props.data, props.closeWindow])

    return (
        <div className="tableview-category">
            <div className="tableview-category__row tableview-category__row--header">
                <div className="tableview-category__col">
                    <span>ID</span>
                    <img name="id" className="tableview-category__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview-category__col">Название</div>
                <div className="tableview-category__col">Действия</div>
            </div>
            {sortProducts(props.data).map((category, category_id) => (
                <div key={category_id} className={"tableview-category__row " + (category.id % 2 === 0 ? "tableview-category__row--even" : "tableview-category__row--odd")}>
                    <div className="tableview-category__col">{category.id}</div>
                    <div className="tableview-category__col">{category.name}</div>
                    <div className="tableview-category__actions">
                        {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to={"/products/category/edit/" + category.id} className="tableview-category__action">Редактировать</Link>}
                        {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && <div data-id={category.id} className="tableview-category__action" onClick={props.deleteItem}>Удалить</div>}
                        {props.selectCategory && <div data-id={category.id} className="tableview-category__action" onClick={() => {
                            props.selectCategory(category.name);
                            props.setCloseWindow(!props.closeWindow);
                        }}>Выбрать</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableViewCategory;